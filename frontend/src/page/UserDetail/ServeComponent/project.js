import React, { useState, useEffect } from 'react';
import UpdateInput from '../ButtonComponent/updateinput'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


export default function Project(props){
    /*
    사용자 프로젝트 이력 컴포넌트 
        mappingElement: 매핑시 참조가능한 인덱스요소들이 들어있음 [1, 2, 3, ...]
        isClick: 불리언 값에 따라 수정버튼이 활성화 or 비활성화
    */
    const [projectname, setProjectname] = useState(['프로젝트 이름1'])
    const [projectDetail, setProjectDetail] = useState(['프로젝트 상세1'])
    const [projectdate, setProjectdate] = useState(['프로젝트 기간'])

    const [mappingElement, setMappingElement] = useState([])

    const [isClick, setIsClick] = useState(false)


    useEffect(() => {
        // props로 넣어준 id를 mysql에서 검색하여 해당 정보를 불러옴
        fetch('/api/show_projecthistory', {
            method: 'post',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(props.researchid)
        })
        .then(r => r.json())
        .then(res => {
            if (res['status'] === 200){
                setProjectname(res['project_name'])
                setProjectDetail(res['project_detail'])
                setProjectdate(res['project_date'])
                setMappingElement(res['element_list']) // [1, 2, 3, ...]
            } else {
                return console.log("Not Found!")
            }
        })
    }, [])

    const InfoComponent = ({value}) => {
        return(
            <div>
                {/* 수정하기 버튼을 누를 때만 입력창이 뜨도록 설정 */}
                {isClick ?
                    <UpdateInput
                        updateCase='project'
                        initState={{
                            projectname: projectname[value],
                            projectDetail: projectDetail[value],
                            projectdate: projectdate[value]
                        }}
                        index={value}
                    />
                :
                <div className="info-element">
                    <div>{projectname[value]}</div>
                    <div>{projectDetail[value]}</div>
                    <div>{projectdate[value]}</div>
                </div>
                }

                {/* 마지막 Info Component일 시 추가버튼 활성화 */}
                <div className='add-info'>
                {((mappingElement[mappingElement.length-1] == value) && !isClick) ?
                    <AddInfo
                        data={{
                            type:'project',
                            userid: ID
                        }}
                    /> :
                ""}
                </div>

                {/* 정보가 사용자 본인꺼라면 수정버튼 활성화 */}
                {((props.researchid === ID) && !isClick) ? 
                    <button className='update-info' onClick={() => {
                        setIsClick(true)
                    }}>
                    수정하기
                    </button> : 
                ""}
                <hr/>
            </div>
        )
    }

    return(
        <div className='info-class'>
            <div className='info-title'>프로젝트</div>

            {/* mappingElment 리스트를 참고하여 정보컴포넌트를 매핑 */}
            {mappingElement.map((element) => {
                return (<div><InfoComponent key={element.toString()} value={element}/></div>)
            })}
        </div>
    )
}