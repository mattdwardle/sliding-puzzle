import React from "react"
import Tile from "./tile"

interface BoardProps {
  size: number
  puzzle: number[]
  onMove: (index: number) => void
}

const Board: React.FC<BoardProps> = ({ size, puzzle, onMove }) => {
  const tiles = []

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const index = row * size + col
      const value = puzzle[index]

      tiles.push(
        <Tile key={index} value={value} onClick={() => onMove(index)} />
      )
    }
  }

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      className={`p-4 bg-white shadow-md max-w-fit md:m-8 rounded-2xl auto-rows-fr grid`}
    >
      {tiles}
    </div>
  )
}

export default Board
