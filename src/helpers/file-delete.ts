import { deleteObject, ref } from 'firebase/storage';
import { fbStorage } from 'src/firebase/config';

export const fileDelete = async (nameImage: string, userId: string) => {
  const imagesRef = ref(fbStorage, `images/${userId}/${nameImage}`);

  return deleteObject(imagesRef);
};
