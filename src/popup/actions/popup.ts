import { PopupActions, PopupViews } from '@root/lib/constants/popup';

export const setPopupView = (view: PopupViews) => {
  return {
    type: PopupActions.SET_POPUP_VIEW,
    view,
  };
};
