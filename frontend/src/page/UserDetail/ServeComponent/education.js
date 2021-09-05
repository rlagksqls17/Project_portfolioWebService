import React, { useState, useEffect } from 'react';
import UpdateInput from '../ButtonComponent/updateinput'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


export default function Education(props){
    /*
    사용자 학력사항 컴포넌트 
        mappingElement: 매핑시 참조가능한 인덱스요소들이 들어있음 [1, 2, 3, ...]
        isClick: 불리언 값에 따라 수정버튼이 활성화 or 비활성화
    */
        
    const [schoolName, setSchoolName] = useState(['학교 이름'])
    const [major, setMajor] = useState(['전공'])
    const [degree, setDegree] = useState(['학위'])
    const [mappingElement, setMappingElement] = useState([])

    const [isClick, setIsClick] = useState(false)


    useEffect(() => {
        // props로 넣어준 id를 mysql에서 검색하여 해당 정보를 불러옴
        fetch('/api/show_education', {
            method: 'post',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(props.researchid)
        })
        .then(r => r.json())
        .then(res => {
            if(res['status'] == 200){
                setSchoolName(res['schoolname'])
                setMajor(res['major'])
                setDegree(res['degree'])
                setMappingElement(res['element_list']) // [1, 2, 3, ...]
            } else{
                return console.log("Not Found!")
            }
        })
    }, [])


    // 정보를 담은 컴포넌트
    const InfoComponent = ({value}) => {
        return(
            <div>
                {/* 수정하기 버튼을 누를 때만 입력창이 뜨도록 설정 */}
                {isClick ? 
                    <UpdateInput
                        updateCase='education'
                        initState={{
                            schoolName : schoolName[value],
                            major : major[value],
                            degree : degree[value]
                        }}
                        index={value}/>
                : 
                <div className="info-element">
                    <div>{schoolName[value]}</div>

                    {/* 전공(학위) */}
                    <div>{`${major[value]}(${degree[value]})`}</div>
                </div>}
                
                {/* 마지막 Info Component일 시 추가버튼 활성화 */}
                <div className='add-info'>
                {((mappingElement[mappingElement.length - 1] == value) && !isClick) ? 
                    <AddInfo 
                        data={{
                            type : 'education',
                            userid : ID,                         
                        }}
                    />
                : ""
                } 
                </div>

                {/* 정보가 사용자 본인꺼라면 수정버튼 활성화 */}
                {((props.researchid === ID) && !isClick) ? 
                    <button className='update-info' onClick={() => 
                        setIsClick(true)
                    }>
                    수정하기
                    </button>
                    : ""
                }         
                <hr/>          
            </div>
        )
    }
    return (
        <div className='info-class'>
            <div className='info-title'>학력</div>
            
            {/* mappingElment 리스트를 참고하여 정보컴포넌트를 매핑 */}
            {mappingElement.map(element => {
                return (<div><InfoComponent key={element.toString()} value={element}/></div>)
            })}
        </div>
    )
}