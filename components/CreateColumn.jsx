import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function CreateColumn({ onAddCol, boardId, columnId }) {
  const [columnName, setColumnName] = useState("");
  const [addBtn, setAddBtn] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!columnName) {
      toast.error("Add a name for the column");
      return;
    }

    const newColumn = {
      id: columnId || Date.now(),
      name: columnName,
      boardId,
    };

    onAddCol(newColumn);
    toast.success("Column added");
    setColumnName("");
    closeForm();
  }

  function closeForm() {
    setAddBtn(true);
  }

  return (
    <>
      {addBtn ? (
        <button
          className="mr-4 text-sm whitespace-nowrap sm:text-md sm:text-lg bg-gray-900 px-6 py-3 rounded-full text-stone-200 ml-4"
          onClick={() => setAddBtn(!addBtn)}
        >
          New Column
        </button>
      ) : (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
          <div className="bg-white drop-shadow-lg h-auto w-full max-w-md p-6 mb-4 rounded-md">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                className="input focus:w-80"
                type="text"
                placeholder="Column name..."
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              />

              <button
                className="font-semibold  
                    bg-gray-900
                    px-5 py-2 rounded-full
                    text-stone-50
                    hover:pointer"
                type="submit"
              >
                Add
              </button>
            </form>
            <p
              className="cursor-pointer  top-4"
              onClick={closeForm}
            >
              ❌
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateColumn;
