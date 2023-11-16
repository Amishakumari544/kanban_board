'use client'

import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { deleteBoard } from "@/Slice/boardSlice";
import { useState } from "react";

function Board({ board }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(board.name);
  const [editedDesc, setEditedDesc] = useState(board.desc);

  const handleEditBoard = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(board.name);
    setEditedDesc(board.desc);
  };

  const handleSaveEdit = () => {
    
    dispatch(updateBoard({ id: board.id, name: editedName, desc: editedDesc }));
    setIsEditing(false);
  };

  return (
   
    <div className="bg-slate-50 drop-shadow-lg shadow-gray-500/20 h-auto w-full py-3 px-4 rounded-xl">
      <h2 className="text-xl font-semibold">{board.name}</h2>
      <p className="text-md text-stone-500 mb-6">{board.desc}</p>
      
        <div className="flex justify-between items-center">
        
        <MdDelete onClick={() => {
          dispatch(deleteBoard(board.id));
          router.push('/'); 
        }} />
         <MdEdit onClick={handleEditBoard} />
        </div>
     
    </div>
  );
}

export default Board;


