// Thought processes and outputs organized by category and task
// Each category has its own section with task-specific thought processes

// Re-export types
export type { ThoughtProcessData } from './thought-process-types';
import type { ThoughtProcessData } from './thought-process-types';

// Import thought processes from separate files
import { chatgptThoughts } from './chatgpt-thoughts';
import { claudeThoughts } from './claude-thoughts';
import { firebaseThoughts } from './firebase-thoughts';
import { boltThoughts } from './bolt-thoughts';
import { v0Thoughts } from './v0-thoughts';

// Re-export for convenience
export { chatgptThoughts, claudeThoughts, firebaseThoughts, boltThoughts, v0Thoughts };

// Map category ID to thought process data
export const thoughtProcessesByCategory: Record<string, Record<string, ThoughtProcessData>> = {
  chatgpt: chatgptThoughts,
  claude: claudeThoughts,
  firebase: firebaseThoughts,
  bolt: boltThoughts,
  v0: v0Thoughts
};

// Helper function to get thought process for a specific category and task
export function getThoughtProcess(categoryId: string, taskBaseId: string): ThoughtProcessData | undefined {
  const categoryThoughts = thoughtProcessesByCategory[categoryId];
  if (!categoryThoughts) return undefined;
  return categoryThoughts[taskBaseId];
}
