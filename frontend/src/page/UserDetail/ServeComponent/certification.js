import React, { useState, useEffect } from 'react';
import UpdateInput from '../ButtonComponent/updateinput'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


export default function Certificate(props){
    /*
    사용자 프로젝트 이력 컴포넌트 
        mappingElement: 매핑시 참조가능한 인덱스요소들이 들어있음 [1, 2, 3, ...]
        isClick: 불리언 값에 따라 수정버튼이 활성화 or 비활성화
    */

    const [certifiname, setCertifiname] = useState(['자격증 이름1'])
    const [certifiprov, setCertifiprov] = useState(['자격증 기관1'])
    const [certifidate, setCertifidate] = useState(['취득 일자1'])

    const [mappingElement, setMappingElement] = useState([])

    const [isClick, setIsClick] = useState(false)


    useEffect(() => {
        // props로 넣어준 id를 mysql에서 검색하여 해당 정보를 불러옴
        fetch('/api/show_certificate', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(props.researchid)
        })
        .then(r => r.json())
        .then(res => {
            if (res['status'] === 200){
                setCertifiname(res['certifi_name'])
                setCertifiprov(res['certifi_prov'])
                setCertifidate(res['certifi_date'])
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
                        updateCase='certificate'
                        initState={{
                            certifiname: certifiname[value],
                            certifiprov: certifiprov[value],
                            certifidate: certifidate[value]
                        }}
                        index={value}
                    />
                    :
                    <div className="info-element">
                        <div>{certifiname[value]}</div>
                        <div>{certifiprov[value]}</div>
                        <div>{certifidate[value]}</div>
                    </div>
                }

                {/* 마지막 Info Component일 시 추가버튼 활성화 */}
                <div className='add-info'>
                {((mappingElement[mappingElement.length-1] === value) && !isClick) ?
                    <AddInfo
                        data={{
                            type:'certificate',
                            userid: ID
                        }}
                    />
                :""}
                </div>

                {/* 정보가 사용자 본인꺼라면 수정버튼 활성화 */}
                {((props.researchid === ID) && !isClick) ? 
                    <button className='update-info' onClick={() => {
                        setIsClick(true)
                    }}>
                    수정하기
                    </button>
                :""}
                <hr/>
            </div>
        )
    }


    return(
        <div className='info-class'>
            <div className='info-title'>자격증</div>

            {/* mappingElment 리스트를 참고하여 InfoComponent를 매핑 */}
            {mappingElement.map((element) => {
                return (<div><InfoComponent key={element.toString()} value={element}/></div>)
            })}
        </div>
    )
}
