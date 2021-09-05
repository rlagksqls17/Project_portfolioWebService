import React, { useState, useEffect } from 'react';
import UpdateInput from '../ButtonComponent/updateinput'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


export default function UserInfo(props){
/*
사용자 프로필 컴포넌트
    isClick: 불리언 값에 따라 수정버튼이 활성화 or 비활성화
*/
    
    const [username, setUsername] = useState('이름')
    const [onelineMyself, setOnelineMyself] = useState('안녕하세요')
    const [isClick, setIsClick] = useState(false)


    useEffect(() => {
        // props로 넣어준 id를 mysql에서 검색하여 해당 정보를 불러옴
        fetch('/api/show_user_info', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(props.researchid) 
        })
        .then(r => r.json())
        .then(res => {
            if(res['status'] == 200){
                setUsername(res['name'])
                setOnelineMyself(res['onelineMyself'])
            }
            else{
                return console.log("Not Found!")
            }
        }, [username, onelineMyself, isClick])
    })
    

    return (
        <div className='user-info'>
            <div className='userinfoname-font'>{username}</div>
            <div className='myself-font'>

                {/* 수정하기 버튼을 누를 때만 입력창이 뜨도록 설정 */}
                {isClick ? 
                    <UpdateInput 
                        updateCase='onelineMyself' 
                        initState={onelineMyself}
                    /> 
                    : `${onelineMyself}`
                }

                {/* 정보가 사용자 본인꺼라면 수정버튼 활성화 */}
                {((props.researchid === ID) && !isClick) ? 
                    <button onClick={() => 
                        setIsClick(true)
                    }>
                    수정하기
                    </button>
                    : ""
                }
            </div>
        </div>
    )
}

