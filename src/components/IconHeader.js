import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import NavButton from './NavButton';
export const IconHeader = (props) => (
    <Header as="h1" icon textAlign="center">
        <Icon name={props.icon} />
        <Header.Content>{props.header}</Header.Content>
        <Header.Subheader>{props.subHeader}</Header.Subheader>
        <NavButton text={props.buttonText} route={props.buttonUrl} />
    </Header>
);
