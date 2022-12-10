import React from "react";

const FakeAccount = () => {
  return (
    <div>
      <h1>계좌번호: 480166-87-1010244</h1>

      <button
        onClick={() => {
          navigator.clipboard.writeText("480166-87-1010244");
        }}
      >
        복사하기
      </button>
    </div>
  );
};

export default FakeAccount;
