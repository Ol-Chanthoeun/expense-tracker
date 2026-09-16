import { useState } from "react";

function App() {

  // Data / State
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [editExpense, setEditExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});

  // Add Expense
  const handleAddExpense = () => {
    const newErrors = {};

    // Validate Expense Name
    if (expenseName.trim() === "") {
      newErrors.expenseName = "Expense name is required.";
    }

    // Validate Amount
    if (amount.trim() === "") {
      newErrors.amount = "Amount is required.";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    // Validate Category
    if (category.trim() === "") {
      newErrors.category = "Category is required.";
    }

    // Save Errors
    setErrors(newErrors);

    // Stop if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: amount,
      category: category,
    };

    setExpenses([...expenses, newExpense]);

    // Clear form
    setExpenseName("");
    setAmount("");
    setCategory("");

    setErrors({});
  };

  // Delete Expense
  const handleDeleteExpense = (idToDelete) => {
    const newExpenses = expenses.filter(
      (expense) => expense.id !== idToDelete
    );

    setExpenses(newExpenses);
  };

  // Start Edit Expense
  const handleEditExpense = (expense) => {
    // Remember which expense we are editing
    setEditExpense(expense);

    // Put old data into form
    setExpenseName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);

    setErrors({});
  };

  // Update Expense
  const handleUpdateExpense = () => {
    const newErrors = {};

    // Validate Expense Name
    if (expenseName.trim() === "") {
      newErrors.expenseName = "Expense name is required.";
    }

    // Validate Amount
    if (amount.trim() === "") {
      newErrors.amount = "Amount is required.";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    // Validate Category
    if (category.trim() === "") {
      newErrors.category = "Category is required.";
    }

    // Save Errors
    setErrors(newErrors);

    // Stop if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === editExpense.id) {
        return {
          id: expense.id,
          name: expenseName,
          amount: amount,
          category: category,
        };
      }

      return expense;
    });

    setExpenses(updatedExpenses);

    // Clear form
    setExpenseName("");
    setAmount("");
    setCategory("");

    // Exit edit mode
    setEditExpense(null);
    setErrors({});
  };

  // Cancel Edit Expense
  const handleCancelEdit = () => {
    setEditExpense(null);

    setExpenseName("");
    setAmount("");
    setCategory("");
    setErrors({});
  };

  // Category Filter
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
        (expense) =>
          expense.category === selectedCategory
      );

  // Search Filter
  const searchedExpenses = filteredExpenses.filter(
    (expense) =>
      expense.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Total Expense
  const totalExpense = expenses.reduce(
    (total, expense) => {
      return total + Number(expense.amount);
    },
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Expense Tracker
          </h1>

          <p className="mt-2 text-gray-500">
            Track and manage your daily expenses.
          </p>
        </div>

        {/* =========================
            MAIN GRID
        ========================== */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* =========================
              FORM
          ========================== */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              {editExpense
                ? "Edit Expense"
                : "Add Expense"}
            </h2>

            <div className="space-y-4">

              {/* Expense Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Expense Name
                </label>

                <input
                  type="text"
                  value={expenseName}
                  onChange={(e) => {
                    setExpenseName(e.target.value);

                    if (errors.expenseName) {
                      setErrors({
                        ...errors,
                        expenseName: "",
                      });
                    }
                  }}
                  placeholder="Example: Coffee"
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition ${errors.expenseName
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                />

                {errors.expenseName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expenseName}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);

                    if (errors.amount) {
                      setErrors({
                        ...errors,
                        amount: "",
                      });
                    }
                  }}
                  placeholder="Example: 5"
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition ${errors.amount
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                />

                {errors.amount && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) {
                      setErrors({
                        ...errors,
                        category: "",
                      });
                    }
                  }}
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition ${errors.category
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Study">Study</option>
                  <option value="Transport">Transport</option>
                  <option value="Other">Other</option>
                </select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Add / Update Button */}
              <button
                onClick={
                  editExpense
                    ? handleUpdateExpense
                    : handleAddExpense
                }
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                {editExpense
                  ? "Update Expense"
                  : "Add Expense"}
              </button>

              {/* Cancel Button */}
              {editExpense && (
                <button
                  onClick={handleCancelEdit}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div className="lg:col-span-2">

            {/* Total */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Expense
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                ${totalExpense.toFixed(2)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {expenses.length} expense(s)
              </p>
            </div>

            {/* =========================
                SEARCH + FILTER
            ========================== */}
            <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">

                {/* Search */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search expense..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {/* Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Categories
                  </option>
                  <option value="Food">Food</option>
                  <option value="Study">Study</option>
                  <option value="Transport">
                    Transport
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* =========================
                EXPENSE LIST
            ========================== */}
            <div className="space-y-3">

              {searchedExpenses.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700">
                    No expenses found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Add an expense or change your
                    search/filter.
                  </p>
                </div>
              ) : (
                searchedExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >

                    {/* Expense Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {expense.name}
                      </h3>

                      <div className="mt-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {expense.category}
                        </span>
                      </div>
                    </div>

                    {/* Amount + Actions */}
                    <div className="flex items-center gap-3">

                      <p className="mr-2 text-xl font-bold text-gray-900">
                        $
                        {Number(
                          expense.amount
                        ).toFixed(2)}
                      </p>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEditExpense(expense)
                        }
                        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          setDeleteId(expense.id)
                        }
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {
        deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

              <h2 className="text-xl font-bold text-gray-900">
                Delete Expense?
              </h2>

              <p className="mt-2 text-gray-500">
                Are you sure you want to delete this expense?
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">

                {/* Cancel */}
                <button
                  onClick={() => setDeleteId(null)}
                  className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>

                {/* Confirm */}
                <button
                  onClick={() => {
                    handleDeleteExpense(deleteId);
                    setDeleteId(null);
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  Confirm Delete
                </button>

              </div>
            </div>
          </div>
        )
      }

    </div >
  );
}

export default App;