import { firebaseApp } from "@/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadImages = async (images: File[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, "images");
    const imagesUploadResponses = await Promise.all(
      images.map((image) => uploadBytes(storageRef, image))
    );

    const urls = await Promise.all(
      imagesUploadResponses.map((imageUploadResponse) => {
        return getDownloadURL(imageUploadResponse.ref);
      })
    );
    return urls;
  } catch (error) {
    throw error;
  }
};

export const deleteImages = async (images: string[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const deleteResponses = await Promise.all(
      images.map((image) => deleteObject(ref(storage, image)))
    );
    return deleteResponses;
  } catch (error) {
    throw error;
  }
};
