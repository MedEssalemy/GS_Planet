// NotesList.js
import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const NotesList = ({ notes }) => (
  <List>
    {(notes || []).map((note, index) => (
      <ListItem
        key={index}
        alignItems="flex-start"
        style={{ flexDirection: 'column' }}
      >
        <ListItemText
          primary={note.title}
          secondary={note.description}
          style={{ marginBottom: note.image ? '8px' : '0' }}
        />
        {note.image && (
          <img
            src={URL.createObjectURL(note.image)}
            alt="Note"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              marginTop: '8px',
            }}
          />
        )}
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
)

export default NotesList
