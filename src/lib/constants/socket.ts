export enum SocketEvents {
  CHAT_MESSAGE = 'chat_message',
  CONNECT = 'connect',
  CREATE_PARTY = 'create_party',
}

export interface CreatePartyResponse {
  roomId: string;
}
