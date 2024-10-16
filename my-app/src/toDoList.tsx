import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
  const { name } = useParams();
  const [numRemainingItems, setNumRemainingItems] = useState(0);

  let [items, setItems] = useState(dummyGroceryList);

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox: HTMLInputElement = e.target as HTMLInputElement;

    const itemName = checkbox.name;
    // Filter items to take out the old item, and replace it with the new item
    const newItem = { name: itemName, isPurchased: checkbox.checked };
    const newItems = items.filter((i) => i.name !== itemName);
    if (checkbox.checked) {
      // If checked, push to the end
      newItems.push(newItem);
    } else {
      // If unchecked, push to the beginning
      newItems.unshift(newItem);
    }
    setItems(newItems);

    const numChecked = newItems.filter((i) => i.isPurchased).length;
    setNumRemainingItems(numChecked);
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        <p>Items bought: {numRemainingItems}</p>
        <form action=".">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
  return (
    <div>
      <input
        type="checkbox"
        data-testid="checkbox"
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
      />
      {item.name}
    </div>
  );
}
