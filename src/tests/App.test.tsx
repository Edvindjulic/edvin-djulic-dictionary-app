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

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/test",
    (_req, res, ctx) => res(ctx.json({ word: mockWord }))
  )
);
beforeAll(() => server.listen());
afterAll(() => server.close());

test("G:should fetch search result correctly", async () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const input = screen.getByPlaceholderText("Search for a word");
  await userEvent.type(input, "test");
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  await screen.findByRole("heading");
  expect(screen.getByRole("heading")).toHaveTextContent("test");
});

test("G:should display error when searching with empty value", async () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  const result = await screen.findByText("Required");
  expect(result).toBeInTheDocument();
});

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
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const input = screen.getByPlaceholderText("Search for a word");
  await userEvent.type(input, "aweirdword");
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  const result = await screen.findByText(
    "Sorry, your word doesn't exist in the English language."
  );
  expect(result).toBeInTheDocument();
});

test("G:should be able to call play method on audio", async () => {
  //Test passes but doesnt check if audio actually plays
  const spy = vi.spyOn(HTMLMediaElement.prototype, "play");
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const input = screen.getByPlaceholderText("Search for a word");
  await userEvent.type(input, "test");
  await userEvent.click(screen.getByRole("button", { name: "Search" }));
  const play = await screen.findByRole("button", { name: "Play" });
  expect(play).toBeInTheDocument();
  await userEvent.click(play);
  expect(spy).toHaveBeenCalled();
});

describe("should be able to see different meanings for different parts of speech", () => {
  test("should be able to see meanings for noun", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Search for a word");
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    const noun = await screen.findByRole("tab", { name: "noun" });
    expect(noun).toBeInTheDocument();
    await userEvent.click(noun);
    const meaning = screen.getByText("Definition: A challenge, trial.");
    expect(meaning).toBeInTheDocument();
  });

  test("should be able to see meanings for verb", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Search for a word");
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    const verb = await screen.findByRole("tab", { name: "verb" });
    expect(verb).toBeInTheDocument();
    await userEvent.click(verb);
    const meaning = screen.getByText("Definition: To challenge.");
    expect(meaning).toBeInTheDocument();
  });
});

describe("VG:should be able to switch between dark and light theme", () => {
  test("should display dark mode", async () => {
    render(
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ChakraProvider>
    );
    const toggleDark = screen.getByRole("button", { name: "Dark Mode" });
    await userEvent.click(toggleDark);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(toggleDark).toHaveTextContent("Light Mode");
  });
  test("should display light mode", async () => {
    render(
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ChakraProvider>
    );
    const toggleLight = screen.getByRole("button", { name: "Light Mode" });
    await userEvent.click(toggleLight);
    expect(toggleLight).toHaveTextContent("Dark Mode");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});

test("should be able to open up drawer for favorite words", async () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Show favorite words" })
  );
  const favoriteWords = await screen.findByText("Favorite words");
  expect(favoriteWords).toBeInTheDocument();
});

describe("VG:should be able to save a word to the session storage", () => {
  test("should not display any listitem initially", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Show favorite words" })
    );
    const drawer = screen.getByRole("dialog");
    expect(await within(drawer).findByRole("list")).toBeInTheDocument();
    expect(within(drawer).queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("should be able to save a word to favorite words", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Search for a word");
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    const save = await screen.findByRole("button", { name: "Save" });
    await userEvent.click(save);
    await userEvent.click(
      screen.getByRole("button", { name: "Show favorite words" })
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toBeVisible();
    expect(within(drawer).getByText("test")).toBeInTheDocument();
  });

  test("should getItem from session storage", async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    afterEach(() => {
      getItemSpy.mockRestore();
      window.sessionStorage.clear();
    });
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Search for a word");
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    const savedWord = mockWord[0];
    getItemSpy.mockImplementation((key) => {
      if (key === "savedWords") {
        return JSON.stringify([savedWord]);
      }
      return null;
    })
    const save = await screen.findByRole("button", { name: "Save" });
    await userEvent.click(save);

    expect(getItemSpy).toHaveBeenCalledWith("savedWords");
    const storedValue = window.sessionStorage.getItem("savedWords");
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue!)).toEqual([savedWord]);
  });
});
