import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskForm } from "../components";
import taskService from "../services/taskService";


function EditTask() {
    const { taskId } = useParams();
    const [task, setTask] = useState();

    useEffect(() => {
        const fetchTask = async () => {
            const res = await taskService.getTaskById(taskId);
            if (res) {
                setTask(res.data)
            }
        }

        fetchTask()

    }, [taskId])


    return (
        <TaskForm task={task} />
    )
}

export default EditTask;