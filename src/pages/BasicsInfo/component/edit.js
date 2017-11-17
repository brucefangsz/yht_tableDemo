import React, { Component } from 'react';
import { Button } from 'tinper-bee';
export default class Edit extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="edit">
                <Button colors="primary" onClick={this.props.addList}>增加</Button>
                <Button colors="primary" onClick={this.props.editData}>编辑</Button>
                <Button colors="primary" onClick={this.props.deleteData}>删除</Button>
                <Button colors="primary" onClick={this.props.frozenData}>冻结</Button>
                <Button colors="primary" onClick={this.props.cancelFrozenData}>取消冻结</Button>
            </div>
        )
    }
}