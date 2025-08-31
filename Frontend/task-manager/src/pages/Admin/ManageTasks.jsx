import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/layouts/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    console.log("getAllTasks called with filterStatus:", filterStatus);
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      const tasks = response.data?.tasks || [];
      setAllTasks(tasks.length > 0 ? tasks : []);

      // Count tasks by status directly
      const pendingCount = tasks.filter(
        (task) => task.status === "Pending"
      ).length;
      const inProgressCount = tasks.filter(
        (task) => task.status === "In Progress"
      ).length;
      const completedCount = tasks.filter(
        (task) => task.status === "Completed"
      ).length;

      const statusArray = [
        { label: "All", count: tasks.length },
        { label: "Pending", count: pendingCount },
        { label: "In Progress", count: inProgressCount },
        { label: "Completed", count: completedCount },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClick = (taskData) => {
    console.log("Navigating with taskData:", taskData);
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    console.log('Download API URL:', API_PATHS.REPORTS.EXPORT_TASKS);
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      console.log('Download response:', response);

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading task report:", error);
      toast.error("Failed to download task report. Please try again.");
    }
  };
  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
            <button
              className="flex lg:hidden download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {console.log("Rendering tasks:", allTasks)}
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => {
                console.log("TaskCard clicked, item:", item);
                handleClick(item);
              }}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
