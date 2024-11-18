package com.nanuri.rams.business.assessment.tb08.tb08010;

import java.util.List;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;

@Service
public interface TB08010Service {

	// 사후관리 - 부실자산 사후관리 조회
	public List<IBIMS103BVO> getEamList(IBIMS103BVO eamList);

	// -----------------------TAB1 관리이력-----------------------//
	// 관리이력 조회
	public List<IBIMS606BVO> getEamDetail(IBIMS606BDTO eamInfo);

	// 관리이력 저장
	public int registEamInfo(IBIMS606BDTO eamInfo);

	// 관리이력 삭제
	public int deleteEamInfo(IBIMS606BDTO eamInfo);

	// 관리이력 파일 저장
	public void registFileInfo(RAA64BDTO dto);

	// 관리이력 파일 삭제
	public void deleteFileInfo(RAA64BDTO dto);

	// 관리이력 파일 조회
	public List<RAA64BDTO> getListFileInfo(RAA64BVO vo);

	// -----------------------TAB2 재산조사-----------------------//
	// 재산조사 조회
	public List<IBIMS607BVO> getEsttDetail(IBIMS607BDTO esttInfo);

	// 재산조사 저장
	public int registEsttInfo(IBIMS607BDTO esttInfo);

	// 재산조사 삭제
	public int deleteEsttInfo(IBIMS607BDTO esttInfo);

	// -----------------------TAB3 재산조사-----------------------//
	// 법적절차 조회
	public List<IBIMS608BVO> getLglDetail(IBIMS608BDTO lglInfo);

	// 법적절차 저장
	public int registLglInfo(IBIMS608BDTO lglInfo);

	// 법적절차 삭제
	public int deleteLglInfo(IBIMS608BDTO lglInfo);

	// -----------------------TAB4 시효관리-----------------------//
	// 시효관리 조회
	public List<IBIMS609BVO> getEfctDetail(IBIMS609BDTO efctInfo);

	// 시효관리 저장
	public int registEfctInfo(IBIMS609BDTO efctInfo);

	// 시효관리 삭제
	public int deleteEfctInfo(IBIMS609BDTO efctInfo);

	// -----------------------TAB5 안건연결-----------------------//
	// 안건연결 내역 조회
	public List<RAA66BVO> getCnctList(RAA66BDTO paramData);

	// 안건연결 정보 저장
	public int registCnctInfo(RAA66BDTO cnctInfo);

	// 안건연결 정보 삭제
	public int deleteCnctInfo(String sq);

}
