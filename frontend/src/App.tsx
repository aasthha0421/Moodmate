import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MoodProvider } from './context/MoodContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import LogMood from './pages/LogMood';
import History from './pages/History';
import Insights from './pages/Insights';
import About from './pages/About';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router>
          <Toaster position="top-right" reverseOrder={false} />
          
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            {/* ✅ Fix nesting by using ProtectedRoute with Outlet */}
            <Route path="/app" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="log-mood" element={<LogMood />} />
                <Route path="history" element={<History />} />
                <Route path="insights" element={<Insights />} />
                <Route path="about" element={<About />} />
              </Route>
            </Route>
              {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
          </Routes>
        </Router>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;
