import React, { useState, useEffect, useContext } from "react";
import {
  getAllTasks,
  deleteTask,
  isCompleteTask,
  editTask,
} from "../api/taskApi";
import { FaPlus, FaEdit, FaTrash, FaFilter, FaListUl, FaThLarge } from "react-icons/fa";
import DeleteTaskModal from "./DeleteTask";
import EditTaskModal from "./EditTask";
import './Home.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editModalTask, setEditModalTask] = useState(null);

  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  const userName = loggedUser?.name;



  async function fetchData() {
    const response = await getAllTasks();
    if (response.data.success) {
      setTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 Filter & Search Logic
  useEffect(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (task) =>
          task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.task_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Active filter logic (status & priority)
    if (activeFilter !== "All") {
      if (["In Progress", "Complete"].includes(activeFilter)) {
        if (activeFilter === "In Progress") filtered = filtered.filter((t) => t.is_complete === 0);
        else if (activeFilter === "Complete") filtered = filtered.filter((t) => t.is_complete === 1);
      } else if (["High", "Medium", "Low"].includes(activeFilter)) {
        filtered = filtered.filter(
          (t) => t.priority?.toLowerCase() === activeFilter.toLowerCase()
        );
      }
    }

    setFilteredTasks(filtered);
  }, [searchTerm, tasks, activeFilter]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        fetchData(); // fetch all tasks
      } else {
        searchTasks(searchTerm)
          .then(res => {
            if (res.data.success) setFilteredTasks(res.data.tasks);
          })
          .catch(err => console.error(err));
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);


  // 🗑️ Delete Handlers
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
    fetchData();
  };

  async function handleDelete(taskID) {
    try {
      const response = await deleteTask(taskID);
      if (response.data.success) {
        setShowModal(false);
        setSelectedTask(null);
        fetchData();
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  }

  async function handleIsComplete(taskID) {
    try {
      const response = await isCompleteTask(taskID);
      if (response.data.success) {
        fetchData();
      } else {
        alert("Unable to update task status");
      }
    } catch (err) {
      console.error("Error updating:", err);
    }
  }

  // 🎯 Random motivational / humorous quotes about tasks
  const getRandomQuote = () => {
    const quotes = [
      "New day, new tasks… same coffee ☕.",
      "Let’s get those tasks done before they get us 😅.",
      "Productivity level: trying.",
      "You can’t spell ‘later’ without ‘to-do’.",
      "Your future self will thank you for doing this (probably).",
      "Time to turn those pending tasks into completed legends 💪.",
      "If it’s on your to-do list, it’s basically half done… right?",
      "Tasks don’t complete themselves (unfortunately).",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };


  return (
    <div className="container  py-4" style={{ marginLeft: "200px" }} >
      {userName && (
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Hello, {userName}! 👋</h3>
          <p className="text-muted fst-italic">{getRandomQuote()}</p>
        </div>
      )}

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

        <div className="d-flex align-items-center gap-3">
          {/* Priority Filter Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="priorityFilter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaFilter className="me-1" />
              {activeFilter === "All" ? "Filter Priority" : activeFilter}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="priorityFilter">
              {["All", "High", "Medium", "Low"].map((priority) => (
                <li key={priority}>
                  <button
                    className={`dropdown-item ${activeFilter === priority ? "active" : ""}`}
                    onClick={() => setActiveFilter(priority)}
                  >
                    {priority === "All" ? "All Priorities" : priority}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Task Button */}
          <button
            className="btn d-flex align-items-center justify-content-center gap-2 px-4 py-2 fw-semibold text-white shadow-sm"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056d2)",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #0056d2, #0041a8)")
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #007bff, #0056d2)")
            }
            onClick={() => navigate("/add-task")}
          >
            <FaPlus size={14} />
            New Task
          </button>
        </div>

      </div>

      {/* Filter Tabs */}
      <ul className="nav nav-pills mb-3 shadow-sm rounded py-2 px-3 bg-white">
        {["All", "In Progress", "Complete"].map((filter) => (
          <li className="nav-item" key={filter}>
            <button
              className={`nav-link ${activeFilter === filter ? "active" : ""
                }`}
              onClick={() => setActiveFilter(filter)}
              style={{
                fontWeight: 500,
                borderRadius: "20px",
                transition: "0.3s",
              }}
            >
              {filter}
            </button>

          </li>
        ))}
      </ul>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Task Table */}
      <div className="card shadow border-0 rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Sr. No</th>
                <th>Name & Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div>
                        <strong>{task.task_name}</strong>
                        <div className="text-muted small">{task.task_description}</div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${task.priority === "High"
                          ? "bg-danger"
                          : task.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                          }`}
                      >
                        {task.priority || "Low"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${task.is_complete === 1
                          ? "bg-success"
                          : task.is_complete === 0
                            ? "bg-info text-dark"
                            : "bg-warning text-dark"
                          }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleIsComplete(task.task_id)}
                      >
                        {task.is_complete === 1
                          ? "Complete"
                          : task.is_complete === 0
                            ? "In Progress"
                            : "Pending"}
                      </span>
                    </td>
                    <td>
                      {new Date(task.start_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(task.end_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-success btn-sm rounded-circle"
                          onClick={() => setEditModalTask(task)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle"
                          onClick={() => handleDeleteClick(task)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Delete Modal */}
      <DeleteTaskModal
        show={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        task={selectedTask}
      />

      {/* Edit Modal */}
      <EditTaskModal
        task={editModalTask}
        onClose={() => setEditModalTask(null)}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default Home;
