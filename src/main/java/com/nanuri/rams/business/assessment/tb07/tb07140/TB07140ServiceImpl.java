package com.nanuri.rams.business.assessment.tb07.tb07140;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.assessment.tb07.tb07020.TB07020ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402HDTO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.dto.IBIMS407BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS203BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS346BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS405BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS406BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS407BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS407BVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07140ServiceImpl implements TB07140Service {
	
	/* 딜승인금리 */
	private final IBIMS407BMapper ibims407bMapper;

	/* 투자상품기본(거래순번 채번용) */
	private final IBIMS405BMapper ibims405bMapper;

	/* 실행기본 */
	private final IBIMS402BMapper ibims402bMapper;

	/* 실행이력 */
	private final IBIMS402HMapper ibims402hMapper;

	/* 거래내역 */
	private final IBIMS410BMapper ibims410bMapper;

	private final TB07020ServiceImpl tb07020ServiceImpl;

	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	/**
	 * 출자금 리스트 출력
	 */
	@Override
	public List<IBIMS407BVO> getFincList(IBIMS407BDTO paramData) {
		return ibims407bMapper.getFincList(paramData);
	};

	@Override
	public int insertFinc(IBIMS407BDTO paramData) {
		// paramData.setHndEmpno(facade.getDetails().getEno());
		// return ibims407bMapper.insertFinc(paramData);

		// log.debug("종목코드 IBIMS407BDTO.prdtCd:::" + paramData.getPrdtCd());
		// log.debug("거래일자 IBIMS407BDTO.trDt:::" + paramData.getTrDt());
		// log.debug("거래종류코드 IBIMS407BDTO.etprCrdtGrntTrKindCd:::" + paramData.getEtprCrdtGrntTrKindCd());
		// log.debug("고유자산펀드코드 IBIMS407BDTO.nsFndCd:::" + paramData.getNsFndCd());
		// log.debug("보유목적구분코드 IBIMS407BDTO.holdPrpsDcd:::" + paramData.getHoldPrpsDcd());
		// log.debug("출자처리구분코드 IBIMS407BDTO.fincPrcsDcd:::" + paramData.getFincPrcsDcd());
		// log.debug("출자변동금액 IBIMS407BDTO.fincCngeAmt:::" + paramData.getFincCngeAmt());
		// log.debug("보수수익금액 IBIMS407BDTO.payErnAmt:::" + paramData.getPayErnAmt());
		// log.debug("결제금액 IBIMS407BDTO.stlAmt:::" + paramData.getStlAmt());
		// log.debug("매매환율 IBIMS407BDTO.trdeExrt:::" + paramData.getTrdeExrt());
		// log.debug("환산출자변동금액 IBIMS407BDTO.trslFincCngeAmt:::" + paramData.getTrslFincCngeAmt());
		// log.debug("환산보수수익금액 IBIMS407BDTO.trslPayErnAmt:::" + paramData.getTrslPayErnAmt());
		// log.debug("환산결제금액 IBIMS407BDTO.trslStlAmt:::" + paramData.getTrslStlAmt());
		// log.debug("거래세 IBIMS407BDTO.trtx:::" + paramData.getTrtx());
		// log.debug("소득세 IBIMS407BDTO.intx:::" + paramData.getIntx());
		// log.debug("지방세 IBIMS407BDTO.lotx:::" + paramData.getLotx());
		// log.debug("전금지준구분코드 IBIMS407BDTO.bfRsvPayDcd:::" + paramData.getBfRsvPayDcd());
		// log.debug("결제외부기관코드 IBIMS407BDTO.stlXtnlIsttCd:::" + paramData.getStlXtnlIsttCd());
		// log.debug("결제계좌번호 IBIMS407BDTO.stlAcno:::" + paramData.getStlAcno());
		// log.debug("출자보수내용 IBIMS407BDTO.fincPayCntn:::" + paramData.getFincPayCntn());
		// log.debug("재출자가능여부 IBIMS407BDTO.reFincPossYn:::" + paramData.getReFincPossYn());

		int ibims410Rslt = 0;
		int ibims407Rslt = 0;
		int ibims402BRslt = 0;
		int ibims402HRslt = 0;

		int rslt=0;

		/* 거래순번 채번 */
		IBIMS405BDTO trSnDTO = new IBIMS405BDTO();

		trSnDTO.setPrdtCd(paramData.getPrdtCd());			//종목코드

		int trSn = ibims405bMapper.getTrSn(trSnDTO);
		paramData.setTrSn(trSn);

		String inputDcd = "1";					//입력구분 1: 등록 / 2: 취소

		paramData.setExcSn(1);
		paramData.setHndEmpno(facade.getDetails().getEno());

		IBIMS410BDTO ibims410bdto = make410BDTOParam(paramData, inputDcd);			//IBIMS410BDTO 파라미터 set
		IBIMS402BDTO ibims402bdto = make402BDTOParam(paramData, inputDcd);			//IBIMS402BDTO 파라미터 set

		//log.debug("trSn:::" + trSn);
		ibims407Rslt = ibims407bMapper.insertFinc(paramData);
		ibims410Rslt = ibims410bMapper.saveDlTrList(ibims410bdto);

		String prdtCd = paramData.getPrdtCd();

		String chkRslt = ibims402bMapper.chkExcInfo(prdtCd);

		if(chkRslt == null || chkRslt.equals("")){
			ibims402BRslt = ibims402bMapper.saveExcInfoNoKey(ibims402bdto);
		}else{
			ibims402BRslt = ibims402bMapper.saveExcInfo(ibims402bdto);
		}

		ibims402BRslt = ibims402bMapper.saveExcInfo(ibims402bdto);

		//IBIMS402HDTO ibims402hdto = make402HDTOParam(ibims402bdto);

		ibims402HRslt = tb07020ServiceImpl.insertIBIMS402HTr(ibims402bdto);

		if(ibims407Rslt < 1){
			log.debug("!!!!!!!!407INSERT ERROR!!!!!!!!");
		}else if(ibims410Rslt < 1){
			log.debug("!!!!!!!!410INSERT ERROR!!!!!!!!");
		}else if(ibims402BRslt < 1){
			log.debug("!!!!!!!!402BINSERT ERROR!!!!!!!!");
		}else if(ibims402HRslt < 1){
			log.debug("!!!!!!!!402HINSERT ERROR!!!!!!!!");
		}else{
			log.debug("^o^");
			rslt = 1;
		}

		return rslt;
	};

	@Override
	public int updateFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.updateFinc(paramData);
	};

	@Override
	public int deleteFinc(IBIMS407BDTO paramData) {

		log.debug("종목코드 IBIMS407BDTO.prdtCd:::" + paramData.getPrdtCd());
		log.debug("거래순번 IBIMS407BDTO.trSn:::" + paramData.getTrSn());
		log.debug("거래일자 IBIMS407BDTO.trDt:::" + paramData.getTrDt());
		log.debug("거래종류코드 IBIMS407BDTO.etprCrdtGrntTrKindCd:::" + paramData.getEtprCrdtGrntTrKindCd());
		log.debug("고유자산펀드코드 IBIMS407BDTO.nsFndCd:::" + paramData.getNsFndCd());
		log.debug("보유목적구분코드 IBIMS407BDTO.holdPrpsDcd:::" + paramData.getHoldPrpsDcd());
		log.debug("출자처리구분코드 IBIMS407BDTO.fincPrcsDcd:::" + paramData.getFincPrcsDcd());
		log.debug("출자변동금액 IBIMS407BDTO.fincCngeAmt:::" + paramData.getFincCngeAmt());
		log.debug("보수수익금액 IBIMS407BDTO.payErnAmt:::" + paramData.getPayErnAmt());
		log.debug("결제금액 IBIMS407BDTO.stlAmt:::" + paramData.getStlAmt());
		log.debug("매매환율 IBIMS407BDTO.trdeExrt:::" + paramData.getTrdeExrt());
		log.debug("환산출자변동금액 IBIMS407BDTO.trslFincCngeAmt:::" + paramData.getTrslFincCngeAmt());
		log.debug("환산보수수익금액 IBIMS407BDTO.trslPayErnAmt:::" + paramData.getTrslPayErnAmt());
		log.debug("환산결제금액 IBIMS407BDTO.trslStlAmt:::" + paramData.getTrslStlAmt());
		log.debug("거래세 IBIMS407BDTO.trtx:::" + paramData.getTrtx());
		log.debug("소득세 IBIMS407BDTO.intx:::" + paramData.getIntx());
		log.debug("지방세 IBIMS407BDTO.lotx:::" + paramData.getLotx());
		log.debug("전금지준구분코드 IBIMS407BDTO.bfRsvPayDcd:::" + paramData.getBfRsvPayDcd());
		log.debug("결제외부기관코드 IBIMS407BDTO.stlXtnlIsttCd:::" + paramData.getStlXtnlIsttCd());
		log.debug("결제계좌번호 IBIMS407BDTO.stlAcno:::" + paramData.getStlAcno());
		log.debug("출자보수내용 IBIMS407BDTO.fincPayCntn:::" + paramData.getFincPayCntn());
		log.debug("재출자가능여부 IBIMS407BDTO.reFincPossYn:::" + paramData.getReFincPossYn());

		int ibims410Rslt = 0;
		int ibims407Rslt = 0;
		int ibims402BRslt = 0;
		int ibims402HRslt = 0;

		int rslt=0;

		String inputDcd = "2";					//입력구분 1: 등록 / 2: 취소

		paramData.setExcSn(1);
		paramData.setHndEmpno(facade.getDetails().getEno());

		IBIMS410BDTO ibims410bdto = make410BDTOParam(paramData, inputDcd);			//IBIMS410BDTO 파라미터 set
		IBIMS402BDTO ibims402bdto = make402BDTOParam(paramData, inputDcd);			//IBIMS402BDTO 파라미터 set

		ibims407Rslt = ibims407bMapper.deleteFinc(paramData);
		ibims410Rslt = ibims410bMapper.saveDlTrList(ibims410bdto);

		String prdtCd = paramData.getPrdtCd();

		String chkRslt = ibims402bMapper.chkExcInfo(prdtCd);

		if(chkRslt == null || chkRslt.equals("")){
			ibims402BRslt = ibims402bMapper.saveExcInfoNoKey(ibims402bdto);
		}else{
			ibims402BRslt = ibims402bMapper.saveExcInfo(ibims402bdto);
		}

		ibims402BRslt = ibims402bMapper.saveExcInfo(ibims402bdto);

		//IBIMS402HDTO ibims402hdto = make402HDTOParam(ibims402bdto);

		ibims402HRslt = tb07020ServiceImpl.insertIBIMS402HTr(ibims402bdto);

		if(ibims407Rslt < 1){
			log.debug("!!!!!!!!407INSERT ERROR!!!!!!!!");
		}else if(ibims410Rslt < 1){
			log.debug("!!!!!!!!410INSERT ERROR!!!!!!!!");
		}else if(ibims402BRslt < 1){
			log.debug("!!!!!!!!402BINSERT ERROR!!!!!!!!");
		}else if(ibims402HRslt < 1){
			log.debug("!!!!!!!!402HINSERT ERROR!!!!!!!!");
		}else{
			log.debug("^o^");
			rslt = 1;
		}

		return rslt;
	};

	/* IBIMS402BDTO 파라미터 set */
	public IBIMS402BDTO make402BDTOParam(IBIMS407BDTO paramData, String inputDcd){
		IBIMS402BDTO returnDto = new IBIMS402BDTO();

		BigDecimal dealExcAmt = BigDecimal.ZERO;			//딜실행금액 
		BigDecimal krwTrslExcAmt = BigDecimal.ZERO;			//딜실행잔액

		if(paramData.getFincPrcsDcd().equals("01")){				//딜거래금액 == 출자변동금액

			dealExcAmt = paramData.getFincCngeAmt();
			krwTrslExcAmt = paramData.getFincCngeAmt();


		}else if(paramData.getFincPrcsDcd().equals("02") || paramData.getFincPrcsDcd().equals("06")){			//딜거래금액 == 결제금액

			dealExcAmt = paramData.getStlAmt();
			krwTrslExcAmt = paramData.getStlAmt();

		}else if(paramData.getFincPrcsDcd().equals("03") || paramData.getFincPrcsDcd().equals("04") 
				|| paramData.getFincPrcsDcd().equals("05") || paramData.getFincPrcsDcd().equals("07")){			//딜거래금액 == 보수/수익
			
			dealExcAmt = paramData.getPayErnAmt();
			krwTrslExcAmt = paramData.getPayErnAmt();

		}


		returnDto.setPrdtCd(paramData.getPrdtCd());					//종목코드
		returnDto.setExcSn(1);								//실행일련번호
		returnDto.setLdgSttsCd(inputDcd);							//원장상태코드
		returnDto.setCrryCd("KRW");							//거래통화코드
		returnDto.setExcDt(paramData.getTrDt());					//실행일자
		returnDto.setExpDt("");								//만기일자
		returnDto.setDealExcAmt(dealExcAmt);						//딜실행금액
		returnDto.setDealExcBlce(dealExcAmt);						//딜실행잔액
		returnDto.setKrwTrslRt(paramData.getTrdeExrt());			//원화환산율
		returnDto.setKrwTrslExcAmt(krwTrslExcAmt);					//원화환산실행금액
		returnDto.setKrwTrslExcBlce(krwTrslExcAmt);					//원화환산실행잔액
		// returnDto.setPrnaDfrPrdMnum(0);				//
		returnDto.setBrkgAcno(paramData.getStlAcno());				//위탁계좌번호
		returnDto.setRctmIsttCd(paramData.getStlXtnlIsttCd());		//결제외부기관코드
		returnDto.setDealNo("0");
		returnDto.setHndEmpno(paramData.getHndEmpno());

		return returnDto;
	}

	/* IBIMS402HDTO 파라미터 set */
	public IBIMS402HDTO make402HDTOParam(IBIMS402BDTO ibims402bdto){
		IBIMS402HDTO returnDTO = new IBIMS402HDTO();

		returnDTO.setPrdtCd(ibims402bdto.getPrdtCd());							//종목코드
		returnDTO.setExcSn(ibims402bdto.getExcSn());							//실행일련번호
		returnDTO.setLdgSttsCd(ibims402bdto.getLdgSttsCd());					//원장상태코드
		returnDTO.setCrryCd(ibims402bdto.getCrryCd());							//거래통화코드
		returnDTO.setExcDt(ibims402bdto.getExcDt());							//실행일자
		returnDTO.setExpDt("");											//만기일자
		returnDTO.setDealExcAmt(ibims402bdto.getDealExcAmt());					//딜실행금액
		returnDTO.setDealExcBlce(ibims402bdto.getDealExcBlce());				//딜실행잔액
		returnDTO.setKrwTrslRt(ibims402bdto.getKrwTrslRt());					//원화환산율
		returnDTO.setKrwTrslExcAmt(ibims402bdto.getKrwTrslExcAmt());			//원화환산실행금액
		returnDTO.setKrwTrslExcBlce(ibims402bdto.getKrwTrslExcBlce());			//원화환산실행잔액
		returnDTO.setBrkgAcno(ibims402bdto.getBrkgAcno());						//위탁계좌번호
		returnDTO.setRctmIsttCd(ibims402bdto.getRctmIsttCd());					//결제외부기관코드
		returnDTO.setDealNo("0");
		returnDTO.setHndEmpno(ibims402bdto.getHndEmpno());

		return returnDTO;
	}
	
	/* IBIMS410BDTO 파라미터 set */
	public IBIMS410BDTO make410BDTOParam(IBIMS407BDTO paramData, String inputDcd){
		IBIMS410BDTO returnDto = new IBIMS410BDTO();

		returnDto.setPrdtCd(paramData.getPrdtCd());			//종목코드
		returnDto.setTrSn(paramData.getTrSn());				//거래순번
		
		returnDto.setTrDt(paramData.getTrDt());				//거래일자

		if(inputDcd.equals("1")){
			returnDto.setTrStatCd("01");				//거래상태코드 (01:정상,11:취소원거래,12:취소거래)
			returnDto.setExcSn(1);						//실행일련번호
		}else if(inputDcd.equals("2")){
			returnDto.setTrStatCd("12");
			returnDto.setExcSn(2);						//실행일련번호
		}

		returnDto.setEtprCrdtGrntTrKindCd(paramData.getEtprCrdtGrntTrKindCd());		//거래종류코드 (출자금납입 84, 출자금회수 85)

		BigDecimal dealTrAmt = BigDecimal.ZERO;			//딜거래금액
		BigDecimal dealTrPrca = BigDecimal.ZERO;		//딜거래원금
		BigDecimal krwTrslTrPrca = BigDecimal.ZERO;		//원화환산 딜거래원금

		if(paramData.getFincPrcsDcd().equals("01")){				//딜거래금액 == 출자변동금액

			dealTrAmt = paramData.getFincCngeAmt();
			dealTrPrca = paramData.getFincCngeAmt();
			krwTrslTrPrca = paramData.getTrslFincCngeAmt();

		}else if(paramData.getFincPrcsDcd().equals("02") || paramData.getFincPrcsDcd().equals("06")){			//딜거래금액 == 결제금액

			dealTrAmt = paramData.getStlAmt();
			dealTrPrca = paramData.getStlAmt();
			krwTrslTrPrca = paramData.getTrslStlAmt();

		}else if(paramData.getFincPrcsDcd().equals("03") || paramData.getFincPrcsDcd().equals("04") 
				|| paramData.getFincPrcsDcd().equals("05") || paramData.getFincPrcsDcd().equals("07")){			//딜거래금액 == 보수/수익
			
			dealTrAmt = paramData.getPayErnAmt();
			dealTrPrca = paramData.getPayErnAmt();
			krwTrslTrPrca = paramData.getTrslPayErnAmt();
		}

		returnDto.setDealTrAmt(dealTrAmt);											//딜거래금액
		returnDto.setDealTrPrca(dealTrPrca);										//딜거래원금
		returnDto.setTrStfno(paramData.getRqsEmpno());								//거래직원번호
		//returnDto.setTrFeeAmt(null);												//거래수수료금액
		returnDto.setCostAmt(paramData.getTrtx());									//비용금액(== 거래세)
		returnDto.setTrCrryCd("KRW");										//통화코드
		returnDto.setKrwTrslRt(paramData.getTrdeExrt());							//원화환산율
		returnDto.setKrwTrslTrPrca(krwTrslTrPrca);									//원화환산거래원금
		// returnDto.setKrwTrslTrIntAmt(null);										//원화환산거래이자금액
		// returnDto.setKrwTrslTrFeeAmt(null);										//원화환산거래수수료금액
		returnDto.setKrwTrslCostAmt(paramData.getTrtx());							//원화환산비용금액(== 거래세)
		//returnDto.setAcctJobCd(null);												//회계업무코드	(회계업무코드 현재 공통코드에 대출계약밖에 없음)
		returnDto.setAcctUnJobCd(paramData.getEtprCrdtGrntTrKindCd());				//회계단위업무코드 (==거래종류코드?)
		returnDto.setAcctTrCd(inputDcd);											//회계거래코드
		returnDto.setActgErlmSeq(paramData.getTrSn());								//회계등록순번(==거래순번)
		//returnDto.setRkfrDt(null);												//기산일자
		//returnDto.setFndsDvsnCd(null);											//자금구분코드
		returnDto.setRctmIsttCd(paramData.getStlXtnlIsttCd());						//입금기관코드
		returnDto.setRctmBano(paramData.getStlAcno());								//입금계좌번호
		// returnDto.setAchdNm("");													//예금주명
		returnDto.setHndEmpno(facade.getDetails().getEno());

		return returnDto;
	}
	
	
	
} // class end