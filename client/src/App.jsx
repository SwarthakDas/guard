import { useSelector } from "react-redux"
import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PasswordPage from "./pages/PasswordPage"
import FavouritesPage from "./pages/FavouritesPage"
import SavePasswordPage from "./pages/SavePasswordPage"
import ProfilePage from "./pages/ProfilePage"
import CheckerPage from "./pages/CheckerPage"

const App = () => {
  const {token}=useSelector((state)=>state.auth)

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/saved-passwords" element={token?<PasswordPage/>:<Navigate to="/login"/>} />
          <Route path="/favourite-passwords" element={token?<FavouritesPage/>:<Navigate to="/login"/>} />
          <Route path="/save" element={token?<SavePasswordPage/>:<Navigate to="/login"/>} />
          <Route path="/profile" element={token?<ProfilePage/>:<Navigate to="/login"/>} />
          <Route path="/checker" element={<CheckerPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
