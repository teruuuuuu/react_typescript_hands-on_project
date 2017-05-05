import * as React from "react";
import * as ReactDOM from "react-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SampleAction from '../actions/sample-action'

interface ChildomponentProps extends React.Props<any> {text: string, change_text: (text: string) => void;};
interface ChildComponentState extends React.StatelessComponent<any> {};

function mapStateToProps(state: any) {
  const { text } = state.sampleReducer
  return {text: text };
}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, SampleAction), dispatch);
}

export class ChildComponent extends React.Component<ChildomponentProps, ChildComponentState > {
  clearText() {
    this.props.change_text("")
  }

  constructor(props: any){
    super(props);
  }
  render() {
    const { text } = this.props;
    return (
      <div>
        <label>{ text }</label><br />
        <button onClick = { this.clearText.bind(this) }>クリア</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
