import React from "react";

const StoryList = ({ storiesByUser, onClick }) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {storiesByUser.map((user, idx) => (
        <div
          key={user.userId}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onClick(idx)}
        >
          <img
            src={user.avatar}
            alt={user.userName}
            className="w-14 h-14 rounded-full border-2 border-pink-500"
          />
          <p className="text-sm text-center mt-1">{user.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
