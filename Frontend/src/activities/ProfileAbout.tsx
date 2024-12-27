import { Blog } from "../context/Context";

export const ProfileAbout = () => {
  const { currentUser } = Blog();

  return (
    <div className=" flex pt-10 pl-5 font-medium text-xl">
      {currentUser.bio}
    </div>
  );
};
