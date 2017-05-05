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

## react-eduxを利用する
### Reduxでコンポーネンの値を変更してみる
リデューサーで使うので以下のモジュールをインストールしておく。
```
npm install @types/node --save-dev
npm install --save-dev redux-thunk @types/redux-thunk
```

まず"src/constants/sample-action-define.tsx"に今回追加するアクションの定数定義を追加します。
```
export const CHANGE_TEXT = 'CHANGE_TEXT'
```

"src/reducers/sample-reducer.tsx"にstate更新に使用するreducerを追加します。これはコンポーネント側がアクションを呼び出して来た場合にここでstateの更新を行います。
```
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
```

それから"src/reducers/index.tsx"にreducerをマージするためのメソッドを追加します。今回使用するReducerは一つだけなのであまり恩恵を感じないですが、複数のReducerが必要になる場合はこういったようにマージするメソッドがあった方が良さそうです。
```
import { combineReducers } from 'redux'
import sampleReducer from './sample-reducer'

const rootReducer = combineReducers({
  sampleReducer
})
export default rootReducer
```

Reducerを呼び出すアクションを"src/actions/sample-action.tsx"に追加します。アクション自体はコンポーネントがディスパッチという関数を使うことで呼び出すことができます。
```
import { CHANGE_TEXT } from '../constants/sample-action-define'

export function change_text(text: string) {
  return { type: CHANGE_TEXT, text: text }
}
```

stateを管理する大元であるstoreを"src/store/store-config.tsx"に作成します。applyMiddleware後にfinalCreateStoreやっているところでstoreを生成しています。applyMiddlewareについてはreactにおけるミドルウェアの機能を使う時に必要になるもので例えばログ出力や他サーバにリクエストを投げる場合などに利用されます。今回はミドルウェアを使用することもないのでapplyMiddlewareを使わずにcreateStoreだけでも良いはずですが、後からミドルウェアを使うことを想定し先にこの書き方にしておきます。まだ慣れていないのでany型で逃げる処理が多数あります。
```
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

declare const module: any;

export default function StoreConfig(initialState: any) {
  const finalCreateStore = applyMiddleware(thunk)(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
```
Reactにreduxのstateを私て扱えるようにする。"src/main.tsx"が以下になるようにします。ここではreact-reduxモジュールのProviderコンポーネントにstoreを渡しています。
```
import * as React from "react";
import * as ReactDOM from 'react-dom';

import StoreConfig from './store/store-config';
import { Provider } from 'react-redux'

import FirstComponent from "./components/first-component";

const store = StoreConfig({});
ReactDOM.render(
    <Provider store={ store }>
      <FirstComponent />
    </Provider>
    ,document.getElementById("app")
);
```
それではReduxのstateを利用する側である"src/components/first-component.tsx"を以下のように修正します。mapStateToPropsにはstateの値が、mapDispatchToPropsにはディスパッチするために必要となるメソッドが格納されています。propTypesのプロパティと、textに変更があった時に呼び出すメソッドの情報が入っていてRenderメソッドではこれを使用して描画を行っています。またテキスト入力を行った際に呼び出されるtextFromInput内で"this.props.change_text((e.target as HTMLInputElement).value)"でアクションを呼び出した上でディスパッチしてReducerにより新しいstateが発行されます。
```
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SampleReducer from '../reducers/sample-reducer'
import * as SampleAction from '../actions/sample-action'

import { change_text } from '../actions/sample-action';
import ChildComponent from "./child-component"

interface FirstComponentProps extends React.Props<any> {text: string, change_text: (text: string) => void;}
interface FirstComponentState extends React.StatelessComponent<any> {};
function mapStateToProps(state: any) {
  const { text } = state.sampleReducer
  return {
    text: text
  };
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
      console.info(this.props);
      return (
      <div>
        <h1>Hello, React!</h1>
        <input type="text" placeholder="from text" onChange={ this.textFromInput.bind(this) }  /><br />
        <input type="text" placeholder="to text" value={ text } readOnly/><br />
        <ChildComponent text={text}/>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstComponent);
```

