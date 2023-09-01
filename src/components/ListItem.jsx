// Project files
import Checkbox from "./Checkbox";

export default function ListItem({ item, completeItem }) {
  const { id, completed, title, price } = item;
  const priceFormat = Number.isInteger(price) ? `${price}:-` : price;

  return (
    <div className="list-item" onClick={() => completeItem(id)}>
      <Checkbox
        name="select-completed"
        className="done-checkbox"
        disabled={completed}
        initialIsChecked={completed}
      />

      <p className="item-name">{title}</p>
      <p className="item-price">{priceFormat}</p>
    </div>
  );
}
