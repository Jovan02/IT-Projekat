import React from "react";
import "../styles/Contact.css";

const Contact = () => {
    return (
        <>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input
                        class="contact-input"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        class="contact-input"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>

                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea
                        class="contact-input"
                        id="message"
                        name="message"
                    ></textarea>
                </div>

                <button type="submit" class="contact-button">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Contact;
