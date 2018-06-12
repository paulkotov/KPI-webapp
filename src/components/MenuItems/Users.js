import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

import { Table, Icon, Input, Button, Popconfirm, TreeSelect } from 'antd';
import SearchPanel from '../Shared/SearchPanel';
import EditorPanel from '../Shared/EditorPanel';
import FileLoadModal from '../Modals/UploadFileModal';
import AddUserModal from '../Modals/AddUserModal';
// import { Spinner } from './Spinner';

//services
import { loadDataFile } from '../../lib/api';
import { loadUsers, getUserInfo } from '../../lib/services/users';
// import { data } from '../redux/reducers/users';

//styles
import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import './editablecell.css';
import '../style.css';

// const FormItem = Form.Item;
// const expandedRowRender = record => <p>{record.description}</p>;
// const title = () => 'Here is title';
const showHeader = true;
// const scroll = { y: 240 };
// const pagination = { position: 'bottom' };

const TableCont = styled.div` 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
}
`;

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class EditRule extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  state = {
    value: this.props.value,
    treeData: [{
      label: 'Все',
      value: 'all',
      key: '1',
      children: [{
        label: 'Организация',
        value: 'org',
        key: '1-1',
        children: [{
          label: 'Государственная', value: 'gov', key: '1-1-1' 
        }, {
          label: 'Общественная', value: 'civ', key: '1-1-2'
        }, {
          label: 'Дочерняя', value: 'child', key: '1-1-3'
        }, {
          label: 'Частная', value: 'priv', key: '1-1-4'
        }]
      }, {
        label: 'Подразделение',
        value: 'dep',
        key: '1-2',
      }, {
        label: 'Уровень',
        value: 'level',
        key: '1-3'
      }]
    }],
  };

  onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
  }

  render(){
    const { treeData } = this.state;
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  }
}

class Users extends PureComponent{
  state = {
    dataSource: [],
    tableStyles: {
      bordered: false,
      loading: false,
      pagination: {},
      size: 'default',
      showHeader,
      rowSelection: {},
    },
    filter: {
      fio: '',
      dept: ''
    },
    count: 0,
    isUploadModalShown: false,
    isAddModalShown: false,
    newUser: {
      name: '',
      otch: '',
      surname: '',
      dep: '',
      password: '',
      login: '',
      role: ''
    }
  };
  
  columns = [{
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: (a, b) => a.id - b.id,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
    width: 500,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.login.length - b.login.length,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Пароль',
    dataIndex: 'pass',
    key: 'pass',
    width: 600,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Организация',
    dataIndex: 'org',
    key: 'org',
    width: 600,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.org.length - b.org.length,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    width: 600,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.lenght,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Подразделение',
    dataIndex: 'dir',
    key: 'dir',
    width: 600,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.dir.lenght - b.dir.lenght,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Должность',
    dataIndex: 'pos',
    key: 'pos',
    width: 600,
    defaultSortOrder: 'descens',
    sorter: (a, b) => a.pos.lenght - b.pos.lenght,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Контакты',
    dataIndex: 'contacts',
    key: 'contacts',
    width: 600,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.contacts.lenght - b.contacts.lenght,
    render: (text, record) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(record.key, 'name')}
      />
    ),
  }, {
    title: 'Права',
    dataIndex: 'rule',
    key: 'rule',
    width: 100,
    render: (text, record) => (
      <EditRule value={ record.rule }/>
    )
  }, {
    title: ' ',
    dataIndex: 'remove',
    key: 'remove',
    width: 50,
    render: (text, record) => {
      return (
        this.state.dataSource.length > 1 ?
        (
          <Popconfirm title="Удалить?" onConfirm={() => this.onDelete(record.key)}>
            <a href="#"><Icon type="close-circle" /></a>
          </Popconfirm>
        ) : null
      );
    },
  }];

  componentDidMount(){
    const lenght = this.state.dataSource.length;
    this.setState({ count: lenght });
  }

  componentWillReceiveProps(nextprops){
    this.setState({
      dataSource: nextprops.data
    });
  }
  
  async componentWillMount(){
    const { addData } = this.props.services;
    let data = await loadUsers();
    addData(data);
  }

  toggleUploadModal = () => {
    this.setState({
      isUploadModalShown: !this.state.isUploadModalShown
    });
  }

  toggleAddModal = () => {
    this.setState({
      isAddModalShown: !this.state.isAddModalShown
    });
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }

  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = user => {
    const { count, dataSource } = this.state;
    const contacts = getUserInfo(user.comment);
    const newData = {
      key: count+1,
      id: user.worker_id,
      name: user.name,
      org: 'Организация',
      dept: user.dept,
      pos: 'Специалист',
      contacts: contacts[6]+contacts[7]
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  // handleAdd = () => {

  //   return(
  //     <div>

  //     </div>
  //   );
  // }
  // newUser = user => {
  //   const { dataSource } = this.state;
  //   console.log(user);
  //   let newUser = {
  //     name: user.name,
  //     otch: user.otch,
  //     surname: user.otch,
  //     dep: user.dep,
  //     password: user.password,
  //     login: user.login,
  //   };

  //   this.setState({ dataSource: [...dataSource, newUser] });
  // }

  handleTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
    const pager = { ...this.state.tableStyles.pagination };
    pager.current = pagination.current;
    this.setState({
      tabStyles: { pagination: pager },
    });
  }

  render(){
    const { dataSource, tableStyles, isUploadModalShown, isAddModalShown } = this.state;
    return(
      <div>
        {isUploadModalShown && 
          <FileLoadModal isUploadModalShown={isUploadModalShown} 
                          toggleUploadModal={this.toggleUploadModal} 
                          fileHandler={loadDataFile}/> 
        }
        {
          isAddModalShown &&
          <AddUserModal isAddModalShown={isAddModalShown}
                        toggleAddModal={this.toggleAddModal}
                        dataHandler={this.handleAdd}
          />
        }
        <TableCont className="tablecont">
          <div style={{ dislay: 'flex', padding: 20+'px' }}>
            <SearchPanel handler={null}/>
            <EditorPanel enabled={true} saveChanges={this.handleSave} undoChanges={this.handleUndo}/>   
            { /* <Button className="editable-add-btn" type="primary"><a href="/reg">Добавить пользователя</a></Button> */} 
            <Button className="editable-add-btn" onClick={ () => this.toggleAddModal() }>Добавить пользователя</Button> 
            <div style={{ width: 1500+'px', overflow: 'auto' }}>
              <Table 
                    {...tableStyles} 
                    columns={this.columns} 
                    dataSource={dataSource} 
                    onChange={this.handleTableChange}
              />
            </div> 
            <div className="footer" style={{ botom: 0+'px', display: 'flex', justifyContent: 'flex-start', backgroundColor: '#FCFCFC' }}>
              <div style={{ padding: 10+'px' }}>
                <Button type="primary" onClick={ () => this.toggleUploadModal() }>Upload <Icon type="upload" /></Button>
              </div>
              <div style={{ padding: 10+'px' }}>
                <Button type="default">Download <Icon type="download" /></Button>
              </div>
            </div>
          </div>
        </TableCont>
      </div>
    );
  }
}

Users.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Users;