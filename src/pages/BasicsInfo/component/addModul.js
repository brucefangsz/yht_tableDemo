import React, { Component } from 'react';
import { Row, Col, Button, FormControl, Table } from 'tinper-bee';
import multiSelect from '../multiSelect.js';
const columnsChild = [
    {
        dataIndex: 'productdesc',
        key: 'productdesc',
        title: '备注'
    }, {
        dataIndex: 'productname',
        key: 'productname',
        title: '产品'
    }, {
        dataIndex: 'purchaseamount',
        key: 'purchaseamount',
        title: '订单金额'
    }, {
        dataIndex: 'unit',
        key: 'unit',
        title: '单位'
    },
], ComplexTable = multiSelect(Table);
export default class AddModul extends Component {
    constructor() {
        super();
        this.state = ({
            mName: '',
            mUser: '',
            sName: '',
            sUser: '',
            CT: [

            ]
        })
    }
    addData = () => {
        let {mName, mUser} = this.state;
        console.log(mName, mUser)
        if (!mName || !mUser) {

        } else {
            this.props.addData(mName, mUser);
        }

    }
    changeVal = (val, e) => {
        this.setState({
            [val]: e.target.value
        })
    }
    addChildData = () => {
        let CT = this.state.CT;
        CT.push(['备注', '产品', '金额', '单位']);
        this.setState({
            CT: CT
        })
    }
    deleteChildData = () => {
        let CT = this.state.CT;
        let len = CT.length;
        CT.splice(len - 1, 1);
        this.setState({
            CT: CT
        })
    }
    getSelectedDataFuncChild = (data) => {
        console.log(data)
    }
    render() {
        let {isAdd} = this.props;
        let {mName, mUser, sName, sUser, CT} = this.state,
            multiObj = { type: "checkbox", };
        return (

            <div>
                {isAdd ?
                    <div>
                        <div>主表</div>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                备注：<FormControl type="text" value={mName} onChange={this.changeVal.bind(this, 'mName')} />
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                联系人：<FormControl type="text" value={mUser} onChange={this.changeVal.bind(this, 'mUser')} />
                            </Col>
                        </Row>
                        <Button onClick={this.addData}>确认添加</Button>
                        <Button onClick={this.props.cancelAdd}>取消添加</Button>
                        <div>子表</div>
                        <Row>
                            {CT.map((item) => {
                                return item.map((item) => {
                                    return (
                                        <Col md={3} xs={3} sm={3}>
                                            {item}<FormControl type="text" />
                                        </Col>
                                    )
                                })
                            })}


                        </Row>
                        <Button onClick={this.addChildData}>增加</Button>
                        <Button onClick={this.deleteChildData}>删除</Button>
                    </div> :
                    ''
                }
            </div>
        )
    }
}