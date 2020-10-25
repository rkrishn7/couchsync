import { PartyActions } from '@root/lib/constants';

export const setPartyId = (partyId: string) => {
  return {
    type: PartyActions.SET_PARTY_ID,
    partyId,
  };
};

export const setJoinUrl = (joinUrl: string | null) => {
  return {
    type: PartyActions.SET_JOIN_URL,
    joinUrl,
  };
};

export const setPartyHost = () => {
  return {
    type: PartyActions.SET_HOST,
  };
};
