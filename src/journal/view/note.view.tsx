import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInputText, ImageGallery } from 'src/UI/components';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { selectUI, setMessage } from 'src/store/UI/UI-slice';
import { IActive } from 'src/store/interfaces';
import {
  selectJournal,
  selectSizeActiveImages,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from 'src/store/journal';

export const NoteView = () => {
  const { active: note, isSaving } = useAppSelector(selectJournal);
  const { message } = useAppSelector(selectUI);
  const numberActiveImages = useAppSelector(selectSizeActiveImages) || 0;
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeNote = note ?? {
    body: '',
    title: '',
    id: '',
    date: Timestamp.now().toMillis(),
    imagesUrls: [],
  };

  const defaultValues = {
    body: activeNote.body,
    date: new Date(activeNote.date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    title: activeNote.title,
  };
  const { formState, control, watch } = useForm({
    defaultValues: defaultValues,
    values: defaultValues,
  });

  const { isValid } = formState;

  const { date, body, title } = watch();

  const isLoading = useMemo(() => title.length === 0, [title]);

  useEffect(() => {
    const newActiveNote: IActive = { ...activeNote, date: activeNote.date, body, title };
    dispatch(setActiveNote(newActiveNote));
  }, [body, title]);

  useEffect(() => {
    if (message) {
      // MySwal.fire(message.title, message.body, 'success');
      dispatch(setMessage({ message: null }));
    }
  }, [message]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.files) {
      dispatch(startUploadingFiles(target.files));
    }
  };
  return (
    <>
      <Grid
        container
        className="animate__animated animate__fadeIn animate__faster"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        {isLoading ? (
          <Typography fontSize={39} width="100%" fontWeight="light" variant="h2">
            <Skeleton height={49} width="100%" />
          </Typography>
        ) : (
          <Grid item>
            <Typography fontSize={39} fontWeight="light" variant="h2">
              {date}
            </Typography>
          </Grid>
        )}

        <Grid item>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onFileInputChange}
            style={{ display: 'none' }}
          />
          <IconButton
            color="primary"
            disabled={isSaving || !isValid || numberActiveImages >= 10}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadOutlined />
          </IconButton>
          <Button
            color="primary"
            sx={{ padding: 2 }}
            disabled={isSaving || !isValid}
            onClick={onSaveNote}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Save
          </Button>
        </Grid>

        <Grid container>
          <FormInputText
            name="title"
            label="Title"
            type="text"
            control={control}
            sx={{ border: 'none', mb: 1 }}
            rules={{
              required: 'Title is empty',
            }}
          />

          <FormInputText
            name="body"
            label="Write your dream..."
            type="text"
            control={control}
            placeholder="Write your dream..."
            multiline
            aria-multiline
            minRows={5}
            rules={{
              required: 'Title is empty',
            }}
          />
        </Grid>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography fontSize={15} sx={{ mt: 2 }} fontWeight="light" textTransform="capitalize">
              Max. 10 images (Less than 1Mb each)
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleClickOpen} sx={{ mt: 2 }} color="error">
              <DeleteOutline />
              Delete
            </Button>
          </Grid>
        </Grid>

        <ImageGallery images={activeNote.imagesUrls} />
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            formData.get('title')?.toString() || '';

            handleClose();
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{'Delete note?'}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wanna delete your note?. You can't recover it afterwards.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={onDeleteNote} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
