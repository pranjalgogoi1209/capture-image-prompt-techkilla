import React, { useState } from "react";
import styles from "./homePage.module.css";
import { FaUser, FaIndustry, FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./../../components/header/Header";
import { useNavigate } from "react-router-dom";

const EMPTY_CONTACT = {
  name: "",
  email: "",
  company: "",
  phone: "",
};

export default function HomePage() {
  const navigate = useNavigate();
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [isLoad, setIsLoad] = useState(false);

  const onInputChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // post request to send email api
  const send = async contact => {
    try {
      let response = await axios.post(
        "https://adp24companyday.com/prompt_app/api.php",
        contact
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // form submission
  const submitForm = async e => {
    e.preventDefault();
    console.log("submitting the form", contact);
    setIsLoad(true);
    if (contact.name && contact.email && contact.company && contact.phone) {
      console.log("move on");

      const isSend = await send({ ...contact });
      if (isSend) {
        setIsLoad(false);
        toast.success(
          "The submission of details has been completed successfully",
          toastOptions
        );
        setContact(EMPTY_CONTACT);
        console.log("post request successfull");
        setTimeout(() => {
          navigate("/capture-image");
        }, 3200);
      } else {
        console.log("catching error");
      }
    } else {
      setIsLoad(false);
      toast.error("Please fill all the required fields", toastOptions);
    }
  };

  return (
    <div className={styles.HomePage}>
      {/* pre-loader */}
      {isLoad && (
        <div className={styles.preLoader}>
          <div className={styles.loading}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {/* header */}
      <Header title={"Enter Your Details"} />

      {/* form */}
      <form>
        <main>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Your Name *"
              required
              name="name"
              value={contact.name}
              onChange={onInputChange}
            />
            <FaUser />
          </div>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Your Email *"
              required
              name="email"
              value={contact.email}
              onChange={onInputChange}
            />

            <IoMail />
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Company Name *"
              required
              name="company"
              value={contact.company}
              onChange={onInputChange}
            />
            <FaIndustry />
          </div>
          <div className={styles.inputBox}>
            <input
              type="number"
              placeholder="Your Phone *"
              required
              name="phone"
              value={contact.phone}
              onChange={onInputChange}
            />
            <FaPhoneAlt />
          </div>
        </main>
        <footer>
          <button type="submit" onClick={e => submitForm(e)}>
            Submit
          </button>
        </footer>
      </form>
      <ToastContainer />
    </div>
  );
}
