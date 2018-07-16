import React from "react";
import { Route, Redirect } from "react-router";
/* import { ConnectedRouter } from "react-router-dom"; */
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import MainWrap from "./components/Main/Main";
import LoginWrap from "./components/Login/Login";
import { persistor, history } from "./store";

const Loading = () => (
  <img src="/img/loading.gif" alt="Loading..." align="middle" />
);

const App = () => (
  <PersistGate loading={<Loading />} persistor={persistor}>
    {" "}
    <ConnectedRouter history={history}>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/login/" />} />
        <Route path="/login/" component={LoginWrap} />
        <Route path="/main/" component={MainWrap} />
      </div>
    </ConnectedRouter>
  </PersistGate>
);

export default App;
