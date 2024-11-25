import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";

type Stock = {
  id?: number;
  ticker: string;
  shares: number;
};

type StockItemProps = {
  stock: Stock;
  onEdit: (id: number | undefined, shares: number) => void;
  onDelete: (id: number | undefined) => void;
};

const StockItem: React.FC<StockItemProps> = ({ stock, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center text-sm bg-white text-black p-2 rounded shadow">
      <div>
        <span className="font-bold">{stock.ticker}</span> -{" "}
        <span>{stock.shares} Shares</span>
      </div>
      <div className="flex space-x-2">
        <PencilIcon
          onClick={() => onEdit(stock.id, stock.shares)}
          className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-700"
          aria-label="Edit"
        />
        <TrashIcon
          onClick={() => onDelete(stock.id)}
          className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
          aria-label="Delete"
        />
      </div>
    </li>
  );
};

export default StockItem;
