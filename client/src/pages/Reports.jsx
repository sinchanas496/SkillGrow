// client/src/pages/Reports.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

import api from "../api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#FACC15", "#EF4444", "#3B82F6"];


export default function Reports() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get("/logs"); // get study logs
        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, []);

  // --- Process Logs ---
  const totalMinutes = logs.reduce((sum, log) => sum + (log.minutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Time per subject
  const subjectData = Object.values(
    logs.reduce((acc, log) => {
      if (!acc[log.subject]) acc[log.subject] = { name: log.subject, value: 0 };
      acc[log.subject].value += log.minutes || 0;
      return acc;
    }, {})
  );

  // Confidence over time
  const confidenceData = Object.values(
    logs.reduce((acc, log) => {
      const date = new Date(log.date).toLocaleDateString();
      if (!acc[date]) acc[date] = { date, total: 0, count: 0 };
      acc[date].total += log.confidence;
      acc[date].count += 1;
      return acc;
    }, {})
  ).map(d => ({ date: d.date, confidence: (d.total / d.count).toFixed(2) }));

  // Most studied subject
  const mostStudied = subjectData.length
    ? subjectData.sort((a, b) => b.value - a.value)[0].name
    : "N/A";

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">📊 Study Reports</h1>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold">⏱️ Total Hours</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalHours} hrs</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold">📖 Most Studied Subject</h2>
          <p className="text-2xl font-bold text-green-600">{mostStudied}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold">🔥 Current Streak</h2>
          <p className="text-2xl font-bold text-red-500">Coming soon</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Time per Subject */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">⏳ Time Spent per Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                dataKey="value"
                nameKey="name"
                cx="50%" cy="50%"
                outerRadius={100}
                label
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence Trend */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">📈 Confidence Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="confidence" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
