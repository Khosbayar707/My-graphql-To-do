import { getUserActiveTasks } from "./queries/getUserActiveTask";
import { getUserDoneTasks } from "./queries/getUserDoneTask";
import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { deleteTask } from "./mutations/deleteTask";
import { updateStatus } from "./mutations/updateStatus";

export const resolvers = {
  Query: {
    getUserActiveTasks,
    getUserDoneTasks,
  },
  Mutation: {
    addTask,
    updateTask,
    deleteTask,
    updateStatus,
  },
};
