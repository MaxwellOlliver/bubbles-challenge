import { MouseEvent, useEffect, useState, useCallback } from 'react'
import { BubblesContainer } from './styles'
import { BiUndo, BiRedo } from 'react-icons/bi'
import { v4 as uuid } from 'uuid'

interface Bubble {
  id: string
  y: number
  x: number
}

interface Action {
  reference: Bubble
}

interface UserActionQueue {
  undo: Action[]
  redo: Action[]
}

function Bubbles(): JSX.Element {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [userActionQueue, setUserActionQueue] = useState<UserActionQueue>({
    undo: [],
    redo: [],
  })
  const [animationOcurring, setAnimationOcurring] = useState(false)

  const canUndo = !!userActionQueue.undo[0]
  const canRedo = !!userActionQueue.redo[0] && !animationOcurring

  function handleAddBubble(e: MouseEvent): void {
    const bubble = {
      id: uuid(),
      y: e.clientY - 25,
      x: e.clientX - 25,
    }

    setBubbles(state => [...state, bubble])
    setUserActionQueue(state => ({
      redo: [],
      undo: [{ reference: bubble }, ...state.undo],
    }))
  }

  function handleUndoUserAction(e: MouseEvent): void {
    e.stopPropagation()
    const targetAction = userActionQueue.undo[0]

    if (!targetAction) return

    setUserActionQueue(state => ({
      redo: [targetAction, ...state.redo],
      undo: state.undo.slice(1),
    }))
    handleBurstBubble(targetAction.reference)
  }

  function handleRedoUserAction(e: MouseEvent): void {
    e.stopPropagation()
    const targetAction = userActionQueue.redo[0]

    if (!targetAction) return

    setBubbles(state => [...state, targetAction.reference])
    setUserActionQueue(state => ({
      redo: state.redo.slice(1),
      undo: [{ reference: targetAction.reference }, ...state.undo],
    }))
  }

  function handleBurstBubble(target: Bubble, removeFromRedo?: boolean) {
    const bubbleEl = document.querySelector(`[data-bubble-id="${target.id}"]`)
    setAnimationOcurring(true)

    if (bubbleEl) {
      bubbleEl.classList.add('reverse-summon-animation')

      setTimeout(() => {
        setBubbles(state => state.filter(bubble => target.id !== bubble.id))
        removeFromRedo &&
          setUserActionQueue(state => ({
            redo: state.redo,
            undo: state.undo.filter(
              action => action.reference.id !== target.id
            ),
          }))
        setAnimationOcurring(false)
      }, 600)
    }
  }
  const handleResize = useCallback(() => {
    bubbles.forEach(bubble => {
      if (
        bubble.x + 55 > window.innerWidth ||
        bubble.y + 55 > window.innerHeight
      ) {
        handleBurstBubble(bubble, true)
      }
    })
  }, [bubbles])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <BubblesContainer onClick={handleAddBubble}>
      <h1 className="bubbles-container__title">Click to summon a bubble</h1>
      <div className="bubbles-container__user-action">
        <button
          className="user-action__undo"
          onClick={handleUndoUserAction}
          disabled={!canUndo}
        >
          <BiUndo size={32} />
          undo
        </button>
        <button
          className="user-action__redo"
          onClick={handleRedoUserAction}
          disabled={!canRedo}
        >
          <BiRedo size={32} />
          redo
        </button>
      </div>
      {bubbles.map(bubble => (
        <div
          className="bubbles-container__bubble"
          key={bubble.id}
          data-bubble-id={bubble.id}
          style={{
            top: bubble.y,
            left: bubble.x,
          }}
        />
      ))}
    </BubblesContainer>
  )
}

export default Bubbles
