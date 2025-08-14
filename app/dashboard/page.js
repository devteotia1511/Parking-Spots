"use client";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">Welcome to your Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Overview and quick links</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Total Spots</div>
          <div className="mt-2 text-2xl font-semibold">30</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Available</div>
          <div className="mt-2 text-2xl font-semibold text-green-600">18</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Full</div>
          <div className="mt-2 text-2xl font-semibold text-red-600">12</div>
        </div>
      </div>
    </div>
  );
}


