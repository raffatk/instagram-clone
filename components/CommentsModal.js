import { db } from "@/firebase";
import { closeCommentModal } from "@/redux/commentModalSlice";
import {
  PhotoIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentModal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const data = useSelector(s => s.modal.postData)

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)

  async function sendComment() {
    await addDoc(collection(db, "posts", data?.id, "comments"), {
      username: user.username,
      photoUrl: user.photoUrl,
      text: comment,
      timestamp: serverTimestamp()
    });
  }

  useEffect(() => {
    if (!data.id) return
    
    const q = query(collection(db, "posts", data.id, "comments"), orderBy("timestamp", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs)
      setLoading(false)

    })

    return unsub

  }, [data.id])


  return (
    <div>
      <Modal

        open={isOpen}
        onClose={() => {
          setLoading(true)
          dispatch(closeCommentModal());
        }}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full md:h-[700px] md:w-[900px] bg-white relative flex overflow-hidden focus:outline-none">
          <XMarkIcon
            onClick={() => dispatch(closeCommentModal())}
            className="w-7 absolute right-0 top-0 mr-2 mt-2 z-30 cursor-pointer"
          />
          <div className="hidden md:inline w-[560px] ">
            <img
              className="h-full w-full object-cover "
              src={data?.postImage}
            />
          </div>
          <div className=" bg-white w-full md:max-w-[350px] ">
            <div className="w-full h-[50px] border-b border-gray-300 fiexd top-0 bg-white"></div>
            <ul className="w-full  p-3 mt-3 md:mt-3 h-full overflow-y-scroll pb-[120px]">
              <Comment data={{
                photoUrl: data?.photoUrl,
                username: data?.username,
                text: data?.caption
              }} />
              {!loading && comments.map((comment) => (
                <Comment key={comment?.id} data={comment?.data()} />
              ))}
            </ul>
            <div className="w-full border-t border-gray-300 h-[60px] absolute  bottom-0 bg-white flex items-center">
              <div className="flex justify-center items-center">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className=" w-[310px] text-[14px] tracking-tight focus:outline-none resize-none pl-3"
                  placeholder="Add comment"
                />
              </div>
              <div className="-mt-5">
                <button
                  onClick={sendComment}
                  disabled={!comment}
                  className="disabled:text-opacity-40 font-bold text-[14px] text-[#0095f6]"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Comment({ data }) {
  return (
    <div className="flex space-x-3.5 mb-5">
      <div className="min-w-fit">
        <img
          className="w-8 h-8 object-cover rounded-full"
          src={data?.photoUrl}
        />
      </div>
      <div>
        <p className="text-[14px] tracking-tight">
          <span className="font-bold">{data?.username} </span>
          {data?.text}
        </p>
      </div>
    </div>
  );
}

export default CommentModal;
