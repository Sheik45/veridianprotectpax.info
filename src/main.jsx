import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SITE } from "./data";
import "./index.css";

const root = document.documentElement;
root.style.setProperty("--accent", SITE.accent);
root.style.setProperty("--accent-light", SITE.accentLight);
root.style.setProperty("--accent-glow", SITE.accentGlow);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
