import axiosInstance from "./api";

export const getAllTasks = () => axiosInstance.get("/task/getAllTasks");

export const createTask = (task) => axiosInstance.post("/task/createTask", task);

export const deleteTask = (task_id) => axiosInstance.delete(`/task/deleteTask/${task_id}`)

export const isCompleteTask = (task_id) =>
  axiosInstance.put(`/task/updateIsComplete/${task_id}`);


export const editTask = (task_id, taskData) => axiosInstance.put(`/task/editTask/${task_id}`, taskData);


export const searchTasks = (query) => {
    return axiosInstance.get(`/tasks/search?q=${encodeURIComponent(query)}`);
};

