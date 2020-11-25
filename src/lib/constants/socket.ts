export enum SocketEvents {
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
  JOIN_PARTY = 'join_party',
  VIDEO_EVENT = 'video_event',
  URL_CHANGE = 'url_change',
  USER_JOINED_PARTY = 'user_joined_party',
  USER_LEFT_PARTY = 'user_left_party',
  NEW_HOST = 'new_host',
  PARTY_USER_UPDATED = 'party_user_updated',
}

export interface CreatePartyResponse {
  roomId: string;
}
