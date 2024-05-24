import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from '@mui/material';
import { JournalLayout } from '../layout/journal.layout';
import { AddOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { selectJournal, selectNoteById, setActiveNote, startNewNote } from 'src/store/journal';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { selectUI, setToast } from 'src/store/UI/UI-slice';

export const JournalPage = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { isSaving, error } = useAppSelector(selectJournal);
  const { isModalOpen } = useAppSelector(selectUI);

  const { id } = useParams();
  const noteFromId = useAppSelector(selectNoteById(id));

  useEffect(() => {
    if (noteFromId) {
      dispatch(setActiveNote(noteFromId));
    }
  }, [noteFromId]);

  useEffect(() => {
    if (error && error.length > 0) {
      dispatch(setToast({ isModalOpen: true }));
    }
  }, [error]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseToast = () => {
    dispatch(setToast({ isModalOpen: false }));
  };

  const onClickNewNote = (title: string) => {
    if (isSaving) return;
    dispatch(startNewNote({ title: title ?? '' }));
  };

  return (
    <JournalLayout>
      <Outlet />

      <IconButton
        disabled={isSaving}
        onClick={handleClickOpen}
        size="large"
        sx={{
          'color': 'white',
          'backgroundColor': 'error.main',
          'position': 'fixed',
          'right': 50,
          'bottom': 50,
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            onClickNewNote(formData.get('title')?.toString() || '');

            handleClose();
          },
        }}
      >
        <DialogTitle>New Note</DialogTitle>

        <DialogContent>
          Create a new note
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create!</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={isModalOpen} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" variant="filled" sx={{ width: '100%' }}>
          There was an error: {error}
        </Alert>
      </Snackbar>
    </JournalLayout>
  );
};
