import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ImageUpload from "./pages/Image-Upload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import Images from "./pages/Images";
import ImageById from "./pages/ImageById";

const App = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/auth/check-auth`,
          { withCredentials: true }
        );
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

  const RedirectIfAuth = ({ children }: { children: ReactNode }) => {
    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-500 font-light tracking-[0.3em] uppercase text-[10px]">
          Verifying
        </div>
      );
    }
    if (auth) {
      return <Navigate to="/upload" replace />;
    }
    return <>{children}</>;
  };

  const RequireAuth = ({ children }: { children: ReactNode }) => {
    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-500 font-light tracking-[0.3em] uppercase text-[10px]">
          Verifying
        </div>
      );
    }
    if (!auth) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/upload"
        element={
          <RequireAuth>
            <ImageUpload />
          </RequireAuth>
        }
      />
      <Route
        path="/images"
        element={
          <RequireAuth>
            <Images />
          </RequireAuth>
        }
      />
      <Route
        path="/images/:id"
        element={
          <RequireAuth>
            <ImageById />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
