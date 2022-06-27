import React, { useEffect, useState } from "react";

function EmptyStar(props: {onClick: any}) {
  const { onClick } = props;
  return (
    <button className="styles__queuedStar__OMO2D" onClick={onClick}>
      <i className="styles__icon__DijND styles__iconNotQueued__QgvLg">
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.5624 11.3L18.5124 10.775L16.1499 5.2125C15.7249 4.2 14.2749 4.2 13.8499 5.2125L11.4874 10.7875L5.44991 11.3C4.34991 11.3875 3.89991 12.7625 4.73741 13.4875L9.32491 17.4625L7.94991 23.3625C7.69991 24.4375 8.86241 25.2875 9.81241 24.7125L14.9999 21.5875L20.1874 24.725C21.1374 25.3 22.2999 24.45 22.0499 23.375L20.6749 17.4625L25.2624 13.4875C26.0999 12.7625 25.6624 11.3875 24.5624 11.3ZM14.9999 19.25L10.2999 22.0875L11.5499 16.7375L7.39991 13.1375L12.8749 12.6625L14.9999 7.625L17.1374 12.675L22.6124 13.15L18.4624 16.75L19.7124 22.1L14.9999 19.25Z"></path>
        </svg>
      </i>
    </button>
  );
}

export default EmptyStar;
