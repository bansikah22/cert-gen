import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CertificateForm from './components/CertificateForm';
import CertificateList from './components/CertificateList';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import styles from './App.module.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (e.g., by checking localStorage)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.logo}>Bansico</Link>
            <ul className={styles.navLinks}>
              <li><Link to="/">Home</Link></li>
              {user && (
                <>
                  <li><Link to="/certificates">Certificates</Link></li>
                  <li><Link to="/create">Generate Certificate</Link></li>
                </>
              )}
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {!user ? (
                <>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              ) : (
                <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
              )}
            </ul>
          </div>
        </nav>

        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/certificates" element={user ? <CertificateList /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CertificateForm /> : <Navigate to="/login" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;