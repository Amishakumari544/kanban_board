'use client'

//[id].js
import KanbanColumn from "@/components/Column";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";
import CreateItem from "@/components/CreateItem"; 
import CreateColumn from "@/components/CreateColumn";
import Column from "@/components/Column";
import { useEffect, useState } from "react";

function KanbanBoardDetails() {
  const [columns , setColumns] = useState([]);

  
  const boards = useSelector((state) => state.board.board);
  const router = useRouter();
  const { id } = router.query;

  const board = boards.find((board) => board.id.toString() === id);

  function handleAddColumn(newCol) {
    setColumns([...columns, newCol]);
  }

  function handleDeleteColumn(columnId) {
    setColumns((prevColumns) => prevColumns.filter((column) => column.id !== columnId));


  }

  function handleEditColumnName(columnId, newColumnName) {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, name: newColumnName } : column
      )
    );
  }

  useEffect(() => {
    if (columns.length === 0) {
      const defaultColumns = [
        { id: 1, name: "▶ ️To do ✏️", boardId: id },
        { id: 2, name: "▶ ️In Progress ⌛", boardId: id },
        { id: 3, name: "▶ ️Completed 🤗", boardId: id },
      ];
      setColumns(defaultColumns);
    }
  }, [columns, id]);
  

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <div className="">
      <Link  className="flex justify-start items-center mb-4 gap-2 mt-2" href="/">
      <HiArrowSmallLeft  className="text-2xl mt-1 ml-2"/> <span>Back</span>
      </Link>
      <div className="bg-stone-50 rounded-xl min-h-screen  px-5 pt-4 sm:p-8 ">
     
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-8">
            <div className="flex flex-col  sm:gap-1 justify-start items-start">
              <h1 className="text-2xl sm:text-3xl text-stone-950 ml-4 font-semibold">
                {board && board.name}
              </h1>
              <p className="ml-4">{board && board.desc}</p>
            </div>

            <CreateColumn onAddCol={handleAddColumn} />
          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
           
            {columns && columns.map((column) => (
              <Column
                columnHeading={column.name}
                key={column.id}
                columnId={column.id}
                boardId ={id}
                onDeleteCol={handleDeleteColumn}
                onEditCol={handleEditColumnName}
                textColor={
                  column.name === "👩🏻‍💻  To do"
                    ? "text-black"
                    : column.name === "🚀  In Progress"
                    ? "text-yellow-500"
                    : column.name === "🥳  Completed"
                    ? "text-green-500"
                    : "text-black" // Default color if none of the above conditions match
                }
              />
            ))}
          </div>
        
      </div>
    </div>
  );
}

export default KanbanBoardDetails;
