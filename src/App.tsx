import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContentProvider } from './i18n/ContentProvider';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </ContentProvider>
    </Router>
  );
};

export default App;
