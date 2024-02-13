import React, { useState, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CaptureMobileImage({ setCapturedImg }) {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const webRef = useRef();
  img && console.log(img);

  const handleCapture = e => {
    if (e.target.innerText === "Capture") {
      setImg(webRef.current.getScreenshot());
      e.target.innerText = "Retake";
    } else {
      img && setImg("");
      e.target.innerText = "Capture";
    }
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = () => {
    console.log("captured image submitting");
    if (img) {
      setCapturedImg(img);
      navigate("/generated-image");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };
  return (
    <CaptureMobileImageWrapper>
      {/* header */}
      <Header title={"Capture Your Image"} />
      <main>
        <div className="captureImage">
          <div className="webcamParent">
            <Webcam
              ref={webRef}
              id="webcam"
              forceScreenshotSourceSize={true}
              // screenshotFormat="image/png"
            />
            {img && (
              <img src={img} alt="captured image" className="capturedImage" />
            )}
          </div>
        </div>
      </main>
      <footer>
        <button onClick={e => handleCapture(e)} className="captureRetake">
          Capture
        </button>
        <button onClick={handleSubmit} className="submit">
          Submit
        </button>
      </footer>
      <ToastContainer />
    </CaptureMobileImageWrapper>
  );
}

const CaptureMobileImageWrapper = styled.div`
  /* border: 1px solid black; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8vw;
  /* justify-content: space-between; */
  header {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    gap: 3vw;
    .logo {
      margin: 0 auto;
      width: 20vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h1 {
      /* border: 1px solid black; */
      font-size: 6.5vw;
      text-align: center;
      font-weight: 600;
    }
  }

  main {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    margin-bottom: 0vw;
    .captureImage {
      background-color: #212121;
      width: 90%;
      /* height: 70vw; */
      border: 2vw solid #212121;
      border-bottom: 1.2vw solid #212121;
      border-radius: 3vw;
      .webcamParent {
        position: relative;
        /* height: 100%; */
        width: 100%;
        overflow: hidden;
        #webcam {
          border-radius: 1vw;
          margin: 0 auto;
          width: 100.3%;
          /* height: 100.3%; */
          /* object-fit: cover; */
        }
        .capturedImage {
          position: absolute;
          top: 0;
          left: 0;
          width: 100.3%;
          border-radius: 1vw;
          /* height: 99%; */
        }
      }
    }
  }
  footer {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    gap: 6vw;
    button {
      width: 42%;
      text-align: center;
      border: none;
      background-color: transparent;
      outline: none;
      padding: 2vw 0;
      font-size: 5vw;
      font-weight: 600;
      border-radius: 1vw;
      cursor: pointer;
      box-shadow: 0.3vw 0.3vw 0.8vw rgba(0, 0, 0, 0.5);
      transform: translateY(-0.4vw);
      transition: all ease 0.5s;
      &:hover {
        box-shadow: none;
        transform: translateY(0);
      }
    }
    .captureRetake {
      background-color: #ffbe2e;
      color: #212121;
    }
    .submit {
      border: 0.1vw solid black;
      background-color: transparent;
    }
  }
`;
