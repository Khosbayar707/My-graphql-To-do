import Task from "@/models/Tasks";

export const updateStatus = async (
  _: any,
  {
    taskId,
    userId,
    isDone,
  }: { taskId: string; userId: string; isDone: boolean }
) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found.");
  if (task.userId !== userId) throw new Error("Unauthorized.");

  task.isDone = isDone;
  task.updatedAt = new Date();

  return await task.save();
};
