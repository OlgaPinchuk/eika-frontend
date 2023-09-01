//NPM Packages
import { useState } from "react";

// Project files
import Popup from "../components/Popup";
import AddItemForm from "../components/AddItemForm";

export default function AddItem({ addItem }) {
  //State
  const [isOpen, setIsOpen] = useState(false);

  //Methods
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="button button-primary open-popup-button"
        onClick={togglePopup}
      >
        Add item
      </button>

      {isOpen && (
        <Popup>
          <AddItemForm addItem={addItem} togglePopup={togglePopup} />
        </Popup>
      )}
    </>
  );
}
