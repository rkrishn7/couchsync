export enum SocketEvents {
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
<<<<<<< HEAD
=======
  UPDATE_PARTY = 'update_party',
>>>>>>> adda50ddf64d3968138f7ee9995fe20bf96d2aeb
  URL_CHANGE = 'url_change',
  VIDEO_PLAY = 'video_play',
  VIDEO_PAUSE = 'video_pause',
  VIDEO_SEEKED = 'video_seeked',
  VIDEO_PROGRESS = 'video_progress',
  JOIN_PARTY = 'join_party',
}

export interface CreatePartyResponse {
  roomId: string;
}
