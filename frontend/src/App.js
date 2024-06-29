import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/Authentication/SignupPage/SignupPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute> <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute> <SignupPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute> <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>

    </div>
  );
}

export default App;
