// AddNoteOrTaskModal.js
import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from '@mui/material'
import ReminderModal from './ReminderModal' // New component for the reminder time selection

const AddNoteOrTaskModal = ({ isOpen, onClose, isNotesView }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [reminder, setReminder] = useState(null) // Stores the reminder date and time
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) // Set image preview
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const newEntry = {
      title,
      description,
      reminder: isNotesView ? null : reminder, // Only save reminder for tasks
      image: isNotesView ? image : null,
    }
    console.log('New Entry:', newEntry)
    onClose() // Close modal after saving
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isNotesView ? 'Add Note' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
        />

        {/* Reminder Button (only for tasks) */}
        {!isNotesView && (
          <div style={{ marginTop: '16px' }}>
            <Button
              variant="outlined"
              onClick={() => setIsReminderModalOpen(true)}
            >
              {reminder
                ? `Reminder: ${reminder.toLocaleString()}`
                : 'Set Reminder'}
            </Button>
          </div>
        )}

        {/* Image Upload Section (only for notes) */}
        {isNotesView && (
          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>

      {/* Reminder Modal for Task */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSetReminder={setReminder}
      />
    </Dialog>
  )
}

export default AddNoteOrTaskModal
