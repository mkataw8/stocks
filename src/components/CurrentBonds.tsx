import React from "react";

const CurrentBonds: React.FC = () => {
  return (
    <div className="bg-black text-white  p-4 shadow-md  h-30">
      <h3 className="text-lg font-semibold">Bond Information</h3>
      <ul className="mt-2 space-y-2">
        <li className="text-sm">Bond Type: Treasury</li>
        <li className="text-sm">Yield: 3.5%</li>
        <li className="text-sm">Maturity: 10 Years</li>
      </ul>
    </div>
  );
};

export default CurrentBonds;
