// NPM packages
import { useState } from "react";

// Project files
import welcomeImg from "../assets/images/welcome-image.png";
import { BASE_URL, HEADERS, POST } from "../constants/constants";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Properties
  const endPoint = `${BASE_URL}/login`;

  // Methods
  async function onSubmit(event) {
    event.preventDefault();

    const requestBody = { email, password };

    const response = await fetch(endPoint, {
      method: POST,
      headers: HEADERS,
      body: JSON.stringify(requestBody),
    });

    try {
      if (response.ok) {
        const { userId } = await response.json();
        onSuccess(userId);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      onFailure(error);
    }
  }

  function onSuccess(userId) {
    onLogin(userId);
  }

  function onFailure(error) {
    console.error(error);
    alert(error);
  }

  return (
    <section className="initial-block flex-column">
      <div className="content-wrapper">
        <img
          className="welcome-image"
          src={welcomeImg}
          alt="A woman is bringing parcels from a store"
        />
        <h1>EIKA's shopping list</h1>

        <form className="auth-form flex-column" onSubmit={onSubmit}>
          <div className="field-wrapper flex-column">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="field-wrapper flex-column">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="button button-primary">Enter</button>
        </form>
      </div>
    </section>
  );
}
