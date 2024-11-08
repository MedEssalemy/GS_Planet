import React, { useState } from 'react'
import {
  Switch,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from '@mui/material'

const Configs = () => {
  const [irrigationMode, setIrrigationMode] = useState('auto')
  const [isPumpEnabled, setIsPumpEnabled] = useState(true)
  const [flowRate, setFlowRate] = useState(50) // Flow rate in percentage
  const [valveStates, setValveStates] = useState({
    valve1: true,
    valve2: false,
    valve3: true,
    valve4: false,
  })

  // Handler for valve toggle
  const handleValveToggle = (valve) => {
    setValveStates((prevStates) => ({
      ...prevStates,
      [valve]: !prevStates[valve],
    }))
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Configuration Settings</h2>

      {/* Modes Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Irrigation Mode</h3>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Mode</InputLabel>
          <Select
            value={irrigationMode}
            onChange={(e) => setIrrigationMode(e.target.value)}
            label="Mode"
          >
            <MenuItem value="auto">Automatic</MenuItem>
            <MenuItem value="manual">Manual</MenuItem>
            <MenuItem value="rain_delay">Rain Delay</MenuItem>
          </Select>
        </FormControl>
        {irrigationMode === 'rain_delay' && (
          <Typography variant="body2" color="textSecondary" className="mt-2">
            Rain delay mode temporarily pauses irrigation to avoid overwatering
            during rainy periods.
          </Typography>
        )}
      </div>

      {/* Pump Control Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Pump Control</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm">Enable Pump:</p>
          <Switch
            checked={isPumpEnabled}
            onChange={(e) => setIsPumpEnabled(e.target.checked)}
            color="primary"
          />
        </div>
        <Button
          variant="contained"
          color={isPumpEnabled ? 'primary' : 'secondary'}
          className="mt-4"
          disabled={!isPumpEnabled}
        >
          {isPumpEnabled ? 'Pump is Active' : 'Pump is Disabled'}
        </Button>
      </div>

      {/* Water Flow Rate Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Water Flow Rate</h3>
        <p className="mb-2 text-sm">
          Adjust the water flow rate for precise irrigation:
        </p>
        <Slider
          value={flowRate}
          onChange={(e, newValue) => setFlowRate(newValue)}
          aria-labelledby="flow-rate-slider"
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
        <Typography variant="body2" className="mt-2">
          Flow Rate: {flowRate}%
        </Typography>
      </div>

      {/* Valves Control Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Valves Control</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(valveStates).map((valve, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <span className="text-sm font-medium">Valve {index + 1}</span>
              <Switch
                checked={valveStates[valve]}
                onChange={() => handleValveToggle(valve)}
                color="primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Configs
