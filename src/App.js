import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserContextProvider } from "./store/UserContext";
import CreatePost from "./pages/CreatePost";
import DetailedPost from "./components/DetailedPost";
import EditPost from "./pages/EditPost";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Profile from "./pages/Profile";
import Pagenotfound from "./pages/Pagenotfound";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/post/:id" element={<DetailedPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-user" element={<UpdateUser />} />
        </Route>
      <Route path="*" element={<Pagenotfound />} />
      </Routes>

    </UserContextProvider>
  );
}

export default App;
