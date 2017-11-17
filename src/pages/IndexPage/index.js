// 引入公用库
import React, { Component } from 'react';
import MenuList from 'components/Menu';
import MyHeader from 'components/Header';
import classnames from 'classnames';
import { Con, Row, Col, Icon } from 'tinper-bee';
import DataTable from '../Currency/index';
import './index.less';
const b='123';
export default class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render() {
        let sh = { height: '100%' },
            {toggle} = this.state;
        return (
            <div style={sh}>
                <div className={classnames("side-bar", { "toggled": toggle })}>
                    {
                        toggle ? (
                            <Icon type="uf-iuap-col" className="nav-icon" />
                        ) : (
                                <img
                                    src="//design.yonyoucloud.com/static/img/designer/logo.png"
                                />
                            )
                    }
                    <MenuList toggle={toggle} />
                </div>
                <div className={classnames("content", { "toggled": toggle })}>
                    <MyHeader toggle={toggle} onToggle={this.handleToggle} data-b={b}/>
                    <DataTable/>
                </div>
            </div>
        )
    }
}