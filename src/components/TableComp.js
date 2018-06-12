import React, { Component } from 'react';
import SearchPanel from './SearchPanel';
import { Table, Icon, Switch, Radio, Form, Divider, Button } from 'antd';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import './style.css';
import 'antd/lib/style/index.css';

const FormItem = Form.Item;
const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
};

const columns = [{
  title: '№',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  sorter: (a, b) => a.id - b.id,
},{
  title: 'Организация',
  dataIndex: 'org',
  key: 'org',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.org.length - b.org.length,

}, {
  title: 'ФИО',
  dataIndex: 'name',
  key: 'name',
  width: 350,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.name.length - b.name.lenght,
}, {
  title: 'Подразделение',
  dataIndex: 'dir',
  key: 'dir',
  width: 350,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.dir.lenght - b.dir.lenght,
}, {
  title: 'Должность',
  dataIndex: 'pos',
  key: 'pos',
  width: 350,
  defaultSortOrder: 'descens',
  sorter: (a, b) => a.pos.lenght - b.pos.lenght
}, {
  title: 'Контакты',
  dataIndex: 'contacts',
  key: 'contacts',
  width: 350,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.contacts.lenght - b.contacts.lenght
}, {
  title: 'Права',
  dataIndex: 'rules',
  key: 'rules',
  width: 100,
  render: (text, record) => (
    <span>
      <a href={`/${record.id}/rules `}><Icon type="idcard" /></a>
    </span>
  )
}, {
  title: ' ',
  key: 'edit',
  width: 50,
  render: (text, record) => (
    <span>
      <a href={`/${record.id}/edit `}><Icon type="edit" /></a>
    </span>
  ),
}, {
  title: ' ',
  key: 'remove',
  width: 50,
  render: (text, record) => (
    <span>
      <a href={`/${record.id}/del `}><Icon type="close-circle" /></a>
    </span>
  ),
}];

const data = [{
    id: 1,
    key: 1,
    org: 'Дочерняя организация',
    name: 'Анисенко Андрей Михайлович',
    dir: 'Отдел логистики',
    pos: 'Юрист',
    contacts: 'email, phone',
    description: 'Специалист',
  }, {
    id: 2,
    key: 2,
    org: 'Государственная организация',
    name: 'Бондаренко Антон Иванович',
    dir: 'Отдел сбыта',
    pos: 'Специалист',
    contacts: 'email, phone',
    description: 'Рассмотреть',
  }, {
    id: 3,
    key: 3,
    org: 'Частная организация',
    name: 'Власенко Игорь Сергеевич',
    dir: 'Отдел сбыта',
    pos: 'Специалист',
    contacts: 'email, phone',
    description: 'Откорректировать телефон',
  }, {
    id: 4,
    key: 4,
    org: 'Общественная организация',
    name: 'Иванов Алексей Андреевич',
    dir: 'Отдел сбыта',
    pos: 'Специалист',
    contacts: 'email, phone',
    description: '000',
  }];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class TableComp extends Component{
    state = {
      table:{
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        expandedRowRender,
        title: false,
        showHeader,
        rowSelection: {},
        scroll: undefined
      }
  };

  render(){
    return(
      <div class="tablecont" style={tableStyles}>
        <div style={{dislay: 'flex', padding: 20+'px'}}>
        <SearchPanel />
        <Table {...this.state.table} columns={columns} dataSource={data} onChange={onChange}/>
        </div>
      </div>
    );
  }
}

export default TableComp;