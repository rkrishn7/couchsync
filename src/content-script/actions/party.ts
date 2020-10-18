import { PartyActions } from '@root/lib/constants';
// import { StoreState } from '@popup/store';

export const setRoomId = (roomId: string) => {
  return {
    type: PartyActions.SET_ROOM_ID,
    roomId,
  };
};

export const setJoinUrl = (joinUrl: string | null) => {
  return {
    type: PartyActions.SET_JOIN_URL,
    joinUrl,
  };
};
