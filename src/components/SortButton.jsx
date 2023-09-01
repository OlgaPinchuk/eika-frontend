export default function SortButton({ name, onClick }) {
  return (
    <button className="text-button sort-button" onClick={onClick}>
      {name}
    </button>
  );
}
