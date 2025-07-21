import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DocumentPage from "./pages/DocumentPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlobBackground from "./components/BlobBackground";
import ProtectedRoute from "./components/ProtectedRoute";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // 🌙 Theme toggle
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // 🔄 Sync username from sessionStorage
  useEffect(() => {
  fetch("http://localhost:4000/api/auth/me", {
    credentials: "include", // important for session cookies!
  })
    .then((res) => {
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    })
    .then((data) => {
      setUsername(data.username);
      sessionStorage.setItem("username", data.username); // 👈 Used by editor
    })
    .catch(() => {
      setUsername("");
      sessionStorage.removeItem("username");
    });
}, [location]);


  // 🔁 Handle session changes across tabs (use localStorage now)
useEffect(() => {
  const handleStorage = () => {
    setUsername(sessionStorage.getItem("username") || "");
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, []);


  const handleLogout = () => {
  fetch("http://localhost:4000/api/auth/logout", {
    method: "POST",
    credentials: "include", // Send cookie
  })
    .finally(() => {
      sessionStorage.removeItem("username");
      setUsername("");
      navigate("/login");
    });
};


  return (



    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-#0f8f0f-bg to-#e0f2fe-300 transition-colors duration-300 dark:bg-[#0f0f0f]"
        style={{
        background: "linear-gradient(to top-right, #10418fff)",
      }}
    >
      <BlobBackground />

      <header className="fixed top-0 left-0 right-0 z-50 bg-transprent dark:bg-dark-card/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 shadow-md transition-all">
  <div className="w-full flex justify-between items-center px-6 py-3">
    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-yellow-400 text-transparent bg-clip-text dark:bg-gradient-to-r from-purple-600 to-yellow-400 text-transparent bg-clip-text">
      `TypeTogether`
    </h1>

    {!isAuthPage && username && (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700  dark:text-gray-300">
          Welcome, <span className="font-semibold">{username}</span>
        </span>

        

       <button
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className={`w-16 h-8 flex items-center px-1 rounded-full transition duration-300 ${
    theme === "light" ? "bg-gray-300" : "bg-blue-600"
  }`}
>

  <div
    className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
      theme === "light" ? "translate-x-0 bg-white" : "translate-x-8 bg-yellow-400"
    }`}
  />
</button>
        
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-1 rounded-full font-medium bg-blue-500 text-white hover:bg-pink-600 shadow-md transition"
        >
          Logout
        </button>
      </div>
    )}

    {isAuthPage && (
      <button
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className={`w-16 h-8 flex items-center px-1 rounded-full transition duration-300 ${
    theme === "light" ? "bg-gray-300" : "bg-blue-600"
  }`}
>
  <div
    className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
      theme === "light" ? "translate-x-0 bg-white" : "translate-x-8 bg-yellow-400"
    }`}
  />
</button>
    )}
  </div>
  
</header>



      <main className="relative z-10 pt-24 px-4 pb-10 sm:px-6 max-w-7xl mx-auto w-full">

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doc/:id"
            element={
              <ProtectedRoute>
                <DocumentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
    
  );
}

export default AppWrapper;
