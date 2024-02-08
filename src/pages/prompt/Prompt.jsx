import React from "react";
import styles from "./prompt.module.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

export default function Prompt({ capturedImage }) {
  const showImgRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState();

  generatedImg && console.log("generated Image =>", generatedImg);

  capturedImage && console.log("captured Image =>", capturedImage);

  prompt && console.log("prompt =>", prompt);

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log("form submitted");

    if (prompt === "") {
      toast.error("Please enter a prompt to generate image", toastOptions);
    } else {
      showImgRef.current.style.display = "flex";
      setGeneratedImg("");
      axios
        .post("https://76ec-103-17-110-127.ngrok-free.app/img2img", {
          data: prompt,
          image: capturedImage.split(",")[1],
          // image: capturedImage,
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImg(`data:image/webp;base64,${response.data.result}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className={styles.Home}>
      <header className={styles.header}>
        <h1>Generate Your Image</h1>
      </header>
      <main className={styles.main}>
        <form className={styles.prompt} onSubmit={handleSubmit}>
          {/* <h2>Enter Your Prompt</h2> */}
          <input
            type="text"
            name="prompt"
            placeholder="Enter Prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>
        <div className={styles.generatedImgContainer} ref={showImgRef}>
          {generatedImg ? (
            <div className={styles.modal}>
              <div className={styles.image}>
                <img src={generatedImg} alt="generated image" />
              </div>
              <IoIosCloseCircle
                onClick={() => {
                  showImgRef.current.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className={styles.loading}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
