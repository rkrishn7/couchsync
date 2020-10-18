import { PopupActions } from '@root/lib/constants/popup';

export interface PopupState {
  enabled: boolean;
}

type Action = { type: PopupActions } & Record<string, any>;

const initialState: PopupState = {
  enabled: false,
};

const popup = (state: PopupState = initialState, action: Action) => {
  switch (action.type) {
    case PopupActions.ENABLE_POPUP:
      return {
        ...state,
        enabled: true,
      };
    case PopupActions.DISABLE_POPUP:
      return {
        ...state,
        enabled: false,
      };
    default:
      return state;
  }
};

export default popup;
