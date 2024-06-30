import { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { UserContext } from "../../context/UserContext";

function Dashboard() {
  const { token } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    amount: 0,
    date: "",
    description: "",
  });
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);

  const fetchBalance = async () => {
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/balance", {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTotalIncome(data.total_income);
        setTotalExpenditure(-data.total_expenditure);
        setBalance(data.balance);
        console.log("Balance fetched:", data.balance);
        console.log("Total Income fetched:", data.total_income);
        console.log("Total Expenditure fetched:", -data.total_expenditure);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    }
  };

  const fetchTransactions = async () => {
    if (token) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getTransactions",
          {
            method: "POST",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTransactions(data);
        console.log("Transactions fetched:", data);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    }
  };

  const handleAddTransaction = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Transaction added:", result);

      setTransactions([...transactions, { ...newTransaction, id: result.id }]);
      setNewTransaction({
        type: "expense",
        category: "",
        amount: 0,
        date: "",
        description: "",
      });
      await fetchBalance();
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  const handleRemoveTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deletransactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
      console.log("Transaction removed:", id);
      await fetchBalance();
    } catch (error) {
      console.error("Error removing transaction:", error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [token]);

  return (
    <div className="main-log">
      <Header />
      <div className="min-h-screen w-full flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 bg-blackish p-4 shadow border-shobuj-500">
          <div className="space-y-3">
            <div className="analytics-box bg-blue-50 p-4 rounded-lg shadow">
              <div className="text-gray-900 font-semibold">Total Expenses</div>
              <div className="text-gray-900">
                ₹{totalExpenditure.toFixed(2)}
              </div>
            </div>
            <div className="analytics-box bg-green-50 p-4 rounded-lg shadow">
              <div className="text-gray-900 font-semibold">Total Income</div>
              <div className="text-gray-900">₹{totalIncome.toFixed(2)}</div>
            </div>
            <div className="analytics-box bg-purple-50 p-4 rounded-lg shadow">
              <div className="text-gray-900 font-semibold">Net Balance</div>
              <div className="text-gray-900">₹{balance.toFixed(2)}</div>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6 pt-0">
          <header className="mb-6 flex flex-col lg:flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold mb-2 mt-1 lg:mb-0 text-wheatish">
              Transactions
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-2">
              <select
                name="type"
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                className="h-9 w-32 border rounded-md"
                style={{ color: "black" }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="h-9 w-32 border rounded-md"
                style={{ color: "black" }}
              />
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="h-9 w-32 border rounded-md"
                style={{ color: "black" }}
              />
              <input
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="h-9 w-32 border rounded-md"
                style={{ color: "black" }}
              />
              <button
                onClick={handleAddTransaction}
                className="h-9 px-4 bg-shobuj-500 text-white rounded-md"
              >
                Add Transaction
              </button>
            </div>
          </header>
          {transactions.length === 0 ? (
            <div className="text-center text-gray-600">
              <h2 className="text-2xl font-semibold">No Transactions Yet</h2>
              <p className="mt-2">Start by adding your first transaction!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
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
                        ₹{transaction.amount.toFixed(2)}
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
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
