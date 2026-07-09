// TransactionsList.tsx
import React from "react";
import { useBudgetContext } from "./BudgetContext";
import styles from "./Transactions.module.css";

const TransactionsList: React.FC = () => {
  const { transactions } = useBudgetContext();

  return (
    <div className={styles.transactionsList}>
      <h3>Transactions</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
