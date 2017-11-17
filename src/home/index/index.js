import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import routes from '../../routes'

// import 'tinper-bee/assets/tinper-bee.css';
import 'bee-step/build/Step.css';
import './index.less'

ReactDOM.render(routes,
  document.querySelector("#app"));
