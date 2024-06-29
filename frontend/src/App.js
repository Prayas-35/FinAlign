import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/Authentication/SignupPage/SignupPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./context/UserContext.jsx";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard/>
              }
            />
          </Routes>
        </Router>
      </UserProvider>

    </div>
  );
}

export default App;
