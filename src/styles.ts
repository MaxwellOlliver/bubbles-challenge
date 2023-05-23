import styled from 'styled-components'

export const BubblesContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #1c1a1c;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  overflow: hidden;

  .bubbles-container__title {
    color: #fff;
    font-size: 2.5rem;
    cursor: default;
    user-select: none;
  }

  .bubbles-container__user-action {
    display: flex;
    gap: 1rem;
    z-index: 999;

    .user-action__undo,
    .user-action__redo {
      padding: 1rem;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      transition: 0.3s background-color linear, 0.3s box-shadow linear;

      &:hover:not(:disabled) {
        background-color: ${props => props.theme.primary};
        box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }

  .bubbles-container__bubble {
    width: 50px;
    height: 50px;
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
    position: absolute;
    z-index: 998;
    animation: summonBubble 0.4s linear,
      bubbleScale 3s 0.6s linear infinite forwards;
    box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
    filter: brightness(0.7);
  }
  .bubbles-container__bubble.reverse-summon-animation {
    animation: summonBubbleReverse 0.4s linear forwards;
  }

  @keyframes bubbleScale {
    0% {
      transform: scale(1);
      box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
      filter: brightness(0.7);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0px 0px 20px 3px ${props => props.theme.primary};
      filter: brightness(1);
    }
    100% {
      transform: scale(1);
      box-shadow: 0px 0px 10px 0px ${props => props.theme.primary};
      filter: brightness(0.7);
    }
  }

  @keyframes summonBubble {
    0% {
      transform: scale(0);
    }
    40% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes summonBubbleReverse {
    0% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(0);
    }
  }
`
