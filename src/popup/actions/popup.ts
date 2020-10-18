import { PopupActions } from '@root/lib/constants/popup';

export const enablePopup = () => {
  return {
    type: PopupActions.ENABLE_POPUP,
  };
};

export const disablePopup = () => {
  return {
    type: PopupActions.DISABLE_POPUP,
  };
};
