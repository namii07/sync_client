import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";
import "./errorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-illustration">
          <div className="error-code">404</div>
          <div className="error-emoji">🌸</div>
        </div>
        
        <div className="error-content">
          <h1>Oops! Page Not Found</h1>
          <p>
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </p>
          
          <div className="error-actions">
            <Link to="/" className="action-btn primary">
              <Home size={20} />
              Go Home
            </Link>
            
            <button onClick={handleGoBack} className="action-btn secondary">
              <ArrowLeft size={20} />
              Go Back
            </button>
            
            <button onClick={handleRefresh} className="action-btn secondary">
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
          
          <div className="error-suggestions">
            <h3>What you can do:</h3>
            <ul>
              <li>Check the URL for typos</li>
              <li>Go back to the previous page</li>
              <li>Visit our <Link to="/">homepage</Link></li>
              <li>Explore <Link to="/explore">trending content</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="error-footer">
        <p>Still having trouble? <Link to="/settings">Contact support</Link></p>
      </div>
    </div>
  );
};

export default ErrorPage;