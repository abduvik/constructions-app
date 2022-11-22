import React from "react";
import CompaniesList from "./Pages/CompaniesList";
import { Header } from "./Components/Header";

import "./styles/global.scss";

function App() {
  return (
    <>
      <Header />
      <CompaniesList />
    </>
  );
}

export default App;
