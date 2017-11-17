import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from '../layout/App';
import CloudStateList from 'pages/CloudStateList';
import U8Signatures from 'pages/U8Signatures';
import IndexPage from 'pages/IndexPage';
import Currency from 'pages/Currency';
import DataTable from 'pages/TableData';
import BasicsInfo from 'pages/BasicsInfo';
import Main from 'pages/Main';


const Routers = (
  <Router history={hashHistory}>
    <Route exact path="/" component={App}>
      <IndexRoute component={CloudStateList} />
      <Route path="/CloudStateList" component={CloudStateList} />
      <Route path="/U8Signatures" component={U8Signatures} />
      <Route path="/IndexPage" component={IndexPage} />
      <Route path="/TableData" component={DataTable} />
      <Route path="/BasicsInfo" component={BasicsInfo} />
      <Route path="/Main" component={Main} />
    </Route>
  </Router>
)


export default Routers
