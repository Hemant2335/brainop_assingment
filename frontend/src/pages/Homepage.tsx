import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

type PostType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Homepage = () => {
  const [Postsdata, setPostsdata] = useState<PostType[]>([]);
  const navigate = useNavigate();
  const fetchdata = async () => {
    try {
      const response = await fetch("https://brainopbackend.vercel.app/api/post" ,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : localStorage.getItem("token") || ""
        },
        credentials : "include"
      });
      const data = await response.json();
      console.log(data);
      setPostsdata(data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="p-[5vh] mt-[2vh]">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <div className="grid mt-[3vh] md:grid-cols-3 gap-[2vh] ">
          {Postsdata && Postsdata.length > 0 ? (
            Postsdata.map((post: PostType) =>
              <Post data={post} />
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
    </div>
  );
};
export default Homepage;
