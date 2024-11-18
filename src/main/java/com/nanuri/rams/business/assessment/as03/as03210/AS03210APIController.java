package com.nanuri.rams.business.assessment.as03.as03210;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.*;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03210SVO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS03210APIController {

	private final AS03210Service as03210Service;
	private final CommonService commonService;

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@GetMapping(value = "/getDealInfo")
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException {
		return as03210Service.getDealInfo(dealDto);
	}

	@GetMapping(value = "/getBscDealInfo")
	public List<IBIMS101BVO> getBscDealInfo(IBIMS101BDTO dealDto) throws ParseException {
		return as03210Service.getBscDealInfo(dealDto);
	}


	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@GetMapping(value = "/getDealList")
	public List<AS03210SVO> getDealList(DealInfo dealDto) throws ParseException {
		return as03210Service.getDealList(dealDto);
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@GetMapping(value = "/getDealDetailInfo")
	public RAA02BDTO getDealDetailInfo(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {
		return as03210Service.getDealDetailInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
	}

	// deal 심사요청
	@Transactional
	@PostMapping(value = "/assesmentRequest")
	public int assesmentRequest(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		Map<String, Object> dealInfoMap = as03210Service.assesmentRequest(ibDealNo, riskInspctCcd, lstCCaseCcd);

		return commonService.registHistoy(dealInfoMap);
	}
	
	// deal 심사요청취소
	@Transactional
	@PostMapping(value = "/assesmentRequestCancel")
	public int assesmentRequestCancel(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		Map<String, Object> dealInfoMap = as03210Service.assesmentRequestCancel(ibDealNo, riskInspctCcd, lstCCaseCcd);

		return commonService.registHistoy(dealInfoMap);
	}
	
	// deal 심사요청보류
	@Transactional
	@PostMapping(value = "/assesmentRequestHold")
	public int assesmentRequestHold(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		Map<String, Object> dealInfoMap = as03210Service.assesmentRequestHold(ibDealNo, riskInspctCcd, lstCCaseCcd);

		return commonService.registHistoy(dealInfoMap);
	}

	// ---------------tab1 start------------------

	// 신규 deal 생성
	@Transactional
	@PostMapping(value = "/registDealInfo")
	public int registDealInfo(RAA02BDTO paramData) throws ParseException {

		Map<String, Object> dealInfoMap = as03210Service.registDealInfo(paramData);

		return commonService.registHistoy(dealInfoMap);
	}

	// deal 정보 갱신
	@Transactional
	@PostMapping(value = "/updateDealInfo")
	public int updateDealInfo(RAA02BDTO paramData) throws ParseException {

		Map<String, Object> dealInfoMap = as03210Service.updateDealInfo(paramData);

		return commonService.registHistoy(dealInfoMap);
	}
	

	// ---------------tab2 start------------------

	// 관련문서
	@GetMapping(value = "/getDocInfo")
	public List<DocInfo> getDocInfo(DocInfo docInfo) {
		return as03210Service.getDocInfo(docInfo);
	}

	// 관련문서정보 제거
	@PostMapping(value = "/deleteDocInfo")
	public int deleteDocInfo(DocInfo docInfo) {
		return as03210Service.deleteDocInfo(docInfo);
	}

	// 관련문서정보 생성
	@PostMapping(value = "/registDocInfo")
	public int registDocInfo(DocInfo docInfo) {
		return as03210Service.registDocInfo(docInfo);
	}
	
	// ---------------tab3 start------------------
	
	// 기초자산정보 취득
	@GetMapping(value = "/getAssetInfo")
	public List<RAA03BVO> getAssetInfo(RAA03BVO assetInfo) {
		return as03210Service.getAssetInfo(assetInfo);
	}
	
	// 기초자산정보 생성
	@PostMapping(value = "/registAssetInfo")
	public int registAssetInfo(RAA03BVO assetInfo) {
		return as03210Service.registAssetInfo(assetInfo);
	}

	// 기초자산정보 제거
	@PostMapping(value = "/deleteAssetInfo")
	public int deleteAssetInfo(RAA03BVO assetInfo) {
		return as03210Service.deleteAssetInfo(assetInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@PostMapping(value = "/registBscAstsInptExptF")
	public void registBscAstsInptExptF(RAA02BDTO paramData) {
		as03210Service.registBscAstsInptExptF(paramData);
	}
	// ---------------tab4 start------------------
	
	// 관계사정보 취득
	@GetMapping(value = "/getCncCmpnyInfo")
	public List<RAA04BVO> getCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		return as03210Service.getCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 관계사정보 생성
	@PostMapping(value = "/registCncCmpnyInfo")
	public int registCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		return as03210Service.registCncCmpnyInfo(cncCmpnyInfo);
	}

	// 관계사정보 제거
	@PostMapping(value = "/deleteCncCmpnyInfo")
	public int deleteCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		return as03210Service.deleteCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@PostMapping(value = "/registCncCmpnyInptExptF")
	public void registCncCmpnyInptExptF(RAA02BDTO paramData) {
		as03210Service.registCncCmpnyInptExptF(paramData);
	}
	
	// ---------------tab5 start------------------
	
	// 내부등급정보 취득
	@GetMapping(value = "/getInsGrdInfo")
	public List<RAA05BVO> getInsGrdInfo(RAA05BVO insGrdInfo) {
		return as03210Service.getInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급정보 생성
	@PostMapping(value = "/registInsGrdInfo")
	public int registInsGrdInfo(RAA05BVO insGrdInfo) {
		return as03210Service.registInsGrdInfo(insGrdInfo);
	}
	
	// 관계사정보 제거
	@PostMapping(value = "/deleteInsGrdInfo")
	public int deleteInsGrdInfo(RAA05BVO insGrdInfo) {
		return as03210Service.deleteInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급 예정 여부 생성
	@PostMapping(value = "/registInsGrdInptExptF")
	public void registInsGrdInptExptF(RAA02BDTO paramData) {
		as03210Service.registInsGrdInptExptF(paramData);
	}

	// ---------------tab6 start------------------
	
	// 담보정보 취득 
	@GetMapping(value = "/getMrtgInfo")
	public List<RAA06BVO> getMrtgInfo(RAA06BVO mrtgInfo) {
		return as03210Service.getMrtgInfo(mrtgInfo);
	}
	
	// 담보정보 저장
	@PostMapping(value = "/registMrtgInfo")
	public int registMrtgInfo(RAA06BVO mrtgInfo) {
		return as03210Service.registMrtgInfo(mrtgInfo);
	}

	// 담보정보 삭제
	@PostMapping(value = "/deleteMrtgInfo")
	public int deleteMrtgInfo(RAA06BVO mrtgInfo) {
		return as03210Service.deleteMrtgInfo(mrtgInfo);
	}

	// ---------------tab7 start------------------

	// 보증기관정보 취득
	@GetMapping(value = "/getEnsrInfo")
	public List<RAA07BVO> getEnsrInfo(RAA07BVO ensrInfo) {
		return as03210Service.getEnsrInfo(ensrInfo);
	}

	// 보증기관정보 저장
	@PostMapping(value = "/registEnsrInfo")
	public int registEnsrInfo(RAA07BVO ensrInfo) {
		return as03210Service.registEnsrInfo(ensrInfo);
	}

	// 보증기관정보 삭제
	@PostMapping(value = "/deleteEnsrInfo")
	public int deleteEnsrInfo(RAA07BVO ensrInfo) {
		return as03210Service.deleteEnsrInfo(ensrInfo);
	}
	
	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	@GetMapping(value = "/getCmplInfo")
	public List<RAA08BVO> getCmplInfo(RAA08BVO cmplInfo) {
		return as03210Service.getCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 저장
	@PostMapping(value = "/registCmplInfo")
	public int registCmplInfo(RAA08BVO cmplInfo) {
		return as03210Service.registCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 삭제
	@PostMapping(value = "/deleteCmplInfo")
	public int deleteCmplInfo(RAA08BVO cmplInfo) {
		return as03210Service.deleteCmplInfo(cmplInfo);
	}

}
