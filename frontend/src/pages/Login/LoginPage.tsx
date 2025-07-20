import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/InputField";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import {jwtDecode} from "jwt-decode";
import type { TUser } from "../../redux/features/auth/authSlice";
import AuthLayout from "../../layout/AuthLayout";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await login(formData).unwrap(); // <- call login mutation
      const token = res.data.accessToken;

      // Decode token to extract user info
      const decodedUser: TUser = jwtDecode(token);
      console.log(decodedUser);

      // Save to Redux
      dispatch(setUser({ user: decodedUser, token }));


      // Redirect
      navigate("/checkout"); // or home
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back 👋</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">Login failed. Please try again.</p>
        )}
        <button type="submit" className="btn btn-primary w-full mt-2" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
