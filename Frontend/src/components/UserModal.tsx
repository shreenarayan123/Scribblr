import { Link, useNavigate } from "react-router-dom";
import { SecureMail } from "../uility/helper";
const UserModal = () => {
  const navigate = useNavigate();

  const currentuser = JSON.parse(localStorage.getItem("user") || "{}");
  const LogOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="flex flex-col gap-8 py-7  w-44 absolute right-0 top-20 bg-white rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <Link to={`/profile/${currentuser?.id}`}>
        <div className="flex items-center pl-4 gap-3 text-base font-sans font-medium cursor-pointer text-slate-600">
          <i className="fa-regular fa-user"></i>
          View Profile
        </div>
      </Link>
      <div
        onClick={LogOut}
        className="flex items-center pt-2 pl-4 border-t-2 gap-3 text-base font-sans font-medium cursor-pointer text-slate-600"
      >
        Sign out
        <br />
        {SecureMail(currentuser?.email)}
      </div>
    </div>
  );
};

export default UserModal;
