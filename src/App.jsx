import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Prompt from "./pages/prompt/prompt";

export default function App() {
  const [capturedImage, setCapturedImg] = useState();
  // const [generatedImage, setGeneratedImage] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setCapturedImg={setCapturedImg} />} />

        <Route
          path="/prompt"
          element={<Prompt capturedImage={capturedImage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
