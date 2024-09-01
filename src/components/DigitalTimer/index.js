// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  timerLimitInMintes: 25,
  timeElapsedInSeconds: 0,
  isTimerStarted: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickMinusLimit = () => {
    const {timerLimitInMintes} = this.state
    if (timerLimitInMintes > 1) {
      this.setState(pervState => ({
        timerLimitInMintes: pervState.timerLimitInMintes - 1,
      }))
    }
  }

  onClickAddLimit = () => {
    this.setState(pervState => ({
      timerLimitInMintes: pervState.timerLimitInMintes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMintes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-container">
        <button
          className="minus-button"
          type="button"
          onClick={this.onClickMinusLimit}
          disabled={isButtonDisabled}
        >
          -
        </button>
        <div className="timer-set">
          <p className="time">{timerLimitInMintes}</p>
        </div>
        <button
          className="add-button"
          type="button"
          onClick={this.onClickAddLimit}
          disabled={isButtonDisabled}
        >
          +
        </button>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMintes, timeElapsedInSeconds} = this.state
    const isTimerCompeleted = timeElapsedInSeconds === timerLimitInMintes * 60

    if (isTimerCompeleted) {
      this.clearTimerInterval()
      this.setState({isTimerStarted: false})
    } else {
      this.setState(pervState => ({
        timeElapsedInSeconds: pervState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartorPauseTimer = () => {
    const {timerLimitInMintes, timeElapsedInSeconds, isTimerStarted} =
      this.state
    const isTimerCompeleted = timeElapsedInSeconds === timerLimitInMintes * 60
    if (isTimerCompeleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(pervState => ({isTimerStarted: !pervState.isTimerStarted}))
  }

  renderTimerController = () => {
    const {isTimerStarted} = this.state
    const playPausedImg = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPausedAlt = isTimerStarted ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-container">
        <button
          className="start-paused-button"
          type="button"
          onClick={this.onStartorPauseTimer}
        >
          <img
            src={playPausedImg}
            alt={playPausedAlt}
            className="start-pause-icon"
          />
          <p className="start-pause-text">
            {isTimerStarted ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="reset-button"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
            alt="reset icon"
            className="reset-icon"
          />
          <p className="reset-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMintes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMintes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    console.log(minutes)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    console.log(seconds)
    const strMinutes = minutes > 9 ? minutes : `0${minutes}`
    const strSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${strMinutes}:${strSeconds}`
  }

  render() {
    const {isTimerStarted} = this.state
    return (
      <div className="app-container">
        <div className="timer-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="responsive-container">
            <div className="timer-running-container">
              <div className="timer-card">
                <h2 className="timer">
                  {this.getElapsedSecondsInTimeFormat()}
                </h2>
                <p className="paused-running">
                  {isTimerStarted ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="startreset-timerset-container">
              {this.renderTimerController()}
              <p className="description">Set Timer limit</p>
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
