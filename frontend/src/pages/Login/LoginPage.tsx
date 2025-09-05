/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useFirebaseLoginMutation, useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch} from "../../redux/hooks";
import { setBackendUser, setFirebaseUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import type { TBackendUser, TFirebaseUser } from "../../redux/features/auth/authSlice";
import AuthLayout from "../../layout/AuthLayout";
import {FaGoogle} from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

// Firebase imports
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();
  const [firebaseLogin] = useFirebaseLoginMutation();
  

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔹 Backend login (JWT API)
  const handleBackendLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await login(formData).unwrap();
      const token = res.data.accessToken;

      const decodedUser: TBackendUser = jwtDecode(token);
      dispatch(setBackendUser({ user: decodedUser, token }));

      const from =
        typeof location.state?.from === "string"
          ? location.state.from
          : location.state?.from?.pathname || "/";

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Backend login failed", err);
    }
  };

// 🔹 Firebase Google Login
const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // 1️⃣ Sign in with Firebase
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // 2️⃣ Get Firebase ID token
    const idToken = await firebaseUser.getIdToken();
 

    // 3️⃣ Send ID token to backend for login
    const backendRes = await firebaseLogin(idToken).unwrap();

    // 4️⃣ Prepare Firebase user for state
    const fbUser: TFirebaseUser = {
       id: backendRes?.data?.user?._id,
      uid: firebaseUser.uid,
      email: firebaseUser.email || null,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL || null,
      role: "user",
    };

    // 5️⃣ Dispatch to Redux
    dispatch(setFirebaseUser({ user: fbUser, token: idToken }));

    navigate("/");
  } catch (err) {
    console.error("Google login failed", err);
  }
};

  // 🔹 Firebase GitHub Login
const handleGithubLogin = async () => {
  const provider = new GithubAuthProvider();

  try {
    // 1️⃣ Sign in with Firebase
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // 2️⃣ Get Firebase ID token
    const idToken = await firebaseUser.getIdToken();

    // 3️⃣ Send ID token to backend for login
    const backendRes = await firebaseLogin(idToken).unwrap();


    // 4️⃣ Prepare Firebase user for state
    const fbUser: TFirebaseUser = {
      id: backendRes?.data?.user?._id,
      uid: firebaseUser.uid,
      email: firebaseUser.email ||null ,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser?.photoURL   || null,
      role: "user",
    };
    // 5️⃣ Dispatch to Redux
    dispatch(setFirebaseUser({ user: fbUser, token: idToken }));
    navigate("/");
  } catch (err) {
    console.error("GitHub login failed", err);
  }
};


  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back 👋</h2>

      {/* Backend Login (JWT API) */}
      <form onSubmit={handleBackendLogin}>
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
        {error as any && (
          <p className="text-red-500 text-sm text-center mt-2">
            Login failed. Please try again.
          </p>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login with Backend"}
        </button>
      </form>

     

      {/* Firebase Google & GitHub Login */}
      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={handleGoogleLogin}
          className="btn w-1/2 bg-white text-black border-[#e5e5e5]"
        >
         <FaGoogle className="mr-1 md:mr-2" /> <span className="text-[12px] md:text-sm">Login with Google</span>
        </button>

        <button
          onClick={handleGithubLogin}
          className="btn w-1/2 bg-black text-white border-black"
        >
         <FaGithub className="mr-1 md:mr-2" /> <span className="text-[12px] md:text-sm">Login with GitHub</span>
        </button>
      </div>

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
