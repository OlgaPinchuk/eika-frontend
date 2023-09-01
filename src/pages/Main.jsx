//NPM Packages
import { useEffect, useState } from "react";

// Project files
import List from "../components/List";
import AddItem from "../components/AddItem";

import { BASE_URL, HEADERS, POST, PUT } from "../constants/constants";

export default function Main({ userId }) {
  // Constants
  const listEndpoint = `${BASE_URL}/shopping-list`;

  //State
  const [isCompletedOnlyView, setIsCompletedOnlyView] = useState(false);
  const [list, setList] = useState([]);

  // Effects
  useEffect(() => {
    fetch(`${listEndpoint}/${userId}`)
      .then((respose) => respose.json())
      .then((data) => setList(data))
      .catch((error) => console.log(error));
  }, [listEndpoint, userId]);

  //Methods
  function toggleCompletedView() {
    setIsCompletedOnlyView(!isCompletedOnlyView);
  }

  function completeItem(itemId) {
    const newItemIndex = list.findIndex((item) => item.id === itemId);

    if (newItemIndex !== -1) {
      const updatedItem = { ...list[newItemIndex], complete: true };

      fetch(`${listEndpoint}/${itemId}`, {
        method: PUT,
        headers: HEADERS,
        body: JSON.stringify(updatedItem),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update item");
          }
          return response.json();
        })
        .then((updatedItem) => {
          const newItems = [...list];
          newItems[newItemIndex] = updatedItem;
          setList(newItems);
        })
        .catch((error) => console.error("Error updating item: ", error));
    }
  }

  function addItem(item) {
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("price", item.price);
    formData.append("image", item.image);

    fetch(`${listEndpoint}/${userId}`, {
      method: POST,
      body: formData,
    })
      .then((response) => response.json())
      .then((newItem) => {
        setList([...list, newItem]);
      })
      .catch((error) => console.error("Error adding item: ", error));
  }

  return (
    <>
      <List
        shoppingItems={list}
        completeItem={completeItem}
        isCompletedOnlyView={isCompletedOnlyView}
      />

      <AddItem addItem={addItem} />

      <button
        className="text-button toggle-completed"
        onClick={toggleCompletedView}
      >
        {isCompletedOnlyView ? "Hide" : "View"} completed items
      </button>
    </>
  );
}
