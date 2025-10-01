import { useState } from "react";

function AddFriendFrom({ setUsers, setIsOpenAddFriendFrom }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc");

  const newUser = {
    id: Date.now(),
    name: name,
    profileImage: image,
    description: "",
  };
  return (
    <div className=" w-[440] h-48 bg-amber-100/70 p-4 mt-5 pt-8 ">
      {/* Name */}
      <div className="space-y-4 ">
        <div className="flex justify-between ">
          <p className="text-xl">👫 Friend name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Image URL */}
        <div className="flex justify-between">
          <p className="text-xl ">🌉 Image URL</p>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="btn w-[221px]"
            onClick={() => {
              if (name && image) {
                setUsers((users) => [...users, newUser]);
                setIsOpenAddFriendFrom(false);
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendFrom;
