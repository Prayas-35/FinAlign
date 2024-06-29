import { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { UserContext } from '../../context/UserContext';

function Dashboard() {
  const { token } = useContext(UserContext);
  
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      category: "Groceries",
      amount: 50.25,
      date: "2023-06-01",
      description: "Weekly grocery shopping",
    },
    {
      id: 2,
      type: "income",
      category: "Salary",
      amount: 3500.0,
      date: "2023-06-15",
      description: "June paycheck",
    },
    {
      id: 3,
      type: "expense",
      category: "Utilities",
      amount: 125.75,
      date: "2023-06-05",
      description: "Electricity bill",
    },
    {
      id: 4,
      type: "expense",
      category: "Entertainment",
      amount: 35.99,
      date: "2023-06-10",
      description: "Movie tickets",
    },
    {
      id: 5,
      type: "income",
      category: "Freelance",
      amount: 800.0,
      date: "2023-06-20",
      description: "Freelance project payment",
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    amount: 0,
    date: "",
    description: "",
  });

  const [balance, setBalance] = useState(0);

  const handleAddTransaction = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Transaction added:', result);

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
    } catch (error) {
      console.error('Error adding transaction:', error.message);
    }
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

  useEffect(() => {
    const fetchBalance = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/balance', {
            method: 'POST',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setBalance(data.balance);
          console.log("Balance fetched:", data.balance);
        } catch (error) {
          console.error("Error fetching balance:", error.message);
        }
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient flex flex-col lg:flex-row">
        <aside className="w-full lg:w-64 bg-white p-6 shadow-md mb-6 lg:mb-0">
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
              <div className="text-4xl font-bold">${balance.toFixed(2)}</div>
            </div>
          </div>
        </aside>
        <div className="flex-1 p-6">
          <header className="mb-6 flex flex-col lg:flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold mb-4 lg:mb-0">
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
              >
                <option  value="expense">Expense</option>
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
              />
              <input
                type="date"
                name="date"
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
