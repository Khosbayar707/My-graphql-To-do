import { gql, useQuery } from "@apollo/client";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const GET_USER_ACTIVE_TASKS = gql`
  query GetUserActiveTasks($userId: String!) {
    getUserActiveTasks(userId: $userId) {
      _id
      taskName
      description
      priority
      isDone
      tags
    }
  }
`;

const GET_USER_DONE_TASKS = gql`
  query GetUserDoneTasks($userId: String!) {
    getUserDoneTasks(userId: $userId) {
      _id
      taskName
      description
      priority
      isDone
      tags
    }
  }
`;

export default function Home() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id);
    }
  }, [isLoaded, user]);

  const {
    data: activeData,
    loading: activeLoading,
    error: activeError,
  } = useQuery(GET_USER_ACTIVE_TASKS, {
    variables: { userId: userId || "" },
    skip: !userId,
  });

  const {
    data: doneData,
    loading: doneLoading,
    error: doneError,
  } = useQuery(GET_USER_DONE_TASKS, {
    variables: { userId: userId || "" },
    skip: !userId,
  });

  if (!isLoaded || activeLoading || doneLoading) return <p>Loading...</p>;
  if (!user) return <RedirectToSignIn />;
  if (activeError || doneError)
    return <p>Error: {activeError?.message || doneError?.message}</p>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
          <h1 className="text-xl font-semibold text-gray-800">Tasks</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/add-task?userId=${userId}`)}
              className="bg-blue-500 text-white px-4 py-1 text-sm font-medium hover:bg-blue-600"
            >
              Add Task
            </button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-500 text-white px-4 py-1 text-sm font-medium hover:bg-blue-600">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>

        <p className="text-base text-gray-600 mb-6">Hello, {user.firstName}!</p>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Active Tasks
          </h2>
          {activeData?.getUserActiveTasks?.length === 0 ? (
            <p className="text-gray-500">No active tasks.</p>
          ) : (
            <ul className="space-y-3">
              {activeData?.getUserActiveTasks?.map((task: any) => (
                <li key={task._id} className="border border-gray-200 p-4">
                  <h3 className="text-base font-medium text-gray-800">
                    {task.taskName}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.isDone ? "Done" : "Not Done"}</p>
                    <p>Tags: {task.tags?.join(", ") || "None"}</p>
                  </div>
                  <button
                    onClick={() =>
                      router.push(
                        `/update-task?taskId=${task._id}&userId=${userId}`
                      )
                    }
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Completed Tasks
          </h2>
          {doneData?.getUserDoneTasks?.length === 0 ? (
            <p className="text-gray-500">No completed tasks.</p>
          ) : (
            <ul className="space-y-3">
              {doneData?.getUserDoneTasks?.map((task: any) => (
                <li key={task._id} className="border border-gray-200 p-4">
                  <h3 className="text-base font-medium text-gray-800">
                    {task.taskName}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.isDone ? "Done" : "Not Done"}</p>
                    <p>Tags: {task.tags?.join(", ") || "None"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
