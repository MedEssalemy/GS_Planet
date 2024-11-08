import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const ReminderModal = ({ isOpen, onClose, onSetReminder }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null)

  const handleSave = () => {
    onSetReminder(selectedDateTime) // Pass the selected date and time back to the parent
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Select Reminder Time</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Reminder Date & Time"
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!selectedDateTime}
        >
          Set Reminder
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReminderModal
