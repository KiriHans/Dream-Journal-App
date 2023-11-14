import { ref, uploadBytesResumable } from 'firebase/storage';
import { fbStorage } from 'src/firebase/config';

export const fileUpload = async (file: File, userId: string) => {
  // Upload file
  const imagesRef = ref(fbStorage, `images/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(imagesRef, file);

  return uploadTask;

  // Listen for state changes, errors, and completion of the upload.
  // uploadTask.on('state_changed', next, error, complete);
};
