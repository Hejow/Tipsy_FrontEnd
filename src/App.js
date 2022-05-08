import React from "react";
import { Footer, Header } from "./components";
import { Home, Login } from './pages';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Header/>
      <Home/>
      <Login/>
      <Footer/>
    </React.Fragment>
  )
}

export default App;