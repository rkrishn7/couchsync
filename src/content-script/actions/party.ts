import { PartyActions, SocketEvents } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';
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

export const updateUser = (user: any) => {
  return {
    type: PartyActions.UPDATE_USER,
    user,
  };
};

export const joinParty = ({ hash, isHost }: any) => {
  return (dispatch: Dispatch) => {
    try {
      socket.emit(SocketEvents.JOIN_PARTY, { partyHash: hash }, ({ party, user }: any) => {
        dispatch(setParty({ isHost, ...party }));
        dispatch(setUser({ ...user }));
      });
    } catch (error) {
      debug(error.message);
    }
  };
};

export const hostNav = () => {
  return {
    type: PartyActions.HOST_NAV,
  };
};
