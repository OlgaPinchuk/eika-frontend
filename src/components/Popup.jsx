export default function Popup({ children }) {
  return (
    <section className="popup-container">
      <div className="popup-content">{children}</div>
    </section>
  );
}
