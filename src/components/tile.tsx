import React, { memo } from "react"

interface TileProps {
  value: number
  onClick: () => void
}

const Tile: React.FC<TileProps> = ({ value, onClick }) => {
  return (
    <div
      className={`tile w-[150px] max-w-[150px] max-h-[150px] h-[150px] flex items-center justify-center p-12 text-4xl font-bold cursor-pointer ${
        value === 0
          ? "bg-white text-gray-400"
          : value % 2 === 0
          ? "bg-red-400 text-black-600 hover:bg-red-500 border-solid border border-red-500 rounded-md transition-colors duration-200"
          : "bg-gray-400 text-gray-800 hover:bg-gray-500 border-solid border border-gray-500 rounded-md transition-colors duration-200"
      }`}
      onClick={onClick}
    >
      {value !== 0 ? value : ""}
    </div>
  )
}

export default memo(Tile)
