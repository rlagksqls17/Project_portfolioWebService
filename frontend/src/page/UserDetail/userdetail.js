import React from 'react';
import { useSelector } from 'react-redux'

import UserInfo from './ServeComponent/userinfo'
import Education from './ServeComponent/education'
import AwardHistory from './ServeComponent/awardhistory'
import Project from './ServeComponent/project'
import Certificate from './ServeComponent/certification'

import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


/*
    UserDetail Component 
        : props ID를 참고하여 api요청을 보내 해당 ID에 맞는 사용자 정보를 불러옵니다.
        : 아래 다섯 개의 Serve Component와 두 개의 Button Component로 구성되어 있습니다.

            <Serve Component>  * 각 서브 컴포넌트는 Button Component를 불러옵니다. *
                - UserInfo : 사용자 프로필 컴포넌트, 네트워크 페이지에서 조회용으로도 쓰입니다.
                - Education : 사용자 학력사항 컴포넌트
                - AwardHistory : 사용자 수상이력 컴포넌트
                - Project : 사용자 프로젝트이력 컴포넌트
                - Certificate : 사용자 자격증 컴포넌트
                    
            <Button Component>
                - UpdateInput : 수정 기능 컴포넌트
                - AddInfoButton : 추가 기능 컴포넌트


    <Example>
    예를 들어 Serve Component의 하위 자식인 Education Component에서는 다음과 같이 조합하여 렌더링 됩니다.

    - Education Component
        - Info Component
            학교 정보 + UpdateInput Component
            전공 정보 + UpdateInput Component
            학위 정보 + UpdateInput Component
            AddInfo Button Component (클릭시 또 다른 Info Component가 추가합니다.)
        - Info Component ...
*/


export default function UserDetail(props){

    const ID = useSelector((state) => state.ID) // Reloading Redux state
    
    return(
        <div>
            {(props.researchid === ID)? `${ID}님 안녕하세요`:'조회만 가능합니다.'}<br/>
            <UserInfo researchid={props.researchid}/><br/>
            <Education researchid={props.researchid}/><br/>
            <AwardHistory researchid={props.researchid}/><br/>
            <Project researchid={props.researchid}/><br/>
            <Certificate researchid={props.researchid}/><br/>
        </div>
    )
}