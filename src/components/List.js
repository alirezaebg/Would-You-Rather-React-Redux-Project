import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class List extends Component {
    static propTypes = {
        children: PropTypes.array.isRequired,
    }   

    //activeTab is not required to be part of the redux store
    state = {
        activeTab: this.props.children[0].props.label
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { activeTab } = this.state
        const { children } = this.props

        return (
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((child) => {
                        const { label } = child.props;
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={this.onClickTabItem}
                            />
                        );
                    })}
                </ol>
                <div>
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </div>
        );
    }
}

export default List