import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

export default class Contact extends React.Component {

    // 생성자를 건드렸을 시에는 브라우저를 새로고침 해야한다.
    // hot loader는 생성자를 다시 호출시키지 않기 때문이다.
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                {name: 'Abet', phone: '010-0000-0001'},
                {name: 'Betty', phone: '010-0000-0002'},
                {name: 'Charlie', phone: '010-0000-0003'},
                {name: 'David', phone: '010-0000-0004'}
            ]
        };
        // 임의의 함수를 만들었다면 this를 바인딩해야함.
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected');
    }

    render() {
        const mapToComponent = (data) => {
            data.sort((a,b) => { return a.name > b.name; });
            data = data.filter(
                (contact) => {
                    // console.log(contact.name); // 배열에서 name속성집합만 뺌
                    return contact.name.toLowerCase()
                            .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map((contact,i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={() => this.handleClick(i)}/>); //onClick을 props로 전달
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    />
                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}/>
            </div>
        );
    }
}
