package com.nanuri.rams.business.assessment.as05.as05010;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA18BDTO;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA11BMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA31BMapper;
import com.nanuri.rams.business.common.vo.AS05010SVO;
import com.nanuri.rams.business.common.vo.RAA11BVO;
import com.nanuri.rams.business.common.vo.RAA31BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AS05010ServiceImpl implements AS05010Service {

	// private final AS05010Mapper as05010Mapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA11BMapper raa11bMapper;
	private final RAA18BMapper raa18bMapper;
	private final RAA31BMapper raa31bMapper;

	@Autowired
	private AuthenticationFacade facade;

	// 안건관리 - 진행정보관리 조회
	@Override
	public List<AS05010SVO> getDealList(AS05010SVO dealList) {

		List<AS05010SVO> getDealList = raa02bMapper.getDealListAS05010(dealList);

		return getDealList;
	}

	// --------------------TAB1 약정/기표/철회--------------------//
	// 약정/기표/철회 저장
	@Override
	public int registCaseInfo(AS05010SVO caseInfo) {

		String ibDealNo = caseInfo.getIbDealNo();
		String caseRaDocCcd = caseInfo.getCaseRaDocCcd();
		String riskInspctCcd = caseInfo.getRiskInspctCcd();
		String lstCCaseCcd = caseInfo.getLstCCaseCcd();

		// String raDocCcd = caseInfo.getRaDocCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA18BDTO raa18bDTO = new RAA18BDTO();

		raa02bDTO.setIbDealNo(ibDealNo);						 							 // IBDEAL번호
	 	
	 	caseInfo.setAgrDt(DateUtil.changeDateFormat(caseInfo.getAgrDt(), "yyyyMMdd"));  	 // 약정일자
	 	caseInfo.setWrtDt(DateUtil.changeDateFormat(caseInfo.getWrtDt(), "yyyyMMdd"));	 	 // 기표일자
	 	caseInfo.setMtrtDt(DateUtil.changeDateFormat(caseInfo.getMtrtDt(), "yyyyMMdd"));	 // 만기일자
	 	
	 	caseInfo.setHndlDprtCd(facade.getDetails().getDprtCd());		 				     // 처리부점코드
	 	caseInfo.setHndlPEno(facade.getDetails().getEno());								 	 // 처리자사번

	 	String itemSq = Integer.toString(caseInfo.getItemSq());							   	 // 항목일련번호

		raa18bDTO.setIbDealNo(ibDealNo);
		raa18bDTO.setLstCCaseCcd(caseInfo.getLstCCaseCcd());
		raa18bDTO.setRiskInspctCcd(caseInfo.getRiskInspctCcd());

	 	raa18bDTO.setRaDocNo(caseInfo.getCaseRaDocNo());									 // RA문서번호
	 	raa18bDTO.setRaDocCcd(caseRaDocCcd);												 // RA문서구분코드
	 	if (!StringUtil.isAllWhitespace(itemSq)) {
			raa18bDTO.setItemSq(Integer.valueOf(itemSq));									 // 항목일련번호
		}
	 	
	 	raa18bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());		 				     // 처리부점코드
	 	raa18bDTO.setHndlPEno(facade.getDetails().getEno());								 // 처리자사번

		int rdcCheck = raa18bMapper.raDocCcdCheck(raa18bDTO);

		if (rdcCheck == 0) {

			raa18bMapper.registCaseDocInfo(raa18bDTO);

			return raa02bMapper.updateCaseInfo(caseInfo);

		} else {

			raa18bMapper.updateCaseDocInfo(raa18bDTO);

			return raa02bMapper.updateCaseInfo(caseInfo);
		}
	}

	// 약정/기표/철회 삭제
	@Override
	public int deleteCaseInfo(AS05010SVO caseInfo) {

		raa18bMapper.deleteCaseDocInfo(caseInfo);

		return raa02bMapper.deleteCaseInfo(caseInfo);
	}

	// 약정 업데이트
	@Override
	public int updateInspctPrgrsStCd(AS05010SVO caseInfo) {
		String ibDealNo = caseInfo.getIbDealNo();
		String riskInspctCcd = caseInfo.getRiskInspctCcd();
		String lstCCaseCcd = caseInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		raa02bDTO.setInspctPrgrsStCd(caseInfo.getInspctPrgrsStCd());			// 심사진행상태코드

		caseInfo.setHndlDprtCd(facade.getDetails().getDprtCd());		 		// 처리부점코드
	 	caseInfo.setHndlPEno(facade.getDetails().getEno());						// 처리자사번

		return raa18bMapper.updateInspctPrgrsStCd(caseInfo);

	}

	// --------------------TAB2 EXIT--------------------//
	// EXIT 저장
	@Override
	public int registExitInfo(AS05010SVO exitInfo) {
		String ibDealNo = exitInfo.getIbDealNo();
		String exitRaDocCcd = exitInfo.getExitRaDocCcd();
		// int itemSq = exitInfo.getItemSq();
		String riskInspctCcd = exitInfo.getRiskInspctCcd();
		String lstCCaseCcd = exitInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA18BDTO raa18bDTO = new RAA18BDTO();

		raa02bDTO.setIbDealNo(ibDealNo);								 				// IBDEAL번호
		
		exitInfo.setHndlDprtCd(facade.getDetails().getDprtCd());		 				// 처리부점코드
		exitInfo.setHndlPEno(facade.getDetails().getEno());			 	 				// 처리자사번
	 	exitInfo.setEndDt(DateUtil.changeDateFormat(exitInfo.getEndDt(), "yyyyMMdd"));	// 종료일자
	 	
	 	raa18bDTO.setIbDealNo(ibDealNo);								 				// IBDEAL번호
	 	raa18bDTO.setLstCCaseCcd(exitInfo.getLstCCaseCcd());							// 부수안건구분코드
	 	raa18bDTO.setRiskInspctCcd(exitInfo.getRiskInspctCcd());		 				// 리스크심사구분코드
	 	
	 	raa18bDTO.setItemSq(Integer.valueOf(exitInfo.getItemSq()));		 				// 문서일련번호 == 항목일련번호
	 	raa18bDTO.setRaDocCcd(exitRaDocCcd);				 			 				// RA문서구분코드 '2'==EXIT
	 	raa18bDTO.setRaDocNo(exitInfo.getExitRaDocNo());				 				// RA문서번호
	 		
	 	exitInfo.setHndlDprtCd(facade.getDetails().getDprtCd());		 				// 처리부점코드
	 	exitInfo.setHndlPEno(facade.getDetails().getEno());			 					// 처리자사번

		int rdcCheck = raa18bMapper.raDocCcdCheck(raa18bDTO);

		if (rdcCheck == 0) {
			raa18bMapper.registExitDocInfo(raa18bDTO);

			return raa02bMapper.updateExitInfo(exitInfo);
		} else {

			raa18bMapper.updateExitDocInfo(raa18bDTO);

			return raa02bMapper.updateExitInfo(exitInfo);
		}

	}

	// EXIT 삭제
	@Override
	public int deleteExitInfo(AS05010SVO exitInfo) {
		raa18bMapper.deleteExitDocInfo(exitInfo);

		return raa02bMapper.deleteExitInfo(exitInfo);
	}

	// --------------------TAB3 셀다운의무--------------------//
	// 셀다운의무 조회
	@Override
	public List<RAA31BVO> getOpList(RAA31BVO opList) {
		return raa31bMapper.getOpList(opList);
	}

	// 셀다운의무 저장
	@Override
	public int registOpInfo(RAA31BVO opInfo) {
		String ibDealNo = opInfo.getIbDealNo();
		int itemSq = opInfo.getItemSq();
		String riskInspctCcd = opInfo.getRiskInspctCcd();
		String lstCCaseCcd = opInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA31BVO raa31bVO = new RAA31BVO();

		raa02bDTO.setIbDealNo(ibDealNo);

		raa31bVO.setIbDealNo(ibDealNo);								// IBDEAL번호
		raa31bVO.setLstCCaseCcd(opInfo.getLstCCaseCcd());		 	// 부수안건구분코드
		raa31bVO.setRiskInspctCcd(opInfo.getRiskInspctCcd());	 	// 리스크심사구분코드
	 	
		opInfo.setRpyDt(DateUtil.changeDateFormat(opInfo.getRpyDt(), "yyyyMMdd"));				// 해소일자
		opInfo.setAplcEndDtDt(DateUtil.changeDateFormat(opInfo.getAplcEndDtDt(), "yyyyMMdd"));	// 적용기한일자 	
		raa31bVO.setItemSq(Integer.valueOf(itemSq));									 		// 항목일련번호

		raa31bVO.setOblgPfrmCcd("1");				  	 			// 의무이행구분코드 == '1' 셀다운
		raa31bVO.setRpyAmt(opInfo.getRpyAmt());						// 해소금액
		raa31bVO.setOblgAmt(opInfo.getOblgAmt());   				// 의무금액
		
		opInfo.setHndlDprtCd(facade.getDetails().getDprtCd());		// 처리부점코드
		opInfo.setHndlPEno(facade.getDetails().getEno());		    // 처리자사번

		if (Integer.toString(itemSq).equals("0")) {
			return raa31bMapper.registOpInfo(opInfo);
		} else {
			return raa31bMapper.updateOpInfo(opInfo);
		}
	}

	// 셀다운의무 삭제
	@Override
	public int deleteOpInfo(RAA31BVO opInfo) {
		return raa31bMapper.deleteOpInfo(opInfo);
	}

	// --------------------TAB4 기타의무--------------------//
	// 기타의무 조회
	@Override
	public List<RAA31BVO> getEtcList(RAA31BVO etcList) {
		return raa31bMapper.getEtcList(etcList);
	}

	// 기타의무 저장
	@Override
	public int registEtcInfo(RAA31BVO etcInfo) {
		String ibDealNo = etcInfo.getIbDealNo();
		int itemSq = etcInfo.getItemSq();
		String riskInspctCcd = etcInfo.getRiskInspctCcd();
		String lstCCaseCcd = etcInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA31BVO raa31bVO = new RAA31BVO();

		raa02bDTO.setIbDealNo(ibDealNo);

		raa31bVO.setIbDealNo(ibDealNo);								 // IBDEAL번호
		raa31bVO.setLstCCaseCcd(etcInfo.getLstCCaseCcd());		 	 // 부수안건구분코드
		raa31bVO.setRiskInspctCcd(etcInfo.getRiskInspctCcd());	 	 // 리스크심사구분코드
	 	
		etcInfo.setRpyDt(DateUtil.changeDateFormat(etcInfo.getRpyDt(), "yyyyMMdd"));				// 해소일자
		etcInfo.setAplcEndDtDt(DateUtil.changeDateFormat(etcInfo.getAplcEndDtDt(), "yyyyMMdd"));	// 적용기한일자 	
		raa31bVO.setItemSq(Integer.valueOf(itemSq));									 			// 항목일련번호

		raa31bVO.setOblgPfrmCcd("2");				  	 			 // 의무이행구분코드 == '2' 기타
		//etcInfo.setRpyF(etcInfo.getRpyF());
		
		etcInfo.setHndlDprtCd(facade.getDetails().getDprtCd());	 	 // 처리부점코드
		etcInfo.setHndlPEno(facade.getDetails().getEno());		     // 처리자사번

		if (Integer.toString(itemSq).equals("0")) {
			return raa31bMapper.registEtcInfo(etcInfo);
		} else {
			return raa31bMapper.updateEtcInfo(etcInfo);
		}
	}

	// 기타의무 삭제
	@Override
	public int deleteEtcInfo(RAA31BVO etcInfo) {
		return raa31bMapper.deleteEtcInfo(etcInfo);
	}

	// --------------------TAB5 관리직원--------------------//
	// 관리직원 유무
	@Override
	public int checkEno(RAA11BVO enoInfo) {
		return raa11bMapper.checkEno(enoInfo);
	}

	// 관리직원 조회
	@Override
	public List<RAA11BVO> getEnoList(RAA11BVO enoList) {
		return raa11bMapper.getEnoList(enoList);
	}

	// 관리직원 저장
	@Override
	public int registEnoInfo(RAA11BVO enoInfo) {

		RAA11BVO raa11bVO = new RAA11BVO();

		raa11bVO.setIbDealNo(enoInfo.getIbDealNo());				 // IBDEAL번호
		raa11bVO.setLstCCaseCcd(enoInfo.getLstCCaseCcd());		 	 // 부수안건구분코드
		raa11bVO.setRiskInspctCcd(enoInfo.getRiskInspctCcd());	 	 // 리스크심사구분코드
	 	
		enoInfo.setUptDt(DateUtil.changeDateFormat(enoInfo.getUptDt(), "yyyyMMdd"));	// 변경일
		raa11bVO.setItemSq(enoInfo.getItemSq());					// 항목일련번호

		enoInfo.setHndlDprtCd(facade.getDetails().getDprtCd());	 	 // 처리부점코드
		enoInfo.setHndlPEno(facade.getDetails().getEno());		     // 처리자사번

		/*
		 * int checkEno = raa11bMapper.checkEno(enoInfo);
		 * 
		 * if(checkEno == 0) { return raa11bMapper.registEnoInfo(enoInfo); } else {
		 * return raa11bMapper.updateEnoInfo(enoInfo); }
		 */
		String itemSq = Integer.toString(enoInfo.getItemSq());

		if (itemSq.equals("0")) {
			return raa11bMapper.registEnoInfo(enoInfo);
		} else {
			return raa11bMapper.updateEnoInfo(enoInfo);
		}

	}

	// 관리직원 삭제
	@Override
	public int deleteEnoInfo(RAA11BVO enoInfo) {
		return raa11bMapper.deleteEnoInfo(enoInfo);
	}

}
