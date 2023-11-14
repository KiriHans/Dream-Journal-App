import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { ChangeEventHandler, useEffect, useRef } from 'react';
import { ImageGallery } from 'src/UI/components';
import { IFormValidation, useForm } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppDispatch';
import { IActive } from 'src/store/interfaces';
import {
  selectJournal,
  selectSizeActiveImages,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from 'src/store/journal';
import { maximumLengthValidator, notEmpty } from 'src/utilities/validators';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const NoteView = () => {
  const { active: note, messageSaved, isSaving } = useAppSelector(selectJournal);
  const numberActiveImages = useAppSelector(selectSizeActiveImages) || 0;
  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeNote = note ?? {
    body: '',
    title: '',
    id: '',
    date: Timestamp.now().toMillis(),
    imagesUrls: [],
  };

  const formValidations: IFormValidation = {
    title: [notEmpty, 'Title is empty'],
    body: [maximumLengthValidator(10000), 'Body is too long'],
  };

  const {
    body: bodyNote,
    date: dateNote,
    title: titleNote,
    formState,
    validations,
    onInputChange,
    onResetForm,
  } = useForm(
    {
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
    },
    formValidations
  );
  Timestamp.toString;
  const { checkedValidation, isFormValid } = validations;

  useEffect(() => {
    onResetForm();
  }, [note]);

  useEffect(() => {
    const newActiveNote: IActive = { ...activeNote, ...formState, date: activeNote.date };
    dispatch(setActiveNote(newActiveNote));
  }, [bodyNote, dateNote, titleNote]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      MySwal.fire('Note saved', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingNote());
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.files) {
      dispatch(startUploadingFiles(target.files));
    }
  };

  return (
    <Grid
      container
      className="animate__animated animate__fadeIn animate__faster"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateNote}
        </Typography>
      </Grid>

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
          disabled={isSaving || !isFormValid || numberActiveImages >= 10}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          disabled={isSaving || !isFormValid}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write your title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          error={!!checkedValidation[`titleValid`]}
          helperText={checkedValidation[`titleValid`]}
          value={titleNote}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          aria-multiline
          placeholder="Write your dream..."
          minRows={5}
          name="body"
          error={!!checkedValidation[`bodyValid`]}
          helperText={checkedValidation[`bodyValid`]}
          value={bodyNote}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography fontSize={15} sx={{ mt: 2 }} fontWeight="light" textTransform="capitalize">
            Max. 10 images.
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
            <DeleteOutline />
            Delete
          </Button>
        </Grid>
      </Grid>

      <ImageGallery images={activeNote.imagesUrls} />
    </Grid>
  );
};
