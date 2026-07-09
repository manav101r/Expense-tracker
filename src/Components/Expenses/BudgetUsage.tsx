// BudgetUsage.tsx
import React from "react";
import AddCategoryModal from "./AddCategoryModal";
import { useBudgetContext } from "./BudgetContext";
import styles from "./BudgetUsage.module.css";

const BudgetUsage: React.FC = () => {
  const { categories, addCategory } = useBudgetContext();
  const [showModal, setShowModal] = React.useState(false);

  const totalBudget = categories.reduce((acc, cat) => acc + cat.budget, 0);
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const percentageUsed = (totalSpent / totalBudget) * 100;

  const handleAddCategory = (newCategory: { name: string; budget: number }) => {
    addCategory({ ...newCategory, spent: 0 });
    setShowModal(false);
  };

  return (
    <div className={styles.budgetUsage}>
      <h3>Total Budget Usage</h3>
      <div className={styles.budgetBarContainer}>
        <div
          className={styles.budgetBarFill}
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>
      <p>
        You have spent ${totalSpent} of your ${totalBudget} budget.
      </p>

      {categories.map((category) => {
        const categoryPercentage = (category.spent / category.budget) * 100;
        return (
          <div key={category.name} className={styles.category}>
            <h4>{category.name}</h4>
            <div className={styles.categoryBudgetBarContainer}>
              <div
                className={styles.categoryBudgetBarFill}
                style={{ width: `${categoryPercentage}%` }}
              ></div>
            </div>
            <p>
              {category.spent} / {category.budget} used
            </p>
          </div>
        );
      })}

      <button onClick={() => setShowModal(true)} className={styles.addButton}>
        Add New Category
      </button>

      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export default BudgetUsage;
