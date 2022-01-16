import React from "react";
import "./ProgressBar.css";
import logoimg from "assets/img/logo.png";

export default function ProgressBar() {
  return (
    <>
      <div className="root">
        <div className="loader">
          <img src={logoimg} className="img" />
        </div>
      </div>
    </>
  );
}
