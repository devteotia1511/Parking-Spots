"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

export default function LandingAuthPage() {
  const router = useRouter();
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("ps_logged_in");
    if (loggedIn === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userRaw = localStorage.getItem("ps_user");
      if (!userRaw) {
        setError("No account found. Please sign up first.");
        setLoading(false);
        return;
      }
      const user = JSON.parse(userRaw);
      if (user.email === signinEmail && user.password === signinPassword) {
        localStorage.setItem("ps_logged_in", "true");
        router.replace("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = { name: signupName, email: signupEmail, password: signupPassword };
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mt-[100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Left panel: marketing */}
        <div className="rounded-2xl bg-green-500 text-white p-5 md:p-8 shadow-md flex flex-col">
          <h2 className="text-xl md:text-2xl font-display">Check out our corporate solution</h2>
          <div className="mt-4 rounded-xl overflow-hidden bg-black/10">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={(function () {
                  const toEmbed = (url) => {
                    try {
                      const u = new URL(url);
                      const host = u.host;
                      let id = "";
                      if (host.includes("youtu.be")) {
                        id = u.pathname.replace("/", "");
                      } else if (host.includes("youtube.com")) {
                        if (u.pathname.startsWith("/watch")) {
                          id = u.searchParams.get("v") || "";
                        } else if (u.pathname.startsWith("/embed/")) {
                          return url;
                        }
                      }
                      if (!id) return url;
                      const base = `https://www.youtube.com/embed/${id}`;
                      const params = new URLSearchParams({ rel: "0", modestbranding: "1", controls: "1" });
                      return `${base}?${params.toString()}`;
                    } catch {
                      return url;
                    }
                  };
                  return toEmbed("https://youtu.be/loJgTJEKv2U?si=m1v8HzRZouNEu4HK");
                })()}
                title="ParkSmart Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-6 overflow-hidden relative">
            <div className="[--marquee-duration:17s] animate-marquee-right flex gap-6 whitespace-nowrap will-change-transform">
              {[
                "MAX",
                "Fortis",
                "Jaypee",
                "Omaxe",
                "DFCI",
                "LOTS",
                "Metro",
                "NorthStar",
                "IDFC First Bank",
                "Lots Wholesale Solutions",
                "Noida Infra"
              ].map((brand) => (
                <span key={`a-${brand}`} className="bg-white/90 text-green-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm">
                  {brand}
                </span>
              ))}
              {[
                "MAX",
                "Fortis",
                "Jaypee",
                "Omaxe",
                "DFCI",
                "LOTS",
                "Metro",
                "NorthStar",
              ].map((brand) => (
                <span key={`b-${brand}`} className="bg-white/90 text-green-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: auth card with tabs */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 md:p-8 shadow-md">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/Parksmartlogo.png"
              alt="ParkSmart Business"
              width={280}
              height={200}
              className="h-10 w-auto"
              priority
            />
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 bg-gray-100">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleSignin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Type your email"
                    value={signinEmail}
                    onChange={(e) => setSigninEmail(e.target.value)}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input
                    type="password"
                    placeholder="Type your password"
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {loading ? "Signing in..." : "Login"}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">or</span>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full border-gray-300">
                  Login with OTP
                </Button>

                <div className="text-right text-sm">
                  <button type="button" className="text-green-700 hover:underline">Forgot Password?</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}