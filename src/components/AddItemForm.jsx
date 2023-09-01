// NPM Packages
import { useState } from "react";

export default function AddItemForm({ addItem, togglePopup }) {
  // State
  const [newItem, setNewItem] = useState({});

  //Derived state
  const validName = newItem.title && newItem.title.trim();
  const validPrice = newItem.price && newItem.price > 0;
  const isButtonDisabled = !(validName && validPrice);

  // Methods
  function updateShoppingItem(event) {
    const { id, value } = event.target;

    if (id === "image") {
      setNewItem({ ...newItem, [id]: event.target.files[0] });
    } else {
      setNewItem({ ...newItem, [id]: value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { title, price, image } = newItem;

    addItem({ title, price: +price, image });
    setNewItem({});
    togglePopup();
  }

  return (
    <form className="flex-column add-item-form" encType="multipart/form-data">
      <input
        type="text"
        id="title"
        className="form-input item-name"
        onChange={updateShoppingItem}
        placeholder="Enter name"
      />
      <input
        type="number"
        min="0"
        id="price"
        className="form-input item-price"
        onChange={updateShoppingItem}
        placeholder="Enter price"
      />
      <input
        type="file"
        id="image"
        className="form-control item-image"
        accept="image/jpeg"
        onChange={updateShoppingItem}
      />
      <div className="buttons">
        <input
          type="submit"
          className="button button-primary submit-btn"
          value="Submit"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        />
        <input
          type="reset"
          className="button button-cancel"
          value="Cancel"
          onClick={togglePopup}
        />
      </div>
    </form>
  );
}
