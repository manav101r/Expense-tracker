// Expenses.tsx
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddExpenseModal from "./AddExpenseModal";
import NavBar from "../Shared/NavBar";
import Header from "../Shared/Header";
import ExpensesNavbar from "./ExpensesNavbar";
import Transactions from "./TransactionsList";
import BudgetUsage from "./BudgetUsage";
import HistoricalAnalysis from "./HistoricalAnalysis";
import styles from "./Expenses.module.css";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

const Expenses: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-11-01",
      description: "Groceries",
      category: "Food",
      amount: 50,
    },
    {
      id: 2,
      date: "2024-11-02",
      description: "Bus Ticket",
      category: "Transport",
      amount: 10,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleAddExpenseClick = () => {
    setShowModal(true);
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      ...prev,
      { id: prev.length + 1, ...transaction },
    ]);
  };

  return (
    <div className={styles.expenses}>
      <NavBar />
      <Header headerName={"Manage Expenses"}></Header>
      <nav className={styles.nav}>
        <Link to="/Expenses/transactions" className={styles.navLink}>
          Transactions
        </Link>
        <Link to="/Expenses/budget-usage" className={styles.navLink}>
          Budget Usage
        </Link>
        <Link to="/Expenses/historical-analysis" className={styles.navLink}>
          Historical Analysis
        </Link>
      </nav>
      <button className={styles.button} onClick={handleAddExpenseClick}>
        Add Expense
      </button>
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAddTransaction={addTransaction}
        />
      )}
      <Routes>
        <Route
          path="transactions"
          element={<Transactions transactions={transactions} />}
        />
        <Route path="budget-usage" element={<BudgetUsage />} />
        <Route path="historical-analysis" element={<HistoricalAnalysis />} />
      </Routes>
    </div>
  );
};

export default Expenses;
