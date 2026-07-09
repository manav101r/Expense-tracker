import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Goal } from "./ManageGoals";

interface Props {
  addGoal: (goal: Goal) => void;
}

const initialCategories: string[] = [
  "Electronics",
  "Healthcare",
  "Vacation",
  "Education",
];

const ManageGoalsModal = ({ addGoal }: Props) => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [newcategory, setnewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(0);

  const handleAddGoal = (event: React.FormEvent) => {
    event.preventDefault();
    const dateAdded= new Date();
    // Convert form data to Goal object
    const newGoal: Goal = {
      id: Math.random(),
      name,
      category,
      availableToSpend: parseInt(amount),
      progress: progress,
      needed: `$${
        parseInt(amount) - (progress / 100) * parseInt(amount)
      } needed by ${new Date(date).toLocaleDateString()}`,
      date: {
        year: dateAdded.getFullYear(),
        monthNumber: dateAdded.getMonth()+1,
        monthName: dateAdded.toLocaleString("default", { month: "long" }),
      },
    };

    addGoal(newGoal);
    setAmount("");
    setName("");
    setDate("");
    setCategory("");
  };

  function handleAddNewCategory(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setCategories([...categories, newcategory]);
    setnewCategory("");
  }

  return (
    <>
      <div className="d-grid col-5 mx-auto">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <IoAddCircleOutline size={25} style={{ marginRight: '8px' }} />
          Add New!
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Goal
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="needs-validation" onSubmit={handleAddGoal}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name:
                  </label>
                  <input
                    required
                    type="text"
                    id="nameInput"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amountInput" className="form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amountInput"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dateInput" className="form-label">
                    Goal Settlement Date:
                  </label>
                  <input
                    type="date"
                    id="dateInput"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category-select" className="form-label">
                    Category:
                  </label>
                  <div className="d-flex">
                    <select
                      id="category-select"
                      className="form-select"
                      aria-label="Default select example"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Choose from Preset
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="align-self-center px-2">OR</div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Make New Category!
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-center">
              <button
                  type="submit"
                  className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                  aria-label="Add Goal"
                >
                  Add Goal
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Custom Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddNewCategory}>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Cateogry Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newcategory}
                    onChange={(e) => setnewCategory(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Choose a Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-success"
                  type="submit"
                  aria-label="Add New Category"
                >
                  Add New Category!
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-target="#exampleModal"
                  data-bs-toggle="modal"
                >
                  Back to Goal Maker
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageGoalsModal;
