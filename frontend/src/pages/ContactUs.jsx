import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Form.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9gvsl1o", "template_a7mqhub", form.current, {
        publicKey: "G0HuZg0zI_KDSU2v5",
      })
      .then(
        () => {
          toast.success("Email sent successfully!");
          console.log("SUCCESS!");
          e.target.reset();
        },
        (error) => {
          toast.error("Failed to send E-mail");
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="e-form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label for="exampleFormControlInput1" class="form-label mt-2">
          Name
        </label>
        <input
          type="text"
          name="user_name"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="John Doe"
        />
        <label for="exampleFormControlInput1" class="form-label mt-2">
          E-mail
        </label>
        <input
          type="email"
          name="user_email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="John@email.com"
        />
        <label for="exampleFormControlInput1" class="form-label mt-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Regarding the ...... campaign"
        />
        <label for="exampleFormControlTextarea1" class="form-label mt-2">
          Message
        </label>
        <textarea
          name="message"
          class="form-control mb-3"
          id="exampleFormControlTextarea1"
          rows="3"
        />
        <div className="text-center">
          <input type="submit" value="Send" className="form-button w-40" />
        </div>
        <hr />
        <div className="icons d-flex justify-content-between align-items-center w-100">
          <p className="mb-0 fw-bold">Other ways to contact us:</p>
          <div className="social d-flex align-items-center justify-content-between  gap-3">
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              color="#1877F2"
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              size="lg"
              color="#1877F2"
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
