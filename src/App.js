import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header} from "./components";
import { Home, Login, Signup, Test, TestResult, Mypage, FindShop, Recommend, Teststart, Error} from './pages';
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
        <Route path='/*' element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;