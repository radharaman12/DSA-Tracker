import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visualizer from './algorithms/components/Visualizer';
import ArrayPage from './data-structures/ArrayPage';
import LinkedListPage from './data-structures/LinkedListPage';
import DataStructuresPage from './pages/DataStructuresPage';
import StackPage from './data-structures/StackPage';
import QueuePage from './data-structures/QueuePage';
import TreePage from './data-structures/TreePage';
import GraphPage from './data-structures/GraphPage';

function App() {
  // Guarantee the user's browser clears any leftover dark theme cache
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-structures" element={<DataStructuresPage />} />
            <Route path="/arrays" element={<ArrayPage />} />
            <Route path="/linked-list" element={<LinkedListPage />} />
            <Route path="/stack" element={<StackPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/algorithms" element={<Visualizer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
