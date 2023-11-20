import { deleteObject, ref } from 'firebase/storage';
import { fbStorage } from 'src/firebase/config';

export const fileDelete = async (nameImage: string, noteId: string | undefined, userId: string) => {
  const imagesRef = ref(fbStorage, `images/${userId}/${noteId || 'common'}/${nameImage}`);

  return deleteObject(imagesRef);
};
