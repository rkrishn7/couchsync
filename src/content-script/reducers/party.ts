import { PartyActions } from '@root/lib/constants/party';
import { Notification } from '@root/lib/types/notification';

export interface PartyState {
  id: string | null;
  isHost: boolean;
  joinUrl: string | null;
  hash: string | null;
  users: any[];
  notifications: Notification[];
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  id: null,
  joinUrl: null,
  hash: null,
  isHost: false,
  users: [],
  notifications: [],
};

const party = (state: PartyState = initialState, action: Action): PartyState => {
  switch (action.type) {
    case PartyActions.SET_PARTY:
      return {
        ...state,
        isHost: action.isHost,
        hash: action.hash,
        joinUrl: action.joinUrl,
        id: action.id,
        users: action.users,
      };
    case PartyActions.SET_JOIN_URL:
      return {
        ...state,
        joinUrl: action.url,
      };
    case PartyActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case PartyActions.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id),
      };
    case PartyActions.SET_IS_HOST:
      return {
        ...state,
        isHost: action.isHost,
      };
    case PartyActions.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.user.id ? action.user : user)),
      };
    case PartyActions.CREATE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: state.notifications.length, seen: false, ...action.notification },
        ],
      };
    case PartyActions.MARK_NOTIFICATION_SEEN:
      return {
        ...state,
        notifications: state.notifications.map(n => (n.id === action.notificationId ? { ...n, seen: true } : n)),
      };
    default:
      return state;
  }
};

export default party;
