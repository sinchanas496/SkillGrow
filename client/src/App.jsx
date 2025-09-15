import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MoodQuest from "./pages/MoodQuest.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import Reports from "./pages/Reports.jsx";
import Streaks from "./pages/Streaks.jsx";
import SuggestionPage from "./pages/SuggestionPage.jsx";

// Protect routes that need auth
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to /home if logged in, else /auth */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Public route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <MoodQuest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pomodoro"
          element={
            <ProtectedRoute>
              <Pomodoro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/streaks"
          element={
            <ProtectedRoute>
              <Streaks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suggestions"
          element={
            <ProtectedRoute>
              <SuggestionPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
