export interface VideoEvent {
  partyHash: string;
  eventData: VideoEventData;
}

export interface VideoEventData {
  paused: boolean;
  currentTime: number;
  playbackRate: number;
  duration: number;
  videoId: string;
}
