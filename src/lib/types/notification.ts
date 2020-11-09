export interface Notification {
  id: number;
  seen: boolean;
  title: string;
  content: string;
  avatar?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}
