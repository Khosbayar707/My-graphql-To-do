// jest.setup.js
import "@testing-library/jest-dom"; // For React component tests

// Mock Clerk for AddTask, Home, UpdateTaskPage
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: { id: "test-user-id", firstName: "Test User" },
    isLoaded: true,
  }),
  SignedIn: ({ children }) => children,
  SignedOut: () => null,
  SignInButton: () => <button>Sign In</button>,
  UserButton: () => <button>User</button>,
  RedirectToSignIn: () => null,
}));

// Mock Next.js navigation for UpdateTaskPage
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockImplementation((key) => {
      const params = { taskId: "test-task-id", userId: "test-user-id" };
      return params[key];
    }),
  }),
}));
