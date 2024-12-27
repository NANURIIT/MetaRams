package com.nanuri.rams.business.assessment.tb08.tb08050;

import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.dto.EtprCrdtGrntAcctProcDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB08050ServiceImpl implements TB08050Service {

 	@Autowired
 	private EtprCrdtGrntAcctProc acctProc;
	/* 딜수수료스케줄기본 */
	private final IBIMS348BMapper ibims348BMapper;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410BMapper;
	/* 딜수수료수납내역 */
	private final IBIMS420BMapper ibims420BMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	// 수수료내역 조회
	@Override
	public List<IBIMS420BVO> selectFeeRcivLst(IBIMS420BVO param) {
		return ibims420BMapper.selectFeeRcivLst(param);
	}

	// 수수료수납정보 저장
	@Override
	public int saveExcInfo(IBIMS420BVO paramData) {

		int rtnValue = 0;
		String eno = facade.getDetails().getEno(); // 사원번호

		// 딜수수료수납내역 거래일련번호 채번
		long lTrsn = ibims420BMapper.getMaxTrSn(paramData.getPrdtCd());
		paramData.setTrSn(lTrsn);
		paramData.setHndEmpno(eno);

		IBIMS348BVO in348bvo = new IBIMS348BVO();
		in348bvo.setPrdtCd(paramData.getPrdtCd());
		in348bvo.setFeeSn(paramData.getFeeSn());
		in348bvo.setFeeRcivDt(paramData.getFeeRcivDt());
		in348bvo.setFeeRcivAmt(paramData.getFeeRcivAmt());
		in348bvo.setTrSn(paramData.getTrSn());
		in348bvo.setPrcsCpltYn(paramData.getPrcsCpltYn());
		in348bvo.setFnnrRcogStrtDt(paramData.getFnnrRcogStrtDt()); // 인식시작일자
		in348bvo.setFnnrRcogEndDt(paramData.getFnnrRcogEndDt());   // 인식종료일자
		in348bvo.setHndEmpno(paramData.getHndEmpno());
		log.debug("PRUF_ISU_DT :::: ", paramData.getPrufIsuDt());
		log.debug("FndsDvsnCd 자금구분코드 :::: {}", paramData.getFndsDvsnCd()); // 자금구분코드
		log.debug("EPRZ_CRDL_FEE_RCOG_DCD 기업여신수수료인식구분코드 :::: {}", paramData.getEprzCrdlFeeRcogDcd()); // 기업여신수수료인식구분코드
		log.debug("EPRZ_CRDL_TXTN_TP_DCD 기업여신과세유형구분코드 :::: {}", paramData.getEprzCrdlTxtnTpDcd()); // 기업여신과세유형구분코드
		rtnValue = ibims348BMapper.updateFeeScxInfo(in348bvo);	// 딜승인수수료스케쥴기본
		rtnValue = ibims420BMapper.insertIBIMS420B(paramData);	// 딜수수료수납내역

		IBIMS410BDTO ibims410bdto = set410b(paramData);
		rtnValue = ibims410BMapper.saveDlTrList(ibims410bdto);	// 딜거래내역

		EtprCrdtGrntAcctProcDTO inDTO1 = new EtprCrdtGrntAcctProcDTO();
		inDTO1.setPrdtCd(paramData.getPrdtCd());
		inDTO1.setExcSn(paramData.getExcSn());
		inDTO1.setTrCrcyCd(paramData.getCrryCd());	  	/* 거래통화코드 */
		inDTO1.setTrFeeAmt(paramData.getFeeRcivAmt());  /* 수수료수납금액 */
		inDTO1.setWcrcTrslRt(paramData.getAplyExrt()); /* 원화환산율 */
		inDTO1.setActgAfrsCd("G3");						/* 회계업무코드 */
		inDTO1.setRkfrDt(paramData.getFeeRcivDt()); 	/* 수납일자 */
		inDTO1.setCanYn("N");
		inDTO1.setEtprCrdtGrntTrKindCd(inDTO1.getActgAfrsCd());
		EtprCrdtGrntAcctProcDTO outDTO1 = acctProc.acctPrcs(inDTO1);

		return rtnValue;

	}


	private IBIMS410BDTO set410b(IBIMS420BVO  param420){

		IBIMS410BDTO setParam = new IBIMS410BDTO();

		setParam.setPrdtCd(param420.getPrdtCd()); /* 상품코드 */
		setParam.setTrSn(param420.getTrSn()); 	  /* 거래일련번호 */
		setParam.setExcSn(param420.getExcSn());   /* 실행일련번호 */
		setParam.setTrDt(LocalDate.now().toString().replace("-", "")); /* 거래일자 */
		setParam.setTrStatCd("1"); /* 거래상태코드 1정상 */
		setParam.setEtprCrdtGrntTrKindCd("21"); /* 거래종류코드 21수수료수납 */
//		setParam.setDealTrAmt(param402.getDealExcAmt()); /* 딜거래금액 == 실행금액? */
//		setParam.setDealTrPrca(param402.getAcbkAmt()); /* 딜거래원금 == 최종지급금액? */
//		setParam.setTrIntAmt(param402.getPrcsIntrAmt()); /* 거래이자금액 */
//		setParam.setDealRdptObjtPrca(getParam.getDealRdptObjtPrca()); /* 딜상환대상원금 */
//		setParam.setDealMrdpPrca(getParam.getDealMrdpPrca()); /* 딜중도상환원금 */
//		setParam.setNrmlIntAmt(getParam.getNrmlIntAmt()); /* 정상이자금액 */
//		setParam.setCrdtGrntOvduIntAmt(getParam.getCrdtGrntOvduIntAmt()); /* 신용공여연체이자금액 */
//		setParam.setCrdtGrntRcvbIntAmt(getParam.getCrdtGrntRcvbIntAmt()); /* 신용공여미수이자금액 */
//		setParam.setPucrIntAmt(getParam.getPucrIntAmt()); /* 환출이자금액 */
		setParam.setTrFeeAmt(param420.getFeeRcivAmt()); /* 거래수수료금액 */
//		setParam.setCostAmt(getParam.getCostAmt()); /* 비용금액 */
		setParam.setTrCrryCd(param420.getCrryCd()); /* 거래통화코드 */
		setParam.setKrwTrslRt(param420.getAplyExrt()); /* 원화환산율 == 적용환율 */
//		setParam.setWcrcTrslTrPrca(param402.getKrwTrslExcAmt()); /* 원화환산거래원금 == 최종지급금액 */
//		setParam.setWcrcTrslTrIntAmt(param402.getKrwTrslIntAmt()); /* 원화환산거래이자금액 == 원화환산이자금액*/
//		setParam.setKrwTrslTrFeeAmt(param420.getFeeRcivAmt().multiply(param420.getAplyExrt()).setScale(2, RoundingMode.HALF_UP)); /* 원화환산거래수수료금액 == 수수료수납금액 */
		setParam.setKrwTrslTrFeeAmt(param420.getKrwTrslTrFeeAmt().setScale(2, RoundingMode.HALF_UP)); /* 원화환산거래수수료금액 == 수수료수납금액 */
		
//		setParam.setWcrcTrslCostAmt(getParam.getWcrcTrslCostAmt()); /* 원화환산비용금액 */
//		setParam.setActgAfrsCd(getParam.getActgAfrsCd()); /* 회계업무코드 */
//		setParam.setActgUnitAfrsCd(getParam.getActgUnitAfrsCd()); /* 회계단위업무코드 */
//		setParam.setActgTrCd(getParam.getActgTrCd()); /* 회계거래코드 */
//		setParam.setActgErlmSeq(getParam.getActgErlmSeq()); /* 회계등록순번 */
//		setParam.setRkfrDt(getParam.getRkfrDt()); /* 기산일자 */
		setParam.setFndsDvsnCd(param420.getFndsDvsnCd()); /* 자금구분코드 */
//		setParam.setRctmIsttCd(param420.getRctmIsttCd()); /* 입금기관코드 */
//		setParam.setRctmBano(param402.getBrkgAcno()); /* 입금은행계좌번호 */
//		setParam.setDpowName(param402.getAchdNm()); /* 예금주명 */
//		setParam.setHdwrPrcsYn(getParam.getHdwrPrcsYn()); /* 수기처리여부 */
//		setParam.setAcptPtclSmtlAmt(param420.getFeeRcivAmt()); /* 수납내역합계금액 */
//		setParam.setDealAltnAmt(getParam.getDealAltnAmt()); /* 딜대체금액 */
//		setParam.setDealCashAmt(getParam.getDealCashAmt()); /* 딜현금금액 */
//		setParam.setDealBkchAmt(getParam.getDealBkchAmt()); /* 딜자기앞수표금액 */
//		setParam.setDealCkblAmt(getParam.getDealCkblAmt()); /* 딜타점권금액 */
//		setParam.setBillPoutYn(getParam.getBillPoutYn()); /* 계산서출력여부 */
//		setParam.setTrbkPoutYn(getParam.getTrbkPoutYn()); /* 거래장출력여부 */
//		setParam.setRclmDvsnCd(getParam.getRclmDvsnCd()); /* 회수구분코드 */
//		setParam.setPucrIntAltnAmt(getParam.getPucrIntAltnAmt()); /* 환출이자대체금액 */
//		setParam.setPucrIntRctmAmt(getParam.getPucrIntRctmAmt()); /* 환출이자입금금액 */
//		setParam.setClcnFeeAmt(getParam.getClcnFeeAmt()); /* 추심수수료금액 */
//		setParam.setImptStmpAmt(getParam.getImptStmpAmt()); /* 수입인지금액 */
		setParam.setFeeTotAmt(param420.getFeeRcivAmt()); /* 수수료총금액 */
//		setParam.setRvseCnclDvsnCd(getParam.getRvseCnclDvsnCd()); /* 정정취소구분코드 */
//		setParam.setRvseCnclRsonText(getParam.getRvseCnclRsonText()); /* 정정취소사유내용 */
//		setParam.setRvseCnclTrSeq(getParam.getRvseCnclTrSeq()); /* 정정취소거래순번 */
//		setParam.setTrAfLoanRmnd(getParam.getTrAfLoanRmnd()); /* 거래이후대출잔액 */
//		setParam.setRdptTmod(getParam.getRdptTmod()); /* 상환회차 */
//		setParam.setDealPxdfPrca(getParam.getDealPxdfPrca()); /* 딜대지급원금 */
//		setParam.setPxdfIntAmt(getParam.getPxdfIntAmt()); /* 대지급이자금액 */
//		setParam.setPxdfEtcAmt(getParam.getPxdfEtcAmt()); /* 대지급기타금액 */
//		setParam.setOrgno(getParam.getOrgno()); /* 조직번호 */
		setParam.setTrStfno(param420.getPrcsEmpno()); /* 거래직원번호 == 처리사원번호 */
//		setParam.setDcfcStfno(getParam.getDcfcStfno()); /* 결재자직원번호 */
//		setParam.setClmSeq(getParam.getClmSeq()); /* 청구순번 */
//		setParam.setActgSynsCd(getParam.getActgSynsCd()); /* 회계적요코드 */
//		setParam.setSynsText(getParam.getSynsText()); /* 적요내용 */
//		setParam.setTaxBillEvdcErlmDt(getParam.getTaxBillEvdcErlmDt()); /* 세금계산서증빙등록일자 */
//		setParam.setTaxBillEvdcErlmSeq(getParam.getTaxBillEvdcErlmSeq()); /* 세금계산서증빙등록순번 */
//		setParam.setTaxBillPrcsSeq(getParam.getTaxBillPrcsSeq()); /* 세금계산서처리순번 */
//		setParam.setBillEvdcErlmDt(getParam.getBillEvdcErlmDt()); /* 계산서증빙등록일자 */
//		setParam.setBillEvdcErlmSeq(getParam.getBillEvdcErlmSeq()); /* 계산서증빙등록순번 */
//		setParam.setBillPrcsSeq(getParam.getBillPrcsSeq()); /* 계산서처리순번 */
//		setParam.setVat(getParam.getVat()); /* 부가세 */
//		setParam.setIssuBillEvdcErlmDt(getParam.getIssuBillEvdcErlmDt()); /* 발행계산서증빙등록일자 */
//		setParam.setIssuBillPrcsSeq(getParam.getIssuBillPrcsSeq()); /* 발행계산서처리순번 */
//		setParam.setDfrmFeePrcaEclsYn(getParam.getDfrmFeePrcaEclsYn()); /* 지급수수료원금제외여부 */
//		setParam.setDfrmFeeClmObjtAmt(getParam.getDfrmFeeClmObjtAmt()); /* 지급수수료청구대상금액 */
//		setParam.setMrdpFeeAmt(getParam.getMrdpFeeAmt()); /* 중도상환수수료금액 */
//		setParam.setChckIssuIsttName(getParam.getChckIssuIsttName()); /* 수표발행기관명 */
//		setParam.setMrdpYn(getParam.getMrdpYn()); /* 중도상환여부 */
		setParam.setRctmDt(param420.getRctmDt()); /* 입금일자 */
//		setParam.setTrObjtBsnNo(getParam.getTrObjtBsnNo()); /* 거래대상기업체번호 */
//		setParam.setNoprErngEtcAmt(getParam.getNoprErngEtcAmt()); /* 영업외수익기타금액 */
//		setParam.setNoprCostEtcAmt(getParam.getNoprCostEtcAmt()); /* 영업외비용기타금액 */
//		setParam.setRcvbRstrYn(); /* 미수환원여부 */
//		setParam.setRcvbYn(); /* 미수여부 */
		setParam.setHndEmpno(facade.getDetails().getEno());	/* 조작사원번호 */
		setParam.setHndTmnlNo(""); /* 조작단말기번호 */
		setParam.setHndTrId(""); /* 조작거래ID */
		setParam.setGuid(""); /* GUID */

		return setParam;
	}
}
