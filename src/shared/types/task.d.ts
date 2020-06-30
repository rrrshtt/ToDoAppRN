export interface Task {
  id: string;
  title?: string;
  startedTimestamp: number;
  timeSpentMs: number;
  isPaused: boolean;
}
