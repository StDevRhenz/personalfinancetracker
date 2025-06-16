"use client";
import { useState } from "react";
import { useAuth } from "../../features/auth/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  // Debug: Log Firebase current user and app
  console.log("Firebase current user:", auth.currentUser);

  const { user, loading, signup, login, loginWithGoogle, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [pending, setPending] = useState(false);

  console.log("LoginPage loading:", loading, "user:", user);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Auth error");
    } finally {
      setPending(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setPending(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || "Google auth error");
    } finally {
      setPending(false);
    }
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", maxWidth: 400, margin: "2rem auto" }}>
        <Skeleton height={40} style={{ marginBottom: 20 }} />
        <Skeleton height={40} style={{ marginBottom: 20 }} />
        <Skeleton height={40} style={{ marginBottom: 20 }} />
      </div>
    );

  if (user) {
    return (
      <div>
        <p>Logged in as: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 320, margin: "2rem auto" }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <button type="submit" disabled={pending} style={{ width: "100%", marginBottom: 8 }}>
          {pending ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <button onClick={handleGoogle} disabled={pending} style={{ width: "100%", marginBottom: 8 }}>
        Continue with Google
      </button>
      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}
        style={{ width: "100%" }}>
        {mode === "login" ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
