import React, { useEffect, useState } from "react";
import "./manageGoals.scss";
import NavBar from "../Shared/NavBar";
import Calender from "./Calender";
import ManageGoalsModal from "./ManageGoalsModal";
import { GiIsland } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { MdNotificationImportant } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "../Shared/Header";

type YearMonth = { year: number; monthNumber: number; monthName: string };

export interface Goal {
  id: number;
  name: string;
  category: string;
  availableToSpend: number;
  progress: number;
  needed: string;
  date: YearMonth;
}

const initialGoalsData: Goal[] = [
  {
    id: 1,
    name: "University Books",
    category: "Education",
    availableToSpend: 1000,
    progress: 50,
    needed: "$500.00 needed by January 2025",
    date: { year: 2024, monthNumber: 6, monthName: "June" },
  },
  {
    id: 2,
    name: "Island Getaway",
    category: "Vacation",
    availableToSpend: 2238.25,
    progress: 20,
    needed: "$1790.60 needed Immediately, by the end of month",
    date: { year: 2024, monthNumber: 7, monthName: "July" },
  },
  {
    id: 3,
    name: "Computer",
    category: "Electronics",
    availableToSpend: 1200,
    progress: 90,
    needed: "$Only $120.00 needed by February 2025",
    date: { year: 2024, monthNumber: 3, monthName: "March" },
  },
  {
    id: 4,
    name: "Medicine",
    category: "Healthcare",
    availableToSpend: 370,
    progress: 64,
    needed: "$133.20 needed by December 2024",
    date: { year: 2024, monthNumber: 5, monthName: "May" },
  },
];

