import { useParams } from "react-router-dom";
import { ErrorMessage, Loading, TaskForm } from "../components";
import taskService from "../services/taskService";
import { useQuery } from "@tanstack/react-query";


function EditTask() {
    const { taskId } = useParams();

    const taskQuery = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => taskService.getTaskById(taskId)
    })

    if (taskQuery.isLoading) {
        return <Loading />
    }

    if (taskQuery.isError) {
        return <ErrorMessage message={taskQuery.error} onRetry={() => taskQuery.refetch()} />
    }
    return (
        <TaskForm task={taskQuery.data?.data} />
    )
}

export default EditTask;