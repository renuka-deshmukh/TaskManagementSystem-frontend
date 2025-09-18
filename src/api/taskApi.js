import axiosInstance from "./api";


export const getAllTasks = () => axiosInstance.get('/task/getAllTasks')

export const createTask = (payload) => axiosInstance.post('/task/createTask', payload)

export const deleteTask = (task_id) => axiosInstance.delete(`/task/deleteTask/${task_id}`)