import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

function Item({ item, onDeleteItem, onUpdateItem }) {
  const [editing, setEditing] = useState(false);
  const [editedItemName, setEditedItemName] = useState(item.itemName);
  const [editedItemDesc, setEditedItemDesc] = useState(item.itemDesc);
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate);
  const [editedSubtasks, setEditedSubtasks] = useState(item.subtasks || []);
  const [subtaskInput, setSubtaskInput] = useState("");

  const handleUpdateItem = () => {
    onUpdateItem(item.id, {
      itemName: editedItemName,
      itemDesc: editedItemDesc,
      dueDate: editedDueDate,
      subtasks: editedSubtasks,
    });
    setEditing(false);
    toast.success("Task updated successfully!");
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim() !== "") {
      setEditedSubtasks([...editedSubtasks, { id: Date.now(), name: subtaskInput }]);
      setSubtaskInput("");
    }
  };

  const handleRemoveSubtask = (subtaskId) => {
    setEditedSubtasks(editedSubtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  return (
    <div className="border-l-4 border-t-2 border-t-gray-700 border-gray-600 bg-slate-50 drop-shadow-lg  shadow-gray-500/20 h-auto w-full py-3 px-4 rounded-xl  mb-2 ">
      {editing ? (
        <form className="flex flex-col gap-2" onSubmit={handleUpdateItem}>
          <input
            type="text"
            className="input bg-gray-100 focus:ring-gray-200 "
            value={editedItemName}
            onChange={(e) => setEditedItemName(e.target.value)}
          />
          <textarea
            className="input bg-gray-100 focus:ring-gray-200"
            value={editedItemDesc}
            onChange={(e) => setEditedItemDesc(e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />

          {/* Subtasks */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-sm">Subtasks:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="input"
                placeholder="Add subtask..."
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="bg-gray-900 text-white px-2 py-1 rounded"
              >
                Add
              </button>
            </div>
            {editedSubtasks.length > 0 && (
              <ul className="list-disc pl-6">
                {editedSubtasks.map((subtask) => (
                  <li key={subtask.id} className="flex items-center">
                    <span>{subtask.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(subtask.id)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between cursor-pointer items-center p-1 sm:p-2">
            <p
              className="font-bold text-md text-gray-950 cursor-pointer"
              onClick={() => setEditing(false)}
            >
              Cancel
            </p>
            <button className="font-bold text-md text-gray-950" type="submit">
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-lg text-gray-800 capitalize">{item.itemName}</h2>
          <p className="text-md text-stone-500 mb-6">{item.itemDesc}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-stone-400">{item.dueDate}</p>
            {item.subtasks && item.subtasks.length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-green-900 font-semibold">Subtasks:</label>
                <ul className="list-disc pl-6 ">
                  {item.subtasks.map((subtask) => (
                    <li key={subtask.id}>{subtask.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-1 cursor-pointer">
              <FiEdit2 onClick={() => setEditing(true)} />
              <MdDelete onClick={() => onDeleteItem(item.id)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Item;
