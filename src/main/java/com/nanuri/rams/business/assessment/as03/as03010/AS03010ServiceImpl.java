package com.nanuri.rams.business.assessment.as03.as03010;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA21BDTO;
import com.nanuri.rams.business.common.dto.RAA22BDTO;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA21BMapper;
import com.nanuri.rams.business.common.mapper.RAA22BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealDetails;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03010SVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03010ServiceImpl implements AS03010Service{
	
	private final RAA01BMapper raa01bMapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA21BMapper raa21bMapper;
	private final RAA22BMapper raa22bMapper;
	private final RAA91BMapper raa91bMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	//	심사안건조회
	@Override
	public List<checkDealDetails> checkDealSearch(checkDealInfo dealInfo){
		
		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);
		
		dealInfo.setStart(DateUtil.changeDateFormat(dealInfo.getStart(), "yyyyMMdd"));
		dealInfo.setEnd(DateUtil.changeDateFormat(dealInfo.getEnd(), "yyyyMMdd"));
		
		List<checkDealDetails> result = raa01bMapper.checkDealSearch(dealInfo);
		List<checkDealDetails> finalResult = new ArrayList<checkDealDetails>();

		for (int i = 0; result.size() > i; i++) {
			checkDealDetails dealDetail = result.get(i);
			
			dealDetail.setWrtDt(DateUtil.changeDateFormat(dealDetail.getWrtDt(), "yyyy-MM-dd"));													// 기표일
			dealDetail.setMtrtDt(DateUtil.changeDateFormat(dealDetail.getMtrtDt(), "yyyy-MM-dd"));													// 만기일
			
			dealDetail.setInspctPrgrsStCdNm(codeToCodeName(dealDetail.getInspctPrgrsStCd(), selectBoxList, GroupCd.INSPCT_PRGRS_ST_CD.getCode()));	// 심사진행상태코드명
			dealDetail.setCrdtGrdCd(codeToCodeName(dealDetail.getCrdtGrdCd(), selectBoxList, GroupCd.CRDT_GRD_CD.getCode()));						// 신용등급
			dealDetail.setInvstNtnCd(codeToCodeName(dealDetail.getInvstNtnCd(), selectBoxList, GroupCd.CNTY_CD.getCode()));							// 투자국가
			dealDetail.setInvstCrncyCd(codeToCodeName(dealDetail.getInvstCrncyCd(), selectBoxList, GroupCd.INVST_CRNCY_CD.getCode()));				// 투자통화
			dealDetail.setRiskInspctCcdNm(codeToCodeName(dealDetail.getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));			// 신규/재부의정보	
			dealDetail.setLstccaseCcdNm(codeToCodeName(dealDetail.getLstccaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));				// 부수안건정보
			
			dealDetail.setFstRgstDt(DateUtil.changeDateFormat(dealDetail.getFstRgstDt(), "yyyy-MM-dd"));
			
			finalResult.add(dealDetail);
		}
		
		return finalResult;
	}
	
	private String codeToCodeName(String code, List<Map<String, Object>> selectBoxList, String groupCd) {

		List<Map<String, Object>> groupCdList = new ArrayList<Map<String, Object>>();
		String codeName = null;

		if (selectBoxList.size() > 0) {
			for (int i = 0; selectBoxList.size() > i; i++) {
				Map<String, Object> codeInfo = selectBoxList.get(i);
				if (groupCd.equals(codeInfo.get("CMNS_CD_GRP"))) {
					groupCdList.add(codeInfo);
				}
			}
		}

		if (groupCdList.size() > 0) {
			for (int i = 0; groupCdList.size() > i; i++) {
				Map<String, Object> codeInfo = groupCdList.get(i);
				String cdVlId = codeInfo.get("CD_VL_ID").toString();
				String cdVlNm = codeInfo.get("CD_VL_NM").toString();

				if (code.equals(cdVlId)) {
					codeName = cdVlNm;
					break;
				}
			}
		}

		return codeName;
	}

	// 심사안건 반송
	@Override
	public Map<String, Object> returnDeal(AS03010SVO param) {
		
		String ibDealNo = param.getIbDealNo();
		String riskInspctCcd = param.getRiskInspctCcd();
		String lstCCaseCcd = param.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		raa02bDTO.setInspctPrgrsStCd(param.getInspctProgrsStCd());					// 심사진행상태코드
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		raa02bMapper.updateDealInfo(raa02bDTO);
		
		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);
		
		return dealInfoMap;
	}

	// 심사안건 접수
	@Override
	public Map<String, Object> receiptDeal(AS03010SVO param) {
		
		/**
		 * 1. RAA02B			update
		 * 2. RAA22B(협의체안건상세) insert
		 * 3. RAA21B(협의체회차정보) insert
		 **/
		
		// 1. RAA02B update
		String ibDealNo = param.getIbDealNo();
		String riskInspctCcd = param.getRiskInspctCcd();
		String lstCCaseCcd = param.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		raa02bDTO.setOwnPEno(param.getOwnPEno());												// 소유자사번
		raa02bDTO.setFstRgstDt(DateUtil.changeDateFormat(param.getFstRgstDt(), "yyyyMMdd"));	// 접수배정일(최초등록일자)
		raa02bDTO.setInspctPrgrsStCd(param.getInspctProgrsStCd());								// 심사진행상태코드
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());								// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno());									// 처리자번
		raa02bDTO.setRiskInspctRsltnCcd(param.getInspctCnfrncCcd());							// 리스크심사결의구분코드
		
		raa02bMapper.updateDealInfo(raa02bDTO);
		
		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);
		
		// 2. RAA22B insert
		RAA22BDTO cnfrnc = raa22bMapper.selectCnfrncInfo(param.getInspctCnfrncCcd());
		LocalDate now = LocalDate.now();
		int year = now.getYear();

		if(cnfrnc == null) {
			RAA22BDTO raa22bDTO = new RAA22BDTO();
			raa22bDTO.setInspctCnfrncCcd(param.getInspctCnfrncCcd()); 								// 전결협의체(RA결의구분코드)
			raa22bDTO.setStdYr(Integer.toString(year));
			raa22bDTO.setInspctCnfrncSqcSq(0);
			raa22bDTO.setRnkNo(0);
			raa22bDTO.setRsltnDt("");
			raa22bDTO.setRcgAmt(0);
			raa22bDTO.setIbDealNo(ibDealNo);														// IBDEAL번호
			raa22bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());								// 리스크심사구분코드
			raa22bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());									// 부수안건구분코드
			raa22bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());								// 처리부점코드
			raa22bDTO.setHndlPEno(facade.getDetails().getEno());									// 처리자번
			
			raa22bMapper.insertRAA22BInfo(raa22bDTO);
		}
		
		// 3. RAA21B insert
		RAA21BDTO checkCnfrnc = raa21bMapper.selectCnfrncInfo(param.getInspctCnfrncCcd());
		
		if(checkCnfrnc == null) {
			RAA21BDTO raa21bDTO = new RAA21BDTO();
			raa21bDTO.setInspctCnfrncCcd(param.getInspctCnfrncCcd());
			raa21bDTO.setStdYr(Integer.toString(year));
			raa21bDTO.setInspctCnfrncSqcSq(0);
			raa21bDTO.setRsltnDt("");
			raa21bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());							// 처리부점코드
			raa21bDTO.setHndlPEno(facade.getDetails().getEno());								// 처리자번
			
			raa21bMapper.insertCnfrncInfo(raa21bDTO);
		}
		
		return dealInfoMap;
	}

}
