import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

// Create StickyNote
describe("Create StickyNote", () => {
  test("Renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("Creates a new note", () => {
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
  test("Reads all notes that are created", () => {
    render(<StickyNotes />);

    const noteTitles = screen.getAllByText("title", { exact: false });
    expect(noteTitles.length).toBe(6);
  });
});

// Update StickyNote
describe("Update StickyNote", () => {
  test("Updates a note, causing the document object value to update", () => {
    render(<StickyNotes />);

    const noteTitle = screen.getByText("test note 1 title");
    fireEvent.change(noteTitle, {
      target: { textContent: "changed note 1 title" },
    });
    const newNoteTitle = screen.getByText("changed note 1 title");
    expect(newNoteTitle).toBeInTheDocument();
  });

  test("Likes a note", () => {
    render(<StickyNotes />);

    const likeNoteButtons = screen.getAllByText("♡");
    // Note: Choose first note's like button
    fireEvent.click(likeNoteButtons[0]);
    const twoFirstNoteTitles = screen.getAllByText("test note 1 title");
    expect(twoFirstNoteTitles.length).toBe(2);
  });

  test("Unlikes a note", () => {
    render(<StickyNotes />);

    const twoFirstNoteTitles = screen.getAllByText("test note 1 title");
    expect(twoFirstNoteTitles.length).toBe(2);

    const unlikeNoteButton = screen.getByText("❤️");
    fireEvent.click(unlikeNoteButton);
    const oneFirstNoteTitle = screen.getAllByText("test note 1 title");
    expect(oneFirstNoteTitle.length).toBe(1);
  });
});

// Delete StickyNote
describe("Delete StickyNote", () => {
  test("Deletes a note", () => {
    render(<StickyNotes />);

    const deletedNoteTitle = screen.getByText("test note 1 title");
    const deleteNoteButtons = screen.getAllByText("x");
    // Note: Choose first note's delete button
    fireEvent.click(deleteNoteButtons[0]);
    expect(deletedNoteTitle).not.toBeInTheDocument();
  });

  test("Deletes a liked note", () => {
    render(<StickyNotes />);

    const likeNoteButtons = screen.getAllByText("♡");
    // Note: Choose first note's like button
    fireEvent.click(likeNoteButtons[0]);
    const deletedNoteTitles = screen.getAllByText("test note 1 title");
    expect(deletedNoteTitles.length).toBe(2);

    const deleteNoteButtons = screen.getAllByText("x");
    // Note: Choose first note's delete button
    fireEvent.click(deleteNoteButtons[0]);
    deletedNoteTitles.forEach((element) => {
      expect(element).not.toBeInTheDocument();
    });
  });

  test("Deletes all notes", () => {
    render(<StickyNotes />);

    const noteTitles = screen.getAllByText("title", { exact: false });
    const deleteNoteButtons = screen.getAllByText("x");
    deleteNoteButtons.forEach((element) => {
      fireEvent.click(element);
    });

    noteTitles.forEach((element) => {
      expect(element).not.toBeInTheDocument();
    });
  });
});
