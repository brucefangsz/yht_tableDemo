import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Step, Row, Col, Button, Message, Form, FormGroup, Label, FormControl ,Icon} from 'tinper-bee';
import naxios from 'components/naxios';
import CloudBreadcrumb from 'components/CloudBreadcrumb';
import DownloadLicense from 'components/DownloadLicense';
import MenuList from 'components/Menu';
import MyHeader from 'components/Header';
import './index.less';

const Steps = Step.Steps;
let steps4 = [{
  title: '解除绑定关系'
}, {
  title: '绑定新的特征码'
}, {
  title: '用户许可分配'
}, {
  title: '下载许可'
}];

export default class U8Signatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f1: "",
      f2: "",
      f3: "",
      f4: "",
      f5: "",
      f1Validate: false,
      f2Validate: false,
      f3Validate: false,
      f4Validate: false,
      f5Validate: false,
      isPrivate: false,
      sysData: {
        resId: 1,
        tenantId: 2,
        resCode: 3//this.props.params.resCode
      },
      fileList: [],
      breadData: [],
      stepCurrent: 0,
      steps: steps4,
      activeCode: "",
      activateValidate: false,
      loginUrl: "",
      loginUrlValidate: false,
      current: 0,
      isTipInfo: false,
      isTipPassword: true,
      tipServiceCode: "1",
      tipIdCode: "2",
      isTipText: true,
      tipText: "恭喜您，已完成所有步骤，下载许可文件并导入到U8中，就可以马上体验我们的产品了！",
      toggle: false
    }
  }

  componentDidMount() {
    let self = this;
    this.setState({
      breadData: [{
        title: "全部云数据中心",
        click: function () {
          self.context.router.push(`/`);
        }
      },
      {
        title: "演示页面"
        // click : function(){
        //     self.context.router.push(`/cloud/detail/${self.props.params.tenantId}/${encodeURIComponent(self.props.params.title)}/${self.props.params.tenantCode}/${self.props.params.isBind}`);
        // }
      },
      {
        title: "解除特征码"
      }]
    });
  }

  //下一步
  next() {
    // debugger;
    let self = this;
    let isStep1Validate = true;
    let isStep2Validate = true;
    const current = this.state.current + 1;

    if (self.state.current == 0) {

      if (self.state.f1 == "") {
        self.setState({
          f1Validate: true
        });
        isStep1Validate = false;
      } else {
        self.setState({
          f1Validate: false
        });
      }

      // if(self.state.f2 == ""){
      //   self.setState({
      //     f2Validate : true
      //   });
      //   isStep1Validate = false;
      // }else{
      //   self.setState({
      //     f2Validate : false
      //   });
      // }
      //
      // if(self.state.f3 == ""){
      //   self.setState({
      //     f3Validate : true
      //   });
      //   isStep1Validate = false;
      // }else{
      //   self.setState({
      //     f3Validate : false
      //   });
      // }

      if (self.state.f4 == "") {
        self.setState({
          f4Validate: true
        });
        isStep1Validate = false;
      } else {
        self.setState({
          f4Validate: false
        });
      }
    }


    if (self.state.current == 1) {
      if (self.state.f5 == "") {
        self.setState({
          f5Validate: true
        });
        isStep2Validate = false;
      } else {
        self.setState({
          f5Validate: false
        });
      }
    }


    if (self.state.current == 0) {
      if (isStep1Validate) {
        this.setState({ current });
      } else {
        return;
      }
    }

    if (self.state.current == 1) {
      if (isStep2Validate) {
        this.setState({ current });
      } else {
        return;
      }
    }
    if (self.state.current == 2) {
      this.setState({ current });
    }

  }
  //上一步
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  //点击步骤器跳转
  handlerStepClick = (index) => (e) => {
    let current = this.state.current;
    if (index < current) {
      this.setState({ current: index, steps: steps4 });
    }
  }


  handlerF1 = (e) => {
    this.setState({
      f1: e.target.value
    });
  }
  // handlerF2 = (e) => {
  //   this.setState({
  //     f2 : e.target.value
  //   });
  // }
  // handlerF3 = (e) => {
  //   this.setState({
  //     f3 : e.target.value
  //   });
  // }
  handlerF4 = (e) => {
    this.setState({
      f4: e.target.value
    });
  }
  handlerF5 = (e) => {
    this.setState({
      f5: e.target.value
    });
  }

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }


  render() {
    const { current } = this.state;
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
          <div className="u8c-signatures-wrap">
            <CloudBreadcrumb breadData={this.state.breadData} />
            <div className="content">
              <div className="step-wrap">
                <Steps current={current}>
                  {this.state.steps.map((item, index) => <Step onClick={this.handlerStepClick(index)} key={item.title} title={item.title} />)}
                </Steps>
              </div>
              <div className="step-content">
                <div style={{ "paddingBottom": "30px" }}>
                  {this.state.current == 0 && <Form horizontal className="step-form">
                    <Row>
                      <FormGroup>
                        <Col md={3} sm={3} className="text-right">
                          <Label style={{ "lineHeight": "42px", "color": "#666" }}>激活码 ：</Label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormControl value={this.state.f1} onChange={this.handlerF1} className="step-input-activate" placeholder="" />
                        </Col>
                        {this.state.f1Validate && <Col md={2} sm={2}>
                          <Label style={{ "lineHeight": "42px", "color": "#DD3730" }}>不能为空</Label>
                        </Col>}
                      </FormGroup>
                    </Row>
                    {/*<Row>
                      <FormGroup>
                          <Col md={3} sm={3} className="text-right">
                              <Label style={{"lineHeight":"42px","color":"#666"}}>用户ID ：</Label>
                          </Col>
                          <Col md={6} sm={6}>
                              <FormControl value={this.state.f2} onChange={this.handlerF2} className="step-input-activate" placeholder=""/>
                          </Col>
                          {this.state.f2Validate && <Col md={2} sm={2}>
                              <Label style={{"lineHeight":"42px","color":"#DD3730"}}>不能为空</Label>
                          </Col>}
                      </FormGroup>
                  </Row>
                  <Row>
                      <FormGroup>
                          <Col md={3} sm={3} className="text-right">
                              <Label style={{"lineHeight":"42px","color":"#666"}}>用户密码 ：</Label>
                          </Col>
                          <Col md={6} sm={6}>
                              <FormControl value={this.state.f3} onChange={this.handlerF3} className="step-input-activate" placeholder=""/>
                          </Col>
                          {this.state.f3Validate && <Col md={2} sm={2}>
                              <Label style={{"lineHeight":"42px","color":"#DD3730"}}>不能为空</Label>
                          </Col>}
                      </FormGroup>
                  </Row>*/}
                    <Row>
                      <FormGroup>
                        <Col md={3} sm={3} className="text-right">
                          <Label style={{ "lineHeight": "42px", "color": "#666" }}>已绑定特征码 ：</Label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormControl value={this.state.f4} onChange={this.handlerF4} className="step-input-activate" placeholder="" />
                        </Col>
                        {this.state.f4Validate && <Col md={2} sm={2}>
                          <Label style={{ "lineHeight": "42px", "color": "#DD3730" }}>不能为空</Label>
                        </Col>}
                      </FormGroup>
                    </Row>
                  </Form>}
                  {this.state.current == 1 && <Form horizontal className="step-form">
                    <Row>
                      <FormGroup>
                        <Col md={4} sm={4} className="text-right">
                          <Label style={{ "lineHeight": "42px", "color": "#666" }}>请输入新的软件特征码：</Label>
                        </Col>
                        <Col md={6} sm={6}>
                          <FormControl value={this.state.f5} onChange={this.handlerF5} className="step-input-activate" placeholder="" />
                        </Col>
                        <Col md={2} sm={2}>
                          {this.state.f5Validate && <Label style={{ "lineHeight": "42px", "color": "#DD3730" }}>不能为空</Label>}
                        </Col>
                      </FormGroup>
                    </Row>
                  </Form>}
                  {
                    this.state.current == 2 && <div className="step3-usermanage">
                      hello
                    </div>
                  }
                  {
                    this.state.current == 3 && <div className="step4-usermanage">
                      <DownloadLicense
                        isTipPassword={false}
                        isTipInfo={this.state.isTipInfo}
                        isTipText={this.state.isTipText}
                        tipText={this.state.tipText}
                        isBtnGroup={true}
                        onClick=""
                      />
                    </div>
                  }
                </div>

                {this.state.current != 3 && <Row>
                  <Col md={5}></Col>
                  <Col md={1}>
                    {this.state.current > 0 && <Button onClick={() => this.prev()} className="u-next">上一步</Button>}
                  </Col>
                  <Col md={1}>
                    {this.state.current < this.state.steps.length - 1 && <Button onClick={() => this.next()} className="u-next">下一步</Button>}
                  </Col>
                  <Col md={5}></Col>
                </Row>}
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

U8Signatures.contextTypes = {
  router: PropTypes.object
}
