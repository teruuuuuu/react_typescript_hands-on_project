# react_typescript_hands-on_project
Typescript webpack環境でのReact開発ハンズオン用プロジェクト

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# TypescriptReact事始め
Typescript webpackの環境でReactの開発を進めていきたいと思います。
## 最初のコンポーネントを追加する
### まずは表示だけしてみる
vue-cliで作成したプロジェクトをTypescrit,React化した続きから進めていきたいと思います。まず最初のコンポーネントを追加してみたいと思います。
'src/components/first-component.tsx'を追加して以下の内容にしてください。
```
import * as React from "react";
import * as ReactDOM from "react-dom"

export interface FirstComponentProps {}
export interface FirstComponentState {}
export class FirstComponent extends React.Component<FirstComponentProps, FirstComponentState> {
  render() {
    return (
      <div>
        <h1>Hello, React!!</h1>
      </div>
    );
  }
}
```
特に値を受け取って表示するわけでもない上記コンポーネントをまずは表示できるようにしてみたいと思います。'main.tsx'を以下の内容にして'npm run dev'で動作が確認できます。
```
import * as React from "react";
import * as ReactDOM from "react-dom";

import { FirstComponent } from "./components/first-component";

ReactDOM.render(
    <FirstComponent />,
    document.getElementById("app")
);
```
###　stateの値を表示してみる
今度はstateの値を表示できるようにしてみたいと思います。Reactではstateに似た概念としてpropsがありますがこれは親から受け取るプロパティはpropsにセットされ自分自身のコンポーネントで使う値はstateにセットするというもので、コンポーネント初期化時に呼び出されるconstructor(props)で初期化を行います。

```
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
```

### propsで引き継いだ値を子コンポーネントで利用する
親からの値を受け取る側のコンポーネントを準備します。以下の"src/components/child-component.tsx"を作成します。
```

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
```
次に値を受け渡す側"src/components/first-componet.js"側のrenderメソッドを以下の様に修正します。
```
render() {
    const { text } = this.state;
    return (
    <div>
      <h1>Hello, React!</h1>
      <input type="text" placeholder="from text" onChange={ this.textFromInput.bind(this) }  /><br />
      <input type="text" placeholder="to text" value={ text } readOnly/><br />
      <ChildComponent text={text}/>
    </div>
  );
}
```

renderの呼び出しで新しく作成したChildComponentコンポーネントのプロパティ'text'にテキスト入力した値が入るようになっています。ChildComponenは受け取ったプロパティをラベルでそのまま出すようにしておりまして動かしてみるとそれが確認できるかと思います。
