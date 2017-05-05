
import * as React from "react";
import * as ReactDOM from "react-dom"

interface ChildomponentProps extends React.Props<any> {text: string}
interface ChildComponentState extends React.StatelessComponent<any> {};

export default class ChildComponent extends React.Component<ChildomponentProps, ChildComponentState > {
  constructor(props: any){
    super(props);
  }
  render() {
    const { text } = this.props;
    return (
      <div>
        <label>{ text }</label>
      </div>
    );
  }
}
