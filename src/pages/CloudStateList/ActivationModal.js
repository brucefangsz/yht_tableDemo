import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Row,Col,Breadcrumb,Button,Modal,Form,FormGroup,Label,FormControl,Radio,Message } from 'tinper-bee';
import FileUpload from 'react-fileupload';
import './ActivationModal.less';



export default class ActivationModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      cdKey : "",
      disabled : false,
      urlValidate : "",
      loginUrl : "",
      chooseAppType : "private",
      isEmpty : false,
      activateCode : "",
      httpUrl : "",
      hardKey : "",
      resCode : "",
      files : [],
      tenantId : this.props.tenantId
    }
  }
  static defaultProps = {

  }
  componentWillReceiveProps(props){
    // console.log("props");
    var self = this;
    self.setState({
      disabled : props.disabled
    });
  }
  getOptions(){
    //console.log(this.props.resCode);
    let self = this;
    return {
      fileFieldName : "hardKey",
      baseUrl : window.cloudURL + "web/u8c/active",
      // param : {
      //   test : "test"
      // },
      accept : ".key",
      paramAddToField : {
        activateCode : this.props.cdKey,
        loginUrl : this.state.loginUrl
        // resCode : this.props.resCode,
        // cdKey : this.props.cdKey,
        // tenantId : this.state.tenantId
      },
      multiple : true,
      chooseAndUpload : false,
      numberLimit : 5,
      chooseFile(files){
        self.setState({
          files : files
        });
      },
      doUpload(files,mill,xhrID){
        //console.log(files,mill,xhrID);
      },
      uploadSuccess(resp){
        // console.log(resp);
        let onNewClick = self.props.onNewClick;
        if(onNewClick){
          onNewClick(resp);
          self.setState({
            disabled : true,
            urlValidate : "",
            chooseAppType : "private",
            isEmpty : false,
            activateCode : "",
            hardKey : "",
            resCode : "",
            files : []
          });
        }
      },
      uploadError(err){
        //console.log(err);
      },
      uploadFail(resp){
        //console.log(resp);
      }
    }
  }


  handlerClose = () => {
    let onHide = this.props.onHide;
    if(onHide){
      onHide();
      this.setState({
        urlValidate : "",
        chooseAppType : "private",
        isEmpty : false,
        activateCode : "",
        hardKey : "",
        resCode : "",
        files : []
      });
    }
  }

  handlerNew = () => {

    var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    if(this.state.loginUrl != ""){
      //urlValidate
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
        urlValidate : ""
      });
    }

    if(this.state.files.length == 0){
      Message.create({content: '没有选择激活文件', color: 'danger'});
    }else{
      ReactDOM.findDOMNode(this.refs.uploadBtn).click();
    }


    //this.refs['File-Upload'].filesToUpload([this.state.file]);
    // let onNewClick = this.props.onNewClick;
    // if(onNewClick){
    //   onNewClick(this.state);
    // }
  }

  changeChooseAppType = (value) => {
    this.setState({chooseAppType: value});
    // console.log(value);
  }

  renderUploadList(){
    // console.log(this.state);
    let self = this;
    let _arr = [];
    for (var i = 0; i < this.state.files.length; i++) {

      _arr.push(<Row key={i}><Col md={5} sm={5} className="text-left">
          <Label>{self.state.files[i].name}</Label>
      </Col></Row>)
    }
    return _arr;
  }

  handlerHttpUrl = (e) => {
    this.setState({
      loginUrl : e.target.value
    });
  }

  renderHardKey(){
    let self = this;
    if(this.state.chooseAppType == "private"){
      return (<div><Row>
          <FormGroup>
              <Col md={3} sm={3} className="text-right">
                  <Label style={{"height":"42px","line-height":"42px"}}>访问地址 ：</Label>
              </Col>
              <Col md={6} sm={6}>
                  <FormControl style={{"height":"42px","line-height":"42px"}} onChange={this.handlerHttpUrl}  placeholder=""/>
              </Col>
              <Col md={3} sm={3} className="text-left">
                  <Label style={{"color":"red","height":"42px","line-height":"42px"}} >{this.state.urlValidate}</Label>
              </Col>
          </FormGroup>
      </Row><Row>
          <FormGroup>
              <Col md={3} sm={3} className="text-right">
                  <Label style={{"height":"42px","line-height":"42px"}}>hard key ：</Label>
              </Col>
              <Col md={3} sm={3}>
                <FileUpload style={{"height":"42px","line-height":"42px"}} ref="File-Upload"  options={self.getOptions()}>
                  <Button size="sm" colors="success" ref="chooseBtn">选择文件</Button>
                  <Button style={{"marginLeft":"10px","position":"absolute","top":"-10000px"}} size="sm" colors="success" ref="uploadBtn">上传</Button>
                </FileUpload>
              </Col>
              {
                self.renderUploadList()
              }
          </FormGroup>
      </Row></div>)
    }

  }

  handlerChangeCode = (e) => {
    this.setState({
      activateCode : e.target.value
    });
  }
  handlerChangeHardKey = (e) => {
    this.setState({
      hardKey : e.target.value
    });
  }


  render(){

    return (
      <Modal style={{"width":"500px"}}
        className="yunwei-active-modal"
        show = { this.props.showModal }
        onHide = { this.handlerClose } >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">生成激活证书</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form horizontal>
                  <Row>
                      <FormGroup>
                          <Col md={3} sm={3} className="text-right">
                              <Label style={{"height":"42px","line-height":"42px"}} >激活码 ：</Label>
                          </Col>
                          <Col md={6} sm={6}>
                              <Label style={{"height":"42px","line-height":"42px"}}>{this.props.cdKey}</Label>
                          </Col>

                      </FormGroup>
                  </Row>

                  {
                    this.renderHardKey()
                  }

            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button size="sm" onClick={ this.handlerClose } style={{marginRight: 20}}>取消</Button>
                <Button disabled={this.state.disabled} size="sm" onClick={ this.handlerNew } colors="info">激活</Button>
            </Modal.Footer>
        </Modal>
    )
  }
}

ActivationModal.propTypes = {
  onNewClick : PropTypes.func,
  onHide : PropTypes.func,
  showModal : PropTypes.bool
}
