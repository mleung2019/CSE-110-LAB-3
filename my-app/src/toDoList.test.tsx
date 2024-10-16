import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

// Read toDoList
describe("Read toDoList", () => {
  test("Reads all items that are created in the list", () => {
    render(<ToDoList />);

    const appleText = screen.getByText("Apples");
    const bananaText = screen.getByText("Bananas");
    expect(appleText).toBeInTheDocument();
    expect(bananaText).toBeInTheDocument();
  });
});

// Update toDoList
describe("Update toDoList", () => {
  test("Checks toDoList items", () => {
    render(<ToDoList />);

    const allChecks = screen.getAllByTestId("checkbox") as HTMLInputElement[];
    allChecks.forEach((element) => {
      fireEvent.click(element);
    });

    const boughtTitle = screen.getByText("Items bought: 2");
    expect(boughtTitle).toBeInTheDocument();
  });

  test("Unchecks toDoList items", () => {
    render(<ToDoList />);

    const allChecks = screen.getAllByTestId("checkbox") as HTMLInputElement[];
    allChecks.forEach((element) => {
      fireEvent.click(element);
    });

    fireEvent.click(allChecks[1]);

    const boughtTitle = screen.getByText("Items bought: 1");
    expect(boughtTitle).toBeInTheDocument();
  });
});
