import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const Scheduling = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const [timeSlots, setTimeSlots] = useState({})
  const [duration, setDuration] = useState(15) // Default duration in minutes

  // Toggle selected days
  const handleDayToggle = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    )
  }

  // Add a time slot for selected days
  const addTimeSlot = () => {
    selectedDays.forEach((day) => {
      setTimeSlots((prevSlots) => ({
        ...prevSlots,
        [day]: [...(prevSlots[day] || []), { time: '', duration }],
      }))
    })
  }

  // Update time for a specific day and slot
  const handleTimeChange = (day, index, value) => {
    setTimeSlots((prevSlots) => ({
      ...prevSlots,
      [day]: prevSlots[day].map((slot, i) =>
        i === index ? { ...slot, time: value } : slot
      ),
    }))
  }

  // Update duration for a specific day and slot
  const handleDurationChange = (day, index, value) => {
    setTimeSlots((prevSlots) => ({
      ...prevSlots,
      [day]: prevSlots[day].map((slot, i) =>
        i === index ? { ...slot, duration: value } : slot
      ),
    }))
  }

  // Remove a time slot
  const removeTimeSlot = (day, index) => {
    setTimeSlots((prevSlots) => ({
      ...prevSlots,
      [day]: prevSlots[day].filter((_, i) => i !== index),
    }))
  }

  // Clear all schedules
  const clearAllSchedules = () => {
    setSelectedDays([])
    setTimeSlots({})
  }

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Schedule Irrigation
      </Typography>

      {/* Day Selector */}
      <div className="mb-4">
        <Typography variant="h6">Select Days</Typography>
        <div className="flex gap-3 flex-wrap mt-2">
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
              }
              label={day}
            />
          ))}
        </div>
      </div>

      {/* Add Time Slot */}
      <div className="mb-4">
        <Typography variant="h6">Set Time Slots</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          onClick={addTimeSlot}
          disabled={selectedDays.length === 0}
        >
          Add Time Slot
        </Button>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          Select the days above and click "Add Time Slot" to schedule watering
          times.
        </Typography>
      </div>

      {/* Time Slots Display */}
      {Object.keys(timeSlots).length > 0 && (
        <div className="mb-4">
          <Typography variant="h6">Weekly Schedule</Typography>
          {daysOfWeek.map(
            (day) =>
              timeSlots[day]?.length > 0 && (
                <div key={day} className="mt-4">
                  <Typography variant="subtitle1">{day}</Typography>
                  {timeSlots[day].map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                      <TextField
                        label="Start Time"
                        type="time"
                        value={slot.time}
                        onChange={(e) =>
                          handleTimeChange(day, index, e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }} // 5 min intervals
                      />
                      <TextField
                        label="Duration (min)"
                        type="number"
                        value={slot.duration}
                        onChange={(e) =>
                          handleDurationChange(day, index, e.target.value)
                        }
                        InputProps={{ inputProps: { min: 1, max: 120 } }}
                      />
                      <IconButton
                        color="secondary"
                        onClick={() => removeTimeSlot(day, index)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6">
        <Button
          variant="contained"
          color="secondary"
          onClick={clearAllSchedules}
        >
          Clear All Schedules
        </Button>
      </div>
    </div>
  )
}

export default Scheduling
