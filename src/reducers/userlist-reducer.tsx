import { INIT_USER_LIST } from '../constants/sample-action-define';
import User from '../model/user'

const INITIAL_STATE = {
    user_list :[new User(0, 'john doh')]
  };

export default function userListReducer(state = INITIAL_STATE, action: {type: string, data: any}) {
  switch (action.type) {
    case INIT_USER_LIST:
      const new_user: Array<User> = [];
      action.data.user_list.map((user: any, i: number) =>
        new_user.push(new User(user.id, user.name))
      )
      return (Object as any).assign({}, state, { user_list: new_user})

    default:
      return state
  }
}
