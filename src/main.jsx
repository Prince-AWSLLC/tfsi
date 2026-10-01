import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SiteDataProvider } from "./data/siteData";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SiteDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteDataProvider>
  </React.StrictMode>
);
