import React from "react";

type AddStockFormProps = {
  addStock: () => void;
  newStock: string;
  setNewStock: React.Dispatch<React.SetStateAction<string>>;
  newShares: string;
  setNewShares: React.Dispatch<React.SetStateAction<string>>;
};

const AddStockForm: React.FC<AddStockFormProps> = ({
  addStock,
  newStock,
  setNewStock,
  newShares,
  setNewShares,
}) => {
  return (
    <div className="mt-3">
      <h4 className="text-sm font-semibold mb-2 text-white">Add a Stock</h4>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Ticker (e.g., AAPL)"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          className="p-2 rounded w-1/3 text-black"
        />
        <input
          type="text"
          placeholder="Shares (e.g., 10)"
          value={newShares}
          onChange={(e) => setNewShares(e.target.value)}
          className="p-2 rounded w-1/3 text-black"
        />
        <button
          onClick={addStock}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddStockForm;
