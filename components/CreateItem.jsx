import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function CreateItem({ onAddItem }) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [dueDate, setDueDate] = useState(currentDate);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // New state for the selected image
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Auto-save when any of the input fields change
    const saveItem = () => {
      if (itemName!== "" && itemDesc !== "") {
        const newItem = {
          id: Date.now(),
          itemName,
          itemDesc,
          dueDate,
          subtasks,
          selectedImage, // Include the selected image in the newItem
        };
        onAddItem(newItem);
        toast.success("Auto-saved!");
        closeModal(); 
      }
    };

    const autoSaveTimeout = setTimeout(saveItem, 2000); // Auto-save every 2 seconds

    // Clean up the timeout on component unmount or when inputs change
    return () => clearTimeout(autoSaveTimeout);
  }, [itemName, itemDesc, dueDate, subtasks, selectedImage, onAddItem]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setItemName("");
    setItemDesc("");
    setDueDate(currentDate);
    setSubtasks([]);
    setSubtaskInput("");
    setSelectedImage(null); // Reset the selected image
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!itemName || !itemDesc) {
      toast.error("Item name and description are required.");
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName,
      itemDesc,
      dueDate,
      subtasks,
      selectedImage, // Include the selected image in the newItem
    };
    onAddItem(newItem);
    toast.success("Task added!");
    closeModal();
  }

  function handleAddSubtask() {
    if (subtaskInput.trim() !== "") {
      setSubtasks([...subtasks, { id: Date.now(), name: subtaskInput }]);
      setSubtaskInput("");
    }
  }

  function handleRemoveSubtask(subtaskId) {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setSelectedImage(file);
  }

  return (
    <>
      <button
        className="px-4 py-2 w-full mt-2 text-left focus:outline-none"
        onClick={openModal}
      >
        <span className="text-md px-4 py-2 bg-gray-900 text-white text-left rounded-full">Add Task </span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white drop-shadow-lg h-auto w-full max-w-md p-6 mb-4 rounded-md"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <h3 className="capitalize text-base font-semibold">Add Your Task</h3>
              <input
                className="input"
                type="text"
                placeholder="Item name..."
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <input
                type="text"
                className="input"
                placeholder="Item Desc..."
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
              />
              <input
                type="date"
                className="input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
                {subtasks.length > 0 && (
                  <ul className="list-disc pl-6">
                    {subtasks.map((subtask) => (
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

              {/* Image upload */}
              <div className="mt-4">
                <label className="text-sm">Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex justify-between cursor-pointer items-center p-1 mt-4">
                <p className="pointer text-blue-500" onClick={closeModal}>
                  Close
                </p>
                <button
                  className="font-semi-bold hover:pointer active:translate-y-[1px]"
                  type="submit"
                >
                 Add 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top" reverseOrder={false} />
    </>
  );
}

export default CreateItem;
