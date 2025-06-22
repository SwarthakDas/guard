import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PasswordPage from "./pages/PasswordPage"
import FavouritesPage from "./pages/FavouritesPage"
import SavePasswordPage from "./pages/SavePasswordPage"
import ProfilePage from "./pages/ProfilePage"
import CheckerPage from "./pages/CheckerPage"
import { useAuth } from "./state/AuthContext"

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/saved-passwords" element={isAuthenticated ? <PasswordPage /> : <Navigate to="/login" />} />
          <Route path="/favourite-passwords" element={isAuthenticated ? <FavouritesPage /> : <Navigate to="/login" />} />
          <Route path="/save" element={isAuthenticated ? <SavePasswordPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/checker" element={<CheckerPage/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
