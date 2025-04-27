import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContractFormPage from './pages/ContractFormPage';
import PreviewPage from './pages/PreviewPage';
import ProfilePage from './pages/ProfilePage';
import AssistantPage from './pages/AssistantPage';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<ContractFormPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;