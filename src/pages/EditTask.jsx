import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage, Loading, TaskForm } from "../components";
import taskService from "../services/taskService";


function EditTask() {
    const { taskId } = useParams();
    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTask = async () => {
        try {
            setError("");
            const res = await taskService.getTaskById(taskId);
            if (res) {
                setTask(res.data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTask()

    }, [taskId])

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchTask} />
    }
    return (
        <TaskForm task={task} />
    )
}

export default EditTask;