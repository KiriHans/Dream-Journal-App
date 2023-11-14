import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/journal.layout';
import { AddOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { selectJournal, startNewNote } from 'src/store/journal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { NoteView, NothingSelectedView } from '../view';
import { useEffect } from 'react';

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active, error } = useAppSelector(selectJournal);
  const MySwal = withReactContent(Swal);

  const onClickNewNote = () => {
    if (isSaving) return;
    MySwal.fire<string>({
      title: 'New Note: Title',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on',
        required: '',
      },
      confirmButtonAriaLabel: 'Create button',
      inputValidator: (result) => !result && 'Title is obligatory',
      showCancelButton: true,
      confirmButtonText: 'Create!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startNewNote({ title: result.value ?? '' }));
      }
    });
  };

  useEffect(() => {
    if (error && error.length > 0) {
      MySwal.fire('There was an error', error, 'error');
    }
  }, [error]);

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
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
    </JournalLayout>
  );
};
