import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import CommentModal from "./CommentsModal";
import { useDispatch, useSelector } from "react-redux";
import { openCommentModal, setPost } from "@/redux/commentModalSlice";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Moment from "react-moment";

function Post({ data, id }) {
  const dispatch = useDispatch();
  const post = useSelector((s) => s.modal.postData);
  const user = useSelector((s) => s.user);

  async function likePost() {
    if (data?.likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  async function deletePost(){
    await deleteDoc(doc(db, "posts", id))
  }

  return (
    <div className="w-full max-w-[576px] h-fit max-h-[620px] p-4 mb-[40px] sm:mb-[80px]">
      {/* POST HEADER */}
      <div className="flex space-x-2">
        <figure className="">
          <img
            className="w-8 h-8  object-cover rounded-full"
            src={data?.photoUrl}
          />
        </figure>
        <div className="flex space-x-2 text-[14px]">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-[14px]">{data?.username}</h3>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <h3 className="text-gray-500"><Moment fromNow>{data?.timestamp?.toDate()}</Moment></h3>
          </div>
        </div>
      </div>

      {/* POST CONTENT */}

      <div className="mt-2">
        <div className="sm:w-[540px] sm:h-[500px] border border-gray-200 flex justify-center items-center">
          <img
            className="object-contain max-h-[500px] w-full h-full border border-gray-200"
            src={data?.image}
          />
        </div>
        {/* POST ICONS */}
        <div className="flex justify-between w-full mt-2">
          <div className="flex items-center">

            {data?.likes.includes(user.uid) ? 
            (<HeartIconFilled
            onClick={likePost}
              className="w-6 h-6 cursor-pointer text-red-600"
            />) :
            <HeartIcon
            onClick={likePost}
              className="w-6 h-6 cursor-pointer"
            />
          
          }
            
            <ChatBubbleOvalLeftIcon
              onClick={() => {
                dispatch(
                  setPost({
                    postImage: data?.image,
                    comments: data?.comments,
                    id: id,
                    caption: data?.caption,
                    username: data?.username,
                    photoUrl: data?.photoUrl,
                  })
                );
                console.log(post);
                dispatch(openCommentModal());
              }}
              className="cursor-pointer ml-2 w-6 h-6 scale-x-[-1]"
            />
            <PaperAirplaneIcon className="ml-3 w-6 h-6 -rotate-45" />

            {user.uid === data?.uid && (
            <TrashIcon
            onClick={deletePost}
            className="w-6 h-6 ml-2.5 cursor-pointer" />
            
            )}
          </div>

          <BookmarkIcon className="w-6 h-6" />
        </div>
        {/* POST LIKES & CAPTION  */}
        <div className="mt-2 text-[14px]">
          <h1 className={`${data?.likes.length === 0 && "hidden"}`}>
            {" "}
            <span className=" font-bold">{data?.likes.length}</span>{" "}
            {data?.likes.length === 1 ? "like" : "likes"}
          </h1>
          <p className="mt-2 truncate">
            <span className="font-bold mr-1">{data?.username}</span>
            {data?.caption}
          </p>

          <p
            onClick={() => dispatch(openCommentModal(id))}
            className="mt-3 text-gray-500 cursor-pointer"
          >
            View comments
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
