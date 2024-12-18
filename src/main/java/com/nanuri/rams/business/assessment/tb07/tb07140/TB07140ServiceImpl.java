package com.nanuri.rams.business.assessment.tb07.tb07140;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

		/* 거래순번 채번 */
		IBIMS405BDTO trSnDTO = new IBIMS405BDTO();

		trSnDTO.setPrdtCd(paramData.getPrdtCd());			//종목코드

		int trSn = ibims405bMapper.getTrSn(trSnDTO);
		paramData.setTrSn(trSn);

		String inputDcd = "1";					//입력구분 1: 등록 / 2: 취소

		make410BDTOParam(paramData, inputDcd);			//IBIMS410BDTO 파라미터 set

		//log.debug("trSn:::" + trSn);

		return 0;
	};

	@Override
	public int updateFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.updateFinc(paramData);
	};

	@Override
	public int deleteFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.deleteFinc(paramData);
	};

	/* IBIMS405BDTO 파라미터 set */
	public IBIMS405BDTO make405BDTOParam(IBIMS407BDTO paramData, String inputDcd){
		IBIMS405BDTO retrunDto = new IBIMS405BDTO();

		return retrunDto;
	}
	
	/* IBIMS410BDTO 파라미터 set */
	public IBIMS410BDTO make410BDTOParam(IBIMS407BDTO paramData, String inputDcd){
		IBIMS410BDTO returnDto = new IBIMS410BDTO();

		returnDto.setPrdtCd(paramData.getPrdtCd());			//종목코드
		returnDto.setTrSn(paramData.getTrSn());				//거래순번
		returnDto.setExcSn(1);						//실행일련번호(투자매수/매도/출자금은 1로 고정됨)
		returnDto.setTrDt(paramData.getTrDt());				//거래일자

		if(inputDcd.equals("1")){
			returnDto.setTrStatCd("01");			//거래상태코드 (01:정상,11:취소원거래,12:취소거래)
		}else if(inputDcd.equals("2")){
			returnDto.setTrStatCd("12");
		}

		returnDto.setEtprCrdtGrntTrKindCd(paramData.getEtprCrdtGrntTrKindCd());		//거래종류코드 (출자금납입 84, 출자금회수 85)
		returnDto.setDealTrAmt(null);					//딜거래금액
		returnDto.setDealTrPrca(null);				//딜거래원금
		returnDto.setTrFeeAmt(null);					//거래수수료금액
		returnDto.setCostAmt(null);						//비용금액
		returnDto.setTrCrryCd(null);					//통화코드
		//returnDto.setwcrcTr

		return returnDto;
	}
	
	
	
} // class end