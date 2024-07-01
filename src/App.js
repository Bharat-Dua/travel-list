import { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "mobile", quantity: 1, packed: true },
// ];

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
    setDescription("");
    setQuantity(1);
    onAddItems(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Item name"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="">Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  // let sortedItems;
  // sort items using if statement
  // if (sortBy === "input") sortedItems = items;
  // if (sortBy === "description")
  //   sortedItems = items
  //     .slice()
  //     .sort((a, b) => a.description.localeCompare(b.description));
  // if (sortBy === "packed")
  //   sortedItems = items
  //     .slice()
  //     .sort((a, b) => Number(a.packed) - Number(b.packed));
  // OR
  // if(sortBy==="packed") sortedItems = items.filter(item=>item.packed)
  // sort items using switch case statement
  let sortedItems = (() => {
    switch (sortBy) {
      case "description":
        return [...items].sort((a, b) =>
          a.description.localeCompare(b.description)
        );
      case "packed":
        return [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
      case "input":
      default:
        return items;
    }
  })();

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input orders</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {items.length ? (
          <button onClick={onClearList}>Clear list</button>
        ) : null}
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything!Ready to go"
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((prevItems) => {
      return [...prevItems, item];
    });
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearItems() {
    if (!items.length) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
