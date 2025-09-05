/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import InputField from '../../components/InputField';
import AuthLayout from '../../layout/AuthLayout';
import { useCreateUserMutation } from '../../redux/features/user/userApis';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { setBackendUser, type TBackendUser } from '../../redux/features/auth/authSlice';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [createUser, { isLoading: isCreating, error: createError }] = useCreateUserMutation();
  const [login, { isLoading: isLogging }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Create the user
      await createUser(formData).unwrap();

      // 2️⃣ Auto-login after successful registration
      const loginRes: any = await login({ email: formData.email, password: formData.password }).unwrap();
      const token = loginRes.data.accessToken;

      // 3️⃣ Decode JWT and set Redux state
      const decodedUser = jwtDecode(token) as TBackendUser;
      dispatch(setBackendUser({ user: decodedUser, token }));

      // 4️⃣ Navigate to home page
      navigate('/');
    } catch (err) {
      console.error("Registration or login failed:", err);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6">Register / Sign up</h2>
      <form onSubmit={handleRegister}>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
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
        {createError as any && (
          <p className="text-red-500 text-sm text-center mt-2">
            Registration failed. Please try again.
          </p>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={isCreating || isLogging}
        >
          {isCreating || isLogging ? "Processing..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
