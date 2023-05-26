import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Suggested from "@/components/Suggested";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import CommentModal from "@/components/CommentsModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const dispatch = useDispatch()
  const data = useSelector(state => state.modal.postData)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          name: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
          username: user.displayName.split(" ")[0].toLowerCase(),
        }))
        
      }
    })

    return unsub
    
  }, [])
  return (
    <div className="min-h-screen flex justify-center overflow-x-auto">
      <Sidebar />

      <main className="pt-12 sm:ml-16 w-full md:w-[1012px] max-w-[1012px] flex justify-center lg:justify-between
      
      ">
        <Feed />
        <Suggested />

      </main>

      <CommentModal data={data} />

      
      
    </div>
  );
}
