import { ChakraProvider, theme } from "@chakra-ui/react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/native";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import App from "../App";
import SearchProvider from "../SearchContext";
import mockWord from "./mockWord.json";

// Mocking the fetch API. This is a global mock, used in all tests.
const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/test",
    (_req, res, ctx) => res(ctx.json({ word: mockWord }))
  )
);
beforeAll(() => server.listen());
afterAll(() => server.close());

test("G:should fetch search result correctly", async () => {
  // Renders the App component with the SearchProvider, both needed since the App uses a context.
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  // Gets the input element by its placeholder text.
  const input = screen.getByPlaceholderText("Search for a word");
  // Types "test" in the input element.
  await userEvent.type(input, "test");
  // Clicks the search button.
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  // Finds the heading element with the word "test".
  await screen.findByRole("heading");
  // Expects the heading element to have the text content "test".
  expect(screen.getByRole("heading")).toHaveTextContent("test");
});

test("G:should display error when searching with empty value", async () => {
  // Renders the App component with the SearchProvider, both needed since the App uses a context.
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  // Clicks the search button without entering a value in the input.
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  // Finds the error message.
  const result = await screen.findByText("Required");
  // Expects the error message to be in the document.
  expect(result).toBeInTheDocument();
});

// Uses a 404 response from the server to test the error message.
test("G:should display error message when no result is found", async () => {
  server.use(
    rest.get(
      "https://api.dictionaryapi.dev/api/v2/entries/en/aweirdword",
      (_req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );
  render(
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  // Gets the input element by its placeholder text.
  const input = screen.getByPlaceholderText("Search for a word");
  // Types "aweirdword" in the input element.
  await userEvent.type(input, "aweirdword");
  // Clicks the search button.
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  // Finds the error message displayed when no match from the API is made.
  const result = await screen.findByText(
    "Sorry, your word doesn't exist in the English language."
  );
  // Expects the error message to be in the document.
  expect(result).toBeInTheDocument();
});

test("G:should be able to call play method on audio", async () => {
  // Mocking the play method on the HTMLMediaElement.prototype.
  const spy = vi.spyOn(HTMLMediaElement.prototype, "play");
  // Renders the App component with the SearchProvider, both needed since the App uses a context.
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  // Gets the input element by its placeholder text.
  const input = screen.getByPlaceholderText("Search for a word");
  // Types "test" in the input element.
  await userEvent.type(input, "test");
  // Clicks the search button.
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  // Finds the play button.
  const play = await screen.findByRole("button", { name: "Play" });
  // Expects the play button to be in the document.
  expect(play).toBeInTheDocument();
  // Clicks the play button.
  await userEvent.click(play);
  // Expects the play method to have been called.
  expect(spy).toHaveBeenCalled();
});

describe("should be able to see different meanings for different parts of speech", () => {
  test("should be able to see meanings for noun", async () => {
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the input element by its placeholder text.
    const input = screen.getByPlaceholderText("Search for a word");
    // Types "test" in the input element.
    await userEvent.type(input, "test");
    // Clicks the search button.
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    // Finds the tab element with the name "noun".
    const noun = await screen.findByRole("tab", { name: "noun" });
    // Expects the noun tab to be in the document.
    expect(noun).toBeInTheDocument();
    // Clicks the noun tab.
    await userEvent.click(noun);
    // Finds one definition meaning of the noun "test".
    const meaning = screen.getByText("A challenge, trial.");
    // Expects the meaning to be in the document.
    expect(meaning).toBeInTheDocument();
  });

  test("should be able to see meanings for verb", async () => {
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the input element by its placeholder text.
    const input = screen.getByPlaceholderText("Search for a word");
    // Types "test" in the input element.
    await userEvent.type(input, "test");
    // Clicks the search button.
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    // Finds the tab element with the name "verb".
    const verb = await screen.findByRole("tab", { name: "verb" });
    // Expects the verb tab to be in the document.
    expect(verb).toBeInTheDocument();
    // Clicks the verb tab.
    await userEvent.click(verb);
    // Finds one definition meaning of the verb "test".
    const meaning = screen.getByText("To challenge.");
    // Expects the meaning to be in the document.
    expect(meaning).toBeInTheDocument();
  });
});

describe("VG:should be able to switch between dark and light theme", () => {
  test("should display dark mode", async () => {
    // Renders the App component with the ChakraProvider and SearchProvider, all needed since the App uses a context and a theme. 
    render(
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ChakraProvider>
    );
    // Gets the toggle button by its role and name.
    const toggleDark = screen.getByRole("button", { name: "Dark Mode" });
    // Clicks the toggle button.
    await userEvent.click(toggleDark);
    // Expects the toggle button to have the text content "Light Mode".
    // Expects the document element to have the attribute "data-theme" with the value "dark".
    // Both confirm that the theme has changed from light to dark.
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(toggleDark).toHaveTextContent("Light Mode");
  });
  test("should display light mode", async () => {
    // Renders the App component with the ChakraProvider and SearchProvider, all needed since the App uses a context and a theme.
    render(
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ChakraProvider>
    );
    // Gets the toggle button by its role and name.
    const toggleLight = screen.getByRole("button", { name: "Light Mode" });
    // Clicks the toggle button.
    await userEvent.click(toggleLight);
    // Expects the toggle button to have the text content "Dark Mode".
    // Expects the document element to have the attribute "data-theme" with the value "light".
    // Both confirm that the theme has changed from dark to light.
    expect(toggleLight).toHaveTextContent("Dark Mode");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});

test("should be able to open up drawer for favorite words", async () => {
  // Renders the App component with the SearchProvider, both needed since the App uses a context.
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  // Gets the button to open the drawer by its role and name.
  // Clicks the button to open the drawer.
  await userEvent.click(
    screen.getByRole("button", { name: "Show favorite words" })
  );
  // Finds the drawer by finding the text "Favorite words".
  const favoriteWords = await screen.findByText("Favorite words");
  // Expects the text "Favorite words" to be in the document.
  expect(favoriteWords).toBeInTheDocument();
});

describe("VG:should be able to save a word to the session storage", () => {
  test("should not display any listitem initially", async () => {
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the button to open the drawer by its role and name.
    // Clicks the button to open the drawer.
    await userEvent.click(
      screen.getByRole("button", { name: "Show favorite words" })
    );
    // Gets the drawer by it's role.
    const drawer = screen.getByRole("dialog");
    // Expects and finds the list element in the drawer.
    expect(await within(drawer).findByRole("list")).toBeInTheDocument();
    // Expects that the list element does not contain any listitem.
    expect(within(drawer).queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("should be able to save a word to favorite words", async () => {
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the input element by its placeholder text.
    const input = screen.getByPlaceholderText("Search for a word");
    // Types "test" in the input element.
    await userEvent.type(input, "test");
    // Clicks the search button.
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    // Finds the save button.
    const save = await screen.findByRole("button", { name: "Save" });
    // Clicks the save button.
    await userEvent.click(save);
    // Gets the button to open the drawer by its role and name.
    // Clicks the button to open the drawer.
    await userEvent.click(
      screen.getByRole("button", { name: "Show favorite words" })
    );
    // Gets the drawer by it's role.
    const drawer = screen.getByRole("dialog");
    // Expects the drawer to be visible.
    expect(drawer).toBeVisible();
    // Expects the drawer to contain the text "test".
    expect(within(drawer).getByText("test")).toBeInTheDocument();
  });

  test("should getItem from session storage", async () => {
    // Mocking the getItem method on the Storage.prototype.
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    // Clears the session storage and restores the getItem method.
    afterEach(() => {
      getItemSpy.mockRestore();
      window.sessionStorage.clear();
    });
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the input element by its placeholder text.
    const input = screen.getByPlaceholderText("Search for a word");
    // Types "test" in the input element.
    await userEvent.type(input, "test");
    // Clicks the search button.
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    // Uses the first (and only) object from the mockWord array (mockWord.json) as the saved word.
    const savedWord = mockWord[0];
    // If the key is "savedWords", the getItem method will return the saved word as a JSON string.
    // Otherwise, it will return null.
    getItemSpy.mockImplementation((key) => {
      if (key === "savedWords") {
        return JSON.stringify([savedWord]);
      }
      return null;
    });
    // Finds the save button by its role and name.
    const save = await screen.findByRole("button", { name: "Save" });
    // Clicks the save button.
    await userEvent.click(save);
    // Expects the getItem method to have been called with the key "savedWords".
    expect(getItemSpy).toHaveBeenCalledWith("savedWords");
    // Expects the session storage to contain the saved word.
    const storedValue = window.sessionStorage.getItem("savedWords");
    // Expects the stored value to not be null (meaning that the saved word is in the session storage).
    expect(storedValue).not.toBeNull();
    // Expects the stored value to be the saved word (the object test).
    expect(JSON.parse(storedValue!)).toEqual([savedWord]);
  });

  test("should be able to remove a word from sessionStorage", async () => {
    // Mocking the getItem method on the Storage.prototype.
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    // Clears the session storage and restores the getItem method.
    afterEach(() => {
      getItemSpy.mockRestore();
      window.sessionStorage.clear();
    });
    // Renders the App component with the SearchProvider, both needed since the App uses a context.
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    // Gets the input element by its placeholder text.
    const input = screen.getByPlaceholderText("Search for a word");
    // Types "test" in the input element.
    await userEvent.type(input, "test");
    // Clicks the search button.
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    // If the key is "savedWords", the getItem method will return an empty array as a JSON string.
    // Otherwise, it will return null.
    getItemSpy.mockImplementation((key) => {
      if (key === "savedWords") {
        return "[]";
      }
      return null;
    });
    // Finds the save button by its role and name.
    const save = await screen.findByRole("button", { name: "Save" });
    // Clicks the save button.
    await userEvent.click(save);
    // Gets the button to open the drawer by its role and name.
    await userEvent.click(
      screen.getByRole("button", { name: "Show favorite words" })
    );
    // Gets the drawer by it's role.
    const drawer = screen.getByRole("dialog");
    // Expects the drawer to be visible.
    expect(drawer).toBeVisible();
    // Expects the drawer to contain the text "test".
    expect(within(drawer).getByText("test")).toBeInTheDocument();
    // Finds the remove button by its role and name.
    const remove = within(drawer).getByRole("button", { name: "Remove" });
    // Clicks the remove button.
    await userEvent.click(remove);
    // Expects the drawer to not contain the text "test".
    expect(within(drawer).queryByText("test")).not.toBeInTheDocument();
    // Expects the getItem method to have been called with the key "savedWords".
    expect(getItemSpy).toHaveBeenCalledWith("savedWords");
    // Expects the session storage to contain an empty array.
    // Since the saved word has been removed, the session storage should be empty.
    const storedValue = window.sessionStorage.getItem("savedWords");
    // Expects the stores value to be an empty array.
    expect(JSON.parse(storedValue!)).toEqual([]);
  });
});
