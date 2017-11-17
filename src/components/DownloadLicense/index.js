import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row,Col,Button } from 'tinper-bee';
import './index.less';


export default class DownloadLicense extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  static defaultProps = {
    tipText : "恭喜您，已完成所有步骤，下载许可文件并导入到U8中，就可以马上体验我们的产品了！",
    tipServiceCode : "0111126029",
    tipIdCode : "788682",
    tipInfo : "已激活的企业不是您企业中心已绑定企业！",
    btnText : "下载许可文件",
    linkHelp : "如何将许可文件导入U8？",
    link : "#",
    isTipText : false,
    isTipPassword : false,
    isBtnGroup : false,
    isTipInfo : false
  }

  btnClick = (e) => {
    let onClick = this.props.onClick;
    if(onClick){
      onClick(e);
    }
  }


  render(){
    return (
      <div className="DownloadLicenseWrap">
        <div className="wrap">
          <div className="top">
            <div className="icon"></div>
          </div>
          {this.props.isTipText && <div className="tip-text">
            {this.props.tipText}
          </div>}
          {this.props.isTipPassword && <div className="tip-password">
            <div className="tip-password-left">
                <p>服务识别码：{this.props.tipServiceCode}</p>
                <p>识别码密码：{this.props.tipIdCode}</p>
            </div>
          </div>}
          {this.props.isTipInfo && <div className="tip-info">
            <p><i className="icon-tips"></i><span>{this.props.tipInfo}</span></p>
          </div>}
          {this.props.isBtnGroup && <div className="button-group">
            <Row>
                <Col md={2} mdOffset={5}>
                  <Button onClick={this.btnClick} className="u-download">{this.props.btnText}</Button>
                </Col>
                <Col md={4} style={{"lineHeight":"28px"}}>
                  <a className="help-tips" href={this.props.link}>{this.props.linkHelp}</a>
                </Col>
            </Row>
          </div>}
        </div>
      </div>
    )
  }
}

DownloadLicense.propTypes = {
  tipText : PropTypes.string,
  tipServiceCode : PropTypes.string,
  tipIdCode : PropTypes.string,
  btnText : PropTypes.string,
  linkHelp : PropTypes.string,
  link : PropTypes.string,
  isTipText : PropTypes.bool,
  isTipPassword : PropTypes.bool,
  isBtnGroup : PropTypes.bool
}
