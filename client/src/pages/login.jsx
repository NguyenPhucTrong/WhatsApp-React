import { reducerCases } from "@/context/constants";
import { CHECK_USER_ENDPOINT } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { userInfo } from "os";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = userStateProvider();

  useEffect(() => {
    console.log({ userInfo });
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoUrl: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    // console.log({ user });
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ENDPOINT, { email });
        console.log({ data });
        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });

          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          router.push("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            status,
          } = data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6 mt-11">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="Logo" height={300} width={300} />
        <span className="text-7xl">WhatSapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default Login;
