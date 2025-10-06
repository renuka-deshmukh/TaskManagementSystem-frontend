// src/components/EditTaskModal.js
import React, { useState, useEffect } from "react";
import { editTask } from "../api/taskApi"; 

const EditTaskModal = ({ task, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    task_name: "",
    task_description: "",
    is_complete: 0,
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (!task) return;
    setFormData({
      task_name: task.task_name || "",
      task_description: task.task_description || "",
      is_complete: task.is_complete ?? 0,
      start_date: formatDateForInput(task.start_date),
      end_date: formatDateForInput(task.end_date),
    });
  }, [task]);

  function formatDateForInput(d) {
    if (!d) return "";
    const s = String(d);
    return s.includes("T") ? s.split("T")[0] : s; // handles ISO strings and yyyy-mm-dd
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    if (!task) return;
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) >= new Date(formData.end_date)) {
        alert("End date must be after start date");
        return;
      }
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        is_complete: Number(formData.is_complete),
      };

      // use task.task_id (or fallback to task.id if your object uses that)
      const id = task.task_id ?? task.id;
      const res = await editTask(id, payload);

      if (res?.data?.success) {
        onUpdated && onUpdated();
        onClose && onClose();
      } else {
        alert(res?.data?.msg || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating task");
    } finally {
      setLoading(false);
    }
  };

  // don't render modal if no task selected
  if (!task) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Task Name</label>
              <input type="text" className="form-control" name="task_name" value={formData.task_name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Task Description</label>
              <textarea className="form-control" name="task_description" value={formData.task_description} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Status</label>
              <select className="form-control" name="is_complete" value={formData.is_complete} onChange={handleChange}>
                <option value={0}>In Progress</option>
                <option value={1}>Completed</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Start Date</label>
              <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>End Date</label>
              <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
