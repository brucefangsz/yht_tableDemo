import React, { Component } from 'React';
import { Row, Col, Button, FormControl } from 'tinper-bee';
export default class EditModul extends Component {
    constructor() {
        super()
    }
    searchValueChange = (val, e) => {
        this.props.searchValueChange(val, e)
    }
    render() {
        let {edescription, euser, editStatus} = this.props;
        return (
            <div>
                {editStatus ?
                    <div>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                备注：<FormControl type="text" onChange={this.searchValueChange.bind(this, 'edescription')} value={edescription} />
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                联系人：<FormControl type="text" onChange={this.searchValueChange.bind(this, 'euser')} value={euser} />
                            </Col>
                        </Row>
                        <Button colors="primary" onClick={this.props.isEditData}>修改</Button>
                    </div>
                    : ""}
            </div>
        )
    }
}
