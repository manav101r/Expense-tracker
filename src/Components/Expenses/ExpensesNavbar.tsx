// ExpensesNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExpensesNavbar.module.css";

const ExpensesNavbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>Expense Tracker</div>
      <div>
        <Link to="/Home" className={styles.navLink}>
          Home
        </Link>
        <Link to="/Expenses/transactions" className={styles.navLink}>
          Expenses
        </Link>
        <Link to="/Goals" className={styles.navLink}>
          Goals
        </Link>
      </div>
    </nav>
  );
};

export default ExpensesNavbar;
