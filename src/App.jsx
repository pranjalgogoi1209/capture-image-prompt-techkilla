import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CaptureImagePage from "./pages/captureImagePage/CaptureImagePage";
import GeneratedImagePage from "./pages/generatedImagePage/GeneratedImagePage";

export default function App() {
  const [capturedImage, setCapturedImg] = useState();
  // const [generatedImage, setGeneratedImage] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/capture-image"
          element={<CaptureImagePage setCapturedImg={setCapturedImg} />}
        />

        <Route
          path="/generated-image"
          element={<GeneratedImagePage capturedImage={capturedImage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
