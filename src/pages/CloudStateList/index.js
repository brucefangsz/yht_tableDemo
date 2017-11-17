import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuList from 'components/Menu';
import MyHeader from 'components/Header';
import { Row, Col, Message, Loading, Switch, Icon, FormControl, Table, Pagination, Breadcrumb, Tile, ProgressBar } from 'tinper-bee';
import naxios from 'components/naxios';
import classnames from 'classnames';
import LicenceDownloadModal from './LicenceDownloadModal';
import ActivationModal from './ActivationModal';
import UrlModal from "./UrlModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './index.less'


function TableType(props) {
  let cls = classnames({
    "cloud-detail-table-type": true,
    "cloud-detail-table-type-hui": props.icon == "3",
    "cloud-detail-table-type-huang": props.icon == "4",
    "cloud-detail-table-type-lv": props.icon == "2" || props.icon == "5"
  });
  return <span><i className={cls}>{props.title}</i></span>
}
const columns = [
  { title: '应用名称', dataIndex: 'name', key: 'name' },
  {
    title: '状态', dataIndex: 'status', key: 'status', render(text, record) {
      return <span className={`bg-${text}`}>{text.toString().toUpperCase()}</span>
    }
  },
  { title: '更新日期', dataIndex: 'date', key: 'date' },
  {
    title: '价格', dataIndex: 'price', key: 'price', render(text, record) {
      return <span className={record.status}>{`$${text}`}</span>;
    },
  },
];

const data = [
  { name: '用友采购云', status: 'sale', date: '2017-04-19', price: '30555', key: '0' },
  { name: '用友HR云', status: 'hot', date: '2017-04-19', price: '68888', key: '1' },
  { name: '用友支付云', status: 'hot', date: '2017-04-19', price: '28889', key: '2' },
  { name: '用友财务云', status: 'test', date: '2017-04-19', price: '36666', key: '3' },
  { name: '用友建筑云', status: 'new', date: '2017-04-19', price: '25777', key: '4' }
];

