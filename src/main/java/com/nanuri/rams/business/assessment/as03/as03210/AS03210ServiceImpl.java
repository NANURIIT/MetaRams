package com.nanuri.rams.business.assessment.as03.as03210;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03210SVO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03210ServiceImpl implements AS03210Service {

	private final RAA01BMapper raa01bMapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA03BMapper raa03bMapper;
	private final RAA18BMapper raa18bMapper;
	private final RAA04BMapper raa04bMapper;
	private final RAA05BMapper raa05bMapper;
	private final RAA06BMapper raa06bMapper;
	private final RAA07BMapper raa07bMapper;
	private final RAA08BMapper raa08bMapper;
	private final IBIMS101BMapper ibims101BMapper;

	@Autowired
	private AuthenticationFacade facade;

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@Override
	public List<RAA01BVO> getDealInfo(DealInfo dealInfo) throws ParseException {

		String date = dealInfo.getDscDate();
		date = DateUtil.changeDateFormat(date, "yyyyMMdd");
		dealInfo.setDscDate(date);

		List<RAA01BVO> dealList = raa01bMapper.getDealInfo(dealInfo);

		return dealList;
	};

	@Override
	public List<IBIMS101BVO> getBscDealInfo(IBIMS101BDTO dealInfo) throws ParseException {

		List<IBIMS101BVO> dealList = ibims101BMapper.getBscDealInfo(dealInfo);

		return dealList;
	};

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@Override
	public List<AS03210SVO> getDealList(DealInfo dealInfo) {
		return raa02bMapper.getDealList(dealInfo);
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@Override
	public RAA02BDTO getDealDetailInfo(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		RAA02BDTO dealDeatail = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		dealDeatail.setWrtDt(DateUtil.changeDateFormat(dealDeatail.getWrtDt(), "yyyy-MM-dd"));
		dealDeatail.setMtrtDt(DateUtil.changeDateFormat(dealDeatail.getMtrtDt(), "yyyy-MM-dd"));

		return dealDeatail;
	}

	// deal 심사요청
	@Override
	public Map<String, Object> assesmentRequest(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		// 심사요청 보류시 심사위원 정보가 이미 있으므로 심사부안건접수(200)으로 진행한다.
		String uptaInspctPrgrsStCd = raa02bDTO.getUptaInspctPrgrsStCd();
		if (uptaInspctPrgrsStCd.equals("220")) {
			raa02bDTO.setInspctPrgrsStCd("200");									// 심사진행상태코드
		} else {
			raa02bDTO.setInspctPrgrsStCd("110");									// 심사진행상태코드
		}
		
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno()); 						// 처리자번

		raa02bMapper.updateDealInfo(raa02bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);

		return dealInfoMap;
	}

	// deal 심사요청취소
	@Override
	public Map<String, Object> assesmentRequestCancel(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		raa02bDTO.setInspctPrgrsStCd("120");										// 심사진행상태코드
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번

		raa02bMapper.updateDealInfo(raa02bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);

		return dealInfoMap;
	}

	// deal 심사요청보류
	@Override
	public Map<String, Object> assesmentRequestHold(String ibDealNo, String riskInspctCcd, String lstCCaseCcd) {
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		raa02bDTO.setInspctPrgrsStCd("100");										// 심사진행상태코드
		raa02bDTO.setUptaInspctPrgrsStCd("220");									// 변경후심사진행상태코드
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번

		raa02bMapper.updateDealInfo(raa02bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);

		return dealInfoMap;
	}

	// ---------------tab1 start------------------

	// 신규 deal 생성
	@Override
	public Map<String, Object> registDealInfo(RAA02BDTO paramData) throws ParseException {

		/*
		 * 1. DTO 의 계산 가능한 정보를 계산하여 RAA02BDTO를 setting 한다.
		 */

		Date dt = new Date();
		String yyyy = String.valueOf(dt.getYear() + 1900);
		String yyyymm = yyyy.concat(String.format("%02d", dt.getMonth() + 1));

		String wrtDt = paramData.getWrtDt();
		String mtrtDt = paramData.getMtrtDt();
		String ibDealNo = paramData.getIbDealNo();
		String raDealCcd = paramData.getRaDealCcd();
		String dprtCd = paramData.getDprtCd();
		
		String riskInspctCcd = paramData.getRiskInspctCcd();
		String lstCCaseCcd = paramData.getLstCCaseCcd();
		
		Map<String, Object> dealInfoMap = new HashMap<String, Object>();

		// 최초등록자부점코드(FST_RGST_P_DPRT_CD)
		paramData.setFstRgstPDprtCd(facade.getDetails().getDprtCd());

		// 처리부점코드
		paramData.setHndlDprtCd(facade.getDetails().getDprtCd());

		// 처리자번호
		paramData.setHndlPEno(facade.getDetails().getEno());

		// RA기준년월(RA_STD_YR_MM)
		paramData.setRaStdYrMm(yyyymm.substring(2));

		// 투자기간일수(INVST_PRD_DY_C)

		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat sf2 = new SimpleDateFormat("yyyyMMdd");

		Date df1 = sf1.parse(wrtDt);							// 기표일
		Date df2 = sf1.parse(mtrtDt);							// 만기일

		long diffSec = (df2.getTime() - df1.getTime()) / 1000;	// 초 차이
		long diffDays = diffSec / (24 * 60 * 60);				// 일자수 차이

		paramData.setInvstPrdDyC(String.valueOf(diffDays));		// 투자기간일수(INVST_PRD_DY_C)

		// WRT_DT (yyyy-mm-dd -> yyyymmdd)
		// MTRT_DT

		paramData.setWrtDt(DateUtil.changeDateFormat(wrtDt, "yyyyMMdd"));
		paramData.setMtrtDt(DateUtil.changeDateFormat(mtrtDt, "yyyyMMdd"));

		// RA_DEAL_SQ

		String raDealSq = raa02bMapper.getRaDealSq(raDealCcd, dprtCd);
		paramData.setRaDealSq(raDealSq);

		// IB_DEAL_NO
		// ibDealNo(12) = raDealCcd(1) + dprtCd(3) + yymm(4) + raDealSq(4)
		
		if(StringUtil.isAllWhitespace(ibDealNo)) {
			switch (raDealCcd) {
			case "1":
				ibDealNo = "D";
				break;
			case "2":
				ibDealNo = "E";
				break;
			default:
				ibDealNo = "W";
				break;
			}

			ibDealNo = ibDealNo + dprtCd + yyyymm.substring(2) + raDealSq;
			paramData.setIbDealNo(ibDealNo);
		}

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */
		String ibDealSq = null;
		RAA01BDTO raa01bDTO = makeRAA01BDTO(paramData, ibDealSq);

		/*
		 * 3. RAA02BDTO, RAA01BDTO를 insert 한다.
		 * copyDealInfO == null 이면 insert, != null 이면 update
		 */
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		if(raa02bDTO == null) {
			raa02bMapper.insertDealInfo(paramData);
			raa01bMapper.insertDealInfo(raa01bDTO);
			
			dealInfoMap.put("ibDealNo", ibDealNo);
			dealInfoMap.put("riskInspctCcd", paramData.getRiskInspctCcd());
			dealInfoMap.put("lstCCaseCcd", paramData.getLstCCaseCcd());
			
		}else {
			dealInfoMap = updateDealInfo(raa02bDTO);
		}

		return dealInfoMap;
	}

	private RAA01BDTO makeRAA01BDTO(RAA02BDTO paramData, String ibDealSq) {

		RAA01BDTO raa01bDTO = new RAA01BDTO();

		raa01bDTO.setIbDealNo(paramData.getIbDealNo()); 							// IBDEAL번호
		if(ibDealSq != null) {
			raa01bDTO.setIbDealSq(ibDealSq);
		}
		// DSC_DT
		// DSC_SQ
		// DSC_SQC
		raa01bDTO.setIbDealNm(paramData.getIbDealNm());								// IBDEAL명
		raa01bDTO.setIbDealPrgrsStCd(paramData.getInspctPrgrsStCd());				// IBDEAL상태코드
		// DSC_RSLT_CD
		raa01bDTO.setTlAmt(paramData.getCrncyAmt());								// 총금액
		raa01bDTO.setPtcpAmt(paramData.getPtcpAmt());								// 참여금액
		raa01bDTO.setTlErnAmt(paramData.getTlErnAmt());								// 총수익금액
		raa01bDTO.setWrtErnAmt(paramData.getWrtErnAmt());							// 기표수익금액
		raa01bDTO.setRcvblErnAmt(paramData.getRcvblErnAmt());						// 미수수익금액
		// ENTP_CD
		raa01bDTO.setEntpRnm(paramData.getCfmtEntpNm());							// 업체실명
		// CORP_RGST_NO
		// CRDT_GRD_CD
		raa01bDTO.setWrtDt(paramData.getWrtDt());									// 기표일자
		raa01bDTO.setMtrtDt(paramData.getMtrtDt());									// 만기일자
		raa01bDTO.setInvstNtnCd(paramData.getInvstNtnCd());							// 투자국가코드
		raa01bDTO.setInvstCrncyCd(paramData.getInvstCrncyCd());						// 투자통화코드
		raa01bDTO.setCrncyAmt(paramData.getCrncyAmt());								// 통화금액
		raa01bDTO.setInvstGdsLdvdCd(paramData.getInvstGdsLdvdCd());					// 투자상품대분류코드
		raa01bDTO.setInvstGdsMdvdCd(paramData.getInvstGdsMdvdCd());					// 투자상품중분류코드
		raa01bDTO.setInvstGdsSdvdCd(paramData.getInvstGdsSdvdCd());					// 투자상품소분류코드
		raa01bDTO.setInvstGdsDtlsDvdCd(paramData.getInvstGdsDtlsDvdCd());			// 투자상품상세분류코드
		// GDS_DVD_1_NM
		// GDS_DVD_2_NM
		// GDS_DVD_3_NM
		// GDS_DVD_4_NM
		raa01bDTO.setCoprtnTypCd(paramData.getCoprtnTypCd());						// 협업유형코드
		raa01bDTO.setHdqtCd(paramData.getHdqtCd());									// 본부코드
		raa01bDTO.setDprtCd(paramData.getDprtCd());									// 부점코드
		raa01bDTO.setChrgPEno(paramData.getChrgPEno());								// 담당자사번
		// WTHLD_TBL_NM
		// FNL_UPT_DY_TM
		// HNDL_DY_TM
		raa01bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());						// 처리부점코드
		raa01bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자사번

		return raa01bDTO;
	}

	// deal 정보 갱신
	@Override
	public Map<String, Object> updateDealInfo(RAA02BDTO paramData) throws ParseException {

		String ibDealNo = paramData.getIbDealNo();
		String riskInspctCcd = paramData.getRiskInspctCcd();
		String lstCCaseCcd = paramData.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		String ibDealSq = raa01bMapper.getIbDealSq(raa02bDTO);

		raa02bDTO.setRiskInspctCcd(paramData.getRiskInspctCcd()); 					// 리스크심사구분코드
		raa02bDTO.setLstCCaseCcd(paramData.getLstCCaseCcd()); 						// 부수안건
		raa02bDTO.setIbDealNm(paramData.getIbDealNm());								// 안건명
		raa02bDTO.setIbDealSnmNm(paramData.getIbDealSnmNm());						// 약어명
		raa02bDTO.setRaRsltnCcd(paramData.getRaRsltnCcd());							// 전결구분
		raa02bDTO.setRiskRcgNo(paramData.getRiskRcgNo());							// 리스크승인번호

		raa02bDTO.setInspctDprtCcd(paramData.getInspctDprtCcd());					// 심사부서구분
		raa02bDTO.setInvstGdsLdvdCd(paramData.getInvstGdsLdvdCd());					// 투자상품대분류
		raa02bDTO.setInvstGdsMdvdCd(paramData.getInvstGdsMdvdCd());					// 투자상품중분류
		raa02bDTO.setInvstGdsSdvdCd(paramData.getInvstGdsSdvdCd());					// 투자상품소분류
		raa02bDTO.setInvstGdsDtlsDvdCd(paramData.getInvstGdsDtlsDvdCd());			// 투자상품상세분류

		raa02bDTO.setInvstCrncyCd(paramData.getInvstCrncyCd());						// 부의기준통화
		raa02bDTO.setCrncyAmt(paramData.getCrncyAmt());								// 부의금액
		raa02bDTO.setInvstNtnCd(paramData.getInvstNtnCd());							// 투자국가
		raa02bDTO.setAplcExchR(paramData.getAplcExchR());							// 적용환율
		raa02bDTO.setPtcpAmt(paramData.getPtcpAmt());								// 부의금액(원)

		raa02bDTO.setIndTypDvdCd(paramData.getIndTypDvdCd());						// 고위험사업
		raa02bDTO.setCheckItemCd(paramData.getCheckItemCd());						// 업무구분
		raa02bDTO.setRaBsnsZoneCd(paramData.getRaBsnsZoneCd());						// 사업지역
		raa02bDTO.setInvstThingCcd(paramData.getInvstThingCcd());					// 주요투자물건
		raa02bDTO.setInvstThingDtlsCcd(paramData.getInvstThingDtlsCcd());			// 투자물건상세

		String wrtDt = paramData.getWrtDt();
		String mtrtDt = paramData.getMtrtDt();

		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat sf2 = new SimpleDateFormat("yyyyMMdd");

		Date df1 = sf1.parse(wrtDt);												// 기표일
		Date df2 = sf1.parse(mtrtDt);												// 만기일

		long diffSec = (df2.getTime() - df1.getTime()) / 1000;	// 초 차이
		long diffDays = diffSec / (24 * 60 * 60); 				// 일자수 차이

		raa02bDTO.setInvstPrdDyC(String.valueOf(diffDays));							// 투자기간일수(INVST_PRD_DY_C)
		raa02bDTO.setInvstPrdMmC(paramData.getInvstPrdMmC());						// 투자기간개월수(INVST_PRD_MM_C)
		raa02bDTO.setWrtDt(DateUtil.changeDateFormat(wrtDt, "yyyyMMdd"));			// WRT_DT (yyyy-mm-dd -> yyyymmdd)
		raa02bDTO.setMtrtDt(DateUtil.changeDateFormat(mtrtDt, "yyyyMMdd"));			// MTRT_DT

		raa02bDTO.setTlErnAmt(paramData.getTlErnAmt());								// 전체수익
		raa02bDTO.setRcvblErnAmt(paramData.getRcvblErnAmt());						// 수수료수익
		raa02bDTO.setWrtErnAmt(paramData.getWrtErnAmt());							// 투자수익

		raa02bDTO.setMrtgOfrF(paramData.getMrtgOfrF());								// 담보
		raa02bDTO.setEnsrF(paramData.getEnsrF());									// 보증
		raa02bDTO.setRspsbCmplCcd(paramData.getRspsbCmplCcd());						// 책임준공

		raa02bDTO.setBsnsDprtCmmtRmrk1(paramData.getBsnsDprtCmmtRmrk1());			// 사업부의견
		raa02bDTO.setInspctDprtCmmtRmrk2(paramData.getInspctDprtCmmtRmrk2());		// 심사부의견

		raa02bDTO.setCoprtnTypCd(paramData.getCoprtnTypCd());						// 협업유형
		raa02bDTO.setCfmtEntpNm(paramData.getCfmtEntpNm());							// 업체명

		raa02bDTO.setHdqtCd(paramData.getHdqtCd());									// 담당본부코드
		raa02bDTO.setDprtCd(paramData.getDprtCd());									// 담당부서코드
		raa02bDTO.setChrgPEno(paramData.getChrgPEno());								// 담당직원번호

		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번호

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */

		RAA01BDTO raa01bDTO = makeRAA01BDTO(raa02bDTO, ibDealSq);

		/*
		 * 3. RAA02BDTO, RAA01BDTO를 update 한다.
		 */

		raa02bMapper.updateDealInfo(raa02bDTO);
		raa01bMapper.updateDealInfo(raa01bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", paramData.getIbDealNo());
		dealInfoMap.put("riskInspctCcd", paramData.getRiskInspctCcd());
		dealInfoMap.put("lstCCaseCcd", paramData.getLstCCaseCcd());

		return dealInfoMap;
	}

	// ---------------tab2 start------------------

	// 관련문서
	@Override
	public List<DocInfo> getDocInfo(DocInfo docInfo) {
		return raa18bMapper.getDocInfo(docInfo);
	};

	// 관련문서정보 제거
	@Override
	public int deleteDocInfo(DocInfo docInfo) {
		return raa18bMapper.deleteDocInfo(docInfo);
	};
	
	// 관련문서정보 생성
	@Override
	public int registDocInfo(DocInfo docInfo) {
		
		String ibDealNo = docInfo.getIbDealNo();
		String itemSq = docInfo.getItemSq();
		String riskInspctCcd = docInfo.getRiskInspctCcd();
		String lstCCaseCcd = docInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		
		RAA18BDTO raa18bDTO = new RAA18BDTO();
		
		raa18bDTO.setIbDealNo(ibDealNo);									// IBDEAL번호
		raa18bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());			// 리스크심사구분코드
		raa18bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());				// 부수안건구분코드
		raa18bDTO.setRaDocCcd("");
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa18bDTO.setItemSq(Integer.valueOf(itemSq));					// 항목일련번호
		}
		raa18bDTO.setRaDocNo(docInfo.getRaDocNo());							// RA문서번호
		raa18bDTO.setRaFnlDocF(docInfo.getRaFnlDocF());						// RA최종문서여부
		raa18bDTO.setRaRmrk(docInfo.getRaRmrk());							// RA비고(URLLINK)
		raa18bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());			// 처리부점코드
		raa18bDTO.setHndlPEno(facade.getDetails().getEno());				// 처리자사번

		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa18bMapper.updateDocInfo(raa18bDTO);					// 문서정보 갱신
		} else {
			return raa18bMapper.registDocInfo(raa18bDTO);					// 문서정보 생성
		}
	}

	// ---------------tab3 start------------------

	// 기초자산정보 취득
	@Override
	public List<RAA03BVO> getAssetInfo(RAA03BVO assetInfo) {
		return raa03bMapper.getAssetInfo(assetInfo);
	}

	// 기초자산정보 생성
	@Override
	public int registAssetInfo(RAA03BVO assetInfo) {

		String ibDealNo = assetInfo.getIbDealNo();
		String itemSq = assetInfo.getItemSq();
		String riskInspctCcd = assetInfo.getRiskInspctCcd();
		String lstCCaseCcd = assetInfo.getLstCCaseCcd();
		//String str_opnPrcValAmt = assetInfo.getOpnPrcValAmt();
		//int int_opnPrcValAmt = 0;
		/*
		 * if (!StringUtil.isAllWhitespace(str_opnPrcValAmt)) { int_opnPrcValAmt =
		 * Integer.valueOf(str_opnPrcValAmt); }
		 */
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA03BDTO raa03bDTO = new RAA03BDTO();
		
		
		raa03bDTO.setIbDealNo(ibDealNo);									// IBDEAL번호
		raa03bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());			// 리스크심사구분코드
		raa03bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());				// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa03bDTO.setItemSq(Integer.valueOf(itemSq));					// 항목일련번호
		}
		raa03bDTO.setBscAstsKndCd(assetInfo.getBscAstsKndCd());				// 기초자산종류코드
		raa03bDTO.setBscAstsCntnt(assetInfo.getBscAstsCntnt());				// 기초자산내용
		raa03bDTO.setOpnPrcValAmt(assetInfo.getOpnPrcValAmt());				// 시가평가금액
		raa03bDTO.setBscAstsIsngCorpNo(assetInfo.getBscAstsIsngCorpNo());	// 기초자산발행법인번호
		raa03bDTO.setInvstCrncyCd(assetInfo.getInvstCrncyCd());				// 투자통화코드
		// CRNCY_AMT
		raa03bDTO.setCrncyAmt(assetInfo.getCrncyAmt());						// 통화금액
		raa03bDTO.setAplcExchR(assetInfo.getAplcExchR());					// 적용환율
		raa03bDTO.setRnmcno(assetInfo.getRnmcno());							// 실명확인번호
		// HNDL_DY_TM
		raa03bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());			// 처리부점코드
		raa03bDTO.setHndlPEno(facade.getDetails().getEno());				// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa03bMapper.updateAssetInfo(raa03bDTO);					// 기초자산정보 갱신
		} else {
			return raa03bMapper.registAssetInfo(raa03bDTO);					// 기초자산정보 생성
		}
	}

	// 기초자산정보 제거
	@Override
	public int deleteAssetInfo(RAA03BVO assetInfo) {
		return raa03bMapper.deleteAssetInfo(assetInfo);						// 기초자산정보 제거
	}
	
	// 기초자산입력 예정 여부 생성
	@Override
	public void registBscAstsInptExptF(RAA02BDTO paramData) {
		
		String ibDealNo 	    = paramData.getIbDealNo();
		String riskInscptCcd    = paramData.getRiskInspctCcd();
		String lstCCaseCcd      = paramData.getLstCCaseCcd();
		
		String bscAstsInptExptF = paramData.getBscAstsInptExptF();
		
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInscptCcd, lstCCaseCcd);
		
		raa02bDTO.setBscAstsInptExptF(bscAstsInptExptF);
		
		raa02bMapper.updateDealInfo(raa02bDTO);

	}

	// ---------------tab4 start------------------

	// 관계사정보 취득
	@Override
	public List<RAA04BVO> getCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		return raa04bMapper.getRelatedCompanyInfo(cncCmpnyInfo);
	}

	// 관계사정보 생성
	@Override
	public int registCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		String ibDealNo = cncCmpnyInfo.getIbDealNo();
		String itemSq = cncCmpnyInfo.getItemSq();
		String riskInspctCcd = cncCmpnyInfo.getRiskInspctCcd();
		String lstCCaseCcd = cncCmpnyInfo.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA04BDTO raa04bDTO = new RAA04BDTO();

		raa04bDTO.setIbDealNo(ibDealNo);											// IBDEAL번호
		raa04bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());					// 리스크심사구분코드
		raa04bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());						// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa04bDTO.setItemSq(Integer.valueOf(itemSq));							// 항목일련번호
		}
		raa04bDTO.setCncCmpnyClsfCd(cncCmpnyInfo.getCncCmpnyClsfCd());				// 연결회사구분코드
		raa04bDTO.setIsngOgnCorpNo(cncCmpnyInfo.getIsngOgnCorpNo()); 				// 발행기관구분코드
		raa04bDTO.setRnmcno(cncCmpnyInfo.getRnmcno());								// 실명확인번호
		raa04bDTO.setMxStkhdNm(cncCmpnyInfo.getMxStkhdNm());						// 최대주주명
		// HNDL_DY_TM
		raa04bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa04bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa04bMapper.updateCncCmpnyInfo(raa04bDTO);					    // 관계사정보 갱신
		} else {
			return raa04bMapper.registCncCmpnyInfo(raa04bDTO);						// 관계사 생성
		}
	}

	// 관계사정보 삭제
	@Override
	public int deleteCncCmpnyInfo(RAA04BVO cncCmpnyInfo) {
		return raa04bMapper.deleteCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@Override
	public void registCncCmpnyInptExptF(RAA02BDTO cncCmpnyInfo) {
		
		String ibDealNo  	 	 = cncCmpnyInfo.getIbDealNo();
		String riskInscptCcd 	 = cncCmpnyInfo.getRiskInspctCcd();
		String lstCCaseCcd	 	 = cncCmpnyInfo.getLstCCaseCcd();
		
		String cncCmpnyInptExptF = cncCmpnyInfo.getCncCmpnyInptExptF();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInscptCcd, lstCCaseCcd);
		
		raa02bDTO.setCncCmpnyInptExptF(cncCmpnyInptExptF);
		
		raa02bMapper.updateDealInfo(raa02bDTO);
		
	}

	// ---------------tab5 start------------------

	// 내부등급정보 취득
	@Override
	public List<RAA05BVO> getInsGrdInfo(RAA05BVO insGrdInfo) {
		return raa05bMapper.getInsGrdInfo(insGrdInfo);
	}

	// 내부등급정보 생성
	@Override
	public int registInsGrdInfo(RAA05BVO insGrdInfo) {
		String ibDealNo = insGrdInfo.getIbDealNo();
		String itemSq = insGrdInfo.getItemSq();
		String riskInspctCcd = insGrdInfo.getRiskInspctCcd();
		String lstCCaseCcd = insGrdInfo.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA05BDTO raa05bDTO = new RAA05BDTO();

		raa05bDTO.setIbDealNo(ibDealNo);											// IBDEAL번호
		raa05bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());					// 리스크심사구분코드
		raa05bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());						// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa05bDTO.setItemSq(Integer.valueOf(itemSq));							// 항목일련번호
		}
		raa05bDTO.setInsGrdTrgtF(insGrdInfo.getInsGrdTrgtF()); 						// 내부등급대상여부
		raa05bDTO.setSpcltFncTrgtF(insGrdInfo.getSpcltFncTrgtF()); 					// 특수금융대상여부(SL)
		
		raa05bDTO.setSpcltFncMngNo(insGrdInfo.getSpcltFncMngNo());					// SL번호
		raa05bDTO.setOutsCrdtGrdCcd(insGrdInfo.getOutsCrdtGrdCcd());				// 와부신용등급구분코드(SL내부등급)
		raa05bDTO.setBrrwrCorpNo(insGrdInfo.getBrrwrCorpNo());						// 차주법인번호
		raa05bDTO.setInsCrdtGrdCcd(insGrdInfo.getInsCrdtGrdCcd());					// 내부신용등급구분코드
		// rnmcno
		raa05bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa05bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa05bMapper.updateInsGrdInfo(raa05bDTO);					    // 내부등급정보 갱신
		} else {
			return raa05bMapper.registInsGrdInfo(raa05bDTO);						// 내부등급정보 생성
		}

	}

	// 내부등급정보 삭제
	@Override
	public int deleteInsGrdInfo(RAA05BVO insGrdInfo) {
		return raa05bMapper.deleteInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급 예정 여부 생성
	@Override
	public void registInsGrdInptExptF(RAA02BDTO paramData) {
		
		String ibDealNo  	 	 = paramData.getIbDealNo();
		String riskInscptCcd 	 = paramData.getRiskInspctCcd();
		String lstCCaseCcd	 	 = paramData.getLstCCaseCcd();
		
		String insGrdInptExptF 	 = paramData.getInsGrdInptExptF();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInscptCcd, lstCCaseCcd);
		
		raa02bDTO.setInsGrdInptExptF(insGrdInptExptF);
		
		raa02bMapper.updateDealInfo(raa02bDTO);
		
	}
	

	// ---------------tab6 start------------------

	// 담보정보 취득
	@Override
	public List<RAA06BVO> getMrtgInfo(RAA06BVO mrtgInfo) {
		return raa06bMapper.getMrtgInfo(mrtgInfo);
	}

	// 담보정보 저장
	@Override
	public int registMrtgInfo(RAA06BVO mrtgInfo) {
		String ibDealNo = mrtgInfo.getIbDealNo();
		String itemSq = mrtgInfo.getItemSq();
		String riskInspctCcd = mrtgInfo.getRiskInspctCcd();
		String lstCCaseCcd = mrtgInfo.getLstCCaseCcd();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA06BDTO raa06bDTO = new RAA06BDTO();

		raa06bDTO.setIbDealNo(ibDealNo);											// IBDEAL번호
		raa06bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());					// 리스크심사구분코드
		raa06bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());						// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa06bDTO.setItemSq(Integer.valueOf(itemSq));							// 항목일련번호
		}
		raa06bDTO.setMrtgKndCcd(mrtgInfo.getMrtgKndCcd());   						// 담보종류구분코드
		raa06bDTO.setMrtgRsnCntnt(mrtgInfo.getMrtgRsnCntnt());						// 담보사유내용
		raa06bDTO.setMrtgValAmt(mrtgInfo.getMrtgValAmt());							// 담보평가금액
		raa06bDTO.setRgtRnkCcd(mrtgInfo.getRgtRnkCcd());							// 권리순위구분코드
		raa06bDTO.setMrtgDtlsCcd(mrtgInfo.getMrtgDtlsCcd());						// 담보상세구분코드
		raa06bDTO.setMrtgAcqstStmCcd(mrtgInfo.getMrtgAcqstStmCcd());				// mrtgAcqstStmCcd 담보취득방식구분코드
		raa06bDTO.setMrtgAcqstDtlsCcd(mrtgInfo.getMrtgAcqstDtlsCcd());				// mrtgAcqstDtlsCcd 담보취득상세구분코드
		raa06bDTO.setInvstCrncyCd(mrtgInfo.getInvstCrncyCd());						// invstCrncyCd 투자통화코드
		raa06bDTO.setCrncyAmt(mrtgInfo.getCrncyAmt());								// 통화금액
		raa06bDTO.setAplcExchR(mrtgInfo.getAplcExchR());							// 적용환율
		// HNDL_DY_TM 처리일시
		raa06bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa06bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa06bMapper.updateMrtgInfo(raa06bDTO);					    	// 담보정보 갱신
		} else {
			return raa06bMapper.registMrtgInfo(raa06bDTO);							// 담보정보 생성
		}
	};

	// 담보정보 삭제
	@Override
	public int deleteMrtgInfo(RAA06BVO mrtgInfo) {
		return raa06bMapper.deleteMrtgInfo(mrtgInfo);
	}

	// ---------------tab7 start------------------

	// 보증기관정보 취득
	@Override
	public List<RAA07BVO> getEnsrInfo(RAA07BVO ensrInfo) {
		return raa07bMapper.getEnsrInfo(ensrInfo);
	}

	// 보증기관정보 저장
	@Override
	public int registEnsrInfo(RAA07BVO ensrInfo) {
		
		String ibDealNo = ensrInfo.getIbDealNo();
		String itemSq = ensrInfo.getItemSq();
		String riskInspctCcd = ensrInfo.getRiskInspctCcd();
		String lstCCaseCcd = ensrInfo.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA07BDTO raa07bDTO = new RAA07BDTO();
		
		raa07bDTO.setIbDealNo(ibDealNo);											// IBDEAL번호
		raa07bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());					// 리스크심사구분코드
		raa07bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());						// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa07bDTO.setItemSq(Integer.valueOf(itemSq));							// 항목일련번호
		}
		raa07bDTO.setCrdtEhcmntGrntCcd(ensrInfo.getCrdtEhcmntGrntCcd());			// 신용보강보증구분코드
		raa07bDTO.setEnsrOgnCorpNo(ensrInfo.getEnsrOgnCorpNo());					// 보증기관법인번호
		raa07bDTO.setEnsrAmt(ensrInfo.getEnsrAmt());								// 보증금액
		raa07bDTO.setEnsrCntnt(ensrInfo.getEnsrCntnt());							// 보증내용
		// rnmcno
		raa07bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa07bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa07bMapper.updateEnsrInfo(raa07bDTO);					    	// 보증기관정보 갱신
		} else {
			return raa07bMapper.registEnsrInfo(raa07bDTO);							// 보증기관정보 생성
		} 
	}

	// 보증기관정보 삭제
	@Override
	public int deleteEnsrInfo(RAA07BVO ensrInfo) {
		return raa07bMapper.deleteEnsrInfo(ensrInfo);
	}
	
	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	@Override
	public List<RAA08BVO> getCmplInfo(RAA08BVO cmplInfo) {
		return raa08bMapper.getCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 저장
	@Override
	public int registCmplInfo(RAA08BVO cmplInfo) {
		
		String ibDealNo = cmplInfo.getIbDealNo();
		String itemSq = cmplInfo.getItemSq();
		String riskInspctCcd = cmplInfo.getRiskInspctCcd();
		String lstCCaseCcd = cmplInfo.getLstCCaseCcd();
		
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		RAA08BDTO raa08bDTO = new RAA08BDTO();
		
		raa08bDTO.setIbDealNo(ibDealNo);											// IBDEAL번호
		raa08bDTO.setRiskInspctCcd(raa02bDTO.getRiskInspctCcd());					// 리스크심사구분코드
		raa08bDTO.setLstCCaseCcd(raa02bDTO.getLstCCaseCcd());						// 부수안건구분코드
		if (!StringUtil.isAllWhitespace(itemSq)) {
			raa08bDTO.setItemSq(Integer.valueOf(itemSq));							// 항목일련번호
		}
		raa08bDTO.setRspsbCmplOgnCcd(cmplInfo.getRspsbCmplOgnCcd());				// 책임준공기관구분코드
		raa08bDTO.setScrtsCmpnyCorpNo(cmplInfo.getScrtsCmpnyCorpNo());				// 증권사법인번호
		raa08bDTO.setDbtNpfrmOblgCcd(cmplInfo.getDbtNpfrmOblgCcd());				// 채무불이행의무구분코드
		raa08bDTO.setDmgRprtnMxExtnt(cmplInfo.getDmgRprtnMxExtnt()); 				// 손해배상최대범위
		// rnmcno
		raa08bDTO.setCmplExptDt(DateUtil.changeDateFormat(cmplInfo.getCmplExptDt(), "yyyyMMdd")); // 준공예정일자 CMPL_EXPT_DT
		
		raa08bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());					// 처리부점코드
		raa08bDTO.setHndlPEno(facade.getDetails().getEno());						// 처리자번
		
		if (!StringUtil.isAllWhitespace(itemSq)) {
			return raa08bMapper.updateCmplInfo(raa08bDTO);					    	// 보증기관정보 갱신
		} else {
			return raa08bMapper.registCmplInfo(raa08bDTO);							// 보증기관정보 생성
		}
	}

	// 책임준공기관정보 삭제
	@Override
	public int deleteCmplInfo(RAA08BVO cmplInfo) {
		return raa08bMapper.deleteCmplInfo(cmplInfo);
	}


}
