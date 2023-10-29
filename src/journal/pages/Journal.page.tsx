import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/journal.layout';
import { NoteView, NothingSelectedView } from '../view';
import { AddOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { startNewNote } from 'src/store/journal';

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state) => state.journal);

  const onClickNewNote = () => {
    if (isSaving) return;
    dispatch(startNewNote());
  };

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
