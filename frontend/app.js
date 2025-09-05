import { useState } from "react";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    // Show login page if user not logged in
    return <Login onLogin={(username) => setUser(username)} />;
  }

  // After login, show dashboard placeholder
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {user}!</h1>
      <p className="mt-4">This will be your Dashboard showing daily DSA questions.</p>
    </div>
  );
}

export default App;
