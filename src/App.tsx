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
      <Routes>
        <Route
          path="/"
          element={
            <ContentProvider defaultNS="1">
              <HomePage />
            </ContentProvider>
          }
        />

        <Route
          path="/about"
          element={
            <ContentProvider defaultNS="2">
              <AboutPage />
            </ContentProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
