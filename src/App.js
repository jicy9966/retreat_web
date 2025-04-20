import "./App.scss"
import "./DarkMode.scss"
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage, RetreatFourCuts, QTinPage, ArcadePage, RecreationPage, GoldenBellPage, TreasureHuntPage } from "./pages/pages";
import { Footer } from "./components/components";

function App() {
  return (
    <>
      <div className="desktop">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" index element={<HomePage />} />
            <Route path="/retreat-four-cuts" element={<RetreatFourCuts />} />
            <Route path="/QTin" element={<QTinPage />} />
            <Route path="/QTin/:date" element={<QTinPage />} />
            <Route path="/arcade" element={<ArcadePage />} />
            <Route path="/jirakshil" element={<RecreationPage />} />
            <Route path="/goldenbell" element={<GoldenBellPage />} />
            <Route path="/treasure-hunt" element={<TreasureHuntPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}
export default App;
