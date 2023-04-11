import React, { memo } from "react"

interface ModalProps {
  moves: number
  open: boolean
  handleShuffle: () => void
  setIsSolved: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({
  moves,
  open,
  handleShuffle,
  setIsSolved
}) => {
  return (
    <div
      id="popup-modal"
      className={`fixed top-0 left-0 right-0 z-50 items-start justify-center ${
        open ? "flex" : "hidden"
      } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative flex flex-col w-full h-full p-4 overflow-hidden bg-green-400 border-2 border-gray-300 rounded-lg shadow-xl">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col items-left justify-center">
              <h3 className="text-lg font-semibold">Congratulations!</h3>
              <p className="mb-5">You solved the puzzle in {moves} moves.</p>
              <button
                title="Try Again"
                className="puzzle-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[150px]"
                onClick={handleShuffle}
              >
                Try Again
              </button>
            </div>

            <button
              title="Close"
              className="p-1 text-gray-600 transition duration-150 ease-in-out rounded-full hover:text-gray-900 focus:outline-none focus:text-gray-900"
              onClick={() => {
                setIsSolved(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#000000"
                  d="M19.78 18.36l-7.07-7.07 7.07-7.07c.39-.39.39-1.03 0-1.42s-1.03-.39-1.42 0l-7.07 7.07-7.07-7.07c-.39-.39-1.03-.39-1.42 0s-.39 1.03 0 1.42l7.07 7.07-7.07 7.07c-.39.39-.39 1.03 0 1.42.19.19.44.29.71.29s.52-.1.71-.29l7.07-7.07 7.07 7.07c.19.19.44.29.71.29s.52-.1.71-.29c.39-.39.39-1.03 0-1.42z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
