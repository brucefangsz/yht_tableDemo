import React, { Component } from 'react';
import { Con, Row, Col, Icon, Button, Table, Checkbox, FormControl } from 'tinper-bee';
export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    searchValueChange(val, e) {
        this.props.searchValueChange(val, e)
    }
    searchhandleToggle() {
        this.props.searchhandleToggle()
    }
    render() {
        let {searchToggle, suser, scode} = this.props,
            h1 = { 'height': '43px' }, h2 = { 'height': 'auto' };
        return (
            <div className="search" style={searchToggle ? h2 : h1}>
                快速查询  <span onClick={this.searchhandleToggle.bind(this)} className='open'>  {searchToggle ? '收起↑' : "展开↓"} </span>

                <div>
                    {searchToggle ?
                        <div>
                            <Row>
                                <Col md={6} xs={6} sm={6}>
                                    联系人：<FormControl type="text" onChange={this.searchValueChange.bind(this, 'suser')} value={suser} />
                                </Col>
                                <Col md={6} xs={6} sm={6}>
                                    订单编号：<FormControl type="text" onChange={this.searchValueChange.bind(this, 'scode')} value={scode} />
                                </Col>
                            </Row>
                            <Button colors="primary" onClick={this.props.searchData}>搜索</Button>
                        </div>
                        : ""}
                </div>
            </div>
        )
    }
}