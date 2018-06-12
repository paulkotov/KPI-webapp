import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';
const ButtonGroup = Button.Group;
// import styled from 'styled-components';

const panelSyles = {
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center',
  margin: 10+'px' 
};

class EditorPanel extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    undoChanges: PropTypes.func
  }
  state ={ 
    enabled: this.props.enabled
  }

  onSaveClick = () => {
    this.props.saveChanges();
  }

  onUndoClick = () => {
    this.props.undoChanges();
  }

  render(){
    const { enabled } = this.props;
    return(
        <div className="panel" >
          <ButtonGroup style={panelSyles}>
            <Button className="save" 
                    size="large" 
                    onClick={ this.saveChanges }
                    disabled={!enabled}
                    >Сохранить изменения</Button>
            <Button className="undo"  
                    size="large" 
                    onClick={ this.undoChanges }
                    disabled={!enabled}
                    >Отменить изменения</Button>
          </ButtonGroup>
        </div>  
    );
  }
}

export default EditorPanel;
