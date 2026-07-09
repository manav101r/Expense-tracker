// BudgetContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface Transaction {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Category {
  name: string;
  budget: number;
  spent: number;
}

interface BudgetContextType {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Transaction) => void;
  addCategory: (category: Category) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { name: "Food", budget: 300, spent: 0 },
    { name: "Transport", budget: 200, spent: 0 },
    { name: "Entertainment", budget: 500, spent: 0 },
  ]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.name === transaction.category
          ? { ...cat, spent: cat.spent + transaction.amount }
          : cat
      )
    );
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  return (
    <BudgetContext.Provider
      value={{ transactions, categories, addTransaction, addCategory }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgetContext must be used within a BudgetProvider");
  }
  return context;
};
