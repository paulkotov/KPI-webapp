import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Select } from 'antd';

import { data } from '../../redux/reducers/indexes';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/select/style/index.css';
import '../style.css';
import 'antd/lib/style/index.css';

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
};

const columns = [{
  title: '№ п/п',
  dataIndex: 'number',
  key: 'number',
  width: 80,
  sorter: (a, b) => a.number - b.number,
},{
  title: 'КПЭ',
  dataIndex: 'kpe',
  key: 'kpe',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.kpe.length - b.kpe.length,
}, {
  title: 'id',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.id - b.id,
}, {
  title: 'Описание',
  dataIndex: 'desc',
  key: 'desc',
  width: 350,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.desc.lenght - b.desc.lenght,
}, {
  title: 'Ед.изм',
  dataIndex: 'ed',
  key: 'ed',
  width: 100,
  render: () => (
    <div>
      <Select defaultValue="%" style={{ width: 120 }}>
        <Option value="%">Вверх</Option>
        <Option value="Кол-во">Кол-во</Option>
        <Option value="Тыс.руб">Тыс.руб</Option>
        <Option value="Руб">Руб</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Группа КПЭ',
  dataIndex: 'group',
  key: 'group',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Общие" style={{ width: 120 }}>
        <Option value="Общие">Общие</Option>
        <Option value="Адресные">Адресные</Option>
        <Option value="Контрольные">Контрольные</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Тип КПЭ',
  dataIndex: 'type',
  key: 'type',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Ежемесячный" style={{ width: 120 }}>
        <Option value="Ежемесячный">Ежемесячный</Option>
        <Option value="Квартальный">Квартальный</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Направление тренда',
  dataIndex: 'trend',
  key: 'trend',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Вверх" style={{ width: 120 }}>
        <Option value="Вверх">Вверх</Option>
        <Option value="Вниз">Вниз</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Формула расчета %',
  dataIndex: 'count',
  key: 'count',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="План/Факт" style={{ width: 120 }}>
        <Option value="План/Факт">План/Факт</Option>
        <Option value="Факт/План">Факт/План</Option>
      </Select>
    </div> 
  )
}, {
  title: 'Формула расчета K',
  dataIndex: 'k',
  key: 'k',
  width: 150,
  render: () => (
    <div>
      <span>k=Если</span><Select defaultValue="1" style={{ width: 120 }}>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
      </Select>
    </div> 
  )
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Indexes extends PureComponent{
  constructor(props){
    super(props);
    this.state ={
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
  }

  render(){
    return(
        <div className="tablecont" style={ tableStyles }>
            <div style={{ dislay: 'flex', padding: 20+'px' }}>
              <Button className="editable-add-btn">Add</Button>
              <Table {...this.state.table} columns={columns} dataSource={data} onChange={onChange}/>
            </div>
        </div>
    );
  }
}

Indexes.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Indexes;