// NPM packages
import { useState } from "react";

// Project files
import Main from "./pages/Main";
import Auth from "./pages/Auth";

import Header from "./components/Header";

export default function App() {
  //State
  const [userId, setUserId] = useState(null);

  // Methods
  function onLogin(id) {
    setUserId(id);
  }

  return (
    <section className="App">
      <Header />
      <main className="main-content flex-column">
        {userId === null ? (
          <Auth onLogin={onLogin} />
        ) : (
          <Main userId={userId} />
        )}
      </main>
    </section>
  );
}
