import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { Alert, AlertTitle } from '@mui/material';
import { Droplet, Power, Thermometer } from 'lucide-react';

const DashboardContent = () => {
  const [irrigationMode, setIrrigationMode] = useState('auto');
  const [isPumpActive, setIsPumpActive] = useState(true);

  const wateringHistory = [
    { day: 'Mon', minutes: 30, temp: 25, humidity: 65 },
    { day: 'Tue', minutes: 25, temp: 27, humidity: 60 },
    { day: 'Wed', minutes: 35, temp: 24, humidity: 70 },
    { day: 'Thu', minutes: 20, temp: 26, humidity: 63 },
    { day: 'Fri', minutes: 40, temp: 28, humidity: 58 },
    { day: 'Sat', minutes: 30, temp: 25, humidity: 65 },
    { day: 'Sun', minutes: 35, temp: 26, humidity: 62 },
  ];

  const zones = [
    { id: 1, name: 'Front Lawn', active: true, moisture: 75 },
    { id: 2, name: 'Back Garden', active: false, moisture: 45 },
    { id: 3, name: 'Vegetable Patch', active: true, moisture: 80 },
    { id: 4, name: 'Flower Bed', active: false, moisture: 60 },
  ];

  return (
    <div>
      {/* Alert */}
      <Alert severity="warning" className="mb-4">
        <AlertTitle>Low Moisture Alert</AlertTitle>
        Zone 2 (Back Garden) moisture level is below 50%.
      </Alert>

      {/* Mode Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="font-semibold mb-3">Irrigation Mode</h3>
        <div className="grid grid-cols-3 gap-2">
          {['auto', 'manual', 'scheduled'].map((mode) => (
            <button
              key={mode}
              onClick={() => setIrrigationMode(mode)}
              className={`py-2 px-3 rounded-lg capitalize text-sm ${
                irrigationMode === mode
                  ? 'bg-[#1B4D3E] text-white'
                  : 'bg-gray-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Pump State */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2 text-sm">Pump Status</h3>
          <div className="flex items-center gap-2">
            <Power size={20} className={`${isPumpActive ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`text-sm ${isPumpActive ? 'text-green-500' : 'text-gray-400'}`}>
              {isPumpActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Current Conditions */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2 text-sm">Current Conditions</h3>
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-red-500" />
              <span className="text-sm">28°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet size={16} className="text-blue-500" />
              <span className="text-sm">65%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zones */}
      <div className="mb-4">
        <h3 className="font-semibold mb-3">Zone Status</h3>
        <div className="flex flex-col gap-3">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">{zone.name}</span>
                <div className={`h-3 w-3 rounded-full ${zone.active ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Droplet size={16} className="text-blue-500" />
                <span className="text-sm">{zone.moisture}% moisture</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        {/* Watering History */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Watering History</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wateringHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#1B4D3E" name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature & Humidity History */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Temperature & Humidity History</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wateringHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#ef4444" name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#1B4D3E" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
