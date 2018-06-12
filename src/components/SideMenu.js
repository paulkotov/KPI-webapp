import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'antd';

import 'antd/lib/menu/style/index.css';

// const MenuItemGroup = Menu.ItemGroup;

class SideMenu extends Component {
  state = {
    current: this.props.menu,
  }

  handleClick = (item) => {
    const { changeMenu } = this.props;
    console.log(item.key);
    this.setState({
      current: item.key
    });
    changeMenu(item.key);
  };

  render(){
    return(
      <div style={{ width: 150+'px' }}>
            <Menu onSelect={this.handleClick} selectedKeys={[this.state.current]}>
              <Menu.Item key="1"><b>Пользователи</b></Menu.Item>
              <Menu.Item key="2"><b>Структура</b></Menu.Item>
              <Menu.Item key="3"><b>Сотрудники</b></Menu.Item>
              <Menu.Item key="4"><b>Показатели</b></Menu.Item>
              <Menu.Item key="5"><b>План</b></Menu.Item>
              <Menu.Item key="6"><b>Факт</b></Menu.Item>
              <Menu.Item key="7"><b>Итог</b></Menu.Item>
              <Menu.Item key="8"><b>Настройки</b></Menu.Item>
            </Menu>
      </div>
    );
  }
}

SideMenu.propTypes = {
  menu: PropTypes.string,
  changeMenu: PropTypes.func
};

export default SideMenu;