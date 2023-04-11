import React, { memo } from "react"

interface SidebarProps {
  moves: number
  size: number
  handleShuffle: () => void
  handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SideBar: React.FC<SidebarProps> = ({
  moves,
  size,
  handleShuffle,
  handleSizeChange
}) => {
  return (
    <div className="puzzle-sidebar">
      <h1 className="text-4xl font-bold mt-14">Sliding Puzzle</h1>
      <p>Use the arrow keys to move the tiles or click on a tile to move it.</p>
      <p>Try to get the tiles in order.</p>
      <div className="puzzle-counter">
        <span className="puzzle-counter-label">Moves:</span>
        <span className="puzzle-counter-value">{moves}</span>
      </div>

      {/* Add an input field to change the grid size */}
      <label htmlFor="size-input">Grid size:</label>
      <input
        id="size-input"
        type="number"
        min="2"
        max="10"
        value={size}
        onChange={handleSizeChange}
      />

      <button
        className="puzzle-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleShuffle}
      >
        Shuffle
      </button>
    </div>
  )
}

export default memo(SideBar)