function ManageGoals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoalsData);
  const [goalsAmount, setGoalsAmount] = useState(0);
  const [assignedAmount, setassignedAmount] = useState<number[]>([]);
  const [sliderValues, setSliderValues] = useState<string[]>(
    Array<string>(goals.length).fill("0")
  ); // Individual slider values
  // Function to add a new goal
  const addGoal = (newGoal: Goal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setSliderValues((prev) => [...prev, ""]); // Add new slider value placeholder
  };

  const handleSliderChange = (index: number, value: string) => {
    setSliderValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  useEffect(() => {
    const amountAssigned = () => {
      const newAssignedAmount = goals.map(
        (goal) => (goal.progress / 100) * goal.availableToSpend
      );
      setassignedAmount(newAssignedAmount);
    };
    const calculateTotalNeeded = (goals: Goal[]): number => {
      return goals.reduce((total, goal) => {
        const match = goal.needed.match(/\$(\d+(\.\d+)?)/);
        const neededAmount = match ? parseFloat(match[1]) : 0;
        return total + neededAmount;
      }, 0);
    };
    setGoalsAmount(calculateTotalNeeded(goals));
    amountAssigned();
  }, [goals]);

  function handleContribute(index: number): void {
    // Update the progress
    const newProgress =
      goals[index].progress +
      (parseInt(sliderValues[index]) / goals[index].availableToSpend) * 100;
    console.log(sliderValues, typeof sliderValues[0]);
    const newGoals = [...goals];
    newGoals[index] = {
      ...newGoals[index],
      progress: newProgress, // Update the progress property
    };

    // Extract the numeric value from the 'needed' string
    const match = goals[index].needed.match(/\$(\d+(\.\d+)?)(.*)/);
    const currentNeededAmount = match ? parseFloat(match[1]) : 0;
    const additionalText = match ? match[3] : "";
    const sliderValue = parseFloat(sliderValues[index]);
    const newNeededAmount = currentNeededAmount - sliderValue;

    // Ensure the neededAmount doesn't go negative (if that's a requirement)
    if (newNeededAmount < 0) {
      console.warn("Amount cannot go below zero.");
      return; // Exit if the calculation leads to a negative value
    }
    console.log(newNeededAmount);
    // Format the new 'needed' string using the original additional text
    const newNeededString = `$${newNeededAmount.toFixed(2)}${additionalText}`;

    // Update the 'needed' string while preserving the progress update
    newGoals[index] = {
      ...newGoals[index],
      needed: newNeededString,
    };

    // Update the state with the modified goals array
    setGoals(newGoals);
    setSliderValues(
      sliderValues.map((value, i) => (i === index ? "0" : value))
    );
  }

  // Handle delete goal
  const handleDelete = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className="manage-goals">
      <NavBar></NavBar>
      <Header headerName={"Goals"}></Header>
      <div className="d-flex justify-content-between">
        <Calender></Calender>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`toast fade show ${goalsAmount > 3000 ? "bg-danger" : ""}`}
          data-bs-autohide="false"
        >
          <div className="toast-header">
            {goalsAmount > 3000 ? (
              <MdNotificationImportant size={20}></MdNotificationImportant>
            ) : (
              <IoIosNotifications size={20}></IoIosNotifications>
            )}
            <strong className="me-auto">Goals Notification</strong>
            <small>1 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            You need ${goalsAmount.toFixed(2)} to settle all goals
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr className="categories">
            <th scope="col">Goals</th>
            <th scope="col">Date Added</th>
            <th scope="col">Amount Assigned</th>
            <th className="available-to-spend" scope="col">
              Available to Spend
            </th>
            <th scope="col">Assign New Amount</th>
            <th scope="col"></th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody className="text-start table-group-divider">
          {goals.map((goal, index) => (
            <React.Fragment key={goal.id}>
              <tr className="table-row">
                <td>
                  <div>
                    <span className="icon">
                      {goal.category === "Healthcare" ? (
                        <GiMedicinePills size={25} />
                      ) : goal.category === "Electronics" ? (
                        <RiComputerFill size={25} />
                      ) : goal.category === "Vacation" ? (
                        <GiIsland size={25} />
                      ) : (
                        <FaBook size={25} />
                      )}
                    </span>
                    <strong>{goal.name}</strong>
                    <span className="category-box">{goal.category}</span>
                  </div>
                </td>
                <td className="date-added">
                  {`${goal.date.monthName} ${goal.date.year}`}
                </td>
                <td className="available-to-spend">
                  ${assignedAmount[index]?.toFixed(2)}
                </td>
                <td className="available-to-spend">
                  ${goal.availableToSpend.toFixed(2)}
                </td>
                <td>
                  <label
                    htmlFor={`contribute${index}`}
                    className="lead form-label d-flex justify-content-between"
                  >
                    <div>0</div>
                    <button
                      className={`btn btn-sm btn-success ${
                        assignedAmount[index]?.toFixed(2) ===
                        goal.availableToSpend.toFixed(2)
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => handleContribute(index)}
                    >
                      Contribute ${sliderValues[index]}
                    </button>
                    <div>
                      {goal.availableToSpend - (parseInt(assignedAmount[index]?.toFixed(2)) || 0)}
                    </div>
                  </label>
                  <input
                    max={
                      goal.availableToSpend - (parseInt(assignedAmount[index]?.toFixed(2)) || 0)
                    }
                    type="range"
                    className="form-range"
                    id={`contribute${index}`}
                    value={sliderValues[index]}
                    onChange={(e) => handleSliderChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete size={20} /> {/* Delete icon */}
                  </button>
                </td>
              </tr>
              <tr className="table-active">
                <td colSpan={6}> {/* Adjusted colspan to match new column count */}
                  <div className="progress">
                    <div
                      className={`progress-bar ${goal.progress <= 30 ? "bg-danger" : ""}`}
                      role="progressbar"
                      style={{ width: `${goal.progress}%` }}
                      aria-valuenow={goal.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      title="Progress Towards Goal"
                    >
                      {goal.progress.toFixed(2)}%
                    </div>
                  </div>
                  <div>{goal.needed}</div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ManageGoalsModal addGoal={addGoal}></ManageGoalsModal>
    </div>
  );
}

export default ManageGoals;
