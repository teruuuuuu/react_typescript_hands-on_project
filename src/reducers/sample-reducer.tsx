import { CHANGE_TEXT } from '../constants/sample-action-define'
import { fromJS } from 'immutable';

const INITIAL_STATE = {
    text : 'init text'
};

export default function sampleReducer(state = INITIAL_STATE, action: {type: string, text: string}) {
  switch (action.type) {
    case CHANGE_TEXT:
      return (Object as any).assign({}, state, { text: action.text})

    default:
      return state
  }
}
