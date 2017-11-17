import React, { Component } from 'react';
import { Breadcrumb } from 'tinper-bee';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

export default class CloudBreadcrumb extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  static defaultProps = {
    breadData : []
  }

  renderItem(){
    return this.props.breadData.map(function(item,index){
      let cls = classNames({
        "hand" : item.click,
        "hover" : item.click
      });
      return (<Breadcrumb.Item key={index} className={cls} onClick={item.click} active={true} title={item.title} >
        {item.title}
      </Breadcrumb.Item>)
    })
  }

  render(){
    return (
      <div>
        <Breadcrumb>
        {
          this.renderItem()
        }
        </Breadcrumb>
      </div>
    )
  }
}


CloudBreadcrumb.propTypes = {
  breadData : PropTypes.array
}
