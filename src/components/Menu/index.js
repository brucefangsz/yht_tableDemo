import React, { Component } from 'react';
import { Navbar, Icon, Menu } from 'tinper-bee';
import { Link } from 'react-router';

import './index.css';

const SubMenu = Menu.SubMenu;

class Menus extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 1
        }
    }
    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }
    render() {
        const { toggle } = this.props;
        return (
            <Menu onClick={this.handleClick.bind(this)}
                defaultOpenKeys={['demo3sub1']}
                selectedKeys={[this.state.current]}
                mode={toggle ? "vertical" : "inline"}
            >
                <Menu.Item key="1">
                    <Link to="/CloudStateList">
                        <Icon type="uf-9square-2" />
                        {toggle ? "" : <span>CloudStateList</span>}
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/U8Signatures">
                        <Icon type="uf-userset" />
                        {toggle ? "" : <span>U8Signatures</span>}
                    </Link>
                </Menu.Item>
                <SubMenu key="sub2" title={<span>
                    <Icon type="uf-puzzle-o" />{toggle ? "" : <span>UI Element</span>}</span>}>
                    <Menu.Item key="7">
                        <Link to="/TableData">
                            DataTable 数据表格
						</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to="/">
                            Reference 参照示例
						</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="3">
                    <Link to="/IndexPage">
                        <Icon type="uf-rmb" />
                        {toggle ? "" : <span>币种</span>}
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/BasicsInfo">
                        <Icon type="uf-rmb" />
                        {toggle ? "" : <span>基本信息</span>}
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/Main">
                        <Icon type="uf-rmb" />
                        {toggle ? "" : <span>用户信息</span>}
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
}


export default Menus;
