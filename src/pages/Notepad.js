// Notepad.js
import React, { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TaskList from './TaskList'
import NotesList from './NotesList'
import AddNoteOrTaskModal from './AddNoteOrTaskModal'

const NotepadPage = () => {
  const [isNotesView, setIsNotesView] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Notepad</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          {isNotesView ? 'Add Note' : 'Add Task'}
        </Button>
      </Grid>
      <Divider />

      {/* Improved Toggle Button Layout */}
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <ButtonGroup variant="outlined" color="primary">
          <Button
            variant={isNotesView ? 'contained' : 'outlined'}
            onClick={() => setIsNotesView(true)}
          >
            Notes
          </Button>
          <Button
            variant={!isNotesView ? 'contained' : 'outlined'}
            onClick={() => setIsNotesView(false)}
          >
            Tasks
          </Button>
        </ButtonGroup>
      </Grid>

      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        {isNotesView ? <NotesList /> : <TaskList />}
      </Paper>

      <AddNoteOrTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isNotesView={isNotesView}
      />
    </Container>
  )
}

export default NotepadPage
