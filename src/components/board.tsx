import React from "react"
import Tile from "./tile"

interface BoardProps {
  size: number
  puzzle: number[]
  onMove: (index: number) => void
}

const Board: React.FC<BoardProps> = ({ size, puzzle, onMove }) => {
  const rows = []

  for (let row = 0; row < size; row++) {
    const tiles = []

    for (let col = 0; col < size; col++) {
      const index = row * size + col
      const value = puzzle[index]

      tiles.push(
        <Tile key={index} value={value} onClick={() => onMove(index)} />
      )
    }

    rows.push(
      <div key={row} className="flex flex-row">
        {tiles}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md max-w-fit mx-auto rounded-2xl	">
      {rows}
    </div>
  )
}

export default Board
