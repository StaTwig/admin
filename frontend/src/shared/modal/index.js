import React from "react";

import './style.scss';
import CloseIcon from '../../assets/icons/cross.svg';

const Modal = props => {
  return (
    <React.Fragment>
      <div className="modal-backdrop" />
      <div className="modal" tabIndex="-1" role="dialog">
        <div className={`modal-dialog ${props.size && props.size}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="close" onClick={() => props.close()}>
                <img src={CloseIcon} alt="Close" with="40" height="40"/>
              </button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};



export default Modal;

