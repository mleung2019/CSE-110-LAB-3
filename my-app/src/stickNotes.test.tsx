import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { decodedTextSpanIntersectsWith } from "typescript";

// Create StickyNote
describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

// Read StickyNote
describe("Read StickyNote", () => {
  test("Read all notes that are created", () => {
    render(<StickyNotes />);

    const noteTitles = screen.getAllByText("title", { exact: false });
    expect(noteTitles.length).toBe(6);
  });
});

// Update StickyNote
describe("Update StickyNote", () => {
  test("Once updated the document object value updates", () => {
    render(<StickyNotes />);

    const noteTitle = screen.getByText("test note 1 title");
    fireEvent.change(noteTitle, { target: { textContent: "changed note 1 title" } });
    const newNoteTitle = screen.getByText("changed note 1 title");
    expect(newNoteTitle).toBeInTheDocument();
  });
});

// Delete StickyNote
describe("Delete StickyNote", () => {
    test("Deletes a note", () => {
        render(<StickyNotes />);

        const deletedNoteTitle = screen.getByText("test note 1 title");
        const deleteNoteButton = screen.getAllByText("x");
        // Note: Choose first note's delete button
        fireEvent.click(deleteNoteButton[0]);
        expect(deletedNoteTitle).not.toBeInTheDocument();
    })

    // test("Delete all notes", () => {
    //     render(<StickyNotes />);
    // })
})

