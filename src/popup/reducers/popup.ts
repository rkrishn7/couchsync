import { PopupActions, PopupViews } from '@root/lib/constants/popup';

export interface PopupState {
  view: PopupViews;
}

type Action = { type: PopupActions } & Record<string, any>;

const initialState: PopupState = {
  view: PopupViews.LOADING,
};

const popup = (state: PopupState = initialState, action: Action) => {
  switch (action.type) {
    case PopupActions.SET_POPUP_VIEW:
      return {
        ...state,
        view: action.view as PopupViews,
      };
    default:
      return state;
  }
};

export default popup;
