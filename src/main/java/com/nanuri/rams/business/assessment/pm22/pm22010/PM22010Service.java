package com.nanuri.rams.business.assessment.pm22.pm22010;

import java.util.List;

import com.nanuri.rams.business.common.dto.RAA66BDTO;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA64BDTO;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public interface PM22010Service {
	
	// 사후관리 - 부실자산 사후관리 조회
	public List<PM22010SVO> getEamList(PM22010SVO eamList);
	
	
	//-----------------------TAB1 관리이력-----------------------//
	// 관리이력 조회
	public List<RAA60BVO> getEamDetail(RAA60BVO eamInfo);
	
	// 관리이력 저장
	public int registEamInfo(RAA60BVO eamInfo);
	
	// 관리이력 삭제
	public int deleteEamInfo(RAA60BVO eamInfo);
	
	// 관리이력 파일 저장
	public void registFileInfo(RAA64BDTO dto);
	
	// 관리이력 파일 삭제
	public void deleteFileInfo(RAA64BDTO dto);
	
	// 관리이력 파일 조회
	public List<RAA64BDTO> getListFileInfo(RAA64BVO vo);
	
	
	//-----------------------TAB2 재산조사-----------------------//
	// 재산조사 조회
	public List<RAA61BVO> getEsttDetail(RAA61BVO esttInfo);
	
	// 재산조사 저장
	public int registEsttInfo(RAA61BVO esttInfo);
	
	// 재산조사 삭제
	public int deleteEsttInfo(RAA61BVO esttInfo);
	
	//-----------------------TAB3 재산조사-----------------------//
	// 법적절차 조회
	public List<RAA62BVO> getLglDetail(RAA62BVO lglInfo);
	
	// 법적절차 저장
	public int registLglInfo(RAA62BVO lglInfo);
	
	// 법적절차 삭제
	public int deleteLglInfo(RAA62BVO lglInfo);
	
	//-----------------------TAB4 시효관리-----------------------//
	// 시효관리 조회
	public List<RAA63BVO> getEfctDetail(RAA63BVO efctInfo);
	
	// 시효관리 저장
	public int registEfctInfo(RAA63BVO efctInfo);
	
	// 시효관리 삭제
	public int deleteEfctInfo(RAA63BVO efctInfo);

	//-----------------------TAB5 안건연결-----------------------//
	// 안건연결 내역 조회
	public List<RAA66BVO> getCnctList(RAA66BDTO paramData);

	// 안건연결 정보 저장
	public int registCnctInfo(RAA66BDTO cnctInfo);

	// 안건연결 정보 삭제
	public int deleteCnctInfo(String sq);

}
