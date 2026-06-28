import { FaBed, FaStar, FaTools, FaSignInAlt, FaSignOutAlt, FaRupeeSign } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const kpis = [
  { label: "Occupancy", value: "84%", sub: "+6% vs last week", subColor: "text-green-500", icon: <FaBed /> },
  { label: "Revenue today", value: "₹1.2L", sub: "+12% vs yesterday", subColor: "text-green-500", icon: <FaRupeeSign /> },
  { label: "Check-ins", value: "18", sub: "6 pending arrival", subColor: "text-gray-400", icon: <FaSignInAlt /> },
  { label: "Check-outs", value: "11", sub: "3 overdue", subColor: "text-red-500", icon: <FaSignOutAlt /> },
  { label: "Avg rating", value: "4.6", sub: "Based on 42 reviews", subColor: "text-gray-400", icon: <FaStar /> },
  { label: "Maintenance", value: "3", sub: "Open requests", subColor: "text-yellow-500", icon: <FaTools /> },
];

const rooms = [
  { type: "Deluxe", count: 20, pct: 90 },
  { type: "Suite", count: 8, pct: 75 },
  { type: "Standard", count: 40, pct: 85 },
  { type: "Family", count: 12, pct: 67 },
  { type: "Presidential", count: 2, pct: 50 },
];

const guests = [
  { initials: "AR", name: "Arjun Reddy", room: "Suite 402", info: "Check-in today", badge: "Checked in", badgeColor: "bg-green-100 text-green-700", avatarColor: "bg-blue-100 text-blue-700" },
  { initials: "PM", name: "Priya Mehta", room: "Deluxe 210", info: "3 nights", badge: "In-house", badgeColor: "bg-blue-100 text-blue-700", avatarColor: "bg-green-100 text-green-700" },
  { initials: "SK", name: "Sanjay Kumar", room: "Standard 118", info: "Due out", badge: "Overdue", badgeColor: "bg-yellow-100 text-yellow-700", avatarColor: "bg-purple-100 text-purple-700" },
  { initials: "NV", name: "Nisha Varma", room: "Family 305", info: "2 nights", badge: "In-house", badgeColor: "bg-blue-100 text-blue-700", avatarColor: "bg-blue-100 text-blue-700" },
  { initials: "RT", name: "Rahul Thomas", room: "Presidential 501", info: "VIP", badge: "Checked in", badgeColor: "bg-green-100 text-green-700", avatarColor: "bg-green-100 text-green-700" },
];

const ratings = [
  { label: "Food", score: 4.6, pct: 92 },
  { label: "Service", score: 4.4, pct: 88 },
  { label: "Cleanliness", score: 4.8, pct: 96 },
  { label: "Ambience", score: 4.1, pct: 82 },
  { label: "Value", score: 3.9, pct: 78 },
];

const bookingSources = [
  { label: "Direct", pct: 42, color: "bg-blue-500" },
  { label: "OTA", pct: 35, color: "bg-green-500" },
  { label: "Walk-in", pct: 13, color: "bg-yellow-500" },
  { label: "Corporate", pct: 10, color: "bg-purple-500" },
];

const revenueData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue (₹)",
      data: [65000, 72000, 58000, 91000, 105000, 118000, 120000],
      backgroundColor: "#2a78d6",
      borderRadius: 4,
    },
  ],
};

const revenueOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => "₹" + ctx.parsed.y.toLocaleString("en-IN"),
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, color: "#898781" },
    },
    y: {
      grid: { color: "rgba(150,150,150,0.15)" },
      ticks: {
        font: { size: 11 },
        color: "#898781",
        callback: (v: any) => "₹" + v / 1000 + "K",
      },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

      {/* Top bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">The Grand Palms Hotel</h1>
          <p className="text-sm text-gray-400">Sunday, 28 June 2026 — Front desk overview</p>
        </div>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          ✓ All systems live
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              {k.icon}
              <span>{k.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-800">{k.value}</div>
            <div className={`text-xs mt-1 ${k.subColor}`}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Mid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Room Occupancy */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-500 mb-4">Room occupancy</p>
          <div className="space-y-4">
            {rooms.map((r) => (
              <div key={r.type} className="flex items-center justify-between gap-3">
                <div className="w-28 shrink-0">
                  <p className="text-sm text-gray-700">{r.type}</p>
                  <p className="text-xs text-gray-400">{r.count} rooms</p>
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Guests */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-500 mb-4">Recent guests</p>
          <div className="space-y-3">
            {guests.map((g) => (
              <div key={g.name} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${g.avatarColor}`}>
                  {g.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{g.name}</p>
                  <p className="text-xs text-gray-400 truncate">{g.room} · {g.info}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${g.badgeColor}`}>
                  {g.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-500 mb-4">Revenue this week (₹)</p>
          <div style={{ height: 200 }}>
            <Bar data={revenueData} options={revenueOptions} />
          </div>
        </div>

        {/* Ratings + Booking Source */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-500 mb-3">Guest ratings</p>
          <div className="space-y-3 mb-5">
            {ratings.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-20 shrink-0">{r.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-xs font-medium text-gray-700 w-6 text-right">{r.score}</span>
              </div>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-500 mb-3">Booking source</p>
          <div className="space-y-2">
            {bookingSources.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${b.color}`} />
                <span className="text-sm text-gray-700 flex-1">{b.label}</span>
                <span className="text-sm font-medium text-gray-700">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}