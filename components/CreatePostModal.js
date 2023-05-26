import { db, storage } from "@/firebase";
import { closePostModal, openPostModal } from "@/redux/commentModalSlice";
import {
  PhotoIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreatePostModal() {
  const isOpen = useSelector(s => s.modal.postModal)
  const [postImage, setPostImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false)
  const postImageRef = useRef(null);

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  async function uploadPost(){
    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      image: null,
      caption: caption,
      username: user.username,
      photoUrl: user.photoUrl,
      timestamp: serverTimestamp(),
      uid: user.uid, 
      likes: [], 
      comments: []
    })

    const imageRef = ref(storage, docRef.id);
    await uploadString(imageRef, postImage, "data_url");
    const downloadUrl = await getDownloadURL(imageRef);

    await updateDoc(doc(db, "posts", docRef.id), {
      image: downloadUrl
    })

    setPostImage(null)
    setCaption("")
    setLoading(false)
    dispatch(closePostModal())
  }

  function addPostImage(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.addEventListener("load", (e) => {
      setPostImage(e.target.result);
    });
  }

  return (
    <div>
      <div
        onClick={() => dispatch(openPostModal())}
        className="bg-white flex items-center space-x-3 py-3 cursor-pointer hover:bg-black hover:bg-opacity-5 rounded-xl pl-6"
      >
        <PlusCircleIcon className="w-8 h-8" />
        <h3>Create</h3>
      </div>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closePostModal())}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full md:h-[700px] md:w-[900px] bg-white flex justify-center items-center relative">
          <XMarkIcon
            onClick={() => dispatch(closePostModal())}
            className="w-7 absolute right-0 top-0 mr-2 mt-2 cursor-pointer"
          />
          <div>

            <div className={`flex flex-col items-center`}>
            {postImage && <img className="object-cover max-h-[300px] mb-4" src={postImage} />}
              <PhotoIcon className={`${postImage && "hidden"} w-[180px]`} />
              <button
                onClick={() => postImageRef?.current.click()}
                className="bg-blue-500 rounded-lg w-[160px] text-white text-[14px] py-1"
              >
                {postImage ? "Change Photo" : "Choose Photo"}
              </button>
              <input
                onChange={addPostImage}
                hidden
                ref={postImageRef}
                type="file"
              />
            </div>
            <div className="mt-8">
              <label className="text-[14px]">Caption</label>
              <br />
              <textarea 
              onChange={(e) => setCaption(e.target.value)}
              className="border resize-none focus:outline-none border-gray-500 rounded-lg w-[300px] sm:w-[400px] text-[14px] p-2 h-[60px]" />
            </div>
            <div className="flex justify-center mt-8">
              <button 
              onClick={uploadPost}
              disabled={!postImage || loading}
              className="disabled:bg-opacity-30 bg-red-500 rounded-lg w-[160px] text-white text-[14px] py-2">
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreatePostModal;
