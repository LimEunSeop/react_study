import React, { Component } from 'react';

import NameOfContact from './NameOfContact';
import DetailOfContact from './DetailOfContact';
import CreateContact from './CreateContact';

import update from 'react-addons-update';

class ContactsManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contacts : [
                { name: '가나', phone: '010-1111-1111' },
                { name: '다라', phone: '010-2222-2222' },
                { name: '마바', phone: '010-3333-3333' },
                { name: '사아', phone: '010-4444-4444' },
                { name: '자차', phone: '010-5555-5555' }
            ]
        };

        this.onKeywordChanged = this.onKeywordChanged.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        const contacts = localStorage.contacts;
        if (contacts) {
            this.setState({
                contacts: JSON.parse(contacts)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contacts) != JSON.stringify(this.state.contacts)) {
            localStorage.contacts = JSON.stringify(this.state.contacts);
        }
    }

    onKeywordChanged(e) { // state 수정할때 setState로 할것 꼭 명심 또 명심!!!
        this.setState({
            keyword: e.target.value
        });
        // console.log('onKeywordChanged 호출');
        // console.log(e.target.value);
    }

    onItemClicked(idx) {
        this.setState({
            selectedKey: idx
        });
        console.log(idx, 'is clicked');
    }

    onCreate(contact) {
        this.setState({
            contacts: update(
                this.state.contacts,
                {
                    $push: [contact]
                }
            )
        });
    }

    onUpdate(contact) {
        this.setState({
            contacts: update(
                this.state.contacts,
                {
                    [this.state.selectedKey]: {
                        name: {
                            $set: contact.name // 수정할 필드까지 왔으면 객체를 또 열어서 명령한다.
                        },
                        phone: {
                            $set: contact.phone
                        }
                    }
                }
            )
        });
    }

    onDelete() {
        if (this.state.selectedKey == -1) {
            return ;
        }
        this.setState({
            contacts: update(
                this.state.contacts,
                {
                    $splice: [[this.state.selectedKey, 1]]
                }
            ),
            selectedKey: -1
        });
    }

    render() {
        const mapToComponent = (data) => { // 컴포넌트에 맵핑할때 sort, filter 하면 좋겠구나
            data.sort((a, b) => {
                return a.name > b.name;
            });
            data = data.filter((contact) => {
                return contact.name.toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1;

            });
            return data.map((contact, i) => {
                return (
                    <NameOfContact
                        contact={contact}
                        key={i}
                        onClick={() => this.onItemClicked(i)}
                    />
                );
            });
        };
        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name='keyword'
                    placeholder='keyword'
                    value={this.state.keyword}
                    onChange={this.onKeywordChanged}
                />

                { mapToComponent(this.state.contacts) }

                <DetailOfContact
                    contact={this.state.contacts[this.state.selectedKey]}
                    onUpdate={this.onUpdate}
                    onDelete={this.onDelete}
                />

                <CreateContact
                    onCreate={this.onCreate}
                />

            </div>
        );
    }
}

export default ContactsManager;
