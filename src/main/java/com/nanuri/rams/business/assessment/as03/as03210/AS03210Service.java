package com.nanuri.rams.business.assessment.as03.as03210;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.dto.TB03020DTO;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03210SVO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

@Service
public interface AS03210Service {

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException;

	public List<IBIMS101BVO> getBscDealInfo(IBIMS101BDTO dealDto) throws ParseException;

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	public List<AS03210SVO> getDealList(DealInfo dealDto);

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	public RAA02BDTO getDealDetailInfo(String ibDealNo, String riskInspctCcd, String lstCCaseCcd);

	// deal 심사요청
	public Map<String, Object> assesmentRequest(String ibDealNo, String riskInspctCcd, String lstCCaseCcd);

	// deal 심사요청취소
	public Map<String, Object> assesmentRequestCancel(String ibDealNo, String riskInspctCcd, String lstCCaseCcd);
	
	// deal 심사요청보류
	public Map<String, Object> assesmentRequestHold(String ibDealNo, String riskInspctCcd, String lstCCaseCcd);

	// ---------------tab1 start------------------

	// 신규 deal 생성
	public Map<String, Object> registDealInfo(RAA02BDTO paramData) throws ParseException;

	// deal 정보 갱신
	public Map<String, Object> updateDealInfo(RAA02BDTO paramData) throws ParseException;

	// ---------------tab2 start------------------

	// 관련문서
	public List<DocInfo> getDocInfo(DocInfo docInfo);

	// 관련문서정보 제거
	public int deleteDocInfo(DocInfo docInfo);

	// 관련문서정보 생성
	public int registDocInfo(DocInfo docInfo);
	
	// ---------------tab3 start------------------

	// 기초자산정보 취득
	public List<RAA03BVO> getAssetInfo(RAA03BVO assetInfo);

	// 기초자산정보 생성
	public int registAssetInfo(RAA03BVO assetInfo);

	// 기초자산정보 제거
	public int deleteAssetInfo(RAA03BVO assetInfo);
	
	// 기초자산입력 예정 여부 생성
	public void registBscAstsInptExptF(RAA02BDTO paramData);

	// ---------------tab4 start------------------
	
	// 관계사정보 취득
	public List<RAA04BVO> getCncCmpnyInfo(RAA04BVO cncCmpnyInfo);
	
	// 관계사정보 생성
	public int registCncCmpnyInfo(RAA04BVO cncCmpnyInfo);
	
	// 관계사정보 삭제
	public int deleteCncCmpnyInfo(RAA04BVO cncCmpnyInfo);
	
	// 기초자산입력 예정 여부 생성
	public void registCncCmpnyInptExptF(RAA02BDTO cncCmpnyInfo);
	
	// ---------------tab5 start------------------
	// 내부등급정보 취득
	public List<RAA05BVO> getInsGrdInfo(RAA05BVO insGrdInfo);

	// 내부등급정보 생성 
	public int registInsGrdInfo(RAA05BVO insGrdInfo);
	
	// 내부등급정보 제거
	public int deleteInsGrdInfo(RAA05BVO insGrdInfo);
	
	// 내부등급 예정 여부 생성
	public void registInsGrdInptExptF(RAA02BDTO paramData);

	// ---------------tab6 start------------------
	
	// 담보정보 취득
	public List<RAA06BVO> getMrtgInfo(RAA06BVO mrtgInfo);
	
	// 담보정보 생성
	public int registMrtgInfo(RAA06BVO mrtgInfo);

	// 담보정보 삭제
	public int deleteMrtgInfo(RAA06BVO mrtgInfo);

	// ---------------tab7 start------------------
	
	// 보증기관정보 취득
	public List<RAA07BVO> getEnsrInfo(RAA07BVO ensrInfo);

	// 보증기관정보 저장
	public int registEnsrInfo(RAA07BVO ensrInfo);

	// 보증기관정보 삭제
	public int deleteEnsrInfo(RAA07BVO ensrInfo);

	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	public List<RAA08BVO> getCmplInfo(RAA08BVO cmplInfo);

	// 책임준공기관정보 저장
	public int registCmplInfo(RAA08BVO cmplInfo);

	// 책임준공기관정보 삭제
	public int deleteCmplInfo(RAA08BVO cmplInfo);

	

}
