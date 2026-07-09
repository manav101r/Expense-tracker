import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BudgetProvider } from "../Components/Expenses/BudgetContext"; // Import the BudgetProvider
import ManageGoals from "../Components/ManageGoals/ManageGoals";
import Home from "../Components/Home/Home";
import NotFound from "../Components/NotFound";
import Expenses from "../Components/Expenses/Expenses";
import TransactionsList from "../Components/Expenses/TransactionsList";
import BudgetUsage from "../Components/Expenses/BudgetUsage";
import HistoricalAnalysis from "../Components/Expenses/HistoricalAnalysis";
import AddExpenseModal from "../Components/Expenses/AddExpenseModal";

function App() {
  return (
    <BudgetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Goals" element={<ManageGoals />} />
          <Route path="/Expenses/*" element={<Expenses />}>
            {/* Redirect to /Expenses/transactions by default */}
            <Route index element={<Navigate to="transactions" replace />} />
            <Route path="transactions" element={<TransactionsList />} />
            <Route path="budget-usage" element={<BudgetUsage />} />
            <Route
              path="historical-analysis"
              element={<HistoricalAnalysis />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  );
}

export default App;
