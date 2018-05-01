# 전화번호부 만들기 프로젝트

## 목차
1. [검색 기능 구현하기](#L1)



## <a name="L1"></a> 1. 검색 기능 구현하기
- ```input```태그, Javascript의 ```Sort``` 와 ```Filter``` 함수로 구현한다.


```javascript
/*
/src/components/App.js
*/
import React from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component {

  // 생성자를 건드렸을 시에는 브라우저를 새로고침 해야한다.
  // hot loader는 생성자를 다시 호출시키지 않기 때문이다.
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  render() {
    const mapToComponent = (data) => {
      data.sort((a,b) => { return a.name > b.name; });
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase()
            .indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      );
      return data.map((contact,i) => {
        return (<ContactInfo contact={contact} key={i} />);
      });
    };

    return (
      <div>
        <h1>Contact</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        {mapToComponent(this.state.contactData)}
      </div>
    );
  }
}
```
#### input 태그
- 값을 받아올 곳.
- value 속성을 정했으면 onChange 함수를 정의하여 새로운 값을 반영하도록 해야함.

#### sort 함수
- 기존 배열을 바꿈
- 콜백함수 : 디폴트는 유니코드 비교. 정수 비교시에는 재정의해야함. 대소비교에 따라 양수 0 음수를 리턴하는 함수로.

#### Filter
- 새 배열을 만듬
- 콜백함수 : 필터유무의 true, false를 반환하도록 설계해야함.
