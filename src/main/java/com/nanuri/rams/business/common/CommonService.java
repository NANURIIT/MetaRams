package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS114BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.dto.IBIMS993BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA20BDTO;
import com.nanuri.rams.business.common.dto.RAA98ADTO;
import com.nanuri.rams.business.common.dto.RAB98BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.RAA20BVO;
import com.nanuri.rams.com.code.AthCd;

@Service
public interface CommonService {

	// 셀렉트박스 코드, 밸류 취득
	public List<Map<String, Object>> getSelectBox(List<String> code);
	
	// title 정보
	public IBIMS005BVO.TitleVo getTitle(String menuId);

	// 담당직원 - 로그인유저정보
	public Map<String, Object> getUserAuth();
	
	// 직원검색
	public List<IBIMS003BDTO> findEmpList(IBIMS003BDTO raa99aDto);
	
	// 부서검색
	public List<RAA98ADTO> findDprtList(RAA98ADTO raa98aDto);
	
	// 법인검색
	public List<IBIMS114BDTO> findEntList(IBIMS114BDTO param);
	
	// 첨부파일정보 저장
	public void registFileInfo(RAA20BDTO dto);
	//public void registFileInfo(CommonFileDTO commonDto);
	
	// 첨부파일정보 삭제
	public void deleteFileInfo(RAA20BDTO dto);
	
	// 첨부파일목록 조회
	public List<RAA20BDTO> getListFileInfo(RAA20BVO vo);
	
	// 히스토리 테이블 데이터 생성
	public int registHistoy(Map<String, Object> dealInfoMap);
	
	// 메뉴리스트 조회
	public List<Map<String, Object>> getMenuList(AthCd rghtCd);

	// 메뉴리스트 조회 
	public List<Map<String, Object>> getMenuListM(AthCd rghtCd);

    // 금리정보 조회
	public List<RAB98BDTO> getBitrKind();
  
	// 오늘의 할 일 등록
	public int makeToDoList(IBIMS100BDTO paramData);

	// deal 심사진행상태변경
	public int updateInspctPrgrsStCd(RAA02BDTO paramData);

	// 공통코드2
	public List<Map<String, Object>> getSelectBox2(String code);
	
	// 공통코드
	public List<Map<String, Object>> getSelectBoxList(String codeList);

	// 금융기관정보
	public List<IBIMS992BDTO> getFnltList(IBIMS992BDTO param);
	
	// 펀드정보
	public List<IBIMS993BDTO> getFndList(IBIMS993BDTO param);

	// 권한확인
	public String chkAthCd(IBIMS007BVO param);
}
