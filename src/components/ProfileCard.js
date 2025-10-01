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

export default ProfileCard;
