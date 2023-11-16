"use client";

import { addBoard } from "@/Slice/boardSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateBoard() {
  const [boardName, setBoardName] = useState("");
  const [boardDesc, setBoardDesc] = useState("");
  const [addBtn, setAddBtn] = useState(true);

  const boards = useSelector((state) => state.board.board);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!boardName || !boardDesc) return;

    const newBoard = {
      id: Date.now(),
      name: boardName,
      desc: boardDesc,
    };

    dispatch(addBoard(newBoard));

    console.log(boards);

    setBoardName("");
    setBoardDesc("");

    setAddBtn(true);
  }

  return (
    <>
      {addBtn ? (
        <button
          className="ml-4 bg-gray-900 px-4 py-2 w-12rem rounded-full text-white focus:outline-none mb-4"
          onClick={() => setAddBtn(!addBtn)}
        >
           New Project <span className="text-xl"> +</span>
        </button>
      ) : (
        <div className="border-2  border-cyan-800 bg-gradient-to-br bg-gray-100 drop-shadow-lg shadow-lg h-auto w-[90%] py-4 px-4 rounded-xl  mb-4  sm:w-4/6 md:2/6 lg:1/3 fixed bottom-20 right-[15%] z-50">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 relative h-full"
          >
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
                <p
                  className="cursor-pointer "
                  onClick={() => setAddBtn(!addBtn)}
                >
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
      )}
    </>
  );
}

export default CreateBoard;
