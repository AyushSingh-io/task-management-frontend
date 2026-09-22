import React, { useEffect, useState } from "react";
import projectService from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Loading, Select } from "../components";
import { useQuery } from "@tanstack/react-query";

function Projects() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const { data , isPending, isLoading, isError, error , refetch } = useQuery({
        queryKey: ["projects", page, status],
        queryFn: () => {
            return projectService.getProjects({
                page,
                limit : 6 ,
                status: status === 'ALL' ? "" : status,
            })
        }
    })

    const totalPages = data?.data?.totalPages || 0;

    return (
        isError ?
            <ErrorMessage message={error} onRetry={refetch} />
            :
            <div className="min-h-screen bg-slate-100 p-6">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            My Projects
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Projects you are involved in
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/project/create")}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="text-lg leading-none">+</span>
                        Create Project
                    </Button>

                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Projects
                        </h2>

                        <p className="text-sm text-slate-500">
                            Manage and view your projects
                        </p>
                    </div>

                    <Select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1)
                        }}
                        options={["ALL", "ACTIVE", "COMPLETED", "ARCHIVED"]}
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-44"
                    />

                </div>

                {/* Projects */}
                {isLoading ?
                    <Loading />
                    :
                    data?.data.projects?.length === 0 ?
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-center shadow-sm">

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                <svg
                                    className="h-8 w-8 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 7.5l9 4.5 9-4.5M12 12v9"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-800">
                                No projects found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {status
                                    ? `You don't have any ${status.toLowerCase()} projects.`
                                    : "You don't have any projects yet."
                                }
                            </p>

                        </div>
                        :
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {data?.data.projects?.map((project) => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

                                <p className="text-sm text-slate-600">
                                    Page <span className="font-semibold text-slate-800">{page}</span> of{" "}
                                    <span className="font-semibold text-slate-800">{totalPages}</span>
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage((prev) => prev - 1)}
                                        disabled={page === 1 || totalPages === 0}
                                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        onClick={() => setPage((prev) => prev + 1)}
                                        disabled={page === totalPages || totalPages === 0}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>

                            </div>
                        </>
                }

            </div>
    );
}

export default Projects;
