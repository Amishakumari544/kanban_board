'use client'

import { useState } from "react";
import CreateItem from "./CreateItem";
import Item from "./Item";
import { FiEdit2,} from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function Column({ columnHeading, columnId, boardId, onDeleteCol, onEditCol,textColor }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnHeading);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }


  function handleUpdateItem(itemId, updatedItem) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    );
  }
  

  function handleDelete() {
    onDeleteCol(columnId);
  }

  function handleEditColumnName() {
    onEditCol(columnId, newColumnName);
    setEditing(false);
  }

  return (
    <div className="border rounded-2xl px-6 py-4">
              <CreateItem onAddItem={handleAddItem} />
      <div className="flex  justify-between items-center mb-2 p-1">
        {editing ? (
          <input
            className="input w-5/6"
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
        ) : (
          <h1 className={`text-xl font-semibold ${textColor}`}>
            {columnHeading}
          </h1>
        )}

        <div className="flex justify-between items-center gap-1 sm:gap-2">
          {editing ? (
            <button className="" onClick={handleEditColumnName}>Save</button>
            ) : (
              <FiEdit2 className="text-2xl cursor-pointer" onClick={() => setEditing(true)} />
              )}
          <MdDelete className="text-2xl cursor-pointer" onClick={handleDelete} />
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((el) => (
          <Item key={el.id} item={el} boardId={boardId} onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default Column;
