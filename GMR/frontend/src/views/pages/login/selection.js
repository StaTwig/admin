import { faUser, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import logo from '../../../assets/icons/GMRLogo.png'
import './style.scss'

const Selection = (props) => {
  const { setButtonActive, setContinueClick, buttonActive, setSteps } = props
  return (
    <div className="selectUserSection">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleHeading">Welcome</h2>
        <span className="titleSubHeading">Select Your Role</span>
      </div>
      <div>
        <button
          onClick={() => setButtonActive(1)}
          className={`cursorP selectionUserContainer mr-selectUser ${
            buttonActive == 1 ? 'btn-active' : ''
          }`}
        >
          <FontAwesomeIcon icon={faUserCog} size="3x" />
          <p className="pt-3 mb-0 text-dark"> Admin</p>
        </button>

        <button
          onClick={() => setButtonActive(2)}
          className={`cursorP selectionUserContainer ml-selectUser ${
            buttonActive == 2 ? 'btn-active' : ''
          }`}
        >
          {/* <img src={userIcon}  /> */}
          <FontAwesomeIcon icon={faUser} size="3x" />
          <p className="pt-3 mb-0 text-dark"> User</p>
        </button>
      </div>
      <div className="align-center pt-5">
        <button
          onClick={() => {
            if (buttonActive == 1 || buttonActive == 2) {
              setContinueClick(true)
              setSteps(2)
            }
          }}
          className={`btn ${buttonActive > 0 ? `btn-red` : ``}`}
          type="button"
        >
          Continue
        </button>
      </div>
      <div className="col text-center footer-logo">
        <img src={logo} width={150} />
      </div>
    </div>
  )
}

export default Selection
