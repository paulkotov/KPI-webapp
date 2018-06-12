import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';

// import { Spinner } from './Spinner';
// import { data } from '../../redux/reducers/structure';
import { loadStructData } from '../../lib/services/structure';

import 'antd/lib/button/style/index.css';
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import 'react-sortable-tree/style.css';
import EditorPanel from '../Shared/EditorPanel';

const alertNodeInfo = ({ node }) => {
  // const objectString = Object.keys(node)
  //   .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
  //   .join(',\n   ');

  // global.alert(
  //   'Info passed to the button generator:\n\n' +
  //     `node: {\n   ${objectString}\n},\n` +
  //     `path: [${path.join(', ')}],\n` +
  //     `treeIndex: ${treeIndex}`
  // );
  console.log(`id: ${node.id}`);
  console.log(node);
};

class Structure extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [],
      isEditNodeModalShown: false,
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({
      treeData: nextprops.data
    });
  }

  async componentWillMount(){
    const { addData } = this.props.services;
    const data = await loadStructData();
    addData(data);
  }

  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;
    const getNodeKey = ({ treeIndex }) => treeIndex;
        // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
        searchQuery &&
        node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
  
    const selectPrevMatch = () =>
        this.setState({
          searchFocusIndex:
            searchFocusIndex !== null
              ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
              : searchFoundCount - 1,
        });
  
    const selectNextMatch = () =>
        this.setState({
          searchFocusIndex:
            searchFocusIndex !== null
              ? (searchFocusIndex + 1) % searchFoundCount
              : 0,
        });
        
    return (
        <div style={{ height: 900+'px', width: 1000+'px' }}>
          <form
              style={{ display: 'inline-block' }}
              onSubmit={event => {
                event.preventDefault();
              }}
          >
            <input
              id="find-box"
              type="text"
              placeholder="Search..."
              style={{ fontSize: '1rem' }}
              value={searchString}
              onChange={event =>
                this.setState({ searchString: event.target.value })
              }
            />

            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            >
              &lt;
            </button>

            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
          <EditorPanel enabled={ true }/>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            searchMethod={customSearchMethod}
            searchQuery={searchString}
            canDrag={false}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            generateNodeProps={({ node, path }) => ({
              title: (
                <span>{`${node.id}. ${node.name}`}</span>
              ),
              buttons: [
                <Button
                  onClick={ () => alertNodeInfo({ node }) }
                  style={{ marginRight: 10+'px' }}
                >
                  <Icon type="edit" />
                </Button>,
                <Button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }
                  style={{ marginRight: 10+'px' }}
                >
                  <Icon type="close-circle-o" />
                </Button>,
              ],
            })}
          />
        </div>
    );
  }
}

Structure.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Structure;