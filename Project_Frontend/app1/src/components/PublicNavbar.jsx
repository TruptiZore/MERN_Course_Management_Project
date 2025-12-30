import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PublicNavbar() {
  const navigate = useNavigate();
  
  // 1. State to manage theme (defaults to 'dark' or retrieves from local storage)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // 2. Effect to apply the theme to the HTML body whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Toggle Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'} mb-5 shadow-sm sticky-top`}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-3">
            {/* If the icon below is invisible, you can also replace it with an emoji like 🎓 */}
            <i className="bi bi-mortarboard-fill me-2"></i> 
            InternSphere
        </span>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="publicNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
          
          {/* --- THEME TOGGLE BUTTON (Updated with Emojis) --- */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-outline-secondary me-3 d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? (
                <span style={{ fontSize: '1.2rem' }}>☀️</span> 
            ) : (
                <span style={{ fontSize: '1.2rem' }}>🌙</span> 
            )}
          </button>
          
          <button 
            onClick={() => navigate('/login')} 
            className="btn btn-primary px-4 rounded-pill" 
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;