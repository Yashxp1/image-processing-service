import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ImageUpload from "./pages/Image-Upload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import Images from "./pages/Images";

const App = () => {
  const [auth, setAuth] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/auth/check-auth`,
          { withCredentials: true }
        );
        console.log("Auth Success:", res.data);
        setAuth(res.data);
      } catch (error) {
        console.error("Auth Check Failed:", error);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  console.log("auhhh---->", auth);

  // if (loading) return <div>Checking authentication...</div>;

  // if (isLoading) {
  //   return (
  //     <p className="flex justify-center items-center h-screen">Loading...</p>
  //   );
  // }

  // const isAuthenticated = auth === true;

  return (
    <Routes>
      <>
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/images" element={<Images />} />
        <Route path="*" element={<ImageUpload />} />
      </>

      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </>

      {/* {isAuthenticated ? (
        <>
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="*" element={<ImageUpload />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </>
      )} */}
    </Routes>
  );
};

export default App;
