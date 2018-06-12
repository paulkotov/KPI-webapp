import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Toolbar } from 'react-data-grid-addons';
import update from 'immutability-helper';

// import { data } from '../../redux/reducers/plan';

// import { Spinner } from './Spinner';
import { loadPlanData } from '../../lib/services/plan';

class Plan extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'pod',
        name: 'Подразделение',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'pos',
        name: 'Должность',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'empl',
        name: 'Сотрудник',
        width: 200,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan_param_id',
        name: 'Пок-ль',
        width: 75,
        editable: true,
        resizable: true,
        sortable: true
      },
      {
        key: 'plan_weight',
        name: 'Вес%',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm1',
        name: 'План01',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm2',
        name: 'План02',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm3',
        name: 'План03',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'kv1',
        name: '1кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm4',
        name: 'План04',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm5',
        name: 'План05',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm6',
        name: 'План06',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'kv2',
        name: '2кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },
      {
        key: 'm7',
        name: 'План07',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm8',
        name: 'План08',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true

      },{
        key: 'm9',
        name: 'План09',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'kv3',
        name: '3кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true  
      },{
        key: 'm10',
        name: 'План10',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm11',
        name: 'План11',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'm12',
        name: 'План12',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'kv4',
        name: '4кв',
        editable: true,
        width: 75,
        resizable: true,
        sortable: true
      },{
        key: 'year',
        name: 'Год',
        editable: true,
        width: 75,
        sortable: true    
      }
    ];

    this.state = { 
      rows: []
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({
      rows: nextprops.data
    });
  }

  async componentWillMount(){
    const { addData } = this.props.services;
    const data = await loadPlanData();
    // console.log(data);
    addData(data);
  }

  getColumns = () => {
    let clonedColumns = this._columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };
    return clonedColumns;
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  handleAddRow = ({ newRowIndex }) => {
    const newRow = {
      value: newRowIndex,
      pod: '',
      pos: '',
      empl: '',
      plan_perem_id: '',
      plan_weight: '',
      m1: '',
      m2: '',
      m3: '',
      kv1: '',
      m4: '',
      m5: '',
      m6: '',
      kv2: '',
      m7: '',
      m8: '',
      m9: '',
      kv3: '',
      m10: '',
      m11: '',
      m12: '',
      kv4: '',
      year: ''
    };

    let rows = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  };

  getSize = () => {
    return this.state.rows.length;
  };
  
  getCellActions(column, row) {
    if (column.key === 'county' && row.id === 'id_0') {
      return [
        {
          icon: 'glyphicon glyphicon-remove',
          callback: () => { alert('Deleting'); }
        },
        {
          icon: 'glyphicon glyphicon-link',
          actions: [
            {
              text: 'Campaign Linking',
              callback: () => { alert('Navigating to camapign linking'); }
            }
          ]
        }
      ];
    }
  }

  render() {
    return (
        <ReactDataGrid
          ref={ node => this.grid = node }
          enableCellSelect={true}
          columns={this.getColumns()}
          rowGetter={this.getRowAt}
          rowsCount={this.getSize()}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
          enableRowSelect={true}
          rowHeight={50}
          minHeight={600}
          rowScrollTimeout={200} 
          getCellActions={this.getCellActions}
        />
    );
  }
}

Plan.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Plan;