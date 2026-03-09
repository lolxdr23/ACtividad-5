import "./components/components-styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import UserFindOne from "./pages/users/UserFindOne";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import Users from "./pages/users/Users";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuth } from "./security/authContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
      <Routes>
        <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />}
        />
        <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />}>
            <Route index element={<UserList />} />
            <Route path="create" element={<UserCreate />} />
            <Route path=":id" element={<UserFindOne />} />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
  );
}

export default App;