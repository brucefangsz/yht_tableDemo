import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row,Col,Button,Modal } from 'tinper-bee';
import './LicenceDownloadModal.less';

export default class LicenceDownloadModal extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  static defaultProps = {

  }

  handlerClose = () => {
    let onHide = this.props.onHide;
    if(onHide){
      onHide();
    }
  }

  handlerNew = () => {
    let onNewClick = this.props.onNewClick;
    if(onNewClick){
      onNewClick(this.state);
    }
  }


  render(){

    return (
      <Modal style={{"width":"500px"}}
        className="licence-modal-footer-center"
        show = { this.props.showModal }
        onHide = { this.handlerClose } >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">许可下载</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="licence-download-modal">
                  <div className="icon-licence"></div>
                  <div className="licence-title">下载许可文件并导入到U8 Cloud中，即可使用</div>
                  <div className="licence-sub">导入步骤：打开U8 Cloud / 账户 / 用户管理 / 用户导入</div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button size="sm" onClick={ this.handlerNew } colors="info">下载许可</Button>
            </Modal.Footer>
        </Modal>
    )
  }
}

LicenceDownloadModal.propTypes = {
  onNewClick : PropTypes.func,
  onHide : PropTypes.func,
  showModal : PropTypes.bool
}
