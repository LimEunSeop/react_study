import React from 'react';
import PropTypes from 'prop-types';

export default class NameOfContact extends React.Component {

    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.props.contact.name}
            </div>
        );
    }
}

NameOfContact.propTypes = {
    contact: PropTypes.object, // nested 하면 안됨. : 다음에 바로 타입이 와야함
    onClick: PropTypes.func
};

NameOfContact.defaultProps = {
    contact: {
        name: null // defaultProps는 속성 오른쪽에 값만 오면 되는데, 객체도 값이기 때문에 nested 가능
    },
    onClick : () => { console.err('onClick() is not defined'); }
};
