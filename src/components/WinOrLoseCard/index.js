// Write your code here.
import './index.css'

const wonImgUrl = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
const loseImgUrl = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

const winOrLoseCard = props => {
  const {isWon, onClickPlayAgain, score} = props
  const imageUrl = isWon ? wonImgUrl : loseImgUrl
  const gameStatus = isWon ? 'You Won' : 'You Lose'
  const scoreLabel = isWon ? 'Best Score' : 'Score'

  return (
    <div className="win-or-lose-card">
      <div className="detail-section">
        <h1 className="game-status">{gameStatus}</h1>
        <p className="current-score-label">{scoreLabel}</p>
        <p className="current-score-value">{score}/12</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
      <div className="image-section">
        <img src={imageUrl} alt="" className="win-or-lose-img" />
      </div>
    </div>
  )
}

export default winOrLoseCard
