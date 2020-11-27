import { Dispatch, Reducer } from 'redux';

export const createAsyncReducer = <T extends Reducer>(reducer: T, reducerName: string) => {
  return (state: Parameters<T>[0], action: Parameters<T>[1]): Exclude<Parameters<T>[0], undefined> => {
    if (action.type === `${reducerName}-SET_ASYNC_TOGGLED_STATE`) {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    return reducer(state, action);
  };
};

type AsyncActionParams<T> = {
  work: (dispatch: Dispatch, ...args: any) => Promise<any>;
  key: T;
  reducer: string;
};

export const createAsyncAction = <T = string>({ work, key, reducer }: AsyncActionParams<T>) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: `${reducer}-SET_ASYNC_TOGGLED_STATE`,
      key,
      value: true,
    });

    const result = await dispatch(work);

    dispatch({
      type: `${reducer}-SET_ASYNC_TOGGLED_STATE`,
      key,
      value: false,
    });

    return result;
  };
};
