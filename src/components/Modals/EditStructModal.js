import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

class EditStructModal extends Component {
  state = {
    isFileLoaded: false
  }

  clickHandler = e => {
    this.setState({ isFileLoaded: this.props.fileHandler(e) });
  }

  render() {
    const { isEditModalShown, toggleEditModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Modal
          title="Load file"
          style={{ top: 20 }}
          visible={isEditModalShown}
          onCancel={() => toggleEditModal()}
          onOk={() => console.log('OK')}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="ant-form">  
            <Row>
                <Col span={8} className="ant-form-item">
                    <FormItem>
                        {getFieldDecorator('id', {
                          rules: [{ required: true, message: 'Введите логин' }],
                        })(
                        <div>
                            <label>Id подразделения</label>
                            <Input type="text" placeholder="id" />
                        </div>
                        )}
                    </FormItem>
                </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

EditStructModal.propTypes = {
  isEditModalShown : PropTypes.bool,
  toggleEditModal : PropTypes.func,
  fileHandler: PropTypes.func,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(EditStructModal);

export default WrappedDemo;