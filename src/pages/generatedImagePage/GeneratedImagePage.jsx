import React, { useState, useEffect, useRef } from "react";
import styles from "./generatedImagePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../../components/header/Header";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";

export default function GeneratedImagePage({ capturedImage }) {
  const printRef = useRef();
  const showImgRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState();
  const [printImage, setPrintImage] = useState();
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qr, setQr] = useState("");

  // handle QR code generation
  const handleSubmitQr = () => {
    console.log("submitting qr");
    setShowQrPopup(true);
    /* axios
      .post("https://adp24companyday.com/aiphotobooth/upload.php", {
        img: generatedImg.split(",")[1],
      })
      .then(function (response) {
        console.log(response);
        setQr(response.data.url);
        console.log(qr);
      })
      .catch(function (error) {
        console.log(error);
      }); */
  };

  generatedImg && console.log("generated Image =>", generatedImg);

  capturedImage && console.log("captured Image =>", capturedImage);

  prompt && console.log("prompt =>", prompt);

  // handlePrint
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
      body * {
        visibility: hidden;
      }
      #printableArea, #printableArea * {
        visibility: visible;
      }
      #printableArea {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  `,
  });

  useEffect(() => {
    if (generatedImg) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width * 1;
        canvas.height = img.height * 1.06;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const scaledImage = canvas.toDataURL("image/png");
        setPrintImage(scaledImage);
      };

      img.src = generatedImg;
    }
  }, [generatedImg]);

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
      // setGeneratedImg("")
      setPrintImage("");
      console.log("capturedImage =>", capturedImage);
      axios
        .post("https://49bb-103-17-110-127.ngrok-free.app/img2txt", {
          data: prompt,
          image: capturedImage.split(",")[1],
          // image: capturedImage,
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImg(`data:image/webp;base64,${response.data.result}`);
          // send image to server
          axios
            .post("https://adp24companyday.com/aiphotobooth/upload.php", {
              // img: generatedImg.split(",")[1],
              img: response.data.result,
            })
            .then(function (response) {
              console.log(response.data.url);
              console.log("image uploaded 1st time");
              setQr(response.data.url);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className={styles.GeneratedImagePage}>
      {/* header */}
      <Header title={"Enter Your Prompt"} />

      <main className={styles.main}>
        <form className={styles.prompt} onSubmit={handleSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter Prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>
        <div
          className={styles.resultContainer}
          id="printableArea"
          ref={printRef}
        >
          <div className={styles.generatedImgContainer} ref={showImgRef}>
            {printImage ? (
              <div className={styles.image}>
                <img src={printImage} alt="generated image" />
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
        </div>
        <div className={styles.btns}>
          {/* print feature */}
          <button onClick={handlePrint}>Print</button>

          {/* QR feature */}
          <button onClick={handleSubmitQr}>QR</button>
          {showQrPopup && (
            <div className={styles.popupQr}>
              <div className={styles.qr}>
                <div
                  className={styles.closePopup}
                  onClick={() => setShowQrPopup(false)}
                >
                  <IoIosCloseCircle />
                </div>
                <h1>Scan this QR to get image</h1>
                <QRCode size={256} value={qr} />
              </div>
            </div>
          )}

          {/* Home */}
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
