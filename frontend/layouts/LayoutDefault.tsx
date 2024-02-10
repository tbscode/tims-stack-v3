export default LayoutDefault;

import "./style.css";
import React from "react";

function LayoutDefault({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div id="page-container">{children}</div>;
}
