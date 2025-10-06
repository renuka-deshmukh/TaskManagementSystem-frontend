import axiosInstance from "./api";


export const getAllTasks = () => axiosInstance.get('/task/getAllTasks')

export const createTask = (payload) => axiosInstance.post('/task/createTask', payload)

export const deleteTask = (task_id) => axiosInstance.delete(`/task/deleteTask/${task_id}`)

export const isCompleteTask = (task_id) => axiosInstance.put(`/task/isComplete/${task_id}`)

export const editTask = (task_id, taskData) => axiosInstance.put(`/task/editTask/${task_id}`, taskData);

