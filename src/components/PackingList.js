import { useState } from "react";
import Item from "./Item";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "mobile", quantity: 1, packed: true },
// ];
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
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
