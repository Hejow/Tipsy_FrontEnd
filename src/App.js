import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home, Login, Test, TestResult } from './pages';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    outline: none;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/testresult' element={<TestResult />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;