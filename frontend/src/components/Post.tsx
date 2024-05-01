import Img from "../assets/banner.jpg";
import Avatar from "../assets/Logo.png";

type ArticleCardProps = {
  data: {
    id: string;
    title: string;
    content: string;
    createdAt: string,
    updatedAt: string
  };
};

const Post = ({ data }: ArticleCardProps) => {

  return (
    <>
    <div className="md:w-[25vw] h-fit rounded-lg bg-[#222222] p-4">
      {/* Image */}
      <div className="w-full h-[25vh]">
        <img
          src={Img}
          className="w-full rounded-lg object-cover h-full"
          alt="Image"
        />
      </div>
      <div className="p-[2vh] shadow-3xl">
        <h1 className="text-sm font-medium">Article</h1>
        <div className="flex w-full justify-between items-center">
          <h1 className="text-lg font-bold">{data.title}</h1>
        </div>
        <p className="text-sm font-medium ">{data.content}</p>
      </div>
    </div>
    </>
  );
};

export default Post;