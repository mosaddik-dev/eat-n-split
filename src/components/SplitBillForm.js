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

export default SplitBillForm;
