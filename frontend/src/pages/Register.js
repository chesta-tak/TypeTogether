// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const [username, setUsername] = useState(""); // ✅ Username state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:4000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");

//       // ✅ Save username in sessionStorage
//       sessionStorage.setItem("username", data.username);
//       window.dispatchEvent(new Event("storage"));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
//         📝 Create an Account
//       </h2>

//       {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//       <form onSubmit={handleRegister} className="space-y-4">
//         <input
//           type="text"
//           placeholder="👤 Username"
//           className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="📧 Email"
//           className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="🔒 Password"
//           className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-light-accent dark:bg-dark-accent text-white py-2 rounded hover:brightness-110 transition"
//         >
//           Register
//         </button>
//       </form>

//       <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-500 hover:underline">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      sessionStorage.setItem("username", data.username);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-y-auto flex items-center justify-center dark:bg-[#0f0f0f]"
      style={{
       background: "linear-gradient(to top-right, #10418fff,#d852b0ff)",
      }}
    >
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white dark:bg-gray-900 dark:text-white dark:shadow-[0_0_25px_#00ffe7]">
        <h2 className="text-3xl font-bold mb-6 text-center">📝 Create an Account</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}