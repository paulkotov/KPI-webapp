import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/lib/button/style/index.css';

class TreeGroup extends Component {

  render(){
    const { data } = this.props;
    return (
      <ul className='list-group'>
      </ul>
    );
  }
}

class TreeNode extends Component {
  constructor(props) {
    super(props);
    const { node } = this.props;
    let expanded = (node.state && node.state.hasOwnProperty('expanded')) ?
      node.state.expanded :
      (this.props.level < this.props.options.levels) ?
        true :
        false;
    let selected = (node.state && node.state.hasOwnProperty('selected')) ?
      node.state.selected :
      false;
    this.state = {
        expanded,
        selected
    }
  };

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
    event.stopPropagation();
  };

  toggleSelected = () => {
    this.setState({ selected: !this.state.selected });
    event.stopPropagation();
  };

  render() {
    let node = this.props.node;
    let options = this.props.options;
    let style;

    if (!this.props.visible) {
      style = {
        display: 'none'
      };
    }
    else {

      if (options.highlightSelected && this.state.selected) {
        style = {
          color: options.selectedColor,
          backgroundColor: options.selectedBackColor
        };
      }
      else {
        style = {
          color: node.color || options.color,
          backgroundColor: node.backColor || options.backColor
        };
      }

      if (!options.showBorder) {
        style.border = 'none';
      }
      else if (options.borderColor) {
        style.border = '1px solid ' + options.borderColor;
      }
    }

    let indents = [];
    for (var i = 0; i < this.props.level - 1; i++) {
      indents.push(<span className='indent'></span>);
    }

    let expandCollapseIcon;
    if (node.nodes) {
      if (!this.state.expanded) {
        expandCollapseIcon = (
          <span className={options.expandIcon}
            onClick={this.toggleExpanded.bind(this, node.nodeId)}>
          </span>
        );
      }
      else {
        expandCollapseIcon = (
          <span><Icon type="plus-square" /><span className={options.collapseIcon}
            onClick={this.toggleExpanded.bind(this, node.nodeId)}>
          </span></span>
        );
      }
    }
    else {
      expandCollapseIcon = (
        <span className={options.emptyIcon}></span>
      );
    }

    let nodeIcon = (
      <span className='icon'>
        <i className={node.icon || options.nodeIcon}></i>
      </span>
    );

    let nodeText;
    if (options.enableLinks) {
      nodeText = (
        <a href={node.href} /*style="color:inherit;"*/>
          {node.text}
        </a>
      );
    }
    else {
      nodeText = (
        <span><Icon type="right" />{node.text}</span>
      );
    }

    let badges;
    if (options.showTags && node.tags) {
      badges = node.tags.map(tag => {
        return (
          <span className='badge'>{tag}</span>
        );
      });
    }

    let children = [];
    if (node.nodes) {
      var _this = this;
      node.nodes.map( (node, index) =>{
        children.push(<TreeNode key={index} node={node}
          level={_this.props.level + 1}
          visible={_this.state.expanded && _this.props.visible}
          options={options} />);
      });
    }

    return (
      <li className='list-group-item'
        style={style}
        onClick={this.toggleSelected.bind(this, node.nodeId)}
        key={node.nodeId}>
        {indents}
        {expandCollapseIcon}
        {nodeIcon}
        {nodeText}
        {badges}
        {children}
      </li>
    );
  }
}

export default class Tree extends Component {
  constructor(props) {
    super(props);
  }

  setNodeId = node => {
    if (!node.nodes) return;
    node.nodes.map( node => {
      node.nodeId = this.props.nodes.length;
      this.props.nodes.push(node);
      this.setNodeId(node);
    });
  };

  render() {
    let children = [];
    let data = this.props.data;
    this.setNodeId({ nodes: data });

    if (data) {

      data.map( (node, index) => {
        children.push(<TreeNode key={index} node={node}
          level={1}
          visible={true}
          options={this.props} />);
      });
    }

    return (
      <div id='treeview' className='treeview'>
        <ul className='list-group'>
          {children}
        </ul>
      </div>
    )
  }
}

Tree.defaultProps = {
  levels: 2,

  expandIcon: 'glyphicon glyphicon-plus',
  collapseIcon: 'glyphicon glyphicon-minus',
  emptyIcon: 'glyphicon',
  nodeIcon: 'glyphicon glyphicon-stop',

  color: undefined,
  backColor: undefined,
  borderColor: undefined,
  onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
  selectedColor: '#FFFFFF',
  selectedBackColor: '#428bca',

  enableLinks: false,
  highlightSelected: true,
  showBorder: true,
  showTags: false,

  nodes: []
};

Tree.propTypes = {
  levels: PropTypes.number,

  expandIcon: PropTypes.string,
  collapseIcon: PropTypes.string,
  emptyIcon: PropTypes.string,
  nodeIcon: PropTypes.string,

  color: PropTypes.string,
  backColor: PropTypes.string,
  borderColor: PropTypes.string,
  onhoverColor: PropTypes.string,
  selectedColor: PropTypes.string,
  selectedBackColor: PropTypes.string,

  enableLinks: PropTypes.bool,
  highlightSelected: PropTypes.bool,
  showBorder: PropTypes.bool,
  showTags: PropTypes.bool,

  nodes: PropTypes.arrayOf(PropTypes.number)
};
