import { Routes, Route, Navigate } from "react-router-dom";
import  {HomePage}  from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
// import { ProfilePage } from "./pages/ProfilePage";
import { VerificationPage } from "./pages/VerificationPage";
import  NavbarComp  from "./components/NavbarComponents";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/userSlice";
import { useEffect } from "react";
import { LibraryPage } from "./pages/LibraryPage";

function App() {
  const dispatch = useDispatch();
  // const { id } = useSelector((state) => state.userSlice.value);
  const token = localStorage.getItem("token");
  console.log(token);

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/users/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.NIM);
      dispatch(login(res.NIM));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/" element={<LibraryPage />} />
      </Routes>
    </div>
  );
}

export default App;