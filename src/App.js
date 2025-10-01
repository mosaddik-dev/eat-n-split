import { use, useState } from "react";
import "./css/output.css";

// Global variable
const usersData = [
  {
    id: 1,
    name: "Mosaddik",
    profileImage: "https://i.pravatar.cc/150?img=1",
    description: "",
  },
  {
    id: 2,
    name: "Mustahid",
    profileImage: "https://i.pravatar.cc/150?img=3",
    description: "",
  },
  {
    id: 3,
    name: "Sadique",
    profileImage: "https://i.pravatar.cc/150?img=4",
    description: "",
  },
  {
    id: 4,
    name: "Sajid",
    profileImage: "https://i.pravatar.cc/150?img=2",
    description: "",
  },
];

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
function ProfileCard({
  id,
  name,
  profileImage,
  description,
  isOpenSplitBillForm,
  setIsOpenSplitBillForm,
  currentUser,
  setCurrentUser,
  billData,
}) {
  const {
    bill,
    yourExp,
    yourFrndExp,
    whoPayBill,
    setBill,
    setYourExp,
    setYourFrndExp,
    setWhoPayBill,
  } = billData;

  let message = description ? description : `You and ${name} are even`;

  return (
    <div className="flex items-center justify-between space-x-20 my-4">
      <img className="rounded-full w-16" src={profileImage} />
      <div className="ml-[-95px] ">
        <h3 className="text-2xl font-normal">{name}</h3>
        <h6>{message}</h6>
      </div>
      <button
        className="btn"
        onClick={(e) => {
          setBill("");
          setYourExp("");
          setYourFrndExp("");
          setWhoPayBill("");
          if (currentUser.id === id && isOpenSplitBillForm) {
            setIsOpenSplitBillForm(false);
            setCurrentUser({});
          } else {
            setIsOpenSplitBillForm(true);
            setCurrentUser({ id, name, profileImage });
          }
        }}
      >
        {isOpenSplitBillForm && currentUser.id === id ? "Close" : "Select"}
      </button>
    </div>
  );
}

function SplitBillForm({
  currentUser,
  billData,
  setIsOpenSplitBillForm,
  users,
  setUsers,
}) {
  const {
    bill,
    yourExp,
    yourFrndExp,
    whoPayBill,
    setBill,
    setYourExp,
    setYourFrndExp,
    setWhoPayBill,
  } = billData;

  return (
    <div className=" w-2xl h-96 bg-amber-100/70 ml-16 p-10 ">
      <h1 className="text-3xl font-bold  text-center mb-10">
        SPLIT A BILL WITH {currentUser.name.toUpperCase()}
      </h1>

      {/* Bill Value */}
      <div className="space-y-4 ">
        <div className="flex justify-between ">
          <p className="text-xl">💰 Bill value</p>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </div>

        {/* Your Expense */}
        <div className="flex justify-between">
          <p className="text-xl ">🧍Your expense</p>
          <input
            type="number"
            value={yourExp}
            onChange={(e) => {
              const newYourExp = Number(e.target.value);
              setYourExp(newYourExp);
              setYourFrndExp(Number(bill) - newYourExp);
            }}
          />
        </div>

        {/* Your Friend Expense */}
        <div className="flex justify-between">
          <p className="text-xl">👫 {currentUser.name}'s expense:</p>
          <input
            type="number"
            className="bg-gray-100"
            value={yourFrndExp}
            disabled
          />
        </div>

        {/* who is payinh the bill */}
        <div className="flex justify-between">
          <p className="text-xl">🤑 Who is paying the bill?</p>
          <select
            className=" w-[221px] text-center"
            value={whoPayBill}
            onChange={(e) => {
              setWhoPayBill(e.target.value);
            }}
          >
            <option value="You">You</option>
            <option value={currentUser.name}>{currentUser.name}</option>
          </select>
        </div>

        <div className="flex justify-end ">
          <button
            className="btn w-28 mt-3"
            onClick={(e) => {
              setUsers((users) =>
                users.map((user) =>
                  user.id === currentUser.id
                    ? {
                        ...user,
                        description:
                          whoPayBill === "You"
                            ? `${currentUser.name} owes you ${yourExp}`
                            : `You owe ${currentUser.name} ${yourFrndExp}`,
                      }
                    : user
                )
              );

              if (bill && yourExp) setIsOpenSplitBillForm(false);
            }}
          >
            Split bill
          </button>
        </div>
      </div>
    </div>
  );
}

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
