export enum SocketEvents {
  CHAT_MESSAGE = 'chat_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
  UPDATE_PARTY = 'update_party',
  URL_CHANGE = 'url_change',
}

export interface CreatePartyResponse {
  roomId: string;
}
