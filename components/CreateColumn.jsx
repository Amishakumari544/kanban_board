// Create Column
'use client'

import { useState } from "react";
import toast from "react-hot-toast";

function CreateColumn({ onAddCol, boardId, columnId }) {
  const [columnName, setColumnName] = useState();
  const [addBtn, setAddBtn] = useState(true);
 

  function handleSubmit(e) {
    e.preventDefault();

    if (!columnName) {
      toast.error("add name for the column")
      return;
    }
    const newColumn = {
      id: columnId || Date.now(),
      name: columnName,
      boardId,
    };

    onAddCol(newColumn);
    toast.success("added column")
    setColumnName("");

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
        <div className="drop-shadow-lg shadow-gray-500/20 h-auto  py-4 px-4 rounded-xl  ">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 h-full relative w-full"
          >
            <input
              className="input focus:w-80 "
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
                  hover:pointer active:translate-y-[1px] absolute right-0 top-[0%]
                  "
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateColumn;
