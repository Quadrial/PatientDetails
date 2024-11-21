import React from "react";

const Header = () => {
  return (
    <div className="h-[130px] bg-white rounded-[100px] py-10 px-10 flex items-center flex-row justify-between">
      <figure className="">
        <img src="images/TestLogo.svg" alt="" />
      </figure>
      <main className="flex gap-10">
        <div className="flex items-center gap-3 text-[22px]">
          <img src="images/home.svg" alt="" />
          <h2>Overview</h2>
        </div>
        <div className="flex items-center gap-3 text-[22px] bg-custom-cyan rounded-[50px] p-3">
          <img src="images/group.svg" alt="" />
          <h2>Patients</h2>
        </div>
        <div className="flex items-center gap-3 text-[22px]  p-3">
          <img src="images/group.svg" alt="" />
          <h2>Schedule</h2>
        </div>
        <div className="flex items-center gap-3 text-[22px]  p-3">
          <img src="images/chat.svg" alt="" />
          <h2>Message</h2>
        </div>
        <div className="flex items-center gap-3 text-[22px]  p-3">
          <img src="images/card.svg" alt="" />
          <h2>Transactions</h2>
        </div>
      </main>
      <main className="flex items-center gap-10">
        <figure className="flex items-center gap-3">
          <img src="images/woman1.png" alt="" />
          <div className="flex flex-col">
            <h2 className="font-semibold">Dr. Jose Simmons</h2>
            <h2>General Pratitoner</h2>
          </div>
        </figure>
        <div className="h-14 border-l border-gray-300"></div>
        <figure className="flex gap-5">
          <img src="images/settings.svg" alt="" />
          <img src="images/more1.svg" alt="" />
        </figure>
      </main>
    </div>
  );
};

export default Header;
