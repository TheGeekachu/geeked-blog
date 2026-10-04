"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserType {
  email: string;
  name: string;
  password: string;
  signUp: boolean;
}

export default function Page() {
  const [user, setUser] = useState<UserType>({
    email: "",
    name: "",
    password: "",
    signUp: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (user.signUp) {
        await authClient.signUp.email(
          {
            email: user.email,
            password: user.password,
            name: user.name,
          },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (ctx) => {
              setError(ctx.error.message || "Failed to create account.");
            },
          }
        );
      } else {
        await authClient.signIn.email(
          {
            email: user.email,
            password: user.password,
          },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (ctx) => {
              setError(ctx.error.message || "Invalid email or password.");
            },
          }
        );
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header>
        <div className="badge">
          {user.signUp ? "Create Account" : "Welcome Back"}
        </div>
        <h1>
          {user.signUp ? (
            <>
              Join <span>TheGeekachu</span>.
            </>
          ) : (
            <>
              Sign in to <span>your account</span>.
            </>
          )}
        </h1>
      </header>

      <section>
        <div className="section-title">Authentication</div>
        <div className="card" style={{ maxWidth: "480px", padding: "32px" }}>
          <form onSubmit={handleSignIn}>
            {error && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  padding: "12px 16px",
                  borderRadius: "var(--radius)",
                  fontSize: "0.88rem",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                  display: "block",
                }}
              >
                <strong>Error:</strong> {error}
              </div>
            )}

            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </label>

            {user.signUp && (
              <label>
                Name
                <input
                  type="text"
                  placeholder="Your Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                />
              </label>
            )}

            <label>
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "4px 0",
              }}
            >
              <input
                type="checkbox"
                id="signUpToggle"
                checked={user.signUp}
                onChange={(e) => {
                  setError(null);
                  setUser({ ...user, signUp: e.target.checked });
                }}
                style={{ width: "auto", accentColor: "var(--accent)" }}
              />
              <label
                htmlFor="signUpToggle"
                style={{
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Create a new account instead
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", marginTop: "8px" }}
            >
              {loading
                ? "Processing..."
                : user.signUp
                ? "Sign Up"
                : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}