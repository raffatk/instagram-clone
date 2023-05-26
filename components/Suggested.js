import { auth } from "@/firebase";
import { setUser, signOutUser } from "@/redux/userSlice";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

function Suggested() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }

  return (
    <div className="w-[319px] h-[500px] hidden lg:inline min-[1280px]:max-[1427px]:ml-[80px]">
      {user.name ? (
        <div className="flex items-center">
          <div>
            <img
              className="min-w-fit w-14 h-14 object-cover rounded-full"
              referrerPolicy="no-referrer"
              src={user.photoUrl}
            />
          </div>
          <div className="ml-4 w-[209px] h-10 bg-white">
            <h1 className="font-bold text-[14px]">{user.username}</h1>
            <h1 className="text-gray-500 text-[14px] leading-3">{user.name}</h1>
          </div>
          <div className="-ml-2">
            <span
              onClick={handleSignOut}
              className="text-[#0095f6] text-[12px] whitespace-nowrap cursor-pointer"
            >
              Log Out
            </span>
          </div>
        </div>
      ) : (
        <div className="">
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 w-full text-white font-semibold px-2 py-1 rounded-md text-[14px]"
          >
            Sign in with Google
          </button>
          <br />
          <button 
          onClick={handleGuestSignIn}
          className="mt-2 w-full border border-black font-semibold px-2 py-1 rounded-md text-[14px]">
            Sign in as Guest
          </button>
        </div>
      )}

      {/* Suggested */}

      <div>
        <div className="mt-3 mb-5 text-[14px] flex justify-between">
          <h3 className="font-bold text-[#737373]">Suggested for you</h3>
          <h3>See All</h3>
        </div>
        <ul className="">
          <SuggestedAccount />
          <SuggestedAccount
            name={"leomessi"}
            img={
              "https://www.reuters.com/resizer/Nz3BcqTQSlU8aVgWU8nN8qJ6KVA=/1920x1005/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/GWSGDGN635JLDB6NOP3VN4OC2U.jpg"
            }
          />
          <SuggestedAccount
            name={"selenagomez"}
            img={
              "https://pbs.twimg.com/media/FjOt_wHaUAEF751?format=jpg&name=large"
            }
          />
          <SuggestedAccount
            name={"taylorswift"}
            img={
              "https://i.guim.co.uk/img/media/a48e88b98455a5b118d3c1d34870a1d3aaa1b5c6/0_41_3322_1994/master/3322.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b95f25e4e31f132166006345fd87b5ae"
            }
          />
          <SuggestedAccount
            name={"rock"}
            img={
              "https://hips.hearstapps.com/hmg-prod/images/dwayne-johnson-attends-the-jumanji-the-next-level-uk-film-news-photo-1575726701.jpg?resize=1200:*"
            }
          />
          <SuggestedAccount
            name={"kingjames"}
            img={
              "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-02/230208-lebron-james-msnbc-mn-1230-e3d61b.jpg"
            }
          />
        </ul>
      </div>
    </div>
  );
}

function SuggestedAccount({
  img = "./assets/kylie.png",
  name = "kyliejenner",
}) {
  return (
    <div className="flex items-center w-full mb-3">
      <div className="w-[50px]">
        <img className="w-9 h-9 object-cover rounded-full" src={img} />
      </div>
      <div className="ml-2 w-[209px] h-10 bg-white">
        <h1 className="font-bold text-[14px]">{name}</h1>
        <h1 className="text-gray-500 text-[14px] leading-4">
          Instagram recommended
        </h1>
      </div>
      <div className="ml-5">
        <span className=" text-[#0095f6] text-[12px] whitespace-nowrap">
          Follow
        </span>
      </div>
    </div>
  );
}

export default Suggested;
