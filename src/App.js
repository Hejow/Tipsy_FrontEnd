import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home, Login, Signup, Test, TestResult } from './pages';
import { ScrollTop } from './hooks'
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
      <ScrollTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/testresult' element={<TestResult />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;