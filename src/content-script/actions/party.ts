import { PartyActions } from '@root/lib/constants';
import { PartyState } from '@contentScript/reducers/party';

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};
