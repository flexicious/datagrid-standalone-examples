import React, { Component } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import { Divider, Popover, Toggle } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Search from 'material-ui/svg-icons/action/search';
import MultiSelectList from './MultiSelectList';
import TextField from 'material-ui/TextField/TextField';
require('./styles.scss');

const BUTTON_STYLE = {
    color: 'black',
    height: 38,
    textAlign: 'left',
  };

  const BUTTON_LABEL_STYLE = {
    color: 'black',
    fontSize: '16px',
    textTransform: 'none',
    paddingLeft: 0,
    paddingRight: 0,
  };

  const BUTTON_ICON_STYLE = {
    height: 38,
  };

class MultiSelectComboBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchor: null,
            selectAll: true,
            selected: this.props.dataProvider,
        };

        this.dataField = props.dataField || 'data';

        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleSwitchOnChange = this.handleSwitchOnChange.bind(this);
        this.handleMultiSelectOnChange = this.handleMultiSelectOnChange.bind(this);
        this.addSelected = this.addSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.handleOnClickOkButton = this.handleOnClickOkButton.bind(this);
        this.renderDropDownButton = this.renderDropDownButton.bind(this);
    }

    componentWillReceiveProps({ dataProvider }: Props) {
        const hasChanged = this.state.selected !== dataProvider;

        if (hasChanged) {
            this.setState({ selected: dataProvider });
        }
    }

    handleButtonOnClick(event) {
        this.setState({
            open: true,
            anchor: event.currentTarget,
        });
    }

    handlePopoverClose() {
        this.setState({ open: false });
    }

    handleSwitchOnChange() {
        this.setState({
            selectAll: !this.state.selectAll,
            selected: this.state.selectAll ? List() : this.props.dataProvider,
        });
    }

    findOption(
        matchProps,
        matchValue,
        collection,
    ) { 
        return collection.find(function(item) {
            return (item[matchProps] === matchValue);
        }); 
    }

    handleMultiSelectOnChange(data) {
        const hasSelected = !!this.findOption(this.dataField, data[this.dataField], this.state.selected);
        const newState = hasSelected ? this.removeSelected(data) : this.addSelected(data);
        const hasChanged = (this.state.selectAll && newState.size !== this.props.dataProvider.size) ||
            (!this.state.selectAll && newState.size === this.props.dataProvider.size);

        if (hasChanged) {
            this.setState({
                selected: newState,
                selectAll: !this.state.selectAll,
            });

            return;
        }

        this.setState({
            selected: newState,
        });
    };

    addSelected(data) {
        return this.state.selected.push(data);
    }
      

    removeSelected(data) {
        return this.state.selected.filter(
            function(selectedItem) { 
                return selectedItem[this.dataField] !== data[this.dataField];
            }, this
        );
    }
        

    handleOnClickOkButton() {
        this.props.onClickOk(this.state.selectAll, this.state.selected.toArray());
        this.handlePopoverClose();
    }

    getButtonLabel() {
        return 'All';
    }

    renderDropDownButton() {
        return (
            <FlatButton
                label={this.getButtonLabel()}
                className={"base"}
                onClick={this.handleButtonOnClick}
                fullWidth
                hoverColor="transparent"
                icon={
                    <ArrowDropDown
                        color="black"
                        style={BUTTON_ICON_STYLE}
                    />
                }
                labelPosition="before"
                labelStyle={BUTTON_LABEL_STYLE}
                style={BUTTON_STYLE}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderDropDownButton()}
                <Popover
                    anchorEl={this.state.anchor}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    onRequestClose={this.handlePopoverClose}
                    open={this.state.open}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <div className="popup">
                        <TextField
                            className={"searchField"}
                            hintText="Search"
                            // startAdornment={<Search className={styles.searchIcon} />}
                        />
                        <Divider />
                        <div className={"selectAll"}>
                            <label className={"selectAllLabel"}>
                                Select All
                            </label>
                            <Toggle
                                checked={this.state.selectAll}
                                className={"selectAllSwitch"}
                                onToggle={this.handleSwitchOnChange}
                            />
                        </div>
                        <Divider />
                        <MultiSelectList
                            className={"muiList"}
                            dataField={this.dataField}
                            dataProvider={this.props.dataProvider || List()}
                            isSelectAll={this.state.selectAll}
                            onChange={this.handleMultiSelectOnChange}
                            selected={this.state.selected}
                        />
                        <Divider />
                        <div className={"footer"}>
                            <FlatButton
                                className={"cancelButton"}
                                onClick={this.handlePopoverClose}
                            >
                                Cancel
                            </FlatButton>
                            <FlatButton
                                className={"okButton"}
                                disabled={this.state.selected.size < 1} 
                                onClick={this.handleOnClickOkButton}
                            >
                                Ok
                            </FlatButton>
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }
}

export default MultiSelectComboBox;
