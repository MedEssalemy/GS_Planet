import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  Menu,
  Home,
  Settings,
  Calendar,
  BookOpen,
  FileText,
  Users,
  Droplet,
  X,
  User, // Import User icon for Profile
  Bell, // Import Bell icon for Notifications
} from 'lucide-react'
import { IconButton } from '@mui/material'
import DashboardContent from './DashboardContent'
import Configs from './pages/Configs'
import Scheduling from './pages/Scheduling'
import Guides from './pages/Guides'
import Notepad from './pages/Notepad'
import Community from './pages/Community'

const IrrigationDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <span className="font-bold text-lg">Menu</span>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-4">
        <Link
          to="/"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Home size={20} />
          <span className="ml-3">Dashboard</span>
        </Link>
        <Link
          to="/configs"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Settings size={20} />
          <span className="ml-3">Configs</span>
        </Link>
        <Link
          to="/scheduling"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Calendar size={20} />
          <span className="ml-3">Scheduling</span>
        </Link>
        <Link
          to="/guides"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FileText size={20} />
          <span className="ml-3">Guides</span>
        </Link>
        <Link
          to="/notepad"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <BookOpen size={20} />
          <span className="ml-3">Notepad</span>
        </Link>
        <Link
          to="/community"
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Users size={20} />
          <span className="ml-3">Community</span>
        </Link>
      </nav>
    </div>
  )

  return (
    <Router>
      <div className="relative flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-[#1B4D3E] text-white shadow-lg z-30">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-1 hover:bg-[#2C614F] rounded-lg"
                >
                  <Menu size={24} />
                </button>

                <Link to="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold">GS Planet</span>
                  <Droplet size={20} className="text-white" />
                </Link>
              </div>

              {/* Profile and Notifications */}
              <div className="flex items-center gap-3">
                <IconButton aria-label="notifications">
                  <Bell size={20} className="text-white" />{' '}
                  {/* Set Bell icon to white */}
                </IconButton>
                <IconButton aria-label="profile">
                  <User size={20} className="text-white" />{' '}
                  {/* Set Profile icon to white */}
                </IconButton>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/configs" element={<Configs />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/notepad" element={<Notepad />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default IrrigationDashboard
