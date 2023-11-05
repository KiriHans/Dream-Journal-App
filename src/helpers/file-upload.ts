import { ref, uploadBytesResumable } from 'firebase/storage';
import { fbStorage } from 'src/firebase/config';

export const fileUpload = async (file: File) => {
  // Upload file
  const imagesRef = ref(fbStorage, `images${file.name}`);
  const uploadTask = uploadBytesResumable(imagesRef, file);

  return uploadTask;

  // Listen for state changes, errors, and completion of the upload.
  // uploadTask.on('state_changed', next, error, complete);
};
