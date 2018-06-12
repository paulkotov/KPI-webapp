import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';

//styles
import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserModal extends Component {
  state = {
    isFileLoaded: false,
    user: {
      name: '',
      otch: '',
      surname: '',
      dep: '',
      password: '',
      login: '',
      role: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = {
          login: values.login,
          password: values.password,
          role: this.state.user.role,
          rules: '',
          worker_id: values.id,
          comment: values.name+' '+values.otch+' '+values.surname+' '+values.dep+' '+values.pos+' '+values.email+' '+values.phone 
        };
        this.props.dataHandler(user);
      }
    });
  }

  render() {
    const { isAddModalShown, toggleAddModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Add user"
          width={750}
          style={{ top: 20 }}
          visible={isAddModalShown}
          onCancel={() => toggleAddModal()}
          onOk={() => { console.log('OK'); }}
        >
          <Form onSubmit={this.handleSubmit} className="ant-form">  
            <Row className="ant-advanced-search-form">
              <Col className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('login', {
                    rules: [{ required: true, message: 'Введите логин' }],
                  })(<div>
                      <label>Логин</label>
                      <Input type="text" placeholder="login" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(<div>
                      <label>Пароль</label>
                      <Input type="password" placeholder="Password" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('role', {
                    initialValue: 'User', 
                    rules: [{ type: 'string', required: false }],
                  })(<div>
                      <label>Role</label>
                      <div>
                        <Select style={{ width: 150 }} onChange={ value => this.setState({ user: { role: value } })}>
                          <Option value="admin">Admin</Option>
                          <Option value="user">User</Option>
                        </Select>
                      </div>
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('id', {
                    rules: [{ required: true, message: 'Введите табельный номер' }],
                  })(<div>
                      <label>Табельный №</label>
                      <Input type="text" placeholder="Табельный №" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Введите имя' }],
                  })(<div>
                      <label>Имя</label>
                      <Input type="text" placeholder="Имя" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('otch', {
                    rules: [{ required: true, message: 'Введите отчество' }],
                  })(<div>
                      <label>Отчество</label>
                      <Input type="text" placeholder="Отчество" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('surname', {
                    rules: [{ required: true, message: 'Введите фамилию' }],
                  })(<div>
                      <label>Фамилия</label>
                      <Input type="text" placeholder="Фамилия" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('dep', {
                    rules: [{ required: true, message: 'Введите подразделение' }],
                  })(<div>
                      <label>Подразделение</label>
                      <Input type="text" placeholder="Подразделение" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('pos', {
                    rules: [{ required: true, message: 'Введите должность' }],
                  })(<div>
                      <label>Должность</label>
                      <Input type="text" placeholder="Должность" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Введите email' }],
                  })(<div>
                      <label>Email</label>
                      <Input type="text" placeholder="Email" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Введите телефон' }],
                  })(<div>
                      <label>Телефон</label>
                      <Input type="text" placeholder="Телефон" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="ant-form-item" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  <div style={{ padding: 15+'px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button type="primary" htmlType="submit" className="reg-form-button">
                        Зарегистрировать
                      </Button>
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddUserModal.propTypes = {
  isAddModalShown: PropTypes.bool,
  toggleAddModal : PropTypes.func,
  dataHandler: PropTypes.func,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(AddUserModal);

export default WrappedDemo;