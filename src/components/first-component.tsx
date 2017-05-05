import * as React from "react";
import * as ReactDOM from "react-dom"


interface FirstComponentProps extends React.Props<any> {}
interface FirstComponentState extends React.StatelessComponent<any> {text: string};

export class FirstComponent extends React.Component<FirstComponentProps, FirstComponentState > {
  constructor(props: any){
    super(props);
    this.state = { text: "init val" };
  }
  textFromInput = (e: React.SyntheticEvent<EventTarget>): void => {
    this.setState({text: (e.target as HTMLInputElement).value})
  }
  render() {
      const { text } = this.state;
      return (
      <div>
        <h1>Hello, React!</h1>
        <input type="text" placeholder="from text" onChange={ this.textFromInput.bind(this) }  /><br />
        <input type="text" placeholder="to text" value={ text } readOnly/><br />
      </div>
    );
  }
}
