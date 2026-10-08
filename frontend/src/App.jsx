import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SheetPage from './pages/SheetPage';
import Visualizer from './algorithms/components/Visualizer';
import ArrayPage from './data-structures/ArrayPage';
import LinkedListPage from './data-structures/LinkedListPage';
import DataStructuresPage from './pages/DataStructuresPage';
import StackPage from './data-structures/StackPage';
import QueuePage from './data-structures/QueuePage';
import TreePage from './data-structures/TreePage';
import GraphPage from './data-structures/GraphPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/sheet" element={<SheetPage />} />
              <Route path="/data-structures" element={<DataStructuresPage />} />
              <Route path="/arrays" element={<ArrayPage />} />
              <Route path="/linked-list" element={<LinkedListPage />} />
              <Route path="/stack" element={<StackPage />} />
              <Route path="/queue" element={<QueuePage />} />
              <Route path="/tree" element={<TreePage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/algorithms" element={<Visualizer />} />

              {/* Protected Routes (Requires Login/Signup) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
