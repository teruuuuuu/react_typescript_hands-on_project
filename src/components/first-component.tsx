import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SampleReducer from '../reducers/sample-reducer'
import * as SampleAction from '../actions/sample-action'

import { change_text } from '../actions/sample-action';
import ChildComponent from "./child-component"
import ListComponent from "./list-component"


interface FirstComponentProps extends React.Props<any> {text: string, change_text: (text: string) => void;}
interface FirstComponentState extends React.StatelessComponent<any> {};
function mapStateToProps(state: any) {
  const { text } = state.sampleReducer
  return { text: text };
}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, SampleAction), dispatch);
}

class FirstComponent extends React.Component<FirstComponentProps, FirstComponentState > {
  constructor(props: any){
    super(props);
  }
  textFromInput = (e: React.SyntheticEvent<EventTarget>): void => {
    this.props.change_text((e.target as HTMLInputElement).value)
  }

  render() {
      const { text } = this.props;
      return (
      <div>
        <h1>Hello, Typescript React!</h1>
        <input type="text" placeholder="from text" onChange={ this.textFromInput.bind(this) }  /><br />
        <input type="text" placeholder="to text" value={ text } readOnly/><br />
        <ChildComponent />
        <ListComponent />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstComponent);
