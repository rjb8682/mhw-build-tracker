import * as React from 'react';
import {withRouter} from "react-router";
import {Dropdown, Menu} from "semantic-ui-react";

class MenuItemWithoutRouter extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.handleLink = this.handleLink.bind(this);
    }

    handleLink(path: string) {
        this.props.history.push(path);
    }

    render() {
        const { to, children, location, disabled } = this.props;

        return (
            <Menu.Item active={location.pathname.indexOf(to) != -1}
                       disabled={disabled}
                       onClick={() => this.handleLink(to)}>
                {children}
            </Menu.Item>
        );
    }
}

class DropdownItemWithoutRouter extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.handleLink = this.handleLink.bind(this);
    }

    handleLink(path: string) {
        this.props.history.push(path);
    }

    render() {
        const { to, children, location, disabled } = this.props;

        return (
            <Dropdown.Item active={location.pathname.indexOf(to) != -1}
                           disabled={disabled}
                           onClick={() => this.handleLink(to)}>
                {children}
            </Dropdown.Item>
        );
    }
}

export const RouterMenuItem = withRouter(MenuItemWithoutRouter);
export const RouterDropdownItem = withRouter(DropdownItemWithoutRouter);
