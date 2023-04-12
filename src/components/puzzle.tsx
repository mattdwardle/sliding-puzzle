import { useCallback, useEffect, useState } from "react"
import Board from "./board"
import Modal from "./modal"
import SideBar from "./sidebar"

interface PuzzleProps {
  intialSize: number
}

const Puzzle: React.FC<PuzzleProps> = ({ intialSize }) => {
  const [puzzle, setPuzzle] = useState(generatePuzzle(intialSize))
  const [moves, setMoves] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [size, setSize] = useState(intialSize)

  // Generate a new puzzle
  function generatePuzzle(size: number): number[] {
    // Create an array with numbers from 1 to size * size - 1
    const numbers = Array.from({ length: size * size - 1 }, (_, i) => i + 1)
    // Add 0 or the empty tile
    numbers.push(0)

    // Shuffle the array
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const i = row * size + col
        const j = Math.floor(Math.random() * (i + 1))
        const temp = numbers[i]
        numbers[i] = numbers[j]
        numbers[j] = temp
      }
    }

    return numbers
  }

  // Handle the move of a tile
  function handleMove(index: number) {
    const emptyIndex = puzzle.indexOf(0)
    const row = Math.floor(emptyIndex / size)
    const col = emptyIndex % size

    // Check if the tile is next to the empty tile
    if (
      (index === emptyIndex - size && row > 0) ||
      (index === emptyIndex + size && row < size - 1) ||
      (index === emptyIndex - 1 && col > 0) ||
      (index === emptyIndex + 1 && col < size - 1)
    ) {
      // Create a new puzzle array with the new move
      const newPuzzle = [...puzzle]
      newPuzzle[emptyIndex] = newPuzzle[index]
      newPuzzle[index] = 0
      setPuzzle(newPuzzle)
      setMoves(moves + 1)
    }
  }

  // Handle the change of the size input field
  const handleSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Get the new size value from the input field
      const newSize = parseInt(event.target.value)
      // Check if the new size is greater than 2 and less than 10
      // any bigger and the puzzle becomes too hard
      if (newSize >= 2) {
        // Update the state with the new size and puzzle
        setSize(newSize)
        setPuzzle(generatePuzzle(newSize))
        setMoves(0)
        setIsSolved(false)
      }
    },
    []
  )

  // Handle the shuffle button
  const handleShuffle = useCallback(() => {
    setMoves(0)
    setIsSolved(false)
    setPuzzle(generatePuzzle(size))
  }, [size])

  // Check if the puzzle is complete
  function isPuzzleComplete(puzzle: number[]): boolean {
    // Loop through the puzzle array and check if each tile is in the correct position
    for (let i = 0; i < puzzle.length - 1; i++) {
      if (puzzle[i] !== i + 1) {
        return false
      }
    }
    // Check if the last tile is 0
    if (puzzle[puzzle.length - 1] !== 0) {
      return false
    }
    return true
  }

  useEffect(() => {
    // Define a function to handle key down events
    function handleKeyDown(event: KeyboardEvent) {
      // Define an array of arrow key strings
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

      // Get the index of the empty space in the puzzle array
      const index = puzzle.indexOf(0)

      if (arrowKeys.includes(event.key)) {
        event.preventDefault()

        // Depending on the arrow key pressed, call the handleMove function to move a puzzle piece
        switch (event.key) {
          case "ArrowUp":
            if (index < size * (size - 1)) handleMove(index + size)
            break
          case "ArrowDown":
            if (index >= size) handleMove(index - size)
            break
          case "ArrowLeft":
            if (index % size < size - 1) handleMove(index + 1)
            break
          case "ArrowRight":
            if (index % size > 0) handleMove(index - 1)

            break
        }
      }
    }

    // Add the event listener to the window when the component mounts
    window.addEventListener("keydown", handleKeyDown)

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [puzzle, size])

  useEffect(() => {
    // Check if the puzzle is solved when the puzzle state changes
    isPuzzleComplete(puzzle) && setIsSolved(true)
  }, [puzzle])

  return (
    <>
      <div className="puzzle flex flex-row items-center justify-center flex-wrap">
        <SideBar
          moves={moves}
          size={size}
          handleSizeChange={handleSizeChange}
          handleShuffle={handleShuffle}
        />
        <Board size={size} puzzle={puzzle} onMove={handleMove} />
      </div>
      <Modal
        open={isSolved}
        moves={moves}
        handleShuffle={handleShuffle}
        setIsSolved={setIsSolved}
      />
    </>
  )
}

export default Puzzle
