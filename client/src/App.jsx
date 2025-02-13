import { useSelector } from "react-redux"
import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PasswordPage from "./pages/PasswordPage"
import SecuredPage from "./pages/SecuredPage"
import FavouritesPage from "./pages/FavouritesPage"


const App = () => {
  const isAuth=Boolean(useSelector((state)=>state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/saved-passwords" element={isAuth?<PasswordPage/>:<Navigate to="/login"/>} />
          <Route path="/secured-passwords" element={isAuth?<SecuredPage/>:<Navigate to="/login"/>} />
          <Route path="/favourite-passwords" element={isAuth?<FavouritesPage/>:<Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
