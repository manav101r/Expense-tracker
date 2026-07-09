// AddExpenseModal.tsx
import React, { useState } from "react";
import { useBudgetContext } from "./BudgetContext";
import styles from "./AddExpenseModal.module.css";

const AddExpenseModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addTransaction, categories } = useBudgetContext();
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(categories[0].name);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSave = () => {
    addTransaction({
      id: Date.now(),
      category,
      amount,
      description,
      date,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Add Expense</h3>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddExpenseModal;