const chartData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default class CloudStateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cdKey: "",
      history: 0,
      tableData: [],
      licenceModal: false,
      activeDisabled: false,
      urlDisabled: false,
      resCode: "",
      activeModal: false,
      urlModal: false,
      search: "",
      pageSize: 10,
      pageNum: 1,
      total: 0,
      toggle: false
    }
  }


  componentWillMount() {

  }
  componentDidMount() {
    this.init({
      search: this.state.search,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    });
  }


  init = (obj) => {
    let self = this;
    naxios({
      url: window.cloudURL + 'app/pageTenantRes',
      method: "get",
      params: {
        search: obj.search,
        pageSize: obj.pageSize,
        history: this.state.history,
        pageNum: obj.pageNum,
        tmp: new Date().getTime()
      }
    }, function (response) {
      if (response.data.state == 1) {
        self.setState({
          tableData: response.data.data.content,
          total: Math.ceil(response.data.data.total / 10)
        });
      } else {
        Message.create({ content: response.data.message, color: 'danger' });
      }
    }, function (error) {
      Message.create({ content: '服务器异常数据', color: 'danger' });
    });
  }

  handlerUserManClick = (text, rec, index) => {

  }

  handlerKaitongClick = (text, rec, index) => {
    this.setState({
      urlModal: true,
      loginUrl: rec.loginUrl,
      cdKey: rec.cdKey
    });
  }

  getColumns() {
    let self = this;
    return [
      { title: '云数据中心', dataIndex: 'tenantName', key: '1', width: "20%" },
      {
        title: '状态', dataIndex: 'status', key: '2', width: "20%", render(text, rec, index) {
          let status = rec.status;
          if (status == 0) {
            return <TableType icon="3" title="未激活" />
          }
          if (status == 1) {
            return <TableType icon="4" title="激活文件生成中" />
          }
          if (status == 2) {
            return <TableType icon="5" title="激活文件已生成" />
          }
          if (status == 3) {
            return <TableType icon="5" title="激活成功" />
          }
        }
      },
      {
        title: '所属企业', dataIndex: 'company', key: '3', width: "20%", render(text, rec, index) {
          let _time = text;
          if (_time) {
            return text.toString().split(" ")[0]
          } else {
            return "-";
          }
        }
      },
      {
        title: '激活时间', dataIndex: 'activeTime', key: '4', width: "10%", render(text, rec, index) {
          let _time = text;
          if (_time) {
            return text.toString().split(" ")[0]
          } else {
            return "-";
          }
        }
      },
      {
        title: '许可生成时间', dataIndex: 'allowTime', key: '5', width: "10%", render(text, rec, index) {
          let _time = text;
          if (_time) {
            return text.toString().split(" ")[0]
          } else {
            return "-";
          }
        }
      },
      {
        title: '操作', dataIndex: 'cdKey', key: '6', width: "20%", render(text, rec, index) {

          switch (rec.status) {
            // case 0:
            //   return <span className="c-button" onClick={self.handlerActiveClick.bind(this,text,rec,index)}>激活</span>
            //   break;
            case 1:
              // return <span className="c-button disabled">许可文件生成中</span>
              return <span className="c-button" onClick={self.handlerActiveClick.bind(this, text, rec, index)}>生成激活证书</span>
              break;
            case 2:
              return <div><span onClick={self.handlerDownloadClick.bind(this, text, rec, index)} className="c-button">下载许可文件</span>
                <span className="c-button" onClick={self.handlerKaitongClick.bind(this, text, rec, index)}>开通</span></div>
              break;
            case 3:
              return <div><span onClick={self.handlerDownloadClick.bind(this, text, rec, index)} className="c-button">下载许可文件</span>
                <span className="c-button" onClick={self.handlerKaitongClick.bind(this, text, rec, index)}>开通</span></div>
              break;
            default:

          }


        }
      }
    ];
  }

  handlerActiveClick = (text, rec, index) => {
    this.setState({
      cdKey: rec.cdKey,
      activeModal: true
    });
  }

  handlerDownloadClick = (text, rec, index) => {
    this.setState({
      licenceModal: true,
      cdKey: rec.cdKey
    });
  }
  handlerLicenceModal = (text, rec, idex) => {
    this.setState({
      licenceModal: false
    });
    var down_pubbaseUrl = "web/u8c/downloadlicense/";
    var Url = window.cloudURL + down_pubbaseUrl + this.state.cdKey;
    var f = document.createElement("form");
    document.body.appendChild(f);
    // var i = document.createElement("input");
    // i.type = "hidden"; f.appendChild(i);
    // i.value = "5";
    // i.name = "price";
    f.action = Url;
    f.method = "post";
    f.submit();
    return false;
  }

  handlerLicenceModalHide = () => {
    this.setState({
      licenceModal: false
    });
  }

  handleSelect = (key) => {
    //console.log(key);
    this.setState({
      pageNum: key
    }, function () {
      this.init({
        search: this.state.search,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      });
    });


  }

  handlerActiveModalHide = () => {
    this.setState({
      activeModal: false
    });
  }

  handlerActiveModal = (obj) => {
    if (obj.state == 1) {
      this.setState({
        activeModal: false,
        activeDisabled: false
      });
      this.init({
        search: this.state.search,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      });
      Message.create({ content: '上传激活文件成功', color: 'success' });
    } else {
      this.setState({
        activeModal: false,
        activeDisabled: false
      });
      Message.create({ content: obj.message, color: 'danger' });
    }
  }

  handleSearch = () => {

    this.setState({
      pageNum: 1
    }, function () {
      this.init({
        search: this.state.search,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      });
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        pageNum: 1
      }, function () {
        this.init({
          search: this.state.search,
          pageSize: this.state.pageSize,
          pageNum: this.state.pageNum
        });
      });

    }
  }

  handlerIsShowHistory = (e) => {
    // console.log(e);
    this.setState({
      history: e == true ? 1 : 0,
      pageNum: 1
    }, function () {
      this.init({
        search: this.state.search,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      });
    });
  }

  handlerUrlModalHide = () => {
    this.setState({
      urlModal: false
    });
  }

  handlerUrlModal = (obj) => {
    if (obj.state == 1) {
      this.setState({
        urlModal: false,
        urlDisabled: false
      });
      this.init({
        search: this.state.search,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      });
      Message.create({ content: "操作成功", color: 'info' });
    } else {
      this.setState({
        urlModal: false,
        urlDisabled: false
      });
      Message.create({ content: obj.message, color: 'danger' });
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
          <MyHeader toggle={toggle} onToggle={this.handleToggle} />

          <div className="cloud-state-list-wrap">
            <Row className="dashbroad">
              <Col md={12}>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">
                    <Icon type="uf-home" />主页
                        </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Icon type="uf-mac" />仪表盘
                        </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col md={12}>
                <Col sm={3}>
                  <Tile className="card">
                    <Icon type="uf-bubble" className="green-500" />
                    <div className="card-content">
                      <span>总浏览PV</span>
                      <span>2781</span>
                    </div>
                  </Tile>

                </Col>
                <Col sm={3}>
                  <Tile className="card">
                    <Icon type="uf-users" className="blue-500" />
                    <div className="card-content">
                      <span>总浏览UV</span>
                      <span>2781</span>
                    </div>
                  </Tile>

                </Col>
                <Col sm={3}>
                  <Tile className="card">
                    <Icon type="uf-cart" className="deep-purple-300" />
                    <div className="card-content">
                      <span>成交订单数</span>
                      <span>2781</span>
                    </div>

                  </Tile>

                </Col>
                <Col sm={3}>
                  <Tile className="card">
                    <Icon type="uf-rmb-s" className="red-300" />
                    <div className="card-content">
                      <span>交易额</span>
                      <span>2781</span>
                    </div>
                  </Tile>

                </Col>
                <Col sm={9}>
                  <Tile className="data-chart">
                    <LineChart width={800} height={300} data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </Tile>

                </Col>
                <Col sm={3}>
                  <Tile className="color-tile bg-light-blue-200 text-center grey-50" >
                    <h2>Tinper-bee</h2>
                    <h2>完善前端服务</h2>
                    <h2>最好的企业级前端应用平台</h2>
                  </Tile>
                  <Tile className="color-tile bg-pink-200 text-center grey-50">
                    <h2>用友云</h2>
                    <h2>赋能中国企业</h2>
                    <h2>你想要的企业服务都在这里</h2>
                  </Tile>
                </Col>
                <Col sm={6}>
                  <Tile className="data-tile">
                    <Table
                      columns={columns}
                      data={data}
                    />
                  </Tile>
                </Col>
                <Col sm={6}>
                  <Tile className="data-tile">
                    <div className="product-progress">
                      <h3>用友金融云部署进度</h3>
                      <ProgressBar active now={40} />
                    </div>
                    <div className="product-progress">
                      <h3>用友采购云实施进度</h3>
                      <ProgressBar active colors="info" now={60} />
                    </div>
                    <div className="product-progress">
                      <h3>用友建筑云安装进度</h3>
                      <ProgressBar active colors="success" now={80} />
                    </div>
                    <div className="product-progress">
                      <h3>用友HR云构建进度</h3>
                      <ProgressBar active colors="warning" now={90} />
                    </div>
                  </Tile>
                </Col>
              </Col>

            </Row>
            <Row>
              <Col sm={10}>
                <div className="cloud-show-history"><span className="cloud-show-history-text">是否显示历史激活数据</span><Switch onChangeHandler={this.handlerIsShowHistory} size='xg' /></div>
              </Col>
              <Col sm={2}>
                <div className='user-search'>
                  <FormControl value={this.state.searchValue} onChange={this.handleSearchChange} onKeyDown={this.handleKeyPress} placeholder="搜索云数据中心" />
                  <Icon type="uf-search" onClick={this.handleSearch} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={12} sm={12}>
                <Table
                  rowKey={(rec, index) => { return rec['cdKey'] }}
                  className="table-detail"
                  columns={this.getColumns()}
                  data={this.state.tableData}
                  emptyText={() => '暂无数据'}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={12} sm={12} >
                <Pagination
                  first
                  last
                  prev
                  next
                  items={this.state.total}
                  maxButtons={5}
                  activePage={this.state.pageNum}
                  onSelect={this.handleSelect.bind(this)} />
              </Col>
            </Row>
            <UrlModal loginUrl={this.state.loginUrl} cdKey={this.state.cdKey} disabled={this.state.urlDisabled} onNewClick={this.handlerUrlModal} onHide={this.handlerUrlModalHide} showModal={this.state.urlModal} />
            <ActivationModal cdKey={this.state.cdKey} disabled={this.state.activeDisabled} onNewClick={this.handlerActiveModal} onHide={this.handlerActiveModalHide} showModal={this.state.activeModal} />
            <LicenceDownloadModal cdKey={this.state.cdKey} onNewClick={this.handlerLicenceModal} onHide={this.handlerLicenceModalHide} showModal={this.state.licenceModal} />
          </div>
        </div>
      </div>
    )
  }
}
