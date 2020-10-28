export enum SocketEvents {
  CHAT_MESSAGE = 'chat_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
  UPDATE_PARTY = 'update_party',
  URL_CHANGE = 'url_change',
  VIDEO_PLAY = 'video_play',
  VIDEO_PAUSE = 'video_pause',
  VIDEO_SEEKED = 'video_seeked',
  VIDEO_PROGRESS = 'video_progress',
}

export interface CreatePartyResponse {
  roomId: string;
}
