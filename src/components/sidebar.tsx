import React, { memo } from "react"

interface SidebarProps {
  moves: number
  size: number
  handleShuffle: () => void
  handleSizeChange: React.ChangeEventHandler<HTMLInputElement>
}

const SideBar: React.FC<SidebarProps> = ({
  moves,
  size,
  handleShuffle,
  handleSizeChange
}) => {
  return (
    <div className="puzzle-sidebar flex flex-col text-left max-w-2/3 items-start justify-center p-8">
      <h1 className="text-4xl font-bold mt-14">Sliding Puzzle</h1>
      <p>Use the arrow keys to move the tiles or click on a tile to move it.</p>
      <p>Try to get the tiles in order.</p>
      <div className="puzzle-counter mt-2 font-bold text-lg">
        <span className="puzzle-counter-label font-normal">Move Counter: </span>
        <span className="puzzle-counter-value">{moves}</span>
      </div>

      {/* Add an input field to change the grid size */}
      <div className="puzzle-size font-bold text-lg flex items-center">
        <label className="font-normal whitespace-nowrap" htmlFor="size-input">
          Grid size: {"   "}
        </label>

        <input
          type="number"
          name="number"
          id="size-input"
          min="2"
          defaultValue={size}
          onChange={handleSizeChange}
          className="w-24 px-3 py-2 ml-1 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Change to a photo background */}
      {/* <div className="puzzle-size font-bold text-lg flex items-center">
        <button
          className="change-image max-w-[250px] mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={changeToImageBackground}
        >
          Try Image Background
        </button>
      </div> */}
      {/* Add a button to shuffle the tiles */}

      <button
        className="puzzle-button max-w-[150px] mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleShuffle}
      >
        Shuffle
      </button>
    </div>
  )
}

export default SideBar
