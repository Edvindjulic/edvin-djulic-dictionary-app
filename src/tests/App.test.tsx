import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test("should render App", () => {
  render(<App />);
  expect(screen.getByText("Hejsan")).toBeInTheDocument();
});
