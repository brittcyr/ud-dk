import React from "react";

function QueuedStar(props: { onClick: any }) {
  const { onClick } = props;
  return (
    <button className="styles__queuedStar__OMO2D" onClick={onClick}>
      <i className="styles__icon__DijND styles__iconQueued__bSE8X">
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 21.5875L20.1875 24.725C21.1375 25.3 22.3 24.45 22.05 23.375L20.675 17.475L25.2625 13.5C26.1 12.775 25.65 11.4 24.55 11.3125L18.5125 10.8L16.15 5.22501C15.725 4.21251 14.275 4.21251 13.85 5.22501L11.4875 10.7875L5.45003 11.3C4.35003 11.3875 3.90003 12.7625 4.73753 13.4875L9.32503 17.4625L7.95003 23.3625C7.70003 24.4375 8.86253 25.2875 9.81253 24.7125L15 21.5875Z"></path>
        </svg>
      </i>
    </button>
  );
}

export default QueuedStar;
