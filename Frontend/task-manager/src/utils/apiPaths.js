export const BASE_URL = import.meta.env.VITE_API_URL || "https://your-backend-domain.onrender.com";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE : "/api/auth/profile",
    },

    USERS: {
        GET_ALL_USERS: "/api/users", //get all users
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // get user by id
        CREATE_USER: "/api/users", // create user
        UPDATE_USER: (userId) => `/api/users/${userId}`, // update user
        DELETE_USER: (userId) => `/api/users/${userId}`, // delete user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",
        GET_ALL_TASKS: "/api/tasks",
        GET_TASKS_BY_ID: (taskId) => `/api/tasks/${taskId}`, // get task by id
        CREATE_TASK: 	"/api/tasks", // create task
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}/todo`, // update task
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}/todo`, // delete task
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", //download all tasks as an excel
        EXPORT_USERS: "/api/reports/export/users", //download user tasks as
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // upload image
    }
};