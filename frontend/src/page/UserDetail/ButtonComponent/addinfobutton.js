import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


 
export default function AddInfo({data}){
    /*
    - AddInfo Component 기본 배경
        초기 렌더링 시 
        flask에서는 mysql의 데이터를 꺼내서 구분자를 기준으로 관련정보 리스트를 만들고 (show_data.py 참고) 
        react에 그 리스트와 리스트 길이를 넘겨준다.  
    
        react에서는 응답받은 리스트의 길이대로 정보컴포넌트를 매핑하는데, 
        매핑하면서 각 Info Component에 인덱스 prop을 순서대로 명시시켜준다.  
        이후 명시된 인덱스에 맞는 데이터 정보를 표시한다.
        (받은 props.index가 1이고, 받은 데이터가 [A, B] 라면, B를 표시)

        이때 리스트의 길이와, 현재 정보컴포넌트의 인덱스가 같다면, 추가버튼이 활성화된다. (단, 로그인 한 유저 정보만 한해서)
        추가버튼을 누르게 되면, 항목에 해당하는 SQL 컬럼에 구분자를 하나씩 더 넣어주고 리렌더링 한다. 
    */


        // 데이터 타입에 따라 다른 api를 불러옴
        // data === userid 
        const handleOnclickAddButton = () => {
            fetch(`/api/add_${data.type}`,{
                method: 'put',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        

        return(
            <form action="#">
                <button onClick={handleOnclickAddButton} type="submit">추가하기</button>
            </form>
        )
    }