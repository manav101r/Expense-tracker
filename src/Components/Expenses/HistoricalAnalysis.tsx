// HistoricalAnalysis.tsx
import React from "react";
import styles from "./HistoricalAnalysis.module.css";

interface MonthlySpending {
  month: string;
  spent: number;
}

const HistoricalAnalysis: React.FC = () => {
  const monthlyData: MonthlySpending[] = [
    { month: "October 2024", spent: 800 },
    { month: "November 2024", spent: 700 },
    // Add more sample data
  ];

  return (
    <div className={styles.historicalAnalysis}>
      <h3>Historical Analysis</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {monthlyData.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>${data.spent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalAnalysis;
