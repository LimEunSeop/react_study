import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    contact: PropTypes.object,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
};

const defaultProps = {
    contact: {
        name: null,
        phone: null
    },
    onUpdate: () => console.warn('onUpdate() is not defined'),
    onDelete: () => console.warn('onDelete() is not defined')
};

class DetailOfContact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prevName: '',
            isEdit: false,
            editContact: {
                name: '',
                phone: ''
            }
        };

        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.contact.name != nextProps.contact.name) {
            this.setState({
                isEdit: false
            });
        }
    }

    onToggleEdit() {
        // setState가 비동기라서 먼저 실행해줘야함.
        if (!this.state.isEdit) {
            this.setState({
                editContact: {
                    name: this.props.contact.name,
                    phone: this.props.contact.phone
                }
            });
        } else {
            this.props.onUpdate(this.state.editContact);
        }

        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    onInputChanged(e) {
        const tmpObj = this.state.editContact;
        tmpObj[e.target.name] = e.target.value;
        this.setState({
            editContact: tmpObj
        });
    }

    onKeyPressed(e) {
        if (e.charCode === 13) {
            this.onToggleEdit();
        }
    }

    render() {

        const details = (
            <div>
                <p>Name  : {this.props.contact.name}</p>
                <p>Phone : {this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p> Name  : <input
                                name='name'
                                placeholder='name'
                                value={this.state.editContact.name}
                                onChange={this.onInputChanged}
                            />
                </p>
                <p> Phone : <input
                                name='phone'
                                placeholder='phone'
                                value={this.state.editContact.phone}
                                onChange={this.onInputChanged}
                                onKeyPress={this.onKeyPressed}
                            />
                </p>
            </div>
        );

        const view = (
            <div>
                { this.state.isEdit ? edit : details }
            </div>
        );

        const none = ( <div>No Data</div> );

        return (
            <div> {/* JSX 는 꼭 컨테이너로 감싸야함!!! */}
                <h1>Details</h1>
                { this.props.contact.name != null ? view : none }
                <p>
                    <button onClick={this.onToggleEdit}>
                        { this.state.isEdit ? 'Save' : 'Edit' }
                    </button>
                    <button onClick={this.props.onDelete}>Delete</button>
                </p>
            </div>
        );
    }
}

DetailOfContact.propTypes = propTypes;
DetailOfContact.defaultProps = defaultProps;

export default DetailOfContact;
