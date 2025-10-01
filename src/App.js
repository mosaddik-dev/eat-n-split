import { useState } from "react";
import "./css/output.css";

import usersData from "./data/userData";
import ProfileCard from "./components/ProfileCard";
import SplitBillForm from "./components/SplitBillForm";
import AddFriendFrom from "./components/AddFriendFrom";

function App() {
  const [isOpenSplitBillForm, setIsOpenSplitBillForm] = useState(false);
  const [isOpenAddFriendFrom, setIsOpenAddFriendFrom] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState({});
  const [bill, setBill] = useState("");
  const [yourExp, setYourExp] = useState("");
  const [yourFrndExp, setYourFrndExp] = useState("");
  const [whoPayBill, setWhoPayBill] = useState("");

  return (
    <div className="flex items-start justify-center gap-16 mt-20">
      {/* Left container */}
      <div className="w-[490px]">
        {/* Single profile */}
        {users.map(({ id, name, profileImage, description }) => (
          <ProfileCard
            key={id}
            id={id}
            name={name}
            profileImage={profileImage}
            description={description}
            isOpenSplitBillForm={isOpenSplitBillForm}
            setIsOpenSplitBillForm={setIsOpenSplitBillForm}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
            billData={{
              bill,
              yourExp,
              yourFrndExp,
              whoPayBill,
              setBill,
              setYourExp,
              setYourFrndExp,
              setWhoPayBill,
            }}
          />
        ))}
        <div className="flex justify-end">
          <button
            className="btn"
            type="button"
            onClick={() => setIsOpenAddFriendFrom(!isOpenAddFriendFrom)}
          >
            Add Friend
          </button>
        </div>

        {/* add friend form */}
        {isOpenAddFriendFrom && (
          <AddFriendFrom
            setUsers={setUsers}
            setIsOpenAddFriendFrom={setIsOpenAddFriendFrom}
          />
        )}
      </div>

      {/* Right container */}
      <div className="w-[500px]">
        {isOpenSplitBillForm && (
          <SplitBillForm
            currentUser={currentUser}
            setIsOpenSplitBillForm={setIsOpenSplitBillForm}
            users={users}
            setUsers={setUsers}
            billData={{
              bill,
              yourExp,
              yourFrndExp,
              whoPayBill,
              setBill,
              setYourExp,
              setYourFrndExp,
              setWhoPayBill,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;

//  single profile component
