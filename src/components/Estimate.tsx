import React, { useState } from "react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

type Option = {
  id: number;
  description: string;
  contracts: number;
  price: number;
};

type Share = {
  id: number;
  description: string;
  shares: number;
  price: number;
};

const Estimate: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [shares, setShares] = useState<Share[]>([]);
  const [newOption, setNewOption] = useState<Partial<Option>>({
    description: "",
    contracts: 1,
    price: 0,
  });
  const [newShare, setNewShare] = useState<Partial<Share>>({
    description: "",
    shares: 1,
    price: 0,
  });

  const handleAddOption = () => {
    if (newOption.description && newOption.price && newOption.contracts) {
      setOptions((prev) => [
        ...prev,
        { ...newOption, id: Date.now() } as Option,
      ]);
      setNewOption({ description: "", contracts: 1, price: 0 });
    }
  };

  const handleAddShare = () => {
    if (newShare.description && newShare.price && newShare.shares) {
      setShares((prev) => [...prev, { ...newShare, id: Date.now() } as Share]);
      setNewShare({ description: "", shares: 1, price: 0 });
    }
  };

  const handleEdit = (
    id: number,
    field: keyof Option | keyof Share,
    value: string | number,
    type: "option" | "share"
  ) => {
    if (type === "option") {
      setOptions((prev) =>
        prev.map((opt) => (opt.id === id ? { ...opt, [field]: value } : opt))
      );
    } else {
      setShares((prev) =>
        prev.map((sh) => (sh.id === id ? { ...sh, [field]: value } : sh))
      );
    }
  };

  const handleDelete = (id: number, type: "option" | "share") => {
    if (type === "option") {
      setOptions((prev) => prev.filter((opt) => opt.id !== id));
    } else {
      setShares((prev) => prev.filter((sh) => sh.id !== id));
    }
  };

  const totalWorth =
    options.reduce((sum, opt) => sum + opt.contracts * opt.price * 100, 0) +
    shares.reduce((sum, sh) => sum + sh.shares * sh.price, 0);

  return (
    <div className="mx-auto bg-slate-950 p-6 rounded-lg shadow-md w-full max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Portfolio Estimator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg text-white font-semibold mb-4">Add Option</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Option (e.g., NVDA $150 Call)"
              value={newOption.description || ""}
              onChange={(e) =>
                setNewOption({ ...newOption, description: e.target.value })
              }
              className="p-2 w-full rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Contracts"
                value={newOption.contracts || ""}
                onChange={(e) =>
                  setNewOption({
                    ...newOption,
                    contracts: parseInt(e.target.value) || 1,
                  })
                }
                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={newOption.price || ""}
                onChange={(e) =>
                  setNewOption({
                    ...newOption,
                    price: parseFloat(e.target.value),
                  })
                }
                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddOption}
              className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
            >
              <FiPlusCircle className="mr-2" /> Add Option
            </button>
          </div>

          <h2 className="text-lg text-white font-semibold mb-4 mt-8">
            Add Share
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Shares (e.g., TSLA Common)"
              value={newShare.description || ""}
              onChange={(e) =>
                setNewShare({ ...newShare, description: e.target.value })
              }
              className="p-2 w-full rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Shares"
                value={newShare.shares || ""}
                onChange={(e) =>
                  setNewShare({
                    ...newShare,
                    shares: parseInt(e.target.value) || 1,
                  })
                }
                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={newShare.price || ""}
                onChange={(e) =>
                  setNewShare({
                    ...newShare,
                    price: parseFloat(e.target.value),
                  })
                }
                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddShare}
              className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
            >
              <FiPlusCircle className="mr-2" /> Add Share
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg text-white font-semibold mb-4">Portfolio</h2>
          <div className="space-y-4">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="flex items-center justify-between bg-gray-900 p-3 rounded-md"
              >
                <p className="text-white text-sm">{opt.description}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={opt.contracts}
                    onChange={(e) =>
                      handleEdit(
                        opt.id,
                        "contracts",
                        parseInt(e.target.value),
                        "option"
                      )
                    }
                    className="p-1 w-16 rounded-md bg-gray-800 text-white border border-gray-700"
                  />
                  <input
                    type="number"
                    value={opt.price}
                    onChange={(e) =>
                      handleEdit(
                        opt.id,
                        "price",
                        parseFloat(e.target.value),
                        "option"
                      )
                    }
                    className="p-1 w-16 rounded-md bg-gray-800 text-white border border-gray-700"
                  />
                  <button
                    onClick={() => handleDelete(opt.id, "option")}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
            {shares.map((sh) => (
              <div
                key={sh.id}
                className="flex items-center justify-between bg-gray-900 p-3 rounded-md"
              >
                <p className="text-white text-sm">{sh.description}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={sh.shares}
                    onChange={(e) =>
                      handleEdit(
                        sh.id,
                        "shares",
                        parseInt(e.target.value),
                        "share"
                      )
                    }
                    className="p-1 w-16 rounded-md bg-gray-800 text-white border border-gray-700"
                  />
                  <input
                    type="number"
                    value={sh.price}
                    onChange={(e) =>
                      handleEdit(
                        sh.id,
                        "price",
                        parseFloat(e.target.value),
                        "share"
                      )
                    }
                    className="p-1 w-16 rounded-md bg-gray-800 text-white border border-gray-700"
                  />
                  <button
                    onClick={() => handleDelete(sh.id, "share")}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-500 mt-6 p-3 rounded-md text-center">
            <h2 className="text-lg font-bold text-black">Total Worth</h2>
            <p className="text-lg text-black">${totalWorth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimate;
