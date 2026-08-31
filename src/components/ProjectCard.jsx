import React from "react"
import { Link } from "react-router-dom"

function ProjectCard({ project }) {
    const createdDate = new Date(project.createdAt).toLocaleDateString()

    return (
        <Link
            to={`/projects/${project._id}`}
            className="block overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            {/* Cover Image */}
            <div className="h-40 w-full bg-indigo-100">
                {project.coverImage ? (
                    <img
                        src={project.coverImage}
                        alt={project.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-indigo-400">
                        No Cover Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Name + Status */}
                <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {project.name}
                    </h2>

                    <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                        {project.status}
                    </span>
                </div>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                    {project.description || "No description available"}
                </p>

                {/* Created Date */}
                <div className="border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-400">
                        Created on {createdDate}
                    </p>
                </div>

            </div>
        </Link>
    )
}

export default ProjectCard