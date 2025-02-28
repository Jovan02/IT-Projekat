import React from "react";
import "../styles/Contact.css";

const Contact = () => {
    return (
        <>
            <form className="contact-form">
                <div className="form-group">
                    <label for="name">Name:</label>
                    <input
                        className="contact-input"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label for="email">Email:</label>
                    <input
                        className="contact-input"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>

                <div className="form-group">
                    <label for="message">Message:</label>
                    <textarea
                        className="contact-input"
                        id="message"
                        name="message"
                    ></textarea>
                </div>

                <button type="submit" className="contact-button">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Contact;
