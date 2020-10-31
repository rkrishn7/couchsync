import { VideoSocketEvents } from '@root/lib/constants/socket';

export interface VideoEvent {
  partyHash: string;
  eventData: VideoEventData;
}

export interface VideoEventData {
  isHost: boolean;
  paused: boolean;
  currentTime: number;
  playbackRate: number;
  duration: number;
  eventType: VideoSocketEvents;
}
