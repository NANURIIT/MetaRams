package com.nanuri.rams.business.common.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.AS05010SVO;
import com.nanuri.rams.business.common.vo.TB01010SVO.inqueryParameters;
import com.nanuri.rams.business.common.vo.DS01030SVO.Parameters;
import com.nanuri.rams.business.common.vo.PM22010SVO;
import com.nanuri.rams.business.common.vo.PM22110SVO;
import com.nanuri.rams.business.common.vo.TB04011PVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03210SVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.IBSpecInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.TB06010SVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.TB06010SVO2;
import com.nanuri.rams.business.common.vo.RAA21BVO.CASEVO;

@Mapper
public interface RAA02BMapper {

	// raDealSq 취득
	String getRaDealSq(@Param("raDealCcd") String raDealCcd, @Param("dprtCd") String dprtCd);

	// 신규 deal 생성
	int insertDealInfo(RAA02BDTO paramData);

	// deal 정보 갱신
	void updateDealInfo(RAA02BDTO paramData);

	// 히스토리 데이터 취득
	RAA02BDTO copyDealInfO(@Param("ibDealNo") String ibDealNo, @Param("riskInspctCcd") String riskInspctCcd, @Param("lstCCaseCcd") String lstCCaseCcd);

	// Deal List 정보 취득
	List<AS03210SVO> getDealList(DealInfo dealInfo);

	// deal 심사요청
	Map<String, Object> assesmentRequest(RAA02BDTO raa02bDTO);

	// 배정안건조회
	List<AssignInfo> assignmentSearch(AssignInfo assignInfo);

	// AS04110S - 협의정보 - 안건정보 추가
	CASEVO getDealDetailAS04110S(CASEVO paramData);
	
	// AS05110S - 안건관리 - 안건조회
	List<CASEVO> getDealDetailAS05110S(CASEVO vo);
	
	// AS05110S - 안건관리 - 담당자/심사역 일괄변경
	void updateChrgOwnPEno(RAA02BDTO raa02bDTO);

	// AS4210S - 심사협의체 - 협의체 현황 및 결과조회(안건 제외)
	void updateInspctPrgrsStCd(RAA02BDTO raa02bDTO);

	// deal 정보 취득
	List<AS04010SVO> getDealIfno(AS04010SVO inputVO);

	// 협의체부의 저장
	void saveDealInfo(AS04010SVO paramData);

	List<AS05010SVO> getDealListAS05010(AS05010SVO dealList);

	int updateCaseInfo(AS05010SVO caseInfo);

	int deleteCaseInfo(AS05010SVO caseInfo);

	int updateExitInfo(AS05010SVO exitInfo);

	int deleteExitInfo(AS05010SVO exitInfo);

	List<Map<String, Object>> getRiskRcgNoList(HashMap<String, Object> param);

	List<Map<String, Object>> getTable1(inqueryParameters param);

	List<Map<String, Object>> getTable2(inqueryParameters param);
	
	List<Map<String, Object>> getTable3(inqueryParameters param);
	
	List<Map<String, Object>> getTable4(inqueryParameters param);
	
	List<Map<String, Object>> getTable5(inqueryParameters param);

	List<Parameters> getData(Parameters param);

	List<PM22010SVO> getEamList(PM22010SVO eamList);

	List<PM22110SVO> getAfterMngSttnList(PM22110SVO sttnList);

	TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam);

	// TB08020S  안건별 모니터링 관리 안건목록 조회
	List<HashMap<String, String>>  getDealMnrtList(HashMap<String, String> paramData);

	// DEAL(사업)정보조회
	List<IBSpecInfo> ibSpecSearch(IBSpecInfo ibDealInfo);
	
	List<TB04011PVO> getDealInfoTB04011P(DealInfo dealDto);

	// 승인정보조회 TB06010S
	TB06010SVO2 selectTB06010SVO2(TB06010SVO2 searchParam);
	
	// 사업명세조회
	List<TB06010SVO2> checkDealSearch(TB06010SVO2 assignInfo);
}
