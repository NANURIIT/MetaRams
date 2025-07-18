package com.nanuri.rams.business.assessment.tb07.tb07010;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS203BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.dto.IBIMS420BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS203BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS406BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS406BVO;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;
import com.nanuri.rams.business.common.vo.TB07010SVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.EtprCrdtGrntAcctProcDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07010ServiceImpl implements TB07010Service {

	@Autowired
	private Calculation calculation;
	@Autowired
	private EtprCrdtGrntAcctProc acctProc;
	/* 약정기본 */
	private final IBIMS401BMapper ibims401BMapper;
	/* 딜실행기본 */
	private final IBIMS402BMapper ibims402BMapper;
	/* 딜실행기본이력 */
	private final IBIMS402HMapper ibims402HMapper;
	/* 여신스케쥴기본 */
	private final IBIMS403BMapper ibims403BMapper;
	/* 여신스케쥴기본이력(임시) */
	private final IBIMS403HMapper ibims403HMapper;
	/* 딜수수료스케줄기본 */
	private final IBIMS348BMapper ibims348BMapper;
	/* 딜승인기본 */
	private final IBIMS201BMapper ibims201BMapper;
	/* 딜수수료설정기본 */
	private final IBIMS203BMapper ibims203BMapper;
	/* 이자계산내역 */
	private final IBIMS406BMapper ibims406BMapper;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410BMapper;
	/* 딜수수료수납내역 */
	private final IBIMS420BMapper ibims420BMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	/* 여신실행금리기본 */
	private final IBIMS404BMapper ibims404BMapper;
	/* 기준일자정 */
	private final IBIMS991BMapper ibims991BMapper;

	private String rkfrDt = LocalDate.now().toString().replace("-", "");

	/**
	 * 이자 조회
	 */
	@Override
	public CalculationResultDTO inqIntr(CalculationDTO input) {
		// log.debug("\n:::::: ServiceImpl ::: inqIntr ::: {}", input);
		String intrPymDtCd = input.getIntrPymDtCd(); // 상환지정일 코드
		String excDt = input.getExcDt(); // 실행일자
		double aplyIrt = input.getAplyIrt(); // 적용금리
		BigDecimal dealExcBlce = input.getDealExcAmt(); // 투자잔액 (이자계산 대상금액)
		int intrRdmpFrqcMnum = input.getIntrRdmpFrqcMnum(); // 이자상환주기개월수
		// todo: 단수법??
		CalculationResultDTO returnDTO = new CalculationResultDTO();

		log.debug("intrPymDtCd: " + intrPymDtCd);
		log.debug("excDt: " + excDt);
		log.debug("aplyIrt: " + aplyIrt);
		log.debug("dealExcBlce: " + dealExcBlce);
		log.debug("intrRdmpFrqcMnum: " + intrRdmpFrqcMnum);

		BigDecimal prIntr = calculation.getPrepdIntr(input); // 선취이자 계산
		log.debug("prIntr : " + prIntr);
		returnDTO.setRdmpPrarIntr(prIntr);
		return returnDTO;
	}

	/**
	 * 여신정보 조회
	 */
	@Override
	public IBIMS401BVO getDetailInfo(IBIMS401BVO paramData) {

		IBIMS401BVO rtnObj = new IBIMS401BVO();

		/* 여신기본 조회 */
		rtnObj = ibims401BMapper.getIBIMS401BInfo(paramData);

		if (rtnObj == null) {
			return rtnObj = new IBIMS401BVO();
		}
		/* 여신실행기본 조회 */
		// rtnObj.setExcInfo(ibims402BMapper.getEprzCrdlExcInfo(paramData.getPrdtCd()));
		/* 수수료수납내역 */
		IBIMS348BVO prm = new IBIMS348BVO();

		prm.setPrdtCd(paramData.getPrdtCd());

		// ?
		List<IBIMS348BVO> list348vo = ibims348BMapper.selectFeeScxInfoList(prm);

		if (list348vo.size() > 0) {
			rtnObj.setExcFee(list348vo);
		}

		return rtnObj;
	}

	/**
	 * 실행정보 저장
	 */
	@Override
	public int saveExcInfo(TB07010SVO paramData) {

		int rtnValue = 0;

		// 딜승인기본
		IBIMS201BVO ibims201bvo = ibims201BMapper.selectOnlyOneIBIMS201B(paramData.getPrdtCd());

		// 여신기본
		IBIMS401BVO ibims401bvo = ibims401BMapper.getIBIMS401BInfo(paramData);

		// 딜실행정보
		IBIMS402BDTO ibims402BDTO = paramData.getIbims402BDTO();

		// 딜승인수수료스케줄정보
		IBIMS348BVO in348BVO = paramData.getIbims348BVO();
		IBIMS348BVO ibims348BVO = new IBIMS348BVO();

		
		//==========================================================================================================
		// 딜실행기본 딜실행일련번호 채번
		//==========================================================================================================
		long lExcSn = ibims402BMapper.getExcSn(ibims402BDTO.getPrdtCd());
		ibims402BDTO.setExcSn(lExcSn);

		System.out.println(">>>>>>>>>>>>>>> 348 처리완료여부[" + in348BVO.getPrcsCpltYn() + "]<<<<<<<<<<<<<<<<<<<<<<<<<<");

		if (in348BVO.getPrcsCpltYn() == null) {
			in348BVO.setPrcsCpltYn("N");
		}

		// ==========================================================================================================
		// 실행시 미납수수료를 수취한경우 수수료납입내역420 생성
		// ==========================================================================================================
		if ("Y".equals(in348BVO.getPrcsCpltYn())) {

			ibims348BVO = ibims348BMapper.selectOneFeeScxInfo(in348BVO);

			ibims348BVO.setPrcsCpltYn(in348BVO.getPrcsCpltYn()); /* 처리완료여부 */
			ibims348BVO.setFeeRcivAmt(in348BVO.getFeeRcivAmt()); /* 수수료수납금액 */
			ibims348BVO.setFeeRcivDt(in348BVO.getFeeRcivDt()); /* 수수료수납일자 */

			// 딜수수료수납내역 거래일련번호 채번
			IBIMS410BDTO inFee410dto = new IBIMS410BDTO();
			inFee410dto.setPrdtCd(ibims402BDTO.getPrdtCd());
			inFee410dto.setEtprCrdtGrntTrKindCd("21");
			long lFeeTrsn = ibims410BMapper.getFeeTrSn(inFee410dto);
			ibims348BVO.setExcSn(lExcSn);
			ibims348BVO.setHgrkTrSn(lFeeTrsn);

			IBIMS203BDTO in203bdto = new IBIMS203BDTO();
			in203bdto.setPrdtCd(paramData.getPrdtCd());
			in203bdto.setFeeSn(in348BVO.getFeeSn());
			IBIMS203BDTO out203bdto = ibims203BMapper.selectOneFeeInfo(in203bdto);

			if (out203bdto != null) {
				ibims348BVO.setBusiNmcpCplTxtnYn((out203bdto.getBusiNmcpCplTxtnYn() == null) ? "N" : out203bdto.getBusiNmcpCplTxtnYn()); /* 사업부수수료과세여부 */
			}

			IBIMS420BDTO ibims420BDTO = set420b(ibims348BVO);
			ibims348BVO.setTrSn(lFeeTrsn);
			ibims420BDTO.setTrSn(lFeeTrsn);
			ibims420BDTO.setAplyExrt(ibims402BDTO.getKrwTrslRt()); // 적용환율

			rtnValue = ibims420BMapper.insertIBIMS420B(ibims420BDTO); // 딜수수료수납내역생성

			rtnValue = ibims348BMapper.updateFeeScxInfo(ibims348BVO); // 딜승인수수료스케쥴기본 변경

			List<IBIMS348BVO> out348bvoLst = ibims348BMapper.selectListIBIMS348B(ibims348BVO);

			IBIMS410BDTO outFee410dto = setFee410b(lFeeTrsn, ibims401bvo, ibims402BDTO, ibims348BVO);

			rtnValue = ibims410BMapper.saveDlTrList(outFee410dto); // 딜거래내역생성

			EtprCrdtGrntAcctProcDTO inDTO = new EtprCrdtGrntAcctProcDTO();
			inDTO.setPrdtCd(ibims402BDTO.getPrdtCd());
			inDTO.setExcSn(ibims402BDTO.getExcSn());
			inDTO.setTrCrcyCd(ibims402BDTO.getCrryCd()); /* 거래통화코드 */
			inDTO.setTrAmt(BigDecimal.ZERO);
			inDTO.setTrPrca(BigDecimal.ZERO); /* 거래원금 */
			inDTO.setTrIntAmt(BigDecimal.ZERO); /* 거래이자금액 */
			inDTO.setTrFeeAmt(ibims348BVO.getFeeRcivAmt()); /* 수수료수납금액 */
			inDTO.setWcrcTrslRt(ibims402BDTO.getKrwTrslRt()); /* 원화환산율 */
			inDTO.setActgAfrsCd("G3"); /* 회계업무코드 G3수수료상환 */
			inDTO.setRkfrDt(rkfrDt); /* 기산일자 */
			inDTO.setCanYn("N");
			inDTO.setEtprCrdtGrntTrKindCd("21"); /* 거래종류코드 21수수료수납 */
			EtprCrdtGrntAcctProcDTO outDTO = acctProc.acctPrcs(inDTO);

		}
		// ==========================================================================================================

		// 화면이 적용되면 제거
		if (null == ibims402BDTO.getKrwTrslRt()) {
			ibims402BDTO.setKrwTrslRt(new BigDecimal(1));
		}

		
		//==========================================================================================================
		
		
		//==========================================================================================================
		ibims402BDTO.setLdgSttsCd("1"); // 원장상태코드 1정상, 2취소, 10실행품의중, 99종료

		ibims402BDTO.setCrryCd(ibims401bvo.getCrryCd()); // 통화코드
		ibims402BDTO.setDealExcBlce(ibims402BDTO.getDealExcAmt()); // 딜실행잔액
		ibims402BDTO.setKrwTrslExcAmt(ibims402BDTO.getDealExcAmt().multiply(ibims402BDTO.getKrwTrslRt())); // 원화환산실행금액
		ibims402BDTO.setKrwTrslExcBlce(ibims402BDTO.getDealExcAmt().multiply(ibims402BDTO.getKrwTrslRt())); // 원화환산실행잔액
		ibims402BDTO.setPrnaDfrPrdMnum(ibims401bvo.getPrnaDfrPrdMnum()); // 원금거치기간개월수
		ibims402BDTO.setPrnaRdmpFrqcMnum(((Objects.nonNull(ibims401bvo.getPrnaRdmpFrqcMnum())) ? 1 : ibims401bvo.getPrnaRdmpFrqcMnum())); // 원금상환주기개월수
		ibims402BDTO.setIntrRdmpFrqcMnum(ibims401bvo.getIntrRdmpFrqcMnum()); // 이자상환주기개월수
		ibims402BDTO.setDealNo(ibims201bvo.getDealNo()); // 딜번호
		ibims402BDTO.setMtrDcd(ibims201bvo.getMtrDcd()); // 부수안건구분코드
		ibims402BDTO.setJdgmDcd(ibims201bvo.getJdgmDcd()); // 리스크심사구분코드
		ibims402BDTO.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호

		IBIMS404BDTO in404bdto = new IBIMS404BDTO();
		in404bdto.setPrdtCd(ibims402BDTO.getPrdtCd());
		in404bdto.setExcSn(lExcSn);
		in404bdto.setAddIntrt(ibims402BDTO.getExcAddIntrt());

		
		//==========================================================================================================
		// 404b insert
		//==========================================================================================================
		rtnValue = ibims404BMapper.insertCopyIBIMS344B(in404bdto); // 여신실행금리기본생성

		if (null == String.valueOf(paramData.getPrnaRdmpFrqcMnum())) {
			paramData.setPrnaRdmpFrqcMnum(1); // 화면 체크 제대로 되면 삭제
		}
		
		

		//==========================================================================================================
		// 원금불균등이 아닌경우 승인스케줄 생성
		//==========================================================================================================
		if (!"03".equals(paramData.getEprzCrdlPaiRdmpDcd())) {

			CalculationDTO inCalcDTO = new CalculationDTO();

			inCalcDTO.setPrdtCd(ibims402BDTO.getPrdtCd()); // 상품코드
			inCalcDTO.setExcSn(ibims402BDTO.getExcSn()); // 실행일련번호
			inCalcDTO.setPaiRdmpDcd(paramData.getEprzCrdlPaiRdmpDcd()); // 상환방법코드
			inCalcDTO.setExcDt(ibims402BDTO.getExcDt()); // 실행일자
			inCalcDTO.setExpDt(ibims402BDTO.getExpDt()); // 만기일자
			inCalcDTO.setDfrExpMnum(ibims402BDTO.getDfrExpMnum()); // 거치만기개월수
			inCalcDTO.setStdrIntrt(paramData.getStdrIntrt().doubleValue()); // 기준금리
			inCalcDTO.setAddIntrt(ibims402BDTO.getExcAddIntrt().doubleValue()); // 가산금리
			inCalcDTO.setTotIntrt(paramData.getTotIntrt().doubleValue()); // 총금리
			inCalcDTO.setDealExcAmt(ibims402BDTO.getDealExcAmt()); // 실행금액==대출금액
			inCalcDTO.setIntrPymDtCd(ibims402BDTO.getIntrPymDtCd()); // 이자상환지정일
			inCalcDTO.setPrnaRdmpFrqcMnum(paramData.getPrnaRdmpFrqcMnum()); // 원금상환주기개월수
			inCalcDTO.setIntrRdmpFrqcMnum(paramData.getIntrRdmpFrqcMnum()); // 이자상환주기개월수
			inCalcDTO.setHldyPrcsDcd(paramData.getEprzCrdlHldyPrcsDcd()); // 기업여신휴일처리구분코드
			inCalcDTO.setIntrDnumClcMthCd(ibims401bvo.getEprzCrdlIntrDnumClcMthCd()); // 이자일수계산방법
			inCalcDTO.setIntrSnnoPrcsDcd(ibims401bvo.getEprzCrdlIntrSnnoPrcsDcd()); // 이자단수처리구분코드
			inCalcDTO.setIntrClcEndDeDcd(paramData.getEprzCrdlIntrClcEndDeDcd()); // 이자계산종료일구분코드(휴일포..)
			inCalcDTO.setOvduIntrRtDcd(paramData.getEprzCrdlOvduIntrRtDcd()); // 연체이자율구분코드
			inCalcDTO.setTrIntAmt(ibims402BDTO.getPrcsIntrAmt()); // 선취이자
			inCalcDTO.setIntrBnaoDcd(paramData.getEprzCrdlIntrBnaoDcd()); // 선후취구분

			String strDfrExpDt = null;

			if (ibims402BDTO.getDfrExpMnum() > 0) {
				strDfrExpDt = DateUtil.monthAdd(inCalcDTO.getExcDt(), inCalcDTO.getDfrExpMnum()).substring(0, 6) + inCalcDTO.getExcDt().substring(6, 8);
				inCalcDTO.setDfrExpDt(strDfrExpDt);
			} else {
				inCalcDTO.setDfrExpDt("");
			}

			IBIMS410BDTO inExc410dto = new IBIMS410BDTO();
			inExc410dto.setPrdtCd(ibims402BDTO.getPrdtCd());
			inExc410dto.setExcSn(ibims402BDTO.getExcSn());
			inExc410dto.setTrAfLoanRmnd(ibims402BDTO.getDealExcAmt()); // 거래후대출잔액

			long lExTrsn = ibims410BMapper.getExTrSn(inExc410dto);

			
			//==========================================================================================================
			
			//==========================================================================================================
			log.debug("prnaCalculation start");
			List<CalculationResultDTO> prnaCalcDTO = calculation.prnaCalculation(inCalcDTO);
			log.debug("prnaCalculation end");
			
			
			List<CalculationResultDTO> intrCalcDTO = new ArrayList<CalculationResultDTO>();
			List<IBIMS403BDTO> prna403BDTOList = new ArrayList<IBIMS403BDTO>();
			List<IBIMS403BDTO> intr403BDTOList = new ArrayList<IBIMS403BDTO>();

			String strtDt = "";
			String endDt = "";
			long prcsDnum = 0;
			BigDecimal aplyIrt = new BigDecimal(0);

			for (int i = 0; i < prnaCalcDTO.size(); i++) {

				IBIMS403BDTO prna403BDTO = new IBIMS403BDTO();
				IBIMS403BDTO intr403BDTO = new IBIMS403BDTO();
				CalculationResultDTO prnaitem = prnaCalcDTO.get(i);

				prna403BDTO.setPrdtCd(ibims402BDTO.getPrdtCd()); // 종목코드
				prna403BDTO.setExcSn(ibims402BDTO.getExcSn()); // 실행일련번호
				prna403BDTO.setScxDcd(prnaitem.getScxDcd()); // 일정구분
				prna403BDTO.setRdmpTmrd(prnaitem.getRdmpTmrd()); // 상환회차
				prna403BDTO.setPrarDt(prnaitem.getPrarDt()); // 예정일자
				prna403BDTO.setTrgtAmt(prnaitem.getBfBalance()); // 대상금액

				// 예정원금
				if (prnaitem.getPrarPrna() == null) {
					prna403BDTO.setPrarPrna(new BigDecimal("0")); // 예정원금
				} else {
					prna403BDTO.setPrarPrna(prnaitem.getPrarPrna()); // 예정원금
				}

				prna403BDTO.setStrtDt(prnaitem.getStrtDt()); // 시작일자
				prna403BDTO.setEndDt(prnaitem.getEndDt()); // 종료일자
				prna403BDTO.setAplyIrt(prnaitem.getAplyIrt()); // 적용이율
				prna403BDTO.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호
				prna403BDTO.setTrSn(lExTrsn);
				prna403BDTO.setHgrkTrSn(lExTrsn);

				/*// Null 값인 경우 초기값 설정
				prna403BDTO.setRdmpPrarIntr(new BigDecimal("0")); // 상환예정이자
				prna403BDTO.setPrcsCpltYn("N"); // 처리완료여부
				prna403BDTO.setPrcsAmt(new BigDecimal("0")); // 처리금액
				prna403BDTO.setPrcsIntrAmt(new BigDecimal("0")); // 처리이자금액
				prna403BDTO.setOvduIntrRt(new BigDecimal("0")); // 연체이자율
				*/
				prna403BDTOList.add(prna403BDTO);

				
				//==========================================================================================================
				/* 기업여신원리금상환구분코드 01 원금균등 02 원리금균등 03 원금불균등 04 만기일시상환 */
				// 이자 계산 내역
				//==========================================================================================================
				if ("02".equals(inCalcDTO.getPaiRdmpDcd())) {
					
					intr403BDTO.setPrdtCd(ibims402BDTO.getPrdtCd()); // 종목코드
					intr403BDTO.setExcSn(ibims402BDTO.getExcSn()); // 실행일련번호
					intr403BDTO.setScxDcd("04"); // 일정구분
					intr403BDTO.setTrgtAmt(prnaitem.getBfBalance()); // 대상금액
					intr403BDTO.setRdmpTmrd(prnaitem.getRdmpTmrd()); // 상환회차
					intr403BDTO.setPrarDt(prnaitem.getPrarDt()); // 예정일자
					intr403BDTO.setStrtDt(prnaitem.getStrtDt()); // 시작일자
					intr403BDTO.setEndDt(prnaitem.getEndDt()); // 종료일자
					intr403BDTO.setRdmpPrarIntr(prnaitem.getRdmpPrarIntr());// 상환예정이자
					intr403BDTO.setAplyIrt(prnaitem.getAplyIrt()); // 적용이율
					strtDt = prnaitem.getPrarDt();
					endDt = prnaitem.getEndDt();
					prcsDnum = DateUtil.dateDiff(strtDt, endDt) + 1;
					aplyIrt = prnaitem.getAplyIrt();

					intr403BDTO.setRdmpTmrd(prnaitem.getRdmpTmrd()); // 상환회차
					intr403BDTO.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호
					intr403BDTO.setTrSn(lExTrsn);
					intr403BDTO.setHgrkTrSn(lExTrsn);

					/*// Null 값인 경우 초기값 설정
					intr403BDTO.setRdmpPrarIntr(new BigDecimal("0")); // 상환예정이자
					intr403BDTO.setPrcsCpltYn("N"); // 처리완료여부
					intr403BDTO.setPrcsAmt(new BigDecimal("0")); // 처리금액
					intr403BDTO.setPrcsIntrAmt(new BigDecimal("0")); // 처리이자금액
					intr403BDTO.setOvduIntrRt(new BigDecimal("0")); // 연체이자율
					*/
					intr403BDTOList.add(intr403BDTO);
				}

			}

			
			//==========================================================================================================
			/* IBIMS403B INSERT ( 원금상환 스케쥴 ) */
			//==========================================================================================================
			rtnValue = ibims403BMapper.saveRdmpInfo(prna403BDTOList);
			
			
			

			String intrStrtDt = "";
			String intrEndDt = "";

			if (!"02".equals(inCalcDTO.getPaiRdmpDcd())) {

				intrCalcDTO = calculation.intrCalculation(inCalcDTO, prnaCalcDTO);
				

				for (int v = 0; v < intrCalcDTO.size(); v++) {

					IBIMS403BDTO intr403BDTO = new IBIMS403BDTO();
					CalculationResultDTO intritem = intrCalcDTO.get(v);

					intr403BDTO.setPrdtCd(ibims402BDTO.getPrdtCd()); // 종목코드
					intr403BDTO.setExcSn(ibims402BDTO.getExcSn()); // 실행일련번호
					intr403BDTO.setScxDcd(intritem.getScxDcd()); // 일정구분
					intr403BDTO.setPrarDt(intritem.getPrarDt()); // 예정일자
					intr403BDTO.setTrgtAmt(intritem.getBfBalance()); // 대상금액
					intr403BDTO.setStrtDt(intritem.getStrtDt()); // 시작일자
					intr403BDTO.setEndDt(intritem.getEndDt()); // 종료일자
					intr403BDTO.setRdmpPrarIntr(intritem.getRdmpPrarIntr());// 상환예정이자
					intr403BDTO.setAplyIrt(intritem.getAplyIrt()); // 적용이율
					strtDt = intritem.getStrtDt();
					endDt = intritem.getEndDt();
					prcsDnum = DateUtil.dateDiff(strtDt, endDt) + 1;
					aplyIrt = intritem.getAplyIrt();

					if ("1".equals(inCalcDTO.getIntrBnaoDcd()) && (ibims402BDTO.getPrcsIntrAmt().compareTo(BigDecimal.ZERO) > 0) && ("1".equals(intritem.getRdmpTmrd()))) {
						intrStrtDt = intritem.getStrtDt();
						intrEndDt = intritem.getEndDt();
						intr403BDTO.setRdmpTmrd(String.valueOf((Integer.parseInt(intritem.getRdmpTmrd())))); // 상환회차
						intr403BDTO.setPrcsCpltYn("Y");
						intr403BDTO.setPrcsDt(rkfrDt);
						intr403BDTO.setPrcsAmt(ibims402BDTO.getPrcsIntrAmt());
					} else {
						intr403BDTO.setRdmpTmrd(intritem.getRdmpTmrd()); // 상환회차
					}

					intr403BDTO.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호
					intr403BDTO.setTrSn(lExTrsn);
					intr403BDTO.setHgrkTrSn(lExTrsn);

					
					/*// Null 값인 경우 초기값 설정
					intr403BDTO.setRdmpPrarIntr(new BigDecimal("0"));// 상환예정이자
					intr403BDTO.setPrcsCpltYn("N");// 처리완료여부
					intr403BDTO.setPrcsAmt(new BigDecimal("0"));// 처리금액
					intr403BDTO.setPrcsIntrAmt(new BigDecimal("0"));// 처리이자금액
					intr403BDTO.setOvduIntrRt(new BigDecimal("0"));// 연체이자율
					*/
					intr403BDTOList.add(intr403BDTO);

				}

			}
			//==========================================================================================================
			
			
			
			/* IBIMS403B INSERT ( 이자상환 스케쥴 ) */
			rtnValue = ibims403BMapper.saveRdmpInfo(intr403BDTOList);

			if ("1".equals(inCalcDTO.getIntrBnaoDcd())) { // 선취
				ibims402BDTO.setLastIntrClcDt(intr403BDTOList.get(0).getPrarDt()); /* 최종이자계산일자 */
			} else {
				ibims402BDTO.setLastIntrClcDt(rkfrDt);
			}
			ibims402BDTO.setNxtRdmpPrarDt(prna403BDTOList.get(0).getPrarDt()); // 다음상환예정일자
			ibims402BDTO.setNxtIntrPymDt(intr403BDTOList.get(0).getPrarDt()); // 다음이자납입일자
			ibims402BDTO.setPrnaOvduDt(DateUtil.dayAdd(prna403BDTOList.get(0).getPrarDt(), 1)); // 원금연체일자
			ibims402BDTO.setIntrOvduDt(DateUtil.dayAdd(intr403BDTOList.get(0).getPrarDt(), 1)); // 이자연체일자
			ibims402BDTO.setTotRdmpTmrd(intr403BDTOList.size()); // 총상환회차

			
			
			
			rtnValue = ibims402BMapper.saveExcInfo(ibims402BDTO); // 딜실행기본 생성

			rtnValue = ibims402HMapper.insertIBIMS402H(ibims402BDTO); // 딜실행기본이력 생성

			IBIMS410BDTO outExc410dto = setExc410b(lExTrsn, ibims401bvo, ibims402BDTO, (in348BVO.getPrcsCpltYn() == null ? in348BVO : ibims348BVO));

			rtnValue = ibims410BMapper.saveDlTrList(outExc410dto); // 딜거래내역생성

			rtnValue = ibims403HMapper.insertIBIMS403H(prna403BDTOList); // 스케쥴이력(임시생성)원금

			rtnValue = ibims403HMapper.insertIBIMS403H(intr403BDTOList); // 스케쥴이력(임시생성)이자

			if ((ibims402BDTO.getPrcsIntrAmt() != null) && (ibims402BDTO.getPrcsIntrAmt().compareTo(BigDecimal.ZERO) > 0)) {

				IBIMS406BVO in406BVO = new IBIMS406BVO();
				in406BVO.setPrdtCd(ibims402BDTO.getPrdtCd());
				in406BVO.setTrSn(lExTrsn);
				in406BVO.setExcSn(ibims402BDTO.getExcSn());
				in406BVO.setRkfrDt(ibims402BDTO.getExcDt()); // 실행일자
				in406BVO.setIntrCalcStrtDt(intrStrtDt);
				in406BVO.setIntrCalcEndDt(intrEndDt);
				in406BVO.setPaiTypCd("2"); // 선취이자==정상이자
				in406BVO.setTrgtDnum(prcsDnum);
				in406BVO.setAplyIntr(aplyIrt);
				in406BVO.setNrmlIntAmt(ibims402BDTO.getPrcsIntrAmt());
				in406BVO.setHndEmpno(facade.getDetails().getEno());

				ibims406BMapper.insertIBIMS0406B(in406BVO);

			}

			ibims201bvo.setLastYn("N");
			rtnValue = ibims201BMapper.updateIBIMS201BDTO(ibims201bvo);

			ibims201bvo.setLastYn("Y");
			ibims201bvo.setPrgSttsCd("601");
			rtnValue = ibims201BMapper.regPrdtCd(ibims201bvo);

		} // if end
		//==========================================================================================================

		EtprCrdtGrntAcctProcDTO inDTO = new EtprCrdtGrntAcctProcDTO();
		inDTO.setPrdtCd(ibims402BDTO.getPrdtCd());
		inDTO.setExcSn(ibims402BDTO.getExcSn());
		inDTO.setTrCrcyCd(ibims402BDTO.getCrryCd()); /* 거래통화코드 */
		inDTO.setTrAmt(ibims402BDTO.getDealExcAmt().add((ibims402BDTO.getPrcsIntrAmt() == null) ? BigDecimal.ZERO : ibims402BDTO.getPrcsIntrAmt()));
		inDTO.setTrPrca(ibims402BDTO.getDealExcAmt()); /* 거래원금 */
		inDTO.setTrIntAmt(ibims402BDTO.getPrcsIntrAmt()); /* 거래이자금액 */
		inDTO.setTrFeeAmt(BigDecimal.ZERO); /* 수수료수납금액 */
		inDTO.setWcrcTrslRt(ibims402BDTO.getKrwTrslRt()); /* 원화환산율 */
		inDTO.setActgAfrsCd("G1"); /* 회계업무코드 G1대출금실행 */
		inDTO.setRkfrDt(rkfrDt); /* 기산일자 */
		inDTO.setCanYn("N");
		inDTO.setEtprCrdtGrntTrKindCd("10"); /* 거래종류코드 10실행 */
		
		/**
		 * 회계처리모듈 호출 부분
		 */
		EtprCrdtGrntAcctProcDTO outDTO = acctProc.acctPrcs(inDTO); 

		return rtnValue;

	} // method end

	/**
	 * 딜거래내역매핑 - 대출실행
	 * 
	 * @param  lTrsn
	 * @param  param401
	 * @param  param402
	 * @param  param348
	 * @return
	 */
	private IBIMS410BDTO setExc410b(long lTrsn, IBIMS401BVO param401, IBIMS402BDTO param402, IBIMS348BVO param348) {

		IBIMS410BDTO setParam = new IBIMS410BDTO();

		setParam.setPrdtCd(param401.getPrdtCd()); /* 상품코드 */
		setParam.setTrSn(lTrsn); /* 거래일련번호 */
		setParam.setExcSn(param402.getExcSn()); /* 실행일련번호 */
		// setParam.setTrDt(rkfrDt); /* 거래일자 */
		setParam.setTrStatCd("01"); /* 거래상태코드 1정상 */
		setParam.setEtprCrdtGrntTrKindCd("10"); /* 거래종류코드 10실행 */
		setParam.setDealTrAmt(
				param402.getDealExcAmt().add((param402.getPrcsIntrAmt() == null) ? BigDecimal.ZERO : param402.getPrcsIntrAmt())); /* 딜거래금액 == 실행금액? */
		setParam.setDealTrPrca(param402.getDealExcAmt()); /* 딜거래원금 */
		setParam.setTrIntAmt(param402.getPrcsIntrAmt()); /* 거래이자금액 */
		// setParam.setDealRdptObjtPrca(getParam.getDealRdptObjtPrca()); /* 딜상환대상원금 */
		// setParam.setDealMrdpPrca(getParam.getDealMrdpPrca()); /* 딜중도상환원금 */
		setParam.setNrmlIntAmt(param402.getPrcsIntrAmt()); /* 정상이자금액 */
		// setParam.setCrdtGrntOvduIntAmt(getParam.getCrdtGrntOvduIntAmt()); /*
		// 신용공여연체이자금액 */
		// setParam.setCrdtGrntRcvbIntAmt(getParam.getCrdtGrntRcvbIntAmt()); /*
		// 신용공여미수이자금액 */
		// setParam.setPucrIntAmt(getParam.getPucrIntAmt()); /* 환출이자금액 */
		// setParam.setTrFeeAmt(getParam.getTrFeeAmt()); /* 거래수수료금액 */
		// setParam.setCostAmt(getParam.getCostAmt()); /* 비용금액 */
		setParam.setTrCrryCd(param401.getCrryCd()); /* 거래통화코드 */
		setParam.setKrwTrslRt(param402.getKrwTrslRt()); /* 원화환산율 == 적용환율 */
		setParam.setKrwTrslTrPrca(param402.getKrwTrslExcAmt()); /* 원화환산거래원금 */

		setParam.setKrwTrslTrIntAmt(param402.getKrwTrslIntAmt()); /* 원화환산거래이자금액 == 원화환산이자금액 */
		// setParam.setWcrcTrslTrFeeAmt(param348.getFeeRcivAmt()); /* 원화환산거래수수료금액 ==
		// 수수료수납금액 */
		// setParam.setWcrcTrslCostAmt(getParam.getWcrcTrslCostAmt()); /* 원화환산비용금액 */
		setParam.setAcctJobCd("G1"); /* 회계업무코드 */
		// setParam.setActgUnitAfrsCd(getParam.getActgUnitAfrsCd()); /* 회계단위업무코드 */
		// setParam.setActgTrCd(getParam.getActgTrCd()); /* 회계거래코드 */
		// setParam.setActgErlmSeq(getParam.getActgErlmSeq()); /* 회계등록순번 */
		// setParam.setRkfrDt(getParam.getRkfrDt()); /* 기산일자 */
		setParam.setFndsDvsnCd(param402.getFndsDcd()); /* 자금구분코드 */
		setParam.setRctmIsttCd(param402.getRctmIsttCd()); /* 입금기관코드 */
		setParam.setRctmBano(param402.getBrkgAcno()); /* 입금은행계좌번호 */
		setParam.setAchdNm(param402.getAchdNm()); /* 예금주명 */
		// setParam.setHdwrPrcsYn(getParam.getHdwrPrcsYn()); /* 수기처리여부 */
		// setParam.setAcptPtclSmtlAmt(getParam.getAcptPtclSmtlAmt()); /* 수납내역합계금액 */
		// setParam.setDealAltnAmt(getParam.getDealAltnAmt()); /* 딜대체금액 */
		// setParam.setDealCashAmt(getParam.getDealCashAmt()); /* 딜현금금액 */
		// setParam.setDealBkchAmt(getParam.getDealBkchAmt()); /* 딜자기앞수표금액 */
		// setParam.setDealCkblAmt(getParam.getDealCkblAmt()); /* 딜타점권금액 */
		// setParam.setBillPoutYn(getParam.getBillPoutYn()); /* 계산서출력여부 */
		// setParam.setTrbkPoutYn(getParam.getTrbkPoutYn()); /* 거래장출력여부 */
		// setParam.setRclmDvsnCd(getParam.getRclmDvsnCd()); /* 회수구분코드 */
		// setParam.setPucrIntAltnAmt(getParam.getPucrIntAltnAmt()); /* 환출이자대체금액 */
		// setParam.setPucrIntRctmAmt(getParam.getPucrIntRctmAmt()); /* 환출이자입금금액 */
		// setParam.setClcnFeeAmt(getParam.getClcnFeeAmt()); /* 추심수수료금액 */
		// setParam.setImptStmpAmt(getParam.getImptStmpAmt()); /* 수입인지금액 */
		// setParam.setFeeTotAmt(getParam.getFeeTotAmt()); /* 수수료총금액 */
		// setParam.setRvseCnclDvsnCd(getParam.getRvseCnclDvsnCd()); /* 정정취소구분코드 */
		// setParam.setRvseCnclRsonText(getParam.getRvseCnclRsonText()); /* 정정취소사유내용 */
		// setParam.setRvseCnclTrSeq(getParam.getRvseCnclTrSeq()); /* 정정취소거래순번 */
		setParam.setTrAfLoanRmnd(param402.getDealExcAmt().add((param401.getDealExcBlce() == null) ? BigDecimal.ZERO : param401.getDealExcBlce())); /* 거래이후대출잔액 */
		// setParam.setRdptTmod(getParam.getRdptTmod()); /* 상환회차 */
		// setParam.setDealPxdfPrca(getParam.getDealPxdfPrca()); /* 딜대지급원금 */
		// setParam.setPxdfIntAmt(getParam.getPxdfIntAmt()); /* 대지급이자금액 */
		// setParam.setPxdfEtcAmt(getParam.getPxdfEtcAmt()); /* 대지급기타금액 */
		setParam.setOrgno(facade.getDetails().getBdCd()); /* 조직번호 */
		setParam.setTrStfno(facade.getDetails().getEno()); /* 거래직원번호 */
		// setParam.setDcfcStfno(getParam.getDcfcStfno()); /* 결재자직원번호 */
		// setParam.setClmSeq(getParam.getClmSeq()); /* 청구순번 */
		// setParam.setActgSynsCd(getParam.getActgSynsCd()); /* 회계적요코드 */
		// setParam.setSynsText(getParam.getSynsText()); /* 적요내용 */
		// setParam.setTaxBillEvdcErlmDt(getParam.getTaxBillEvdcErlmDt()); /*
		// 세금계산서증빙등록일자 */
		// setParam.setTaxBillEvdcErlmSeq(getParam.getTaxBillEvdcErlmSeq()); /*
		// 세금계산서증빙등록순번 */
		// setParam.setTaxBillPrcsSeq(getParam.getTaxBillPrcsSeq()); /* 세금계산서처리순번 */
		// setParam.setBillEvdcErlmDt(getParam.getBillEvdcErlmDt()); /* 계산서증빙등록일자 */
		// setParam.setBillEvdcErlmSeq(getParam.getBillEvdcErlmSeq()); /* 계산서증빙등록순번 */
		// setParam.setBillPrcsSeq(getParam.getBillPrcsSeq()); /* 계산서처리순번 */
		// setParam.setVat(getParam.getVat()); /* 부가세 */
		// setParam.setIssuBillEvdcErlmDt(getParam.getIssuBillEvdcErlmDt()); /*
		// 발행계산서증빙등록일자 */
		// setParam.setIssuBillPrcsSeq(getParam.getIssuBillPrcsSeq()); /* 발행계산서처리순번 */
		// setParam.setDfrmFeePrcaEclsYn(getParam.getDfrmFeePrcaEclsYn()); /*
		// 지급수수료원금제외여부 */
		// setParam.setDfrmFeeClmObjtAmt(getParam.getDfrmFeeClmObjtAmt()); /*
		// 지급수수료청구대상금액 */
		// setParam.setMrdpFeeAmt(getParam.getMrdpFeeAmt()); /* 중도상환수수료금액 */
		// setParam.setChckIssuIsttName(getParam.getChckIssuIsttName()); /* 수표발행기관명 */
		// setParam.setMrdpYn(getParam.getMrdpYn()); /* 중도상환여부 */
		// setParam.setRctmDt(getParam.getRctmDt()); /* 입금일자 */
		// setParam.setTrObjtBsnNo(getParam.getTrObjtBsnNo()); /* 거래대상기업체번호 */
		// setParam.setNoprErngEtcAmt(getParam.getNoprErngEtcAmt()); /* 영업외수익기타금액 */
		// setParam.setNoprCostEtcAmt(getParam.getNoprCostEtcAmt()); /* 영업외비용기타금액 */
		// setParam.setRcvbRstrYn(); /* 미수환원여부 */
		// setParam.setRcvbYn(); /* 미수여부 */
		setParam.setHndEmpno(facade.getDetails().getEno()); /* 조작사원번호 */
		setParam.setHndTmnlNo(""); /* 조작단말기번호 */
		setParam.setHndTrId(""); /* 조작거래ID */
		setParam.setGuid(""); /* GUID */

		return setParam;
	}

	/**
	 * 딜거래내역매핑 - 수수료
	 * 
	 * @param  lTrsn
	 * @param  param401
	 * @param  param402
	 * @param  param348
	 * @return
	 */
	private IBIMS410BDTO setFee410b(long lTrsn, IBIMS401BVO param401, IBIMS402BDTO param402, IBIMS348BVO param348) {

		IBIMS410BDTO setParam = new IBIMS410BDTO();

		setParam.setPrdtCd(param401.getPrdtCd()); /* 상품코드 */
		setParam.setTrSn(lTrsn); /* 거래일련번호 */
		setParam.setExcSn(param402.getExcSn()); /* 실행일련번호 */
		setParam.setTrDt(rkfrDt); /* 거래일자 */
		setParam.setTrStatCd("01"); /* 거래상태코드 1정상 */
		setParam.setEtprCrdtGrntTrKindCd("21"); /* 거래종류코드 21수수료수납 */
		// setParam.setDealTrAmt(param402.getDealExcAmt()); /* 딜거래금액 == 실행금액? */
		// setParam.setDealTrPrca(param402.getAcbkAmt()); /* 딜거래원금 == 최종지급금액? */
		// setParam.setTrIntAmt(param402.getPrcsIntrAmt()); /* 거래이자금액 */
		// setParam.setDealRdptObjtPrca(getParam.getDealRdptObjtPrca()); /* 딜상환대상원금 */
		// setParam.setDealMrdpPrca(getParam.getDealMrdpPrca()); /* 딜중도상환원금 */
		// setParam.setNrmlIntAmt(getParam.getNrmlIntAmt()); /* 정상이자금액 */
		// setParam.setCrdtGrntOvduIntAmt(getParam.getCrdtGrntOvduIntAmt()); /*
		// 신용공여연체이자금액 */
		// setParam.setCrdtGrntRcvbIntAmt(getParam.getCrdtGrntRcvbIntAmt()); /*
		// 신용공여미수이자금액 */
		// setParam.setPucrIntAmt(getParam.getPucrIntAmt()); /* 환출이자금액 */
		setParam.setTrFeeAmt(param348.getFeeRcivAmt()); /* 거래수수료금액 */
		// setParam.setCostAmt(getParam.getCostAmt()); /* 비용금액 */
		setParam.setTrCrryCd(param401.getCrryCd()); /* 거래통화코드 */
		setParam.setKrwTrslRt(param402.getKrwTrslRt()); /* 원화환산율 == 적용환율 */
		// setParam.setWcrcTrslTrPrca(param402.getKrwTrslExcAmt()); /* 원화환산거래원금 ==
		// 최종지급금액 */

		// setParam.setWcrcTrslTrIntAmt(param402.getKrwTrslIntAmt()); /* 원화환산거래이자금액 ==
		// 원화환산이자금액*/
		setParam.setKrwTrslTrFeeAmt(
				param348.getFeeRcivAmt().multiply(param402.getKrwTrslRt()).setScale(2, RoundingMode.HALF_UP)); /* 원화환산거래수수료금액 == 수수료수납금액 */
		// setParam.setWcrcTrslCostAmt(getParam.getWcrcTrslCostAmt()); /* 원화환산비용금액 */
		setParam.setAcctJobCd("G3"); /* 회계업무코드 */
		// setParam.setActgUnitAfrsCd(getParam.getActgUnitAfrsCd()); /* 회계단위업무코드 */
		// setParam.setActgTrCd(getParam.getActgTrCd()); /* 회계거래코드 */
		// setParam.setActgErlmSeq(getParam.getActgErlmSeq()); /* 회계등록순번 */
		// setParam.setRkfrDt(getParam.getRkfrDt()); /* 기산일자 */
		setParam.setFndsDvsnCd(param402.getFndsDcd()); /* 자금구분코드 */
		setParam.setRctmIsttCd(param402.getRctmIsttCd()); /* 입금기관코드 */
		setParam.setRctmBano(param402.getBrkgAcno()); /* 입금은행계좌번호 */
		setParam.setAchdNm(param402.getAchdNm()); /* 예금주명 */
		// setParam.setHdwrPrcsYn(getParam.getHdwrPrcsYn()); /* 수기처리여부 */
		// setParam.setAcptPtclSmtlAmt(getParam.getAcptPtclSmtlAmt()); /* 수납내역합계금액 */
		// setParam.setDealAltnAmt(getParam.getDealAltnAmt()); /* 딜대체금액 */
		// setParam.setDealCashAmt(getParam.getDealCashAmt()); /* 딜현금금액 */
		// setParam.setDealBkchAmt(getParam.getDealBkchAmt()); /* 딜자기앞수표금액 */
		// setParam.setDealCkblAmt(getParam.getDealCkblAmt()); /* 딜타점권금액 */
		// setParam.setBillPoutYn(getParam.getBillPoutYn()); /* 계산서출력여부 */
		// setParam.setTrbkPoutYn(getParam.getTrbkPoutYn()); /* 거래장출력여부 */
		// setParam.setRclmDvsnCd(getParam.getRclmDvsnCd()); /* 회수구분코드 */
		// setParam.setPucrIntAltnAmt(getParam.getPucrIntAltnAmt()); /* 환출이자대체금액 */
		// setParam.setPucrIntRctmAmt(getParam.getPucrIntRctmAmt()); /* 환출이자입금금액 */
		// setParam.setClcnFeeAmt(getParam.getClcnFeeAmt()); /* 추심수수료금액 */
		// setParam.setImptStmpAmt(getParam.getImptStmpAmt()); /* 수입인지금액 */
		setParam.setFeeTotAmt(param348.getFeeRcivAmt()); /* 수수료총금액 */
		// setParam.setRvseCnclDvsnCd(getParam.getRvseCnclDvsnCd()); /* 정정취소구분코드 */
		// setParam.setRvseCnclRsonText(getParam.getRvseCnclRsonText()); /* 정정취소사유내용 */
		// setParam.setRvseCnclTrSeq(getParam.getRvseCnclTrSeq()); /* 정정취소거래순번 */
		// setParam.setTrAfLoanRmnd(getParam.getTrAfLoanRmnd()); /* 거래이후대출잔액 */
		// setParam.setRdptTmod(getParam.getRdptTmod()); /* 상환회차 */
		// setParam.setDealPxdfPrca(getParam.getDealPxdfPrca()); /* 딜대지급원금 */
		// setParam.setPxdfIntAmt(getParam.getPxdfIntAmt()); /* 대지급이자금액 */
		// setParam.setPxdfEtcAmt(getParam.getPxdfEtcAmt()); /* 대지급기타금액 */
		// setParam.setOrgno(getParam.getOrgno()); /* 조직번호 */
		setParam.setTrStfno(facade.getDetails().getEno()); /* 거래직원번호 */
		// setParam.setDcfcStfno(getParam.getDcfcStfno()); /* 결재자직원번호 */
		// setParam.setClmSeq(getParam.getClmSeq()); /* 청구순번 */
		// setParam.setActgSynsCd(getParam.getActgSynsCd()); /* 회계적요코드 */
		// setParam.setSynsText(getParam.getSynsText()); /* 적요내용 */
		// setParam.setTaxBillEvdcErlmDt(getParam.getTaxBillEvdcErlmDt()); /*
		// 세금계산서증빙등록일자 */
		// setParam.setTaxBillEvdcErlmSeq(getParam.getTaxBillEvdcErlmSeq()); /*
		// 세금계산서증빙등록순번 */
		// setParam.setTaxBillPrcsSeq(getParam.getTaxBillPrcsSeq()); /* 세금계산서처리순번 */
		// setParam.setBillEvdcErlmDt(getParam.getBillEvdcErlmDt()); /* 계산서증빙등록일자 */
		// setParam.setBillEvdcErlmSeq(getParam.getBillEvdcErlmSeq()); /* 계산서증빙등록순번 */
		// setParam.setBillPrcsSeq(getParam.getBillPrcsSeq()); /* 계산서처리순번 */
		// setParam.setVat(getParam.getVat()); /* 부가세 */
		// setParam.setIssuBillEvdcErlmDt(getParam.getIssuBillEvdcErlmDt()); /*
		// 발행계산서증빙등록일자 */
		// setParam.setIssuBillPrcsSeq(getParam.getIssuBillPrcsSeq()); /* 발행계산서처리순번 */
		// setParam.setDfrmFeePrcaEclsYn(getParam.getDfrmFeePrcaEclsYn()); /*
		// 지급수수료원금제외여부 */
		// setParam.setDfrmFeeClmObjtAmt(getParam.getDfrmFeeClmObjtAmt()); /*
		// 지급수수료청구대상금액 */
		// setParam.setMrdpFeeAmt(getParam.getMrdpFeeAmt()); /* 중도상환수수료금액 */
		// setParam.setChckIssuIsttName(getParam.getChckIssuIsttName()); /* 수표발행기관명 */
		// setParam.setMrdpYn(getParam.getMrdpYn()); /* 중도상환여부 */
		// setParam.setRctmDt(getParam.getRctmDt()); /* 입금일자 */
		// setParam.setTrObjtBsnNo(getParam.getTrObjtBsnNo()); /* 거래대상기업체번호 */
		// setParam.setNoprErngEtcAmt(getParam.getNoprErngEtcAmt()); /* 영업외수익기타금액 */
		// setParam.setNoprCostEtcAmt(getParam.getNoprCostEtcAmt()); /* 영업외비용기타금액 */
		// setParam.setRcvbRstrYn(); /* 미수환원여부 */
		// setParam.setRcvbYn(); /* 미수여부 */
		setParam.setHndEmpno(facade.getDetails().getEno()); /* 조작사원번호 */
		setParam.setHndTmnlNo(""); /* 조작단말기번호 */
		setParam.setHndTrId(""); /* 조작거래ID */
		setParam.setGuid(""); /* GUID */

		return setParam;
	}

	/**
	 * 수납내역매핑
	 * 
	 * @param  get348Data
	 * @return
	 */
	private IBIMS420BDTO set420b(IBIMS348BVO get348Data) {

		IBIMS420BVO setParam = new IBIMS420BVO();

		setParam.setPrdtCd(get348Data.getPrdtCd()); /* 상품코드 */
		// setParam.setTrSn(get348Data.getTrSn()); /* 거래일련번호 */
		setParam.setExcSn(get348Data.getExcSn()); /* 실행일련번호 */
		setParam.setFeeSn(get348Data.getFeeSn()); /* 수수료일련번호 */
		setParam.setEprzCrdlRgstSttsCd(get348Data.getRgstSttsCd()); /* 기업여신등록상태코드 */
		setParam.setEprzCrdlFeeKndCd(get348Data.getFeeKndCd()); /* 기업여신수수료종류코드 */
		setParam.setEprzCrdlFeeStdrAmt(get348Data.getFeeStdrAmt()); /* 기업여신수수료기준금액 */
		setParam.setFeeTrgtCtns(get348Data.getFeeTrgtCtns()); /* 수수료대상내용 */
		setParam.setFeeRt(get348Data.getFeeRt()); /* 수수료율 */
		setParam.setFeeAmt(get348Data.getFeeAmt()); /* 수수료금액 */
		setParam.setIfrsFeeRcogDcd(get348Data.getIfrsFeeRcogDcd()); /* IFRS수수료인식구분코드 */
		setParam.setEprzCrdlFeeRcogDcd(get348Data.getFeeRcogDcd()); /* 기업여신수수료인식구분코드 */
		setParam.setSplmTxa(new BigDecimal(0)); /* 부가세액 */
		setParam.setFeeTxtnYn(get348Data.getFeeTxtnYn()); /* 수수료과세여부 */
		setParam.setEprzCrdlTxtnTpDcd(get348Data.getTxtnTpDcd()); /* 기업여신과세유형구분코드 */
		setParam.setFnnrPrlnRto(get348Data.getFnnrPrlnRto()); /* 재무이연비율 */
		setParam.setFnnrRcogStrtDt(get348Data.getFnnrRcogStrtDt()); /* 재무인식시작일자 */
		setParam.setFnnrRcogEndDt(get348Data.getFnnrRcogEndDt()); /* 재무인식종료일자 */
		setParam.setFnnrPrlnPrdDnum(get348Data.getFnnrPrlnPrdDnum()); /* 재무이연기간일수 */
		setParam.setMngmPrlnRto(get348Data.getMngmPrlnRto()); /* 관리이연비율 */
		setParam.setMngmRcogStrtDt(get348Data.getMngmRcogStrtDt()); /* 관리인식시작일자 */
		setParam.setMngmRcogEndDt(get348Data.getMngmRcogEndDt()); /* 관리인식종료일자 */
		setParam.setMngmPrlnPrdDnum(get348Data.getMngmPrlnPrdDnum()); /* 관리이연기간일수 */
		setParam.setDtmRcogAmt(new BigDecimal(0)); /* 일시인식금액 */
		setParam.setPrlnFee(get348Data.getPrlnFee()); /* 이연수수료 */
		setParam.setMngmDtmRcogAmt(new BigDecimal(0)); /* 관리일시인식금액 */
		setParam.setMngmPrlnFee(new BigDecimal(0)); /* 관리이연수수료 */
		setParam.setActsCd(get348Data.getActsCd()); /* 계정과목코드 */
		setParam.setRstrnPrdtCd(""); /* 환출상품코드 */
		setParam.setRstrnTrSn(0); /* 환출거래일련번호 */
		setParam.setRstrnFee(new BigDecimal(0)); /* 환출수수료 */
		setParam.setDcRt(new BigDecimal(0)); /* 할인율 */
		setParam.setHndEmpno(facade.getDetails().getEno()); /* 조작사원번호 */
		setParam.setHndTmnlNo(""); /* 조작단말기번호 */
		setParam.setHndTrId(""); /* 조작거래ID */
		setParam.setGuid(""); /* GUID */

		return setParam;
	}

} // class end