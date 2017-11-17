import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Row,Col,Breadcrumb,Button,Modal,Form,FormGroup,Label,FormControl,Radio,Message } from 'tinper-bee';
import naxios from 'components/naxios';
import './UrlModal.less';

export default class UrlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUrl : "",
      urlValidate : "",
      disabled : false
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      disabled : props.disabled,
      loginUrl : (props.loginUrl != null ? props.loginUrl : "")
    });
  }

  handlerClose = () => {
    let onHide = this.props.onHide;
    if(onHide){
      onHide();
      this.setState({
        loginUrl : "",
        urlValidate : ""
      });
    }
  }

  handlerHttpUrl = (e) => {
    this.setState({
      loginUrl : e.target.value
    });
  }

  handlerNew = () => {
    let self = this;
    var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    if(this.state.loginUrl != ""){
      if(this.state.loginUrl.match(match)){
        this.setState({
          urlValidate : ""
        });
      }else{
        this.setState({
          urlValidate : "网址不正确"
        });
        return;
      }
    }else{
      this.setState({
        urlValidate : "不能为空"
      });
      return;
    }

    this.setState({
      disabled : true
    });
    naxios({
      url : window.cloudURL + 'app/tenantAppUrl',
      method : "get",
      params: {
        loginUrl : this.state.loginUrl,
        cdkey : this.props.cdKey
      }
    },function(response){
      self.setState({
        loginUrl : ""
      });
      let onNewClick = self.props.onNewClick;
      if (onNewClick) {
        onNewClick(response.data);
      }
    },function(error){
      Message.create({content: '服务器出现错误', color: 'danger'});
    });
  }

  render(){
    return (<Modal style={{"width":"500px"}}
      className="yunwei-url-modal"
      show = { this.props.showModal }
      onHide = { this.handlerClose } >
          <Modal.Header closeButton>
              <Modal.Title className="modal-title">设置访问地址</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal>
                <Row>
                  <FormGroup>
                      <Col style={{"line-height":"38px"}} md={3} sm={3} className="text-right">
                          <Label>访问地址 ：</Label>
                      </Col>
                      <Col md={6} sm={6}>
                          <FormControl value={this.state.loginUrl} style={{"line-height":"38px","height":"38px"}} onChange={this.handlerHttpUrl}  placeholder=""/>
                      </Col>
                      <Col style={{"line-height":"38px"}} md={3} sm={3} className="text-left">
                          <Label style={{"color":"red"}}>{this.state.urlValidate}</Label>
                      </Col>
                  </FormGroup>
                </Row>
          </Form>
          </Modal.Body>

          <Modal.Footer>
              <Button  onClick={ this.handlerClose } style={{marginRight: 20}}>取消</Button>
              <Button disabled={this.state.disabled} onClick={ this.handlerNew } colors="info">激活</Button>
          </Modal.Footer>
      </Modal>)
  }
}
