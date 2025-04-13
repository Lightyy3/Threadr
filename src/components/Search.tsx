import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icon

const Search = () => {
  return (
    <div className="bg-yellow border border-white mt-2 relative py-2 px-4 flex items-center gap-4 rounded-full">
      <FaSearch className="text-white w-5 h-5" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-white"
      />
    </div>
  );
};

export default Search;
