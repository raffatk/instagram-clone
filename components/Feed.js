import React, { useEffect, useState } from "react";
import Post from "./Post";
import Bottombar from "./Bottombar";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

function Feed() {


const [posts, setPosts] = useState([])


  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs)
    })

    return unsub

  }, [])
  return (
    <div className="w-full max-w-[630px] min-[1280px]:max-[1427px]:ml-[100px]">
      <Stories />
      <ul className="flex flex-col pb-28">
        {posts.map(post => <Post key={post.id} id={post.id} data={post.data()} />)}
       
      </ul>

      <Bottombar />
    </div>
  );
}

function Stories() {
  function StoryProfile({name, img}) {

    return (
    <div className="w-[60px] h-fit rounded-full">
      <div className="w-[60px] h-[60px] flex justify-center items-center storyBackground rounded-full">
        <img
          className="w-14 h-14 object-cover rounded-full"
          src={img}
        />
      </div>
      <p className="text-[12px] text-center truncate">{name}</p>
    </div>
    )
  }

  return (
    <div className="mb-4 h-[100px]">
      <ul className="flex md:justify-evenly overflow-x-auto space-x-5">
        <StoryProfile name={"taylorswift"} img={"https://i.guim.co.uk/img/media/a48e88b98455a5b118d3c1d34870a1d3aaa1b5c6/0_41_3322_1994/master/3322.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b95f25e4e31f132166006345fd87b5ae"} />
        <StoryProfile name={"rock"} img={"https://hips.hearstapps.com/hmg-prod/images/dwayne-johnson-attends-the-jumanji-the-next-level-uk-film-news-photo-1575726701.jpg?resize=1200:*"} />
        <StoryProfile name={"leomessi"} img={"https://www.reuters.com/resizer/Nz3BcqTQSlU8aVgWU8nN8qJ6KVA=/1920x1005/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/GWSGDGN635JLDB6NOP3VN4OC2U.jpg"} />
        <StoryProfile name={"selenagomez"} img={"https://pbs.twimg.com/media/FjOt_wHaUAEF751?format=jpg&name=large"} />
        <StoryProfile name={"cristiano"} img={"https://dailypost.ng/wp-content/uploads/2023/03/Cristiano_Ronaldo_2022-23.jpg"} />
        <StoryProfile name={"kingjames"} img={"https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-02/230208-lebron-james-msnbc-mn-1230-e3d61b.jpg"} />
        <StoryProfile name={"kyliejenner"} img={"./assets/kylie.png"} />
       
       
      </ul>

    </div>
  );
}

export default Feed;
