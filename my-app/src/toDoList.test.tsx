import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { decodedTextSpanIntersectsWith } from "typescript";

// Read toDoList
describe("Read toDoList", () => {
  test("Read all items that are created in the list", () => {
    render(<ToDoList />);

    const appleTitle = screen.getByText("Apples");
    const bananaTitle = screen.getByText("Bananas");
    expect(appleTitle).toBeInTheDocument();
    expect(bananaTitle).toBeInTheDocument();
  });
});

// Update toDoList
describe("Update toDoList", () => {
  test("Check if correct number of items is checked", () => {
    render(<ToDoList />);

    const allChecks = screen.getAllByTestId("checkbox") as HTMLInputElement[];
    allChecks.forEach((element) => {
      //   expect(element.checked).toEqual(false);
      fireEvent.click(element);
    });

    const boughtTitle = screen.getByText(`Items bought: 2`);
    expect(boughtTitle).toBeInTheDocument();
  });
});
