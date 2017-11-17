import React, { Component } from 'react';
import "./App.less";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let sh = { height: '100%' };
    return (<div style={sh}>
      <div className="main clearfix">
        {this.props.children}
      </div>
      {/*<div className="copyright">
        <div className="link-text clearfix">
          <ul className="link">
            <li>
              <a href="#">帮助中心</a>
            </li>
            <li>
              <a href="#">关于友户通</a>
            </li>
            <li>
              <a href="#">联系我们</a>
            </li>
            <li>
              <a href="#">问题反馈</a>
            </li>
          </ul>
        </div>
        <div className="company">© 2017 用友网络科技股份有限公司版权所有</div>
      </div>*/}
    </div>)
  }
}
