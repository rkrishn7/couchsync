export enum SocketEvents {
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
  JOIN_PARTY = 'join_party',
  VIDEO_EVENT = 'video_event',
  URL_CHANGE = 'url_change',
  USER_LOADED = 'user_loaded',
}

export interface CreatePartyResponse {
  roomId: string;
}

export enum VideoSocketEvents {
  VIDEO_PLAY = 'video_play',
  VIDEO_PAUSE = 'video_pause',
  VIDEO_SEEKED = 'video_seeked',
  VIDEO_PROGRESS = 'video_progress',
}
