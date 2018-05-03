import React from 'react';
import PropTypes from 'prop-types';

export default class CreateContact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: {
                name: '',
                phone: ''
            }
        };

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onCreateClicked = this.onCreateClicked.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    onInputChanged(e) {
        const tmpObj = this.state.contact;
        tmpObj[e.target.name] = e.target.value;
        this.setState({
            contact: tmpObj
        });
    }

    onCreateClicked() {
        this.props.onCreate(this.state.contact);
        this.setState({
            contact: {
                name: '',
                phone: ''
            }
        });
        this.nameInput.focus();
    }

    onKeyPressed(e) {
        if (e.charCode === 13) {
            this.onCreateClicked();
        }
    }

    render() {
        return (
            <div>
                <h1>Create</h1>
                <input
                    name='name'
                    placeholder='name'
                    value={this.state.contact.name}
                    onChange={this.onInputChanged}
                    ref={(ref) => {this.nameInput = ref; }}
                />
                <input
                    name='phone'
                    placeholder='phone'
                    value={this.state.contact.phone}
                    onChange={this.onInputChanged}
                    onKeyPress={this.onKeyPressed}
                />
                <p>
                    <button onClick={this.onCreateClicked}>
                        Create
                    </button>
                </p>
            </div>
        );
    }
}

CreateContact.proptypes = {
    onCreate: PropTypes.func
};

CreateContact.defaultProps = {
    onCreate: () => console.err('onCreate() is not definded.')
};
