import { getUserActiveTasks } from "./queries/getUserActiveTask";
import { getUserDoneTasks } from "./queries/getUserDoneTask";
import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { deleteTask } from "./mutations/deleteTask";

export const resolvers = {
  Query: {
    getUserActiveTasks,
    getUserDoneTasks,
  },
  Mutation: {
    addTask,
    updateTask,
    deleteTask,
  },
};
