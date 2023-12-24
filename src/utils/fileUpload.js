// Firebase functions
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebaseConfig";

async function uploadFile(folder,fileName,file){
    return new Promise((resolve, reject) => {
        const storage = getStorage(app); // Firebase storage object
        const storageRef = ref(storage, `${folder}/${fileName}`); // Upload path: "tasks/{task_id}/{user_id}/{file_name}"
    
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // ... your existing code for progress and state change
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error.message);
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                // Store image URL in the database
                console.log("File available at", downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error);
              });
          }
        );
      });
}

export default uploadFile;