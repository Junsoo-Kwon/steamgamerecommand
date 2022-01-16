import React from "react";

function Purchase({ id }) {
  return (
    <iframe
      title="Steam store widget"
      className="store-widget"
      id="js-store-iframe"
      data-src={`https://store.steampowered.com/widget/${id}/`}
      width="100%"
      height="190"
      src={`https://store.steampowered.com/widget/${id}/`}
      frameBorder="0"
    ></iframe>
  );
}

export default Purchase;
