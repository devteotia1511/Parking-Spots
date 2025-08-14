"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("ps_logged_in");
    if (loggedIn !== "true") {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <Image src="/Parksmartlogo.png" alt="ParkSmart Business" width={140} height={40} className="h-8 w-auto" />
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/dashboard/parking")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
            >
              Parking Spots
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("ps_logged_in");
                router.replace("/");
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium text-red-600"
            >
              Logout
            </button>
          </nav>
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 bg-white">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-lg font-bold tracking-tight"
            >
              Dashboard
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard/parking")}
                className="px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Parking
              </button>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}


