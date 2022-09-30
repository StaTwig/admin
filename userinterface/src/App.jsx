import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/connection/Connection";
import Landing from "./pages/landing-page/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register/:id" element={<Connection />} />
      </Routes>
    </BrowserRouter>
  );
}
