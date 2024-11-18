package com.nanuri.rams.business.assessment.as05.as05010;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.AS05010SVO;
import com.nanuri.rams.business.common.vo.RAA11BVO;
import com.nanuri.rams.business.common.vo.RAA31BVO;

@Service
public interface AS05010Service {
	
	// 안건관리 - 진행정보관리 조회
	public List<AS05010SVO> getDealList(AS05010SVO dealInfo);
	
	//--------------------TAB1 약정/기표/철회--------------------//
	// 약정/기표/철회 저장
	public int registCaseInfo(AS05010SVO caseInfo);
	
	// 약정/기표/철회 삭제
	public int deleteCaseInfo(AS05010SVO caseInfo);

	// 약정 완료 수정
	public int updateInspctPrgrsStCd(AS05010SVO caseInfo);
	
	//--------------------TAB2 EXIT--------------------//
	// EXIT 저장
	public int registExitInfo(AS05010SVO exitInfo);
	
	// EXIT 삭제
	public int deleteExitInfo(AS05010SVO exitInfo);
	
	//--------------------TAB3 셀다운의무--------------------//
	// 셀다운의무 조회
	public List<RAA31BVO> getOpList(RAA31BVO opList);
	
	// 셀다운의무 저장
	public int registOpInfo(RAA31BVO opInfo);
	
	// 셀다운의무 삭제
	public int deleteOpInfo(RAA31BVO opInfo);
		
	//--------------------TAB4 기타의무--------------------//
	// 기타의무 조회
	public List<RAA31BVO> getEtcList(RAA31BVO etcList);
	
	// 기타의무 저장
	public int registEtcInfo(RAA31BVO etcInfo);
	
	// 기타의무 삭제
	public int deleteEtcInfo(RAA31BVO etcInfo);
		
	//--------------------TAB5 관리직원--------------------//
	// 관리직원 유무
	public int checkEno(RAA11BVO enoInfo);
	
	// 관리직원 조회
	public List<RAA11BVO> getEnoList(RAA11BVO enoList);
	
	// 관리직원 저장
	public int registEnoInfo(RAA11BVO enoInfo);
	
	// 관리직원 삭제
	public int deleteEnoInfo(RAA11BVO enoInfo);
}
