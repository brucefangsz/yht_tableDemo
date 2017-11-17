import React, { Component } from 'react';
import MenuList from 'components/Menu';
import MyHeader from 'components/Header';
import classnames from 'classnames';
import { Con, Row, Col, Icon, Button, Table, Checkbox, FormControl } from 'tinper-bee';
import { Link } from 'react-router';
import multiSelect from './multiSelect.js';
import Search from './component/search';
import Edit from './component/edit';
import EditModul from './component/editModul';
import AddModul from './component/addModul';
import './index.less';
let self, globalAry = [], childGlobalAry = [], ComplexTable = multiSelect(Table);
const tableColumns = [
    {
        dataIndex: 'description',
        key: 'description',
        title: '备注'
    },
    {
        dataIndex: 'status',
        key: 'status',
        title: '状态'
    },
    // {
    //     dataIndex: 'ipuquotaionid',
    //     key: 'ipuquotaionid',
    //     title: '主键'
    // },
    {
        dataIndex: 'corp_account',
        key: 'corp_account',
        title: '银行账号'
    },
    {
        dataIndex: 'processor',
        key: 'processor',
        title: '录入人'
    },
    {
        dataIndex: 'processtime',
        key: 'processtime',
        title: '订单日期'
    },
    {
        dataIndex: 'currencyid',
        key: 'currencyid',
        title: '币种'
    },
    {
        dataIndex: 'currency_code',
        key: 'currency_code',
        title: '币种编码'
    },
    {
        dataIndex: 'ecbillcode',
        key: 'ecbillcode',
        title: '订单编号'
    },
    {
        dataIndex: 'contact',
        key: 'contact',
        title: '联系人'
    },
    {
        dataIndex: 'phone',
        key: 'phone',
        title: '联系电话'
    }
];
const columnsChild = [
    // {
    //     dataIndex: 'ipuquotationdetailid',
    //     key: 'ipuquotationdetailid',
    //     title: '主键'
    // }
    , {
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
]

class BasicsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            searchToggle: false,
            concat: 1,
            suser: '',
            scode: '',
            editAry: [],
            isEdit: false,
            edescription: '',
            euser: '',
            childTable: [],
            isAdd: false,
            data: [
                {
                    'description': '备注1',
                    'status': '启用',
                    'subject': '李小龙',
                    'ipuquotaionid': '主键',
                    'corp_account': '8888 888 8888',
                    'processor': '房帅中',
                    'processtime': '2012-01-09',
                    'currencyid': '真',
                    'currency_code': '001',
                    'ecbillcode': '000021',
                    'contact': '李小龙',
                    'phone': '198888',
                    'key': 0,
                    'childData': [
                        { 'productdesc': '真的很便宜0..', 'productname': '**产品**', 'purchaseamount': '10000', 'unit': '万元' },
                        { 'productdesc': '真的很便宜1..', 'productname': '**产品**', 'purchaseamount': '10000', 'unit': '万元' },
                        { 'productdesc': '真的很便宜2..', 'productname': '**产品**', 'purchaseamount': '10000', 'unit': '万元' },
                    ]
                },
                {
                    'description': '假装是个备注',
                    'status': '启用',
                    'subject': '甄子丹',
                    'ipuquotaionid': '主键',
                    'corp_account': '8888 888 8888',
                    'processor': '房帅中',
                    'processtime': '2012-01-09',
                    'currencyid': '真',
                    'currency_code': '001',
                    'ecbillcode': '000021',
                    'contact': '甄子丹',
                    'phone': '18701517173',
                    'key': 1,
                    'childData': [
                        { 'productdesc': '真..', 'productname': '**产品**', 'purchaseamount': '10000', 'unit': '万元' },
                    ]
                }
            ],
        }
        self = this;
    }
    // 展开收起菜单
    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    // 搜索展开
    searchhandleToggle = () => {
        this.setState({
            searchToggle: !this.state.searchToggle
        })
    }
    // 添加数据
    addList = () => {
        this.setState({
            isAdd: true
        })
    }
    addData = (mName, mUser) => {
        let ary = this.state.data,
            num = this.state.concat;
        num++;
        ary.push({
            'description': `${mName}`,
            'status': '启用',
            'subject': '甄子丹',
            'ipuquotaionid': '主键',
            'corp_account': '8888 888 8888',
            'processor': '房帅中',
            'processtime': '2012-01-09',
            'currencyid': '真',
            'currency_code': '001',
            'ecbillcode': '000021',
            'contact': mUser,
            'phone': '18701517173',
            'key': num,
            'childTable': []
        });
        this.setState({ data: ary, concat: num });
    }
    cancelAdd = () => {
        this.setState({
            isAdd: false
        })
    }
    //搜索内容
    searchData = () => {
        let {suser, scode} = this.state;
        if (suser == '' && scode == '') {
            alert('请输入搜索内容啊')
        } else {
            console.log(`请求后台接口${suser}${scode}`)
        }
    }
    // 填写搜索内容
    searchValueChange = (val, e) => {
        this.setState({
            [val]: e.target.value
        })
    }
    // 编辑
    editData = () => {
        if (!globalAry.length || globalAry.length > 1) {
            alert('请选择一条编辑');
            return false;
        }
        self.setState({
            isEdit: true
        });
    }
    // 确认修改
    isEditData = () => {
        let key = (globalAry[0].key),
            {data, edescription, euser} = this.state;
        data[key].description = edescription;
        data[key].contact = euser;
        this.setState({
            data: data,
            isEdit: false
        }, () => { ComplexTable = multiSelect(Table) })
    }
    // 删除表格数据
    deleteData = () => {
        if (!globalAry.length || globalAry.length > 1) {
            alert('请选择一条删除');
            return false;
        }
        let ary = this.state.data,
            deleteAry = globalAry,
            key = deleteAry[0].key;
        ary.splice(key, 1);
        for (var i = key; i < ary.length; i++) {
            ary[i].key--;
        }
        this.setState({
            data: ary,
            concat: ary.length - 1
        }, () => {
            ComplexTable = multiSelect(Table);
        })
    }
    // 冻结
    frozenData = () => {
        if (!globalAry.length || globalAry.length > 1) {
            alert('请选择一条冻结');
            return false;
        }
        let ary = this.state.data,
            deleteAry = globalAry,
            key = deleteAry[0].key;
        if (ary[key].status == '启用') {
            (ary[key].status = '冻结');
            this.setState({
                data: ary
            })
        } else {
            alert('已经冻结');
        }
    }
    // 取消冻结
    cancelFrozenData = () => {
        if (!globalAry.length || globalAry.length > 1) {
            alert('请选择一条取消冻结');
            return false;
        }
        let ary = this.state.data,
            deleteAry = globalAry,
            key = deleteAry[0].key;
        if (ary[key].status == '冻结') {
            (ary[key].status = '启用');
            this.setState({
                data: ary
            })
        } else {
            alert('已经启用');
        }
    }
    // 选择数据
    setData = (val) => {
        if (val.length) {
            let index = val.length - 1,
                selectChildData = val[index].childData;
            this.setState({
                childTable: selectChildData
            })
        } else {
            this.setState({
                childTable: []
            })
        }
    }
    getSelectedDataFunc = (data) => {
        console.log(data);
        globalAry = data;
        self.setData(data);
    }
    getSelectedDataFuncChild = (data) => {
        childGlobalAry = data;
    }
    render() {
        let sh = { height: '100%' },
            img = '//design.yonyoucloud.com/static/img/designer/logo.png',
            {suser, scode, edescription, euser, searchToggle, toggle, isEdit, data, isAdd} = this.state,
            multiObj = { type: "checkbox", },
            CT = this.state.childTable;
        return (
            <div style={sh}>
                <div className={classnames("side-bar", { "toggled": toggle })}>
                    {toggle ? (<Icon type="uf-iuap-col" className="nav-icon" />) :
                        (<img src={img} />)}
                    <MenuList toggle={toggle} />
                </div>
                <div className={classnames("content", { "toggled": toggle })}>
                    <MyHeader toggle={toggle} onToggle={this.handleToggle} />
                    <div className="basic_modul">

                        <Edit
                            addList={this.addList}
                            editData={this.editData}
                            deleteData={this.deleteData}
                            frozenData={this.frozenData}
                            cancelFrozenData={this.cancelFrozenData} />
                        <AddModul
                            isAdd={isAdd}
                            addData={this.addData}
                            cancelAdd={this.cancelAdd} />
                        <Search
                            searchhandleToggle={this.searchhandleToggle}
                            searchToggle={searchToggle}
                            searchData={this.searchData}
                            searchValueChange={this.searchValueChange} />
                        <EditModul
                            edescription={edescription}
                            euser={euser}
                            isEditData={this.isEditData}
                            searchValueChange={this.searchValueChange}
                            editStatus={isEdit} />
                        <ComplexTable
                            columns={tableColumns}
                            data={data}
                            multiSelect={multiObj}
                            getSelectedDataFunc={this.getSelectedDataFunc} />
                        <div>子表：</div>
                        <ComplexTable
                            columns={columnsChild}
                            data={CT}
                            multiSelect={multiObj}
                            getSelectedDataFunc={this.getSelectedDataFuncChild} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicsInfo;