import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table, Icon, DatePicker, Modal } from 'antd';

import SearchPanel from '../Shared/SearchPanel';
import EditorPanel from '../Shared/EditorPanel';
import { data } from '../../redux/reducers/employees';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import '../style.css';
import 'antd/lib/style/index.css';

const dateFormat = 'DD/MM/YYYY';

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
};

export class DateModal extends Component {
  state = {
    dateFormat : 'DD/MM/YYYY',
    editable: false
  }
  static propTypes = {
    onChange: PropTypes.func,
    text: PropTypes.string
  }

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

  render(){
    const { text } = this.props;
    return (
      <Modal>
        <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat} />
      </Modal>
    );
  }
}

const onChangeDate = (date, dateString, record) => {
  console.log(dateString, record);
};

const columns = [{
  title: '№',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  sorter: (a, b) => a.id - b.id,
}, {
  title: 'Подразделение',
  dataIndex: 'dir',
  key: 'dir',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.dir.length - b.dir.length,
}, {
  title: 'Должность',
  dataIndex: 'pos',
  key: 'pos',
  width: 250,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.pos.lenght - b.pos.lenght
}, {
  title: 'Сотрудник',
  dataIndex: 'empl',
  key: 'empl',
  width: 120,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.empl.length - b.empl.lenght,
}, {
  title: 'Табл №',
  dataIndex: 't_id',
  key: 't_id',
  width: 120,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.t_id - b.t_id,
}, {
  title: 'Дата приема',
  dataIndex: 'date1',
  key: 'date1',
  width: 200,
  render: (text) => (
    // <DateModal text={text} onChange={this.onCellChange()} />
    <DatePicker value={moment(text, 'DD/MM/YYYY')} format="DD/MM/YYYY"/>
  )
}, {
  title: 'Дата увольнения',
  dataIndex: 'date2',
  key: 'date2',
  width: 200,
  render: (text) => (
    <DatePicker value={moment(text, 'DD/MM/YYYY')} format="DD/MM/YYYY"/>
  )
}, {
  title: 'Дата перевода',
  dataIndex: 'date3',
  key: 'date3',
  width: 200,
  render: (text, record) => {
    const rec = record;
    return (
      <DatePicker value={moment(text, 'DD/MM/YYYY')}
                  format="DD/MM/YYYY" 
                  onChange={(date, dateString) => onChangeDate(date, dateString, rec)} />
    );
  }
}, {
  title: 'Парам1',
  dataIndex: 'param1',
  key: 'param1',
  width: 100,
}, {
  title: 'Sometext',
  dataIndex: 'text',
  key: 'text',
  width: 100,
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  width: 100,
  render: (text, record) => (
    <div>
      <span style={{ paddingLeft: 10+'px' }}>
        <a href={`/${record.id}/edit `}><Icon type="edit" /></a>
      </span>
      <span style={{ paddingLeft: 10+'px' }}>
        <a href={`/${record.id}/del `}><Icon type="close-circle" /></a>
      </span>
    </div>
  )
}];

// const data = [{
//   id: 1,
//   key: 1,
//   dir: 'Аппарат управления',
//   pos: 'Генеральный директор',
//   empl: 'ФИО 4135',
//   t_id: '012885',
//   date1: '24/12/2014',
//   date2: '',
//   date3: '',
//   param1: 1,
//   text: ''
// }, {
//   id: 2,
//   key: 2,
//   dir: 'Аппарат управления',
//   pos: 'Главный бухгалтер',
//   empl: 'ФИО 4134',
//   t_id: '012885',
//   date1: '11/01/2015',
//   date2: '',
//   date3: '',
//   param1: 1,
//   text: ''
// }, {
//   id: 3,
//   key: 3,
//   dir: 'Аппарат управления',
//   pos: 'Главный бухгалтер',
//   empl: 'ФИО 4134',
//   t_id: '012885',
//   date1: '11/01/2015',
//   date2: '',
//   date3: '',
//   param1: 1,
//   text: ''
// }];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Employees extends Component {
  state = {
    table:{
      bordered: false,
      loading: false,
      pagination: true,
      size: 'default',
      // title: false,
      showHeader: true,
      rowSelection: {},
      scroll: undefined
    }
  };
  
  onChangeDate = (date, dateString, record) => {
    console.log(dateString, record);
  };

  render(){
    return (
      <div className="tablecont" style={tableStyles}>
        <div style={{ dislay: 'flex', padding: 20+'px' }}>
        <SearchPanel />
        <EditorPanel enabled={false}/>
        <Table {...this.state.table} columns={columns} dataSource={ data } onChange={ onChange }/>
        </div>
      </div>
    );
  }
}

Employees.propTypes = {

};

export default Employees;