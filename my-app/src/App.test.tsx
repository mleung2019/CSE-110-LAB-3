import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("Renders Create Note", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const createNoteElement = screen.getByText(/Create Note/i);
  expect(createNoteElement).toBeInTheDocument();
});

test("Clicks on a Link component in the navigation bar", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const defLink = screen.getByText("DEF To Do List");
  fireEvent.click(defLink);

  const defTitle = screen.getByText("DEF's To Do List");
  expect(defTitle).toBeInTheDocument();
});
