import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    contact: PropTypes.object, // nested 하면 안됨. : 다음에 바로 타입이 와야함
    onClick: PropTypes.func
};

const defaultProps = {
    contact: {
        name: null // defaultProps는 속성 오른쪽에 값만 오면 되는데, 객체도 값이기 때문에 nested 가능
    },
    onClick : () => { console.warn('onClick() is not defined'); }
};

class NameOfContact extends Component {

    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.props.contact.name}
            </div>
        );
    }
}

NameOfContact.propTypes = propTypes;
NameOfContact.defaultProps = defaultProps;

export default NameOfContact;
