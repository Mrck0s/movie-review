"use client";

import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("Registracion exitosa");
      } else {
        console.error("Registracion fallada");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <main>
      <div className="flex flex-col max-w-[400px] p-10 bg-primary gap-5 mx-auto">
        <h1 className="text-4xl font-bold">Register</h1>
        <form
          className="flex flex-col gap-10  text-black"
          action=""
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
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
          />

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
    </main>
  );
};

export default Register;