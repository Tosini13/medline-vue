import { DocumentType } from "@/types";
import { formatFileName } from "@/utils/utils";
import {
  FirebaseStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

export const uploadDocument = async (
  storage: FirebaseStorage,
  file: File,
  path: string,
  onStateChanged: (snapshot: UploadTaskSnapshot) => void,
): Promise<DocumentType> => {
  const fileName = formatFileName(file.name);
  const storageRef = ref(storage, `${path}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type || "application/octet-stream",
  });

  uploadTask.on("state_changed", onStateChanged, (error) => {
    switch (error.code) {
      case "storage/unauthorized":
        console.error("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.error("User canceled the upload");
        break;
      case "storage/unknown":
        console.error("Unknown error occurred, inspect error.serverResponse");
        break;
    }
  });

  const snapshot = await uploadTask;

  return {
    name: file.name,
    path: snapshot.ref.fullPath,
    type: file.type,
  };
};
