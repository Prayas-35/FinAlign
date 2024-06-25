import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  HomePage  from './pages/HomePage/HomePage';
import  LoginPage  from './pages/Authentication/LoginPage/LoginPage';
import  SignupPage  from './pages/Authentication/SignupPage/SignupPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
