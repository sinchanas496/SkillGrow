// client/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../api.js";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subject: "",
    topic: "",
    minutes: "",
    confidence: 3,
    note: "",
  });

  // Fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/logs");
        setLogs(res.data);
      } catch (err) {
        setError("Failed to fetch logs.");
      }
    };
    fetchLogs();
  }, []);

  // Handle form changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Save new log
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/logs", form);
      setLogs([res.data, ...logs]); // add new log to list
      setForm({ subject: "", topic: "", minutes: "", confidence: 3, note: "" });
      setError("");
    } catch (err) {
      setError("Failed to save log.");
    }
  };

  // Stats
  const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);

  return (
    <div>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stats */}
        <div className="p-6 rounded-2xl bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">📊 Your Stats</h2>
          <p className="text-gray-700">Total Logs: {logs.length}</p>
          <p className="text-gray-700">Total Study Time: {totalMinutes} mins</p>
        </div>

        {/* Add Study Log */}
        <div className="p-6 rounded-2xl bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">✍️ Add Study Log</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="topic"
              placeholder="Topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="minutes"
              placeholder="Minutes studied"
              value={form.minutes}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <select
              name="confidence"
              value={form.confidence}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value={1}>😟 Poor</option>
              <option value={2}>😕 Fair</option>
              <option value={3}>😊 Good</option>
              <option value={4}>😃 Great</option>
              <option value={5}>🔥 Excellent</option>
            </select>
            <textarea
              name="note"
              placeholder="Notes..."
              value={form.note}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-lg py-2 hover:bg-indigo-600 transition"
            >
              Save Log
            </button>
          </form>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📚 Recent Study Logs</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs yet. Start studying! 🚀</p>
        ) : (
          <ul className="space-y-3">
            {logs.map((log) => (
              <li
                key={log._id}
                className="p-4 rounded-lg bg-gray-50 shadow-md border"
              >
                <p className="font-semibold">{log.subject} — {log.topic}</p>
                <p className="text-sm text-gray-600">
                  {log.minutes} mins | Confidence: {log.confidence}/5
                </p>
                {log.note && <p className="italic text-gray-500">“{log.note}”</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
