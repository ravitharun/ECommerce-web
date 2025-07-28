import React from "react";
import AdminNavbar from "./AdminNavbar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  TrendingUp,
  BarChart3,
  Clock,
  Globe,
  Activity,
} from "lucide-react";
import { CSVLink } from "react-csv";

// Mock data
const data = [
  { name: "Jan", orders: 240, revenue: 40000 },
  { name: "Feb", orders: 300, revenue: 42000 },
  { name: "Mar", orders: 200, revenue: 38000 },
  { name: "Apr", orders: 278, revenue: 46000 },
  { name: "May", orders: 189, revenue: 35000 },
  { name: "Jun", orders: 239, revenue: 47000 },
];

const pieData = [
  { name: "USA", value: 400 },
  { name: "England", value: 300 },
  { name: "India", value: 300 },
  { name: "France", value: 200 },
];
const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

const topChannels = [
  { source: "Github", visitors: "2.4K", revenue: "$3,877", sales: 267, conversion: "4.7%" },
  { source: "Facebook", visitors: "2.2K", revenue: "$3,426", sales: 249, conversion: "4.4%" },
  { source: "Google", visitors: "2.0K", revenue: "$2,444", sales: 224, conversion: "4.2%" },
];

const stats = [
  { title: "Total Products", value: "1,240", icon: <Package size={20} /> },
  { title: "Total Orders", value: "8,320", icon: <ShoppingCart size={20} /> },
  { title: "Customers", value: "4,500", icon: <Users size={20} /> },
  { title: "Revenue", value: "₹12,45,000", icon: <IndianRupee size={20} /> },
];

const user = {
  name: "Tharun",
  email: "tharun@example.com",
  role: "Admin",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// CSV Data
const csvData = stats.map(({ title, value }) => ({
  Title: title,
  Value: value,
}));

const headers = [
  { label: "Title", key: "Title" },
  { label: "Value", key: "Value" },
];

const monthlyrevData = data.map((d) => ({
  name: d.name,
  orders: d.orders,
  revenue: d.revenue,
}));

const Monthly_Revenue = [
  { label: "Month", key: "name" },
  { label: "Orders", key: "orders" },
  { label: "Revenue", key: "revenue" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </div>

      {/* Main Layout */}
      <div className="p-6 flex flex-col-reverse lg:grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="flex flex-col gap-6 w-full lg:col-span-1">
          {/* Profile */}
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 mx-auto mb-2 rounded-full object-cover"
            />
            <h4 className="font-semibold text-gray-700">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.role}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          {/* Date Picker */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-gray-700 font-medium mb-2">📅 Select Date</h4>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* CSV Download Button */}
          <CSVLink
            data={csvData}
            headers={headers}
            filename={"Status.csv"}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 w-50 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            📥 Download Status CSV
          </CSVLink>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-4 flex items-center gap-4 shadow hover:shadow-md transition"
              >
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {stat.value}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <TrendingUp size={18} /> Monthly Revenue
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <CSVLink
                data={monthlyrevData}
                headers={Monthly_Revenue}
                filename={"Monthly_Revenue.csv"}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-sm"
              >
                <span>📥 Download MonthlyRevenue CSV</span>
              </CSVLink>
            </div>

            {/* Orders Chart */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <BarChart3 size={18} /> Monthly Orders
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart and Table */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <Globe size={18} /> Sales by Country
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Channels Table */}
            <div className="bg-white rounded-xl p-4 shadow overflow-auto">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <Activity size={18} /> Top Channels
              </h3>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th className="py-2 px-3">Source</th>
                    <th className="py-2 px-3">Visitors</th>
                    <th className="py-2 px-3">Revenue</th>
                    <th className="py-2 px-3">Sales</th>
                    <th className="py-2 px-3">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {topChannels.map((row, i) => (
                    <tr key={i} className="border-b text-gray-600">
                      <td className="py-2 px-3">{row.source}</td>
                      <td className="py-2 px-3">{row.visitors}</td>
                      <td className="py-2 px-3">{row.revenue}</td>
                      <td className="py-2 px-3">{row.sales}</td>
                      <td className="py-2 px-3">{row.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Clock size={18} /> Recent Orders
            </h3>
            <ul className="divide-y text-sm text-gray-600">
              {["Order #1234", "Order #1233", "Order #1232", "Order #1231"].map((order, idx) => (
                <li key={idx} className="flex justify-between py-2">
                  <span>{order}</span>
                  <span className="text-green-600 font-medium">Completed</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
