import React, { useState, useEffect } from 'react'
import { getAllTasks, deleteTask } from '../api/taskApi';
import DeleteTaskModal from './DeleteTask';

const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

   async function fetchData() {
    const response = await getAllTasks();
    console.log(response.data.tasks);
    if (response.data.success) {
      setTasks(response.data.tasks);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

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
    //   alert(response.data.msg);
      setShowModal(false);   // close modal
      setSelectedTask(null); // reset task
      fetchData();           // refresh tasks
    }
  } catch (err) {
    console.error("Delete error", err);
  }
}


  return (
    <>
    <div>
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Task Description</th>
                        <th scope="col">Task IsComplete</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                 <tbody>
                   {tasks.length > 0 ? (<>
              {
                tasks.map((task,i)=>(
                        <tr keys={i}>
                <td scope="row">{i+1}</td>
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>{task.is_complete == 0 ? <span>In progress</span>:<span>Completed</span>}</td>
                <td>{task.start_date}</td>
                <td>{task.end_date}</td>
                <td><button className="btn btn-success">Edit</button>
                <button className="btn btn-danger"
                 onClick={() => handleDeleteClick(task)}
                >Delete</button>
                </td>
              </tr>
                ))
              }
            </>) : (
              <tr>No task available</tr>
            )}
          </tbody>
            </table>
        </div>
    </div>
         <DeleteTaskModal show={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        task={selectedTask}/>
         
    </>
  )
}

export default Home