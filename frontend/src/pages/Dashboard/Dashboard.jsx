import { useState } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";

function Dashboard() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      category: "Groceries",
      amount: 50.25,
      date: "2023-06-01",
      description: "Weekly grocery shopping",
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    amount: 0,
    date: "",
    description: "",
  });

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    setNewTransaction({
      type: "expense",
      category: "",
      amount: 0,
      date: "",
      description: "",
    });
  };

  const handleRemoveTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gray-100 flex">
        <aside className="w-64 bg-white p-6 shadow-md">
          <div className="mb-8">
            <h2 className="text-lg font-semibold">Analytics</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">Total Expenses</div>
              <div className="text-4xl font-bold">
                ${totalExpenses.toFixed(2)}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">Total Income</div>
              <div className="text-4xl font-bold">
                ${totalIncome.toFixed(2)}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">Net Balance</div>
              <div className="text-4xl font-bold">${netBalance.toFixed(2)}</div>
            </div>
          </div>
        </aside>
        <div className="flex-1 p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <div className="flex items-center gap-2">
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                className="h-9 w-32 border rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="h-9 w-32 border rounded-md"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="h-9 w-32 border rounded-md"
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="h-9 w-32 border rounded-md"
              />
              <button
                onClick={handleAddTransaction}
                className="h-9 px-4 bg-blue-500 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </header>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">
                      {transaction.category}
                    </div>
                    <div className="text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`font-semibold ${
                        transaction.type === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemoveTransaction(transaction.id)}
                      className="h-9 px-4 bg-red-500 text-white rounded-md"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="text-gray-600">{transaction.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
