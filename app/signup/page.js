"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("ps_logged_in");
    if (loggedIn === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = { name, email, password };
      localStorage.setItem("ps_user", JSON.stringify(user));
      localStorage.setItem("ps_logged_in", "true");
      router.replace("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-2">Create your account</h1>
        <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border-gray-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border-gray-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border-gray-200"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-green-700 hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}


