//NPM Packages
import { useState } from "react";

// Project files
import ListItem from "./ListItem";
import SortButton from "./SortButton";

export default function List({
  shoppingItems,
  completeItem,
  isCompletedOnlyView,
}) {
  //State
  const [sorting, setSorting] = useState(null);

  //Derived
  let itemsToShow = isCompletedOnlyView
    ? shoppingItems?.filter((item) => item.completed)
    : shoppingItems?.filter((item) => !item.completed);

  if (sorting) {
    itemsToShow = [...itemsToShow].sort((a, b) => {
      const aValue = a[sorting],
        bValue = b[sorting];
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  }

  return (
    <section className="shopping-list">
      <h1>Shopping List</h1>
      <p className="sorting-buttons">
        Sort by:
        <SortButton name="Name" onClick={() => setSorting("name")} />
        <SortButton name="Price" onClick={() => setSorting("price")} />
      </p>
      <div className="list-content flex-column">
        {itemsToShow.length ? (
          itemsToShow.map((item) => (
            <ListItem item={item} key={item.id} completeItem={completeItem} />
          ))
        ) : (
          <p className="message">
            No items {isCompletedOnlyView ? "bought" : "to buy"}
          </p>
        )}
      </div>
    </section>
  );
}