### 子のコンンポーネントからアクションを呼び出してみる
子のコンポーネントにも直接storeで管理しているstateを関連付けて利用することができる。以下の修正を加えることでテキストのstateを空白にするアクションを呼び出すようにすることができる。
```
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
```
今回は直接storeの値を関連付けるようにしているが、親コンポーネント側で呼び出すアクションなりを変更できるようにしたいのであればpropsとして親のコンポーネントから子のコンポーネントに直接渡せるようにしたら良さそうに思います。ボタンとかテキスト入力であったりそれ自体がコンテキストを含んでいない流用生の高いものであればそれが良さそうに思います。

## 表示について
### リストを表示してみる
リストのデータを表示する場合は以下のようになります。
```
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
```
リスト表示で使用するクラスも作成します。
```

export default class User {
  id: number;
  name: string;
  constructor(id: number, name: string) { this.id = id; this.name = name}
}
```

### webpackのcss-loaderを使ってみる
react,webpackでの環境でスタイルを適用する方法は複数あるのですが、まずはhtmlのheadタグの中にstyleを書き込んですべてのコンポーネントが適用対象にするのがなじみ深いと思いますのでそれから試してみたいと思います。webpackのcss-loaderを使ってbootstrapを読み込むようにしたいと思います。適用するのは簡単でbootstrapからファイル一式をダウンロードしてきて'src/assets/bootstrap'にダウンロードしたすべてのファイルを写した上で"src/main.js"に以下のimportを追加するだけになっております。
```
import './assets/bootstrap/css/bootstrap.min.css'
```

### CSS-in-JSを試してみる
Reactではcssをstyle属性として扱っていましてCSS-in-JSはCSSの記法で書いたスクリプトをを直接style属性として扱えるようにするものとなっております。例えば"src/style/sample.css.tsx"が以下の内容だったとする場合
```
export default {
  ul: {
    listStyle: 'none',
    marginTop: '20px',
    padding: '0px',
    fontSize: '18px',
  },
  span: {
    paddingLeft: '20px',
  }
}
```
コンポーネント側では以下のようにインポートしてstyle属性を設定することができます。
```
import * as React from "react";
import * as ReactDOM from "react-dom"

import User from '../model/user'

interface ListCommponentProps extends React.Props<any> {};
interface ListCommponentState extends React.StatelessComponent<any> {userList: Array<User>};

import styles from '../style/sample.css';

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
      <ul style={styles.ul}>
        {userList.map((user, i) =>
          <li key={i}><span>{ user.id }</span><span style={styles.span}>{ user.name } </span></li>
        )}
      </ul>
    );
  }
}
```
デザイナーではないので良くわからないのですが、基本的にはcss-loaderの機能だけでスタイルを調整して動的に変更したい場合とかがあったらCSS-in-JSを使うとかの方がシンプルで良さそうな気がしました。

## routerを使ってみる
react-routerのバージョン変更による影響が大きいので実施しるタイミングによって設定が結構変わってきそうです。自分が試した時はv4がリリースされていたので以下のコマンドでモジュールをインストールしたところv4.1.1が入りました。
> npm install --save react-router-dom @types/react-router-dom         

"src/main.js"を以下のように修正することで利用できます。
```
import * as React from "react";
import * as ReactDOM from 'react-dom';

import StoreConfig from './store/store-config';
import { Provider } from 'react-redux'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/main.css'

import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstComponent from './components/first-component';
import ListComponent from './components/list-component';

const store = StoreConfig({});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ FirstComponent as any } />
        <Route exact path="/first" component={ FirstComponent as any } />
        <Route exact path="/list" component={ ListComponent as any } />
      </Switch>
    </BrowserRouter>
  </Provider >
    ,document.getElementById("app")
);
```
ここでは"http://localhost:8080/"及び"http://localhost:8080/first"でアクセスした時にFirstConmponentを表示し"http://localhost:8080/list"でアクセスした時にListConponentを表示する動きになります。urlからパラメータを受け取ったりテスト方法であったりは公式の方から確認いただければと思います。
