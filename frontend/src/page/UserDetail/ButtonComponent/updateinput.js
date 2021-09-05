import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


export default function UpdateInput({updateCase, initState, index}){
    /*
    - props
        updateCase : 스위치 케이스 문을 사용하여 state 값에 따라 렌더링이 달라지게 함
        initState : 입력창에 기본으로 원래 저장된 정보가 보이도록 함
        index : mySQL에 구분자를 기준으로 인덱스가 지정되어 있는데, 그 데이터 수정을 목표로하는 target_index를 뜻함
    */

    switch(updateCase){
        case 'onelineMyself': // 한 줄 소개
            const [myself, setMyself] = useState(initState)


            const handleClickSubmit = (e) => {
                e.preventDefault()

                /* 입력된 input을 받는 state와 사용자 id를 mysql에 보내줌 */
                const data = {
                    'userid' : ID,
                    'myself' : myself,
                }

                fetch('/api/update_user_myself', {
                    method: 'put',
                    headers: {
                        'Content-type':"application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(r => r.json())
                .then(res => {
                    if(res['status' == 200]){
                        return console.log('Success uploaded myself_info')
                    }
                })
            }


            const handleMyselfChange = (e) => {
                setMyself(e.target.value)
            }


            return (
                <div>
                    <form action='#'>
                        <input
                            type="text"
                            value={myself}
                            onChange={handleMyselfChange}
                        />    
                        <button type="submit" onClick={handleClickSubmit}>
                            제출
                        </button> 
                    </form>
                </div>
            )

        
        case 'education': // 학력 사항
            const [schoolName, setSchoolName] = useState(initState.schoolName) // 학교 이름
            const [major, setMajor] = useState(initState.major) // 전공
            const [degree, setDegree] = useState(initState.degree) // 학위
            

            const handleClickEducation = (e) => {

                /* 입력된 input을 받는 state와 사용자 id를 mysql에 보내줌 */
                const data = {
                    'userid' : ID,
                    'school_name' : schoolName,
                    'major' : major,
                    'degree' : degree,
                    'index' : index 
                    // mySQL에 구분자를 기준으로 인덱스가 지정되어 있으므로 해당 인덱스만 수정
                    // [학사 졸업, 석사 졸업] 중 인덱스 1만 바꿔서 [학사 졸업, 박사졸업]으로 바꾼다.
                }

                fetch('/api/update_education', {
                    method: 'put',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(data)
                })
            }


            const handleSchoolNameChange = (e) => {
                setSchoolName(e.target.value)
            }


            const handleMajorChange = (e) => {
                setMajor(e.target.value)
            }


            const handleRadioOnchange = (e) => {
                setDegree(e.target.value)
            }


            return (
                <form action='#'>
                    학교 :
                    <input
                        type="text"
                        value={schoolName}
                        onChange={handleSchoolNameChange}
                    /><br/>
                    전공 :
                    <input
                        type="text"
                        value={major}
                        onChange={handleMajorChange}
                    /><br/>
                    학위 :

                    {/* 라디오버튼 적용 */}
                    <div>
                        <input type="radio" name='education' onChange={handleRadioOnchange} value="재학중"/>재학중
                        <input type="radio" name='education' onChange={handleRadioOnchange} value="학사졸업"/>학사졸업
                        <input type="radio" name='education' onChange={handleRadioOnchange} value="석사졸업"/>석사졸업
                        <input type="radio" name='education' onChange={handleRadioOnchange} value="박사졸업"/>박사졸업
                    </div>        
                    
                    <button type="submit" onClick={handleClickEducation}>
                        제출    
                    </button>                                      
                </form>
            )


        case 'awardhistory': // 수상경력
            const [awardhistory, setAwardshistory] = useState(initState.awardshistory) // 수상 이력
            const [detailhistory, setDetailhistory] = useState(initState.detailhistory) // 상세 이력

            const handleClickAwardhistory = (e) => {

                /* 입력된 input을 받는 state와 사용자 id를 mysql에 보내줌 */
                const data = {
                    'userid' : ID,
                    'award_history' : awardhistory,
                    'detail_history' : detailhistory,
                    'index' : index
                    // mySQL에 구분자를 기준으로 인덱스가 지정되어 있으므로 해당 인덱스만 수정
                    // [수상 경력 1, 수상 경력 2] 중 인덱스 1만 바꿔서 [수상 경력 1, 수상 경력 3]으로 바꾼다.
                }

                fetch('/api/update_awardhistory', {
                    method: 'put',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                })
            }

            const handleAwardhistoryChange = (e) => {
                setAwardshistory(e.target.value)
            }

            const handleDetailhistoryChange = (e) => {
                setDetailhistory(e.target.value)
            }

            return (
                <form action='#'>
                    수상내역 : 
                    <input
                        type="text"
                        value={awardhistory}
                        onChange={handleAwardhistoryChange}
                    /><br/>
                    상세내역 : 
                    <input
                        type="text"
                        value={detailhistory}
                        onChange={handleDetailhistoryChange}
                    /><br/>
                    <button type="submit" onClick={handleClickAwardhistory}>
                        제출
                    </button>
                </form>
            )


        case 'project': // 프로젝트 이력
            const [projectName, setProjectName] = useState(initState.projectname) // 프로젝트 이름
            const [projectDetail, setProjectDetail] = useState(initState.projectDetail) // 프로젝트 상세 정보
            
            const [dateRange, setDateRange] = useState([null, null]) // 프로젝트 기간
            const [startDate, endDate] = dateRange; 


            const handleClickProjecthistory = (e) => {

                /* 입력된 input을 받는 state와 사용자 id를 mysql에 보내줌 */
                const data = {
                    'userid' : ID,
                    'project_name' : projectName,
                    'project_detail' : projectDetail,
                    'project_date' : dateRange,
                    'index' : index
                    // mySQL에 구분자를 기준으로 인덱스가 지정되어 있으므로 해당 인덱스만 수정
                    // [수상 경력 1, 수상 경력 2] 중 인덱스 1만 바꿔서 [수상 경력 1, 수상 경력 3]으로 바꾼다.
                }

                fetch('/api/update_projecthistory', {
                    method: 'put',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(data)
                })
            }


            const handleProjectNameChange = (e) => {
                setProjectName(e.target.value)
            }

            
            const handleProjectDetailChange = (e) => {
                setProjectDetail(e.target.value)
            }


            return (
                <form action='#'>
                    프로젝트 이름:
                        <input
                            type="text"
                            value={projectName}
                            onChange={handleProjectNameChange}
                        /><br/>
                    프로젝트 내용:
                        <input
                            type="text"
                            value={projectDetail}
                            onChange={handleProjectDetailChange}
                        /><br/>
                    프로젝트 기간:
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            withPortal
                        />
                    <button type="submit" onClick={handleClickProjecthistory}>
                        제출 
                    </button>
                </form>
            )

        
        case 'certificate' : // 자격증
            const [certifiName, setCertifiName] = useState(initState.certifiname) // 자격증 이름
            const [certifiProv, setCertifiProv] = useState(initState.certifiprov) // 자격증 공급 기관
            
            const [startsDate, setStartsDate] = useState(new Date()) // 자격증 취득 일자
            

            const handleClickCertificate = () => {

                /* 입력된 input을 받는 state와 사용자 id를 mysql에 보내줌 */
                const data = {
                    'userid' : ID,
                    'certifi_name' : certifiName,
                    'certifi_prov' : certifiProv,
                    'certifi_date' : startsDate,
                    'index' : index
                    // mySQL에 구분자를 기준으로 인덱스가 지정되어 있으므로 해당 인덱스만 수정
                    // [수상 경력 1, 수상 경력 2] 중 인덱스 1만 바꿔서 [수상 경력 1, 수상 경력 3]으로 바꾼다.
                }
                
                fetch('/api/update_certificate', {
                    method: 'put',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            }


            const handleCertifiNameChange = (e) => {
                setCertifiName(e.target.value)
            } 


            const handleCertifiProvChange = (e) => {
                setCertifiProv(e.target.value)
            }


            return (
                <form action='#'>
                    자격증 이름:
                        <input
                            type="text"
                            value={certifiName}
                            onChange={handleCertifiNameChange}
                        /><br/>
                    자격증 공급기관:
                        <input
                            type="text"
                            value={certifiProv}
                            onChange={handleCertifiProvChange}
                        /><br/>
                    자격증 취득일자:
                        <DatePicker
                            selected={startsDate}
                            onChange={(date) => setStartsDate(date)}
                        />
                    <button type="submit" onClick={handleClickCertificate}>
                        제출
                    </button>
                </form>
            )


        case 'image': // wip
            return(
                <input 
                    type="file" 
                    name="image" 
                    accept="image/" 
                    multiple={false}
                />
            )


        default:
            return (<div>케이스 맞지 않음</div>)
    }
}