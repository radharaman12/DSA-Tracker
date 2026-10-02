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

              {/* Protected Routes (Requires Login/Signup) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/sheet" 
                element={
                  <ProtectedRoute>
                    <SheetPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/data-structures" 
                element={
                  <ProtectedRoute>
                    <DataStructuresPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/arrays" 
                element={
                  <ProtectedRoute>
                    <ArrayPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/linked-list" 
                element={
                  <ProtectedRoute>
                    <LinkedListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/stack" 
                element={
                  <ProtectedRoute>
                    <StackPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/queue" 
                element={
                  <ProtectedRoute>
                    <QueuePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tree" 
                element={
                  <ProtectedRoute>
                    <TreePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/graph" 
                element={
                  <ProtectedRoute>
                    <GraphPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/algorithms" 
                element={
                  <ProtectedRoute>
                    <Visualizer />
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
