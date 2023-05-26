import { PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { setUser, signOutUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { openPostModal } from "@/redux/commentModalSlice";
import { auth } from "@/firebase";

function Bottombar() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.uid);


  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const userCreds = await signInWithPopup(auth, provider);
  }

  function handleGuestSignIn() {
    dispatch(setUser({
          name: "Guest",
          uid: "guest123fdjhaf",
          photoUrl: "./assets/profilePictures/pfp2.png",
          username: "guest"
    }))
  }



  return (
    <div className="min-[1280px]:hidden fixed bg-white bottom-0 w-full h-[50px]">
      {user ? (
        <div className="flex justify-between items-center pt-2 px-3 bg-white w-full">
          <div>
            <HomeIcon className="w-8" />
          </div>
          <div
            onClick={() => {
              dispatch(openPostModal());
            }}
          >
            <PlusCircleIcon className="w-8" />
          </div>
          <div
            onClick={async () => {
              await signOut(auth);
              dispatch(signOutUser);
            }}
          >
            <UserCircleIcon className="w-8" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-3 mt-2.5">
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500  text-white font-semibold px-2 py-1 rounded-md text-[14px]"
          >
            Sign in with Google
          </button>
          <br />
          <button 
          onClick={handleGuestSignIn}
          className="border border-black font-semibold px-2 py-1 rounded-md text-[14px]">
            Sign in as Guest
          </button>
        </div>
      )}
    </div>
  );
}

export default Bottombar;
