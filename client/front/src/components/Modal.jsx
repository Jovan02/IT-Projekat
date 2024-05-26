import React from "react";
import "../styles/Modal.css";

const Modal = ({ title, message, isDelete, onExit, onClose }) => {
    return (
        <>
            <div class="modal">
                <button class="close-modal" onClick={onExit}>
                    &times;
                </button>
                <h2 id="modal-title">{title}</h2>
                <p id="modal-message">{message}</p>
                {isDelete && (
                    <div class="modal-buttons">
                        <button
                            class="modal-button modal-button--yes"
                            onClick={() => onClose(true)}
                        >
                            Yes
                        </button>
                        <button
                            class="modal-button modal-button--no"
                            onClick={() => onClose(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
            <div class="overlay" onClick={onExit}></div>
        </>
    );
};

export default Modal;
