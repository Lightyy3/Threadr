import { BsThreeDots } from "react-icons/bs";

const PostInfo = () => {
  return (
    <div className="cursor-pointer w-5 h-5 flex items-center justify-center text-white hover:text-gray-300">
      <BsThreeDots size={20} />
    </div>
  );
};

export default PostInfo;
