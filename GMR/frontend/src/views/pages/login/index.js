import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Selection from './selection'
import Login from './login'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Home = (props) => {
  const [buttonActive, setButtonActive] = useState(0)
  const [steps, setSteps] = useState(1)
  const [continueClick, setContinueClick] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onSendOtp = useCallback(async () => {
    props.history.push('/dashboard')
  })

  const goBackButton = () => {
    if (steps == 2) {
      setSteps(1)
      setButtonActive(0)
    }
  }

  return (
    <div className="home">
      <div className="container centered scroll-y">
        <div className="selectUser centered">
          {steps != 1 && (
            <button type="button" className="back-button" onClick={goBackButton}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
          )}
          {steps == 1 && (
            <Selection
              setContinueClick={setContinueClick}
              setButtonActive={setButtonActive}
              buttonActive={buttonActive}
              continueClick={continueClick}
              setSteps={setSteps}
            />
          )}
          {steps == 2 && (
            <Login
              msg={errorMessage}
              setSteps={setSteps}
              setContinueClick={setContinueClick}
              steps={steps}
              onSendOtp={onSendOtp}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
