import React from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./PageShell.css";
import { PageContextProvider } from "./usePageContext";
import { useState, useEffect } from "react";
import { childrenPropType } from "./PropTypeValues";

export { PageShell };

const links = [
  { route: "/", label: "Home", id: 0 },
  { route: "/app", label: "Dashboard", id: 1 },
];

PageShell.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType,
};
function PageShell({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  );
}
