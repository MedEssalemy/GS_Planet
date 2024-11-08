// TaskList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => (
    <List>
        {/* Placeholder items */}
        <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        }>
            <ListItemText primary="Task 1" secondary="Due on 2024-10-10" />
        </ListItem>
        {/* Add more items */}
    </List>
);

export default TaskList;

