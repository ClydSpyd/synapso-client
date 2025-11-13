"use client"
import TaskBoard from "@/components/task-board";
import { useTasks } from "@/queries/useTasks";
import { useEffect, useState } from "react";
import TaskFilters from "./components/task-filters";

export default function TestPage() {
  const [tasks, setTasks] = useState<Task[]>([]);


  const { data: tasksBE } = useTasks();

  useEffect(() => {
    if (tasksBE) {
      setTasks(tasksBE);
    }
  }, [tasksBE]);

  if (!tasksBE) return null;

  return (
    <div className="h-fit min-h-full w-full flex flex-col">
      <TaskFilters setTasks={setTasks} />
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
