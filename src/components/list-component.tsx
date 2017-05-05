import * as React from "react";
import * as ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User from '../model/user'

interface ListCommponentProps extends React.Props<any> {userList: Array<User>, callApi: (text: any) => void;};
interface ListCommponentState extends React.StatelessComponent<any> {};

import styles from '../style/sample.css';
import * as SampleApiAction from '../api/sample-api'

function mapStateToProps(state: any) {
  const { user_list } = state.userListReducer
  return {
    userList: user_list
  }
}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, SampleApiAction), dispatch);
}
class ListComponentProps extends React.Component<ListCommponentProps, ListCommponentState > {
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {
    this.props.callApi(SampleApiAction.user_list_init());
  }

  render() {
    const { userList }= this.props
    return (
      <ul style={styles.ul}>
        {userList.map((user, i) =>
          <li key={i}><span>{ user.id }</span><span style={styles.span}>{ user.name } </span></li>
        )}
      </ul>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListComponentProps);
