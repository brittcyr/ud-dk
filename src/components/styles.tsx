import React, { useEffect, useState } from "react";

export const absoluteStyle: "absolute" | "relative" | "fixed" = "absolute";
export const div1Style = {
  //  height: "454px",
  left: "0px",
  //  position: absoluteStyle,
  //  top: "200px",
  width: "100%",
};

export const qbColor = {
  backgroundColor: "rgb(150, 71, 184)",
};

export const rbColor = {
  backgroundColor: "rgb(21, 153, 126)",
};

export const wrColor = {
  backgroundColor: "rgb(230, 126, 34)",
};

export const teColor = {
  backgroundColor: "rgb(41, 128, 185)",
};

export const colorMap = {
    'QB': qbColor,
    'RB': rbColor,
    'WR': wrColor,
    'TE': teColor,
};

export const qbBorderColor = {
  borderColor: "rgb(150, 71, 184)",
};

export const rbBorderColor = {
  borderColor: "rgb(21, 153, 126)",
};

export const wrBorderColor = {
  borderColor: "rgb(230, 126, 34)",
};

export const teBorderColor = {
  borderColor: "rgb(41, 128, 185)",
};

export const borderColorMap = {
    'QB': qbBorderColor,
    'RB': rbBorderColor,
    'WR': wrBorderColor,
    'TE': teBorderColor,
};
