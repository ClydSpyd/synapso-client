"use client"
import TaskBoard from "@/components/task-board";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "@mantine/core";

export default function TestPage() {
    const { open } = useModalStore();

  return (
    <div className="h-fit min-h-full w-full flex flex-col">
      <Button variant="grape" onClick={() => open("task")}>
        Add Task
      </Button>
      <TaskBoard />
    </div>
  );
}
