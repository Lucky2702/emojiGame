/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    isGameProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameProgress: true})
  }

  renderScoreCard = () => {
    const {emojiList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length === emojiList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore
    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setScore({topScore: newTopScore, isGameProgress: false})
  }

  clickEmoji = id => {
    const {emojiList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojiLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojiLength)
    } else {
      if (emojiList.length - 1 === clickedEmojiList.length) {
        this.finishGameAndSetTopScore(emojiList.length)
      }
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojiList} = this.props
    return emojiList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffleEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emoji-list-container">
        {shuffleEmojisList.map(emojiObject => (
          <EmojiCard
            emojiDetails={emojiObject}
            key={emojiObject.id}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojiList, topScore, isGameProgress} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameProgress={isGameProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameProgress ? this.renderEmojiList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
