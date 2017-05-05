import * as React from "react";
import * as ReactDOM from "react-dom"

import User from '../model/user'

interface ListCommponentProps extends React.Props<any> {};
interface ListCommponentState extends React.StatelessComponent<any> {userList: Array<User>};

export default class ListComponentProps extends React.Component<ListCommponentProps, ListCommponentState > {
  constructor(props: any) {
    super(props);
    this.state = {userList: [
      new User(1, "山田一郎"),
      new User(2, "田中二郎"),
      new User(3, "佐藤三郎")]}
  }

  render() {
    const { userList }= this.state
    return (
      <ul className="user-list">
        {userList.map((user, i) =>
          <div key={i}><li>{ user.name } </li></div>
        )}
      </ul>
    );
  }
}
