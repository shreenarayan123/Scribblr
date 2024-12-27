import toast from "react-hot-toast";

const ShareLink = () => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link to clipboard");
    }
  };

  return (
    <button onClick={handleCopy}>
      <i className="fa-solid fa-arrow-up-from-bracket cursor-pointer text-gray-500 hover:text-black"></i>
    </button>
  );
};

export default ShareLink;
