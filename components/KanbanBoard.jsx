'use client'

import Link from "next/link";
import CreateBoard from "./CreateBoard";
import Board from "./Board";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../Slice/boardSlice";

function KanbanBoard() {
  const boards = useSelector(state => state.board.board);

  const dispatch = useDispatch();
  useEffect(() => {
    if (boards.length === 0) {
      const defaultBoard = {
        id: 1,
        name: "🏝️ My Journey",
        desc: 'All about my life! ',
      };
      dispatch(addBoard(defaultBoard));
    }
  }, [boards, dispatch]);
 

  return (
    <>
        <CreateBoard />
      <div className="relative h-[82%] sm:h-[94%]">
        <ul className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {boards.map((board) => (
            <Link key={board.id} href={`/${board.id}`}>
              <Board className="min-w-[250px] max-w-full" board={board} 
              key={board.id} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default KanbanBoard;
