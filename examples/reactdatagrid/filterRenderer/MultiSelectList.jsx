// @flow
import React, { Component } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import MuiList from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';

require('./styles.scss');

type Props = {
    className?: string,
    dataField?: string,
    dataProvider: List<$FlowFixMe>,
    labelField?: string,
    listItemCheckboxStyle?: {},
    listItemLabelStyle?: {},
    isSelectAll?: boolean,
    onChange: $FlowFixMe,
    selected: List<$FlowFixMe>,
};

const LIST_STYLE = {
  overflow: 'auto',
};

export default class MultiSelectList extends Component {
    constructor(props) {
        super(props);
        this.dataField = props.dataField || 'data';
        this.labelField = props.labelField || 'label';
        this.renderListItems = this.renderListItems.bind(this);
    }

    findOption(
        matchProps,
        matchValue,
        collection,
    ) {
        return collection.find((item) => item[matchProps] === matchValue);
    }

    renderListItems(dataProvider) {
        return (dataProvider.map(function(data, index) {
            const label = data[this.labelField];

            return (
                <ListItem
                    key={label}
                    className={"listItem"}
                    onClick={() => this.props.onChange(data)}
                >
                    <Checkbox
                        checked={this.props.isSelectAll || !!this.findOption(this.dataField, data[this.dataField], this.props.selected)}
                        className={"menuItemCheckbox"}
                        style={this.props.listItemCheckboxStyle}
                    />
                    <label className={"menuItemLabel"} style={this.props.listItemLabelStyle}>
                        {label}
                    </label>
                    <div style={{ width: '45px' }} />
                    <div className={"only"}>
                        ONLY
                    </div>
                </ListItem>
            );
        }, this));
    }

    render() {
        const { className, dataProvider } = this.props;

        return (
            <MuiList 
                className={className}
                style={LIST_STYLE}
            >
                {this.renderListItems(dataProvider)}
            </MuiList>
        );
    }
}
