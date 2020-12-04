import { PartyActions, SocketEvents } from '@root/lib/constants';
import { Notification } from '@root/lib/types/notification';

import { PartyState } from '@contentScript/reducers/party';
import socket from '@contentScript/socket';

import { Dispatch } from 'redux';

import { setUser } from './user';

export const createNotification = (notification: Omit<Notification, 'id' | 'seen'>) => {
  return {
    type: PartyActions.CREATE_NOTIFICATION,
    notification,
  };
};

export const markNotificationSeen = (notificationId: number) => {
  return {
    type: PartyActions.MARK_NOTIFICATION_SEEN,
    notificationId,
  };
};

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const setJoinUrl = (url: string) => {
  return {
    type: PartyActions.SET_JOIN_URL,
    url,
  };
};

export const updateUser = (user: any) => {
  return {
    type: PartyActions.UPDATE_USER,
    user,
  };
};

export const joinParty = ({ hash, isHost }: any) => {
  return (dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
      const MAX_EVENT_TIMEOUT_MS = 3000;
      setTimeout(() => {
        reject(new Error('Request timed out. Please try again.'));
      }, MAX_EVENT_TIMEOUT_MS);

      socket.connect();
      socket.emit(SocketEvents.JOIN_PARTY, { partyHash: hash }, ({ party, user }: any) => {
        dispatch(setParty({ isHost, ...party }));
        dispatch(setUser({ ...user }));

        resolve({ party, user });
      });
    });
  };
};
