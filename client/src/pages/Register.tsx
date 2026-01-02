import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useRegister } from "../hooks/api";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: register, isPending: isRegistering, isError } = useRegister();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return console.error("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return alert("Password doesnt match");
    }

    register(
      { name, email, password, confirmPassword },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (err) => console.error("Error:", err),
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Get started</h1>
          <p className="mt-2 text-sm">Create a free account to join us</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs font-semibold">
                Full Name
              </label>
              <Input
                value={formData.name}
                onChange={handleChange}
                id="name"
                placeholder="John Doe"
                type="text"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs font-semibold">
                Email Address
              </label>
              <Input
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="e@example.com"
                type="email"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-xs font-semibold">
                Password
              </label>
              <Input
                value={formData.password}
                onChange={handleChange}
                id="password"
                placeholder="••••••••"
                type="password"
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold"
              >
                Confirm Password
              </label>

              <Input
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="w-full py-1 font-medium rounded-lg border"
            >
              {isRegistering ? "Registering..." : "Register"}
            </Button>

            <Link to="/login">
              <Button className="w-full py-1 border font-medium rounded-lg">
                Login to existing account
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs">
          By clicking register, you agree to our Terms of Service.
        </p>
      <div>{isError && <h1 className="text-center text-red-600">An error occured</h1>}</div>
      </form>
    </div>
  );
};

export default Register;
