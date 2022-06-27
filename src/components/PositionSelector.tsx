import React, { useEffect, useState } from "react";
import {qbColor, rbColor, wrColor, teColor} from './styles'

function PositionSelector() {
  return (
    <>
      <button
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={qbColor}
      >
        QB
      </button>
      <button
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={rbColor}
      >
        RB
      </button>
      <button
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={wrColor}
      >
        WR
      </button>
      <button
        className="styles__button__gmYRZ styles__green__aqzHf styles__small___s6i5 styles__solid__BthGK styles__full__xmWA8 styles__filterButtons__stpGn"
        style={teColor}
      >
        TE
      </button>
    </>
  );
}

export default PositionSelector;
