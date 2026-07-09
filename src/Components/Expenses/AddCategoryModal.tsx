// AddCategoryModal.tsx
import React, { useState } from "react";
import styles from "./AddCategoryModal.module.css";

interface AddCategoryModalProps {
  onClose: () => void;
  onAddCategory: (category: {
    name: string;
    budget: number;
    spent: number;
  }) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  onClose,
  onAddCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState(0);

  const handleSave = () => {
    if (categoryName && budget > 0) {
      onAddCategory({ name: categoryName, budget, spent: 0 });
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Add New Category</h3>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <label>
          Budget:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
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

export default AddCategoryModal;
