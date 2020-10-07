import React from 'react';
import copy from './copy';
export default class CopyElement extends React.Component {
    handleSubmit = () => {
        copy(this.props.text);
    };
    render() {
        return (
            <span id="copy" onClick={this.handleSubmit}>
                {this.props.elem}
            </span>
        );
    }
}
