import "./App.scss"
import "./DarkMode.scss"
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage, LoadingPage, RetreatFourCuts, QTinPage, ArcadePage } from "./pages/pages";
import { Footer } from "./components/components";

function App() {
  return (
    <>
      <div className="desktop">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/loading" replace />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/home" index element={<HomePage />} />
            <Route path="/retreat-four-cuts" element={<RetreatFourCuts />} />
            <Route path="/QTin" element={<QTinPage />} />
            <Route path="/QTin/:date" element={<QTinPage />} />
            <Route path="/arcade" element={<ArcadePage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}
export default App;
