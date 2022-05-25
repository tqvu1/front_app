import React from 'react';
import { APP_ACTIONS } from 'src/constants/app';

export interface AppState {
  lang: 'ja' | 'en';
}

export type ChangeLang = {
  type: APP_ACTIONS.CHANGE_LANG;
  payload: AppState['lang'];
};

export type Actions = ChangeLang;

export const defaultState: AppState = {
  lang: 'ja',
};

export const reducer: React.Reducer<AppState, Actions> = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.CHANGE_LANG:
      return { ...state, lang: action.payload };
    default:
      return { ...state };
  }
};
