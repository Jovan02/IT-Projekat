import React from "react";
import "../styles/Modal.css";

const Modal = ({ title, message, isDelete, onExit, onClose }) => {
    return (
        <>
            <div className="modal">
                <button className="close-modal" onClick={onExit}>
                    &times;
                </button>
                <h2 id="modal-title">{title}</h2>
                <p id="modal-message">{message}</p>
                {isDelete && (
                    <div className="modal-buttons">
                        <button
                            className="modal-button modal-button--yes"
                            onClick={() => onClose(true)}
                        >
                            Yes
                        </button>
                        <button
                            className="modal-button modal-button--no"
                            onClick={() => onClose(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
            <div className="overlay" onClick={onExit}></div>
        </>
    );
};

export default Modal;
