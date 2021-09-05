import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { logout } from './auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import LoginPage from './loginpage';
import UserInfoPage from './userinfo';
import UserDetail from './UserDetail/userdetail';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


/*
    <메인컴포넌트 구성>
        Component Changer 
            - 버튼 클릭에 따라 Main Component나 Network Component를 불러옵니다.


        Main Component 
            - 메인 컴포넌트를 불러옵니다.
            - 사용자 ID를 props로 넣어 UserDetail Component를 불러옵니다.


        Network Component 
            - 네트워크 컴포넌트를 불러옵니다.
            - 모든 사용자 ID를 props로 하나씩 넣어 UserDetail Component를 라우트하는 페이지 링크를 매핑합니다.
            - 검색 기능을 통해 원하는 사용자 ID 만 불러올 수 있습니다.
*/


function MainComponent(){
    const ID = useSelector((state) => state.ID);

    return(
        <div>
            {/* 사용자 정보를 불러옵니다. */}
            <UserDetail researchid={ID}/>
        </div>
    )
}


function NetworkComponent(){
/*
    dictList: 모든 사용자 정보들이 담긴 리스트 
        - 검색값이 없을 경우 dictList를 매핑해서 정보를 보여줌
        - 검색값이 존재하면 searchList를 매핑해서 정보를 보여줌

    searchList: 검색값에 매치되는 사용자 정보들이 담긴 리스트
        - 검색값에 따라 searchList를 수정 후 해당 searchList를 매핑해서 정보를 보여줌
*/

    useEffect(() => {
        fetch('/api/research_user_info', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'current' : ''})
        })
        .then(r => r.json())
        .then(res => {
            setDictList(res['dictList'])
        })
    }, [])


    const [dictList, setDictList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    
    const UserInfo = ({userid, username, myself}) => {
        return(
            <div className='user-info' id={`box ${userid}`}>
                <div className='userinfoname-font'>{username}</div>
                <div>{myself}</div>

                {/* 각각의 userid를 담은 페이지 링크 */}
                <Link to={`/user_info/${encodeURI(userid)}`}>정보보기</Link>
            </div>
        )
    } 


    const checkInputValue = () => {
    /*
    검색값에 매치되는 정보를 dictList state에서 찾고,
    결과를 searchList state에 저장
    */
        if (inputValue.length < 2){
            alert('검색어는 최소 두 글자 이상 입력해야 합니다.')
        } else {
            setIsClicked(true)
            var string = inputValue 
            const temp_list = []
            
            for(let dict of dictList){
                if(dict.username.indexOf(string) !== -1){
                    temp_list.push(dict)
                }
            }
            (!(temp_list.length === 0) ? 
                setSearchList(temp_list)
            :
                alert('검색결과가 없습니다.')
            )
        }
    }

    return (
        <div>
            <div className='research'>
                <input
                    className='research-input'
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }} 
                    placeholder="이름으로 검색">
                </input>
                <button className='research-button' onClick={checkInputValue}>검색</button>
            </div>
            
            {/* 사용자가 검색버튼을 누르면 입력창을 기준으로 매치된 searchList가 매핑,
            기본 상태는 모든 사용자 정보를 조회하는 dictList가 매핑 */}
            <div className="wrapper">
                {isClicked ?
                searchList.map((element) => {
                    return <UserInfo 
                                userid={element.userid} 
                                username={element.username} 
                                myself={element.myself}
                            />
                })                        
                :
                dictList.map((element) => {
                    return <UserInfo 
                                userid={element.userid} 
                                username={element.username} 
                                myself={element.myself}
                            />
                })}
            </div>
        </div>
    )
}


// 클릭한 버튼이 main인지 network인지에 따라 해당되는 컴포넌트를 렌더링
function ComponentChanger(props){
    if (props.component === 'main'){
        return <MainComponent/>
    } else {
        return <NetworkComponent/>
    }
}


// 메인, 네트워크, 로그아웃 버튼 클릭시 각각의 행동이 담겨 있음
function MainPageContent(){
    const [component, setComponent] = useState('main')

    const handleClickLogout = (e) =>{
        logout()
        window.location.href="/"
    }

    return(
        <div className='main-menu'>
            <h1 className='main-logo'>Portfolio</h1>
            <button className='main-button' onClick={handleClickLogout}>
                Logout
            </button>
            <button className='main-button' onClick={() => {
                setComponent('network')
            }}>
                Network
            </button>  
            <button className='main-button' onClick={() => {
                setComponent('main')
            }}>
                Main
            </button><hr/>
            <ComponentChanger component={component}/>
        </div>
    )
}


function MainPage(){    
    return(
        <Router>
            <Switch>
                <Route path="/main" component={MainPageContent}/>
                <Route path="/user_info/:userid" component={UserInfoPage}/>
                <Route path="/" component={LoginPage}/>
            </Switch>
        </Router>
    )    
}

export default MainPage;