import React, { useState } from "react";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaClipboardList, FaPlusCircle } from "react-icons/fa";

const TaskForm = () => {
  const [task, setTask] = useState({
    task_name: "",
    task_description: "",
    start_date: "",
    end_date: "",
    priority: "Medium",
    status: "In Progress",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createTask(task);
      setMessage(response.data.msg);
      setTask({
        task_name: "",
        task_description: "",
        start_date: "",
        end_date: "",
        priority: "Medium",
        status: "In Progress",
      });
      navigate("/dashboard");
    } catch (err) {
      setMessage("Error creating task");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "white",
        padding: "40px 0",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "500px",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <div className="text-center mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{
              width: "60px",
              height: "60px",
              background:
                "linear-gradient(135deg, #007bff, #6f42c1)",
              color: "white",
              fontSize: "24px",
            }}
          >
            <FaClipboardList />
          </div>
          <h3 className="fw-bold text-dark mb-0">Create New Task</h3>
          <p className="text-muted small mt-1">
            Fill the details to add your new task
          </p>
        </div>

        {message && (
          <div className="alert alert-info text-center py-2">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Task Name</label>
            <input
              type="text"
              name="task_name"
              value={task.task_name}
              onChange={handleChange}
              className="form-control rounded-3 shadow-sm"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Task Description</label>
            <textarea
              name="task_description"
              value={task.task_description}
              onChange={handleChange}
              className="form-control rounded-3 shadow-sm"
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          {/* Start Date & End Date */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={task.start_date}
                onChange={handleChange}
                className="form-control rounded-3 shadow-sm"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">End Date</label>
              <input
                type="date"
                name="end_date"
                value={task.end_date}
                onChange={handleChange}
                className="form-control rounded-3 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="form-select rounded-3 shadow-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="form-select rounded-3 shadow-sm"
              >
                <option>In Progress</option>
                <option>Complete</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-3 fw-semibold text-white shadow"
            style={{
              background: "linear-gradient(135deg, #007bff, #6f42c1)",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #6f42c1, #007bff)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #007bff, #6f42c1)")
            }
          >
            <FaPlusCircle /> Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
