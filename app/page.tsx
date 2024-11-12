"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WorkItemTable from '@/container Components/project/project';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Project Portal</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={() => navigate('/project')}
      >
        Go to Project View
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<WorkItemTable projectId='0e63a6cf-01ec-4354-98ff-f8a680f71838' />} />
      </Routes>
    </Router>
  );
}