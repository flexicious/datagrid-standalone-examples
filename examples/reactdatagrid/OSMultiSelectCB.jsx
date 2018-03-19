import { UIUtils, UIComponent, ReactDataGrid, ReactDataGridColumnLevel, ReactDataGridColumn, Constants, MultiSelectComboBox } from './LibraryImports'
import React from 'react';
import { List } from 'immutable';
import FullWidthSection from './FullWidthSection'
import Widget from './Widget';
import FlexiciousMockGenerator from '../mockdata/FlexiciousMockGenerator.js'
import SystemConstants from '../mockdata/SystemConstants'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { Dialog, Paper, Menu, MenuItem, RaisedButton, Toggle } from 'material-ui';
import OSMultiSelectComboBoxFilterRenderer from './filterRenderer/index';

export default class ItemRenderer extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
  }

  itemClickHandler() {

  }

  getStockChartHTML(item, column) {
    //here, we use the label function to come up with custom html for the cell and assocate this function to the column via the labelfunction property (See below)
    return "<img src=" + item.chartUrl + ">";
  }

  getWebsiteLink(item, column) {
    //here, we use the label function to come up with custom html for the cell and assocate this function to the column via the labelfunction property (See below)
    return "<a href='http://www.google.com?q=" + item.legalName + "' target='_blank'>" + item.legalName + "</a>";
  }

  itemClickHandler(e) {
    if (e.column.getDataField() == "id") {
      var item = e.item;
      var html = "<table style='width:100%'>" +
        "   <tr>" +
        "<td style='border:solid 1px #000000'>Organization Name " + item.legalName + " </td>" +
        "<td style='border:solid 1px #000000'>Annual Revenue " + item.annualRevenue + " </td>" +
        "<td style='border:solid 1px #000000'>Sales Contact Phone:" + item.salesContact.telephone + " </td>" +
        "   </tr>" +
        "   <tr>" +
        "<td style='border:solid 1px #000000'>Sales Contact:" + item.salesContact.displayName + " </td>" +
        "<td style='border:solid 1px #000000'>EPS:" + item.earningsPerShare + " </td>" +
        "<td style='border:solid 1px #000000'>Last Stock Price:" + item.lastStockPrice + " </td>" +
        "   </tr>" +
        "   <tr>" +
        "<td style='border:solid 1px #000000'>Sales Contact Phone:" + item.salesContact.telephone + " </td>" +
        "<td style='border:solid 1px #000000'>Employee Strength:" + item.numEmployees + " </td>" +
        "   </tr>" +
        "</table>";
      var div = document.createElement("div");
      div.innerHTML = html;
      UIUtils.adapter.showDialog(div, (grid.domElement), true, 300, 200, "Details");
    }
  }
  render() {
    return (
      <div>
        <h1 className='page-title'>Item Renderers</h1>
        <FullWidthSection useContent={true}>

          <ReactDataGrid width={"100%"} ref={(grid) => { this.grid = grid; }} ref={(grid) => { this.grid = grid; }} enablePrint enablePreferencePersistence enableExport enableCopy itemClick={this.itemClickHandler}
            dataProvider={FlexiciousMockGenerator.instance().getDeepOrgListSync()} rowHeight={55} horizontalScrollPolicy="off"
            selectedKeyField="id" enablePaging pageSize={50} enableFilters enableFooters initialSortField="legalName"
            initialSortAscending preferencePersistenceKey="itemRenderers" >
            <ReactDataGridColumnLevel pageSize={20} childrenField="deals" enableFooters selectedKeyField="id">
              <ReactDataGridColumn dataField="id" headerText="ID" filterControl="TextInput" useUnderLine useHandCursor enableCellClickRowSelect={false} />
              <ReactDataGridColumn headerText="Editable Name" dataField="legalName" filterControl="TextInput" filterOperation="BeginsWith" paddingLeft={5} paddingBottom={5}
                paddingRight="8" filterComboBoxBuildFromGrid filterRenderer={MaterialMultiSelectComboBox} enableCellClickRowSelect={false}/>
              <ReactDataGridColumn labelFunction={this.getWebsiteLink} headerText="Website" enableCellClickRowSelect={false}
                filterComboBoxBuildFromGrid filterRenderer={MaterialMultiSelectComboBox} useHandCursor useUnderLine />
              <ReactDataGridColumn dataField="lastStockPrice" headerText="Stock Price" labelFunction={this.getStockChartHTML} />
              <ReactDataGridColumn sortable={false} enableCellClickRowSelect={false} width={50} dataField="isActive"
                itemRenderer={CheckBoxItemRenderer} headerRenderer={CheckBoxHeaderRenderer} />
              <ReactDataGridColumnLevel enableFooters selectedKeyField="id" initialSortField="dealDate" initialSortAscending={false}>
                <ReactDataGridColumn type="checkbox" />
                <ReactDataGridColumn dataField="dealDescription" headerText="Deal Description" footerLabel="Count:" footerOperation="count" footerAlign="center" />
                <ReactDataGridColumn dataField="dealAmount" headerText="Deal Amount" textAlign="right" headerAlign="right" footerLabel="Total:" footerOperation="sum"
                  footerAlign="right" footerOperationPrecision={2}
                  footerFormatter={flexiciousNmsp.CurrencyFormatter} labelFunction={UIUtils.dataGridFormatCurrencyLabelFunction} />
                <ReactDataGridColumn dataField="dealDate" headerText="Deal Date" labelFunction={UIUtils.dataGridFormatDateLabelFunction}
                  resizable={false} />
                <ReactDataGridColumn sortable={false} enableCellClickRowSelect={false} width={50} dataField="finalized"
                  itemRenderer={CheckBoxItemRenderer} headerRenderer={CheckBoxHeaderRenderer} />
              </ReactDataGridColumnLevel>

            </ReactDataGridColumnLevel>
          </ReactDataGrid>
        </FullWidthSection>
      </div>
    );
  }
}

const TextInputRenderer = ({ cell, row, column, level, grid }) => {
  return <TextField
    id="age"
    value={row.getData()[column.dataField]}
    className="text-field-short"
  />
}

const styles = {
  paper: {
    position: 'fixed',
    display: 'none',
    float: 'left',
    margin: 0,
    zIndex: 800,
    overflow: 'hidden'
  },
  toggle: {
    margin: '10px',
    width: '94%',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  menu: {
    maxHeight: '350px',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  button: {
    width: '48%',
    margin: '1%'
  },
  text: {
    cursor: 'pointer',
    margin: 0,
    lineHeight: 2
  },
  wrapper: {
    margin: 0
  }
};

class MaterialMultiSelectComboBox extends UIComponent {
  constructor(props) {
    super(props);

    this.dataField = 'data';
    this.selectedValues = [];
    this.handleOnValueCommit = this.handleOnValueCommit.bind(this);
  }

  getClassNames() {
    return ['MaterialMultiSelectComboBox', 'UIComponent', 'IFilterControl', 'IMultiSelectFilterControl', 'ISelectFilterControl'];
  }

  clear() {
    this.setValue([])
  }

  getValue() {
    return this.selectedValues;
  }

  setValue(val) {
    this.selectedValues = val;
  }

  setDataProvider(data) {
    this._dataProvider = data;
  }

  getDataProvider() {
    return this._dataProvider;
  }

  setAddAllItem() {

  }

  handleOnValueCommit(isSelectedAll, selectedItems) {
    this.setValue(selectedItems.map((item) => item[this.dataField]));
    this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent(Constants.EVENT_CHANGE));
    this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent(Constants.EVENT_VALUE_COMMIT));
  }

  render() {
    const { cell, row, column, level, grid } = this;
    
    return (
      <OSMultiSelectComboBoxFilterRenderer 
        dataField={this.dataField}
        dataProvider={List(this.getDataProvider())}
        onClickOk={this.handleOnValueCommit}
       />
    ); 
  }
}

class CheckBoxItemRenderer extends React.Component {
  constructor(props) {
    super(props);
    const { cell, row, column, level, grid } = props;
    this.state = {
      check: row.getData()[column.dataField]
    };
    this._toggleCheck = (evt, isInputChecked) => {
      const { row, column } = props;
      row.getData()[column.dataField] = !this.state.check;
      evt.preventDefault();
      this.setState({
        check: !this.state.check
      });
    };
  }

  render() {
    return (
      <div style={{ maxWidth: 250 }}>
        <Checkbox
          checked={this.state.check}
          onCheck={this._toggleCheck}
          label="Checkbox"
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }
}

class CheckBoxHeaderRenderer extends React.Component {
  constructor(props) {
    super(props);
    const { cell, row, column, level, grid } = props;
    //var dp = cell.level.getGrid().getDataProvider();//this is a pointer back to the grid and its dataprovider.
    var dp = row.getData();//for header cells, specifically in case of nested grids, the data property is a pointer back to the top level array, or the children array

    this.state = {
      check: false
    }
    if (level.getNestDepth() > 1) {
      var dp = row.getData();//for header cells, specifically in case of nested grids, the data property is a pointer back to the top level array, or the children array

      if (dp.hasOwnProperty("deals")) {
        //this means we are at a inner level checkbox header
        dp = dp.deals;
        var allDealsActive = true;
        for (var i = 0; i < dp.length; i++) {
          if (!dp[i][column.getDataField()]) {
            allDealsActive = false;
          }
        }
        if (allDealsActive) {
          this.state = {
            check: true
          }
        }
      }

    }

    this._toggleCheck = (evt, isInputChecked) => {
      //based upon which level this renderer appears.
      for (var i = 0; i < dp.length; i++) {
        dp[i][column.getDataField()] = isInputChecked;
      }

      this.setState({
        check: !this.state.check
      });

      column.level.grid.refreshCells();//this will re-render the cells.
    };
  }

  render() {
    return (
      <div style={{ maxWidth: 250 }}>
        <Checkbox ref="cb"
          onCheck={this._toggleCheck}
          label="Checkbox"
          checked={this.state.check}
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }
}
