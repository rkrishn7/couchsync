export enum SocketEvents {
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
  JOIN_PARTY = 'join_party',
  VIDEO_EVENT = 'video_event',
  USER_JOINED_PARTY = 'user_joined_party',
  USER_LEFT_PARTY = 'user_left_party',
  NEW_HOST = 'new_host',
  PARTY_USER_UPDATED = 'party_user_updated',
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
