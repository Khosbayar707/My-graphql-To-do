import Task from "@/models/Tasks";

export const deleteTask = async (_: any, { taskId, userId }: any) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found.");
  if (task.userId !== userId) throw new Error("Unauthorized.");

  await task.deleteOne();
  return task;
};
