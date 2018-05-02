# 전화번호부 만들기 프로젝트

## 목차
1. [검색 기능 구현하기](#L1)
2. [선택 기능 구현하기(상세정보 보기)](#L2)
3. [추가, 삭제, 수정 기능 구현하기](#L3)

## <a name="L1"></a> 1. 검색 기능 구현하기
```input```태그, Javascript의 ```Sort``` 와 ```Filter``` 함수로 구현한다.

### /src/components/Contact.js
#### input 태그
```javascript
<input
    name="keyword"
    placeholder="Search"
    value={this.state.keyword}
    onChange={this.handleChange}
/>
```
- 값을 받아올 곳.
- value 속성을 정했으면 onChange 함수를 정의하여 새로운 값을 반영하도록 해야함.

#### sort 함수
```Javascript
data.sort((a,b) => { return a.name > b.name; });
```
- 렌더링할때 데이터 순서가 섞이지 않기위해 먼저 해야하는 작업
- 기존 배열을 바꿈
- 콜백함수 : 디폴트는 유니코드 비교. 정수 비교시에는 재정의해야함. 대소비교에 따라 양수 0 음수를 리턴하는 함수로.

#### Filter
```Javascript
data = data.filter(
    (contact) => {
        return contact.name.toLowerCase()
        .indexOf(this.state.keyword.toLowerCase()) > -1;
    }
);
```
- 렌더링할때 두번째로 해야하는 작업으로, 조건에 맞는 값을 새 배열로 재구성한다.
- 콜백함수 : **매개변수에는 배열이 들어감.** 필터유무의 true, false를 반환하도록 설계해야함.



## <a name="L2"></a> 2. 선택 기능 구현하기(상세정보 보기)

### /src/components/ContactDetails.js
```javascript
import React from 'react';

export default class ContactDetails extends React.Component {
    render() {

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const blank = (<div>Not Selected</div>);
        return (
            <div>
                <h2>Details</h2>
                { this.props.isSelected ? details : blank }
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
};
```
- item이 선택됐는지의 여부를 ```this.props.isSelected```로 전달받아 선택이 됐으면 details, 안 됐으면 blank를 렌더링한다.
- item이 선택되지 않았다면, 비어있는 contact가 전달받을 수도 있다. 그러면 undefined를 조회했다는 에러가 뜨는데, 이를 해결하기 위해 ```defaultProps```를 설정해준다.

### /src/components/Contact.js
```Javascript
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
```
- mapToComponent 함수의 return 부분을 보면, ContactInfo 컴포넌트의 onClick속성에 Arrow Function을 추가한 것을 볼 수 있다. 각 컴포넌트에 키가 i로 별도로 할당되는데 그 틈에 꼽싸리를 껴서 handleClick(i)를 호출하는 함수를 onClick 이벤트의 콜백함수로 지정하였다.
- handleClick 함수에서는 전달받은 키로 selectedKey를 업데이트 한다. 아까 한 이야기와 종합해보면, ContactInfo의 각 Component를 클릭하면 그 컴포넌트의 키값을 selectedKey에 할당한다는 의미이다.
- render 함수의 JSX 리턴문을 보면, ContactDetails라는 컴포넌트가 생긴것을 볼 수가 있다. isSelected로 item이 선택되었는지의 유무를 전달하고, contact로 선택된 contactData 값을 전달한다(없으면 undefined를 전달)


## <a name="L3"></a> 3. 추가, 삭제, 수정 기능 구현하기
immutable.js 의 ```immutability Helper``` 와 ```ES6 spread``` 를 사용하는데 여기서는 immutability Helper를 다루겠다.

### 배열로 이루어진 state 수정할 때
state를 수정할 때는, 무조건 setState 함수를 사용하고 내부의 값이 완전히 바뀌어야 하는 조건이 있다. 따라서 배열을 수정할 때에는 push함수 말고 concat 함수를 이용해야한다.

### immutablity Helper
- 배열과 객체를 조금더 쉽게 수정하기 위한 도구.
- Facebook에서 만든 immutable.js 를 사용한다.

#### 설치 및 적용법
- 설치 : ```npm install --save react-addons-update```
- 적용 : ```import update from 'react-addons-update'```
