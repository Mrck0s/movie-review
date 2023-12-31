"use client";

import { useState } from "react";
import { saveLocalStorageData } from "@/controllers/localStorageController";

import { useRouter } from "next/navigation";

import { userContext } from "@/context/propContext";
import { useContext } from "react";

const Register = () => {
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserLogged } = useContext(userContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { username, email, password };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.log(error);
        setErrors(error);
      } else {
        const data = await response.json();
        console.log(data);
        const datatoken = data.token.split(".")[1];
        const tokendecrypt = atob(datatoken);
        const tokenparsed = JSON.parse(tokendecrypt);
        const userLogged = {
          token: data.token,
          user: tokenparsed.sub,
        };
        saveLocalStorageData(userLogged);
        setUserLogged(userLogged);
        console.log("Registracion exitosa");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-[400px] p-10 bg-primary gap-5 mx-auto">
      <h1 className="text-4xl font-bold">Register</h1>
      <form
        className="flex flex-col gap-10  text-black"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
        />
        {errors.includes("Username") && (
          <p className="text-white bg-red p-3 rounded-sm">{errors}</p>
        )}
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
        />
        {errors.includes("email") && (
          <p className="text-white bg-red p-3 rounded-sm">{errors}</p>
        )}
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
        />
        {errors.includes("password") && (
          <p className="text-white bg-red p-3 rounded-sm">{errors}</p>
        )}
        <label htmlFor="" className="text-white">
          <input type="checkbox" className="mr-3" />I agree with the{" "}
          <a href="#" className="text-button">
            Terms and conditions.
          </a>
        </label>
        <button
          type="submit"
          className="text-white text-center rounded-sm font-bold px-4 py-2 bg-button duration-300 hover:bg-buttonHover"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
