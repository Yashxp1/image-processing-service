import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useLogin } from "../hooks/api";
import { queryClient } from "../main";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending, isError } = useLogin();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return console.error("Please fill in all fields");

    login(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
         queryClient.refetchQueries({ queryKey: ["auth"] });
          navigate("/upload");
        },
        onError: (err) => console.error("Error:", err),
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-8 rounded-xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm">Login to access your account</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col ">
              <label htmlFor="email" className="text-xs font-medium">
                Email Address
              </label>
              <Input
                onChange={handleChange}
                value={formData.email}
                id="email"
                placeholder="e@example.com"
                type="email"
                className="w-full"
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="password" className="text-xs font-medium">
                Password
              </label>
              <Input
                onChange={handleChange}
                value={formData.password}
                id="password"
                placeholder="••••••••"
                type="password"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              type="submit"
              className="w-full py-1 font-medium rounded-lg border"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <Link to="/register" className="w-full">
              <Button className="w-full py-1 border font-medium rounded-lg">
                Create a new account
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs">
          Forgot your password?{" "}
          <span className="underline cursor-pointer">Reset here</span>
        </p>
        <div>
          {isError && (
            <h1 className="text-center text-red-600">An error occured</h1>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
