import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,  // Edit 모드인지 판별
            formerName: '', // 다른 item이 선택됐는지 판별하기 위함
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleToggle() {

        this.setState({
            isEdit: !this.state.isEdit
        });
        // console.log(this.state.isEdit);
        // 처음에 클릭해도 false 반환. setState는 비동기로 실행되기 때문에 끝나기도 전에 다음줄이 실행됨.
        if (!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else { // 버튼을 눌렀는데 Edit상태가 아니라면 이것은 십중팔구 저장버튼을 클릭한것.
            this.handleEdit();
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    render() {
        // 다른 item이 선택됐다면, Edit모드에서 탈출
        if (this.props.contact.name != this.state.formerName) {
            this.state.formerName = this.props.contact.name;
            this.state.isEdit = false;
        }

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                </p>
            </div>
        );
        const view = this.state.isEdit ? edit : details;

        const blank = (<div>Not Selected</div>);
        return (
            <div>
                <h2>Details</h2>
                { this.props.isSelected ? view : blank }
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? 'OK' : 'Edit'}
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit not defined'); }
};

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
};
