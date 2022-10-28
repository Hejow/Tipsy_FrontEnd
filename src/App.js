import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header} from "./components";
import { Home, Login, Signup, Test, TestResult, Mypage, FindShop, Recommend, Teststart, Notfound, FindUser, FindPassword} from './pages';
import { ScrollTop, LoginStatus } from './hooks'
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    outline: none;
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    font-family:NanumSquareNeo-Variable;
  }
  
  body{
    font-family:NanumSquareNeo-Variable; 
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <ScrollTop />
      <LoginStatus />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/testresult' element={<TestResult />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/findshop' element={<FindShop />}/>
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/testguide' element={<Teststart />} />
        <Route path='/finduser' element={<FindUser />} />
        <Route path='/findpassword' element={<FindPassword />} />
        <Route path='/*' element={<Notfound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;