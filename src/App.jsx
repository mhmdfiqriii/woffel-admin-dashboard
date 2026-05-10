import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<AdminLogin />}
        />

        <Route
          path="/"
          element={<Admin />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App