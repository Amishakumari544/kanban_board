import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../Slice/boardSlice";

function Modal({ onClose, onSubmit }) {
  const [boardName, setBoardName] = useState("");
  const [boardDesc, setBoardDesc] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!boardName || !boardDesc) {
      toast.error("please add the required details!")
      return
    };
    onSubmit({ name: boardName, desc: boardDesc });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
      <div className="bg-white drop-shadow-lg h-auto w-full max-w-md p-6 mb-4 rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h3 className="capitalize text-base font-semibold">Add Your Project</h3>
          <input
            className="input w-3/4 rounded-sm"
            type="text"
            placeholder="Project name..."
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <input
            type="text"
            className="input w-4/4"
            placeholder="Project Desc..."
            value={boardDesc}
            onChange={(e) => setBoardDesc(e.target.value)}
          />
          <ul className="flex justify-between items-center p-1 mb-4">
            <li>
              <p className="cursor-pointer " onClick={onClose}>
                ❌
              </p>
            </li>
            <li>
              <button
                className="font-semi-bold hover:pointer active:translate-y-[1px] border-gray-900 border-2 rounded-md px-2 py-2"
                type="submit"
              >
                Add Project
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

function CreateBoard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddBoard = (board) => {
    dispatch(addBoard({ ...board, id: Date.now() }));
  };

  return (
    <>
      <button
        className="ml-4 bg-gray-900 px-4 py-2 w-12rem rounded-full text-white focus:outline-none mb-4"
        onClick={() => setModalOpen(true)}
      >
        New Project <span className="text-xl"> +</span>
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)} onSubmit={handleAddBoard} />
      )}
    </>
  );
}

export default CreateBoard;
