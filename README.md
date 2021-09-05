# 포트폴리오 웹 서비스  

소개 : 사용자의 정보를 입력한 후, 검색을 통해 다른 사용자의 포트폴리오 정보를 확인할 수 있는 포트폴리오 웹 서비스  

---

## 주요 사용 기술 

- Flask
- MySQL
- Javascript
- React.js (Functional Components + Hook)

---

## 파일구성 

```python
# 폴더 내용  
hanbinsproject  
./ backend
- app.py # flask 실행
- models.py # 데이터 모델 
- show_data.py # 유저 정보 조회
- update_data.py # 유저 정보 수정
- user_api # 로그인과 회원가입, 토큰 관리
    
./frontend  # 프론트엔드 서버 파일
  ./src
    ./redux # 사용자 로그인 상태 redux 활용
    	- reducer.js
        - store.js
        
    ./page
    	- joinpage.js # 회원가입 페이지
        - loginpage.js # 로그인 페이지
        - mainpage.js # 메인 페이지
        - userinfo.js # 사용자 정보 조회 페이지
        
        ./auth
        	- index.js # 유저 토큰 관리
            
        ./image 
        	- upload-1118928_640.png # 업로드 버튼 이미지
            
    	./UserDetail # 유저 프로필 관련 폴더
        	- userdetail.js # 아래 두 컴포넌트들을 조합하여 불러옴
        ./ButtonComponent # 유저 프로필 버튼
            	- addinfobutton.js # 추가버튼
                - updateinput.js # 수정버튼
                
            ./ServeComponent # 유저 정보 조회 기능
            	- awardhistory.js # 수상내역 정보
                - certification.js # 자격증 정보
                - education.js # 학력 정보
                - project.js # 프로젝트 정보
                - userinfo.js # 사용자 프로필 요약
```

