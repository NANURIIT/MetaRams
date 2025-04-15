package com.nanuri.rams.com.calculation;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS204BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.IBIMS991BVO;
import com.nanuri.rams.business.common.vo.TB06015OVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class Calculation {

	/* 여신실행금리기본 */
	@Autowired
	private final IBIMS404BMapper ibims404BMapper;
	/* 기준일자정 */
	@Autowired
	private final IBIMS991BMapper ibims991BMapper;
	/* 이자계산 기본정보 */
	@Autowired
	private final IBIMS402BMapper ibims402BMapper;
	/* 이자계산 원금/이자상환 계획 정보 */
	@Autowired
	private final IBIMS403BMapper ibims403bMapper;
	/* 중도상환수수료율 정보 */
	@Autowired
	private final IBIMS204BMapper ibims204bMapper;

	/**
	 * 원금스케쥴 및 원금계산
	 * @param inCalcDTO
	 * @return
	 */
	public List<CalculationResultDTO> prnaCalculation(CalculationDTO inCalcDTO) {
		
		BigDecimal loanBalanceTotal = BigDecimal.ZERO;				//대출원금합계	
		
		// 원금상환스케줄 생성
		inCalcDTO.setSeqFst(0);
		List<LoanData> prnaSchList = prnaRdmpSchedule(inCalcDTO);
		BigDecimal monthlyPayment = BigDecimal.ZERO;

		int changeLoanCnt = 0;
		double oldAplyIntrt = 0d;
		double dIntrt = 0d;
		BigDecimal MonthlyPaymentTotal = BigDecimal.ZERO; 		// 균등상환금액
		BigDecimal bfBalance = inCalcDTO.getDealExcAmt();		// 원금잔액 == 대출금액			

		List<CalculationResultDTO> prnaCalcRstDTOList = new ArrayList<>();
		for(int i = 0 ; i < prnaSchList.size() ; i++){
			
			LoanData itm = prnaSchList.get(i);
			CalculationResultDTO prnaCalcRstDTO = new CalculationResultDTO();

			
			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inCalcDTO.getPrdtCd());
			inParm.setExcSn(inCalcDTO.getExcSn());
			inParm.setAplyStrtDt(itm.getStrtDt());
			inParm.setAplyEndDt(itm.getEndDt());
			
			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";
			
			// 금리구간 Loop
			for(int w=0; w<out404.size(); w++) 
			{
			
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(w);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				dIntrt = ibItem.getAplyIntrt();
				itm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
				if(oldAplyIntrt != aplyIntrt) {
					oldAplyIntrt = aplyIntrt;
					changeLoanCnt = (i==1)?prnaSchList.size():(prnaSchList.size()-i);
				} 
				
				double monthlyRate = aplyIntrt/(12.0/inCalcDTO.getPrnaRdmpFrqcMnum());

				log.debug("12/inCalcDTO.getPrnaRdmpFrqcMnum(): " + 12/inCalcDTO.getPrnaRdmpFrqcMnum());
				log.debug("aplyIntrt: " + aplyIntrt);
				log.debug("inCalcDTO.getPrnaRdmpFrqcMnum(): " + inCalcDTO.getPrnaRdmpFrqcMnum());
				
				if("02".equals(inCalcDTO.getPaiRdmpDcd())) {
					
					// 원리금계산1 => 대출금액*이자율/12
					BigDecimal eqltRdptAmtCal1 = inCalcDTO.getDealExcAmt().multiply(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP));			
					// 원리금계산2 => (1+이자율/12)^총회차
					BigDecimal eqltRdptAmtCal2 = (BigDecimal.ONE.add(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP))).pow(changeLoanCnt);
					// 원리금계산3 => (1+이자율/12)^총회차-1
					BigDecimal eqltRdptAmtCal3 = (BigDecimal.ONE.add(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP)).pow(changeLoanCnt).subtract(BigDecimal.ONE));
											
					/*
					 * 원리금계산 => 대출금액*이자율/12*(1+이자율/12)^총회차/((1+이자율/12)^총회차-1)
					 * 원리금계산 => 원리금계산1 * 원리금계산2 / 원리금계산3
					 * 위 두식은 같은것임 식별하기 쉽게하기 위하여 나누어 표현함    
					 */
					MonthlyPaymentTotal = eqltRdptAmtCal1.multiply(eqltRdptAmtCal2).divide(eqltRdptAmtCal3, 9, RoundingMode.HALF_UP);
					
				} else {
					monthlyPayment = inCalcDTO.getDealExcAmt().divide(new BigDecimal(prnaSchList.size()), 9, RoundingMode.HALF_UP);
				}
				
				String strtDt = "";
				String endDt = "";
				
				if(itm.getStrtDt().compareTo(ibItem.getAplyStrtDt()) >= 0) 
				{
					strtDt = itm.getStrtDt();
				} else {
					strtDt = ibItem.getAplyStrtDt();
				}
				if(itm.getEndDt().compareTo(ibItem.getAplyEndDt()) <= 0) 
				{
					endDt = itm.getEndDt();
				} else {
					endDt = ibItem.getAplyEndDt();
				}
				
				if(strtDt.substring(0, 4).equals(endDt.substring(0, 4))) {
					
					ddCnt = DateUtil.dateDiff(strtDt, endDt)+1; // 일수계산
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(itm.getDfrType()) && "LST_SEC".equals(itm.getSectionType())) {	// 마지막회차
//							ddCnt--;
							; 
						}
					}
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));

					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(monthlyRate).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
					
						
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = DateUtil.dateDiff(strtDt, strLstDt)+1; 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;	

					log.debug("inCalcDTO.getIntrDnumClcMthCd() : " + inCalcDTO.getIntrDnumClcMthCd());	
					log.debug("monthlyRate : " + monthlyRate);	
					log.debug("bfBalance : " + bfBalance);	
					log.debug("dayRate: " + dayRate);

					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(monthlyRate).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", endDt)+1;
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(itm.getDfrType()) && "LST_SEC".equals(itm.getSectionType())) {	// 마지막회차
//							ddCnt2--;
							;
						}
					}						
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
	
					actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;				
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(monthlyRate).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));

				}
				
			}	//	end for
			
			// input dto data setting
			prnaCalcRstDTO.setScxDcd("02");
			prnaCalcRstDTO.setRdmpTmrd(Integer.toString(i+1));

			String stdrDt = DateUtil.dayAdd(itm.getEndDt(),1);
			String prarDt = ibims991BMapper.getPrarDt(stdrDt);

			//prnaCalcRstDTO.setPrarDt(DateUtil.dayAdd(itm.getEndDt(),1));

			prnaCalcRstDTO.setPrarDt(prarDt);
			
			if("02".equals(inCalcDTO.getPaiRdmpDcd())) {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal.subtract(monthlySubInterest)));
				prnaCalcRstDTO.setPrarRdmpAmt(MonthlyPaymentTotal);	// 원리금균등만..
				prnaCalcRstDTO.setRdmpPrarIntr(monthlySubInterest);	// 원리금균등만..
			} else if("04".equals(inCalcDTO.getPaiRdmpDcd())) {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), inCalcDTO.getDealExcAmt()));				
			} else {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlyPayment));
			}
			prnaCalcRstDTO.setStrtDt(itm.getStrtDt());
			prnaCalcRstDTO.setEndDt(itm.getEndDt());
			prnaCalcRstDTO.setAplyIrt(new BigDecimal(dIntrt));

			//prnaCalcRstDTO.setBfBalance(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), bfBalance));
			
			// 납입원금누계
			loanBalanceTotal = loanBalanceTotal.add(MonthlyPaymentTotal.subtract(monthlySubInterest));				
			if(i == 1) {
				bfBalance = inCalcDTO.getDealExcAmt().subtract(MonthlyPaymentTotal.subtract(monthlySubInterest));	
			} else { 
				bfBalance = inCalcDTO.getDealExcAmt().subtract(loanBalanceTotal);	
			}

			prnaCalcRstDTOList.add(prnaCalcRstDTO);
		} // for end

		for(int i=0; i < prnaCalcRstDTOList.size(); i++){

			CalculationResultDTO prnaCalcRsltDTO = prnaCalcRstDTOList.get(i);

			BigDecimal PrarPrnaAmt = BigDecimal.ZERO;

			for(int v = 0 ; v < prnaCalcRstDTOList.size() ; v++) {
				
				CalculationResultDTO prnaItem = prnaCalcRstDTOList.get(v);
				
				if(prnaCalcRsltDTO.getEndDt().compareTo(prnaItem.getEndDt()) > 0) {
					PrarPrnaAmt = PrarPrnaAmt.add(prnaItem.getPrarPrna());	// 예정언금
				} else {
					break;
				}
			}

			bfBalance = inCalcDTO.getDealExcAmt().subtract(PrarPrnaAmt);

			prnaCalcRsltDTO.setBfBalance(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), bfBalance));

		}
	
		return prnaCalcRstDTOList;
		
	}
	
	/**
	 * 원금에 따른 이자금액 계산
	 * @param inCalcDTO
	 * @param prnaCalcRstDTOList
	 * @return
	 */
	public List<CalculationResultDTO> intrCalculation(CalculationDTO inCalcDTO
			                                        , List<CalculationResultDTO> prnaCalcRstDTOList) {
		
		// 이자상환스케줄 생성
		int dfrSize = 0;
		int intrSize = 0;
		
		List<LoanData> intrSchList = new ArrayList<LoanData>();
		List<LoanData> intrSchList2  = new ArrayList<LoanData>();
		if(!"".equals(inCalcDTO.getDfrExpDt())) { 
			intrSchList = dfrSchedule(inCalcDTO);
			intrSchList2 = intrRdmpSchedule(inCalcDTO);
			dfrSize = intrSchList.size();
			intrSize = intrSchList2.size();
			intrSchList.addAll(intrSchList2);
		} else {
			intrSchList = intrRdmpSchedule(inCalcDTO);
			intrSize = intrSchList.size();
		}
		inCalcDTO.setDfrCnt(dfrSize);	
		inCalcDTO.setBaseCnt(intrSize);
		
		
		int changeLoanCnt = 0;
		double oldAplyIntrt = 0d;
		double dIntrt = 0d;
		BigDecimal bfBalance = inCalcDTO.getDealExcAmt();		// 원금잔액 == 대출금액		
				
		List<CalculationResultDTO> intrCalcRstDTOList = new ArrayList<>();
		for(int i = 0 ; i < intrSchList.size() ; i++){
			
			LoanData item = intrSchList.get(i);				
			CalculationResultDTO intrCalcRstDTO = new CalculationResultDTO();

			// 원금스케줄
			BigDecimal PrarPrnaAmt = BigDecimal.ZERO;
		
			for(int v = 0 ; v < prnaCalcRstDTOList.size() ; v++) {
				
				CalculationResultDTO prnaItem = prnaCalcRstDTOList.get(v);
				
				if(item.getEndDt().compareTo(prnaItem.getEndDt()) > 0) {
					PrarPrnaAmt = PrarPrnaAmt.add(prnaItem.getPrarPrna());	// 예정언금
				} else {
					break;
				}
			}

			bfBalance = inCalcDTO.getDealExcAmt().subtract(PrarPrnaAmt);
			
			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inCalcDTO.getPrdtCd());
			inParm.setExcSn(inCalcDTO.getExcSn());
			inParm.setAplyStrtDt(item.getStrtDt());
			inParm.setAplyEndDt(item.getEndDt());

			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";
			
			// 금리구간 Loop
			for(int w=0; w<out404.size(); w++) 
			{
			
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(w);
				double aplyIntrt = ibItem.getAplyIntrt()/100;

				log.debug("aplyIntrt: " + aplyIntrt);

				dIntrt = ibItem.getAplyIntrt();
				item.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
				if(oldAplyIntrt != aplyIntrt) {
					oldAplyIntrt = aplyIntrt;
					changeLoanCnt = (i==1)?intrSchList.size():(intrSchList.size()-i);
				} 
				
					
				String strtDt = "";
				String endDt = "";
				
				if(item.getStrtDt().compareTo(ibItem.getAplyStrtDt()) >= 0) 
				{
					strtDt = item.getStrtDt();
				} else {
					strtDt = ibItem.getAplyStrtDt();
				}
				if(item.getEndDt().compareTo(ibItem.getAplyEndDt()) <= 0) 
				{
					endDt = item.getEndDt();
				} else {
					endDt = ibItem.getAplyEndDt();
				}
				
				if(strtDt.substring(0, 4).equals(endDt.substring(0, 4))) {
					
					ddCnt = DateUtil.dateDiff(strtDt, endDt)+1; // 일수계산
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt--;
							; 
						}
					}
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
					
						
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = DateUtil.dateDiff(strtDt, strLstDt)+1; 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", endDt)+1;
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt2--;
							;
						}
					}						
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
	
					actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
					
				}
				
			}	//	end for
			
			// input dto data setting
			intrCalcRstDTO.setScxDcd("04");
			intrCalcRstDTO.setRdmpTmrd(Integer.toString(i+1));

			String stdrDt = DateUtil.dayAdd(item.getEndDt(),1);
			String prarDt = ibims991BMapper.getPrarDt(stdrDt);

			//intrCalcRstDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));

			intrCalcRstDTO.setPrarDt(prarDt);
			intrCalcRstDTO.setPrarPrna(bfBalance);
			intrCalcRstDTO.setBfBalance(bfBalance);										
			intrCalcRstDTO.setStrtDt(item.getStrtDt());
			intrCalcRstDTO.setEndDt(item.getEndDt());
			intrCalcRstDTO.setRdmpPrarIntr(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlySubInterest));
			intrCalcRstDTO.setAplyIrt(new BigDecimal(dIntrt));
			
			intrCalcRstDTOList.add(intrCalcRstDTO);
			
		} // for end
		
		return intrCalcRstDTOList;
	}
	

	/**
	 * 이자상환 스케줄 생성
	 * @param inCalcDTO
	 * @return
	 */
	public List<LoanData> intrRdmpSchedule(CalculationDTO inCalcDTO) {
		
		List<LoanData> loanList = new ArrayList<LoanData>();
		
		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		String strRdmpSctn = null;		// 상환구간정보
		String DFR_TYPE = "INTRTYPE";	// 거치기간회차구분 INTRTYPE:이자상환 DEFTYPE:거치기간, BASETYPE:없는경우
		String SEC_TYPE = null;

		List<String> lpEndDtList = new ArrayList<String>();
		
		int intrRdmpFrqcMnum = inCalcDTO.getIntrRdmpFrqcMnum();	// 이자상환주기개월수
		
		boolean loopValue = true;
		int i = 0;
		do {
			
			i++;

			log.debug("intrRdmpSchedule " + i + "회차");

			LoanData lnItm = new LoanData();
			
			lnItm.setSeq(i+inCalcDTO.getSeqFst());			
			if(lnItm.getSeq() == 1) {
				lpStrDt = inCalcDTO.getExcDt();	// 대출실행일자
			} else {
				// N회차부터는 +1
				if(!"".equals(inCalcDTO.getDfrExpDt())) {
					// 거치기간만기일자가 존재하면 거치기간만기일자를 시작일자로 설정
					if((inCalcDTO.getSeqFst()+1) == lnItm.getSeq()) {
						// 분할상환 구간에 첫번째 회차인경우만
						lpStrDt = inCalcDTO.getDfrExpDt();
					} else {
						lpStrDt = DateUtil.dayAdd(lpEndDt, 1); 
					}
				} else {
					lpStrDt = DateUtil.dayAdd(lpEndDt, 1);  
				}
			}

			// 상환구간지정
			if(i % intrRdmpFrqcMnum == 0) {
				strRdmpSctn = "INTR_RDMP_SCTN";	// 이자상환구간
			} else {
				strRdmpSctn = "OTHER_SCTN";		// 상환구간아님
			}
			//lpEndDt = dateAdd(lpStrDt, inCalcDTO.getIntrRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());	// 적용일자(시작일자)+이자상환개월수+이자상환주기

			if(i == 1){
				lpEndDt = dateAdd(lpStrDt, inCalcDTO.getIntrRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());	// 적용일자(시작일자)+이자상환개월수+이자상환주기
			}else{

				log.debug("lpStrDt Month : " + lpStrDt.substring(0, 6));
				log.debug("lpEndDt before loop : " + lpEndDtList.get(i-2).substring(0, 6));

				if(lpStrDt.substring(0, 6).compareTo(lpEndDtList.get(i-2).substring(0, 6)) > 0){
					log.debug("CASE 01");
					log.debug("lpStrDt after motnAdd -1 : " + DateUtil.monthAdd(lpStrDt, -1));
					lpEndDt = dateAdd(DateUtil.monthAdd(lpStrDt, -1), inCalcDTO.getIntrRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());

				}else{
					log.debug("CASE 02");

					lpEndDt = dateAdd(lpEndDt, inCalcDTO.getIntrRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());
				}

			}

			lpEndDtList.add(lpEndDt);

			// 만기일자보다 종료일자가 크다면 마지막 LOOP
			if(inCalcDTO.getExpDt().compareTo(DateUtil.dayAdd(lpEndDt,1)) <= 0) {
				loopValue = false;	// 마지막LOOP처리
				SEC_TYPE = "LST_SEC";
				lpEndDt = inCalcDTO.getExpDt();
			} else {
				if(lnItm.getSeq() == 1) {
					SEC_TYPE = "FST_SEC";
				} else {
					SEC_TYPE = "ING_SEC";
				}
			}
			lnItm.setLoanBalance(inCalcDTO.getDealExcAmt());
			lnItm.setPaiRdmpDcd(inCalcDTO.getPaiRdmpDcd());
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(getBasDt(inCalcDTO, lpEndDt));
			lnItm.setRdmpSctn(strRdmpSctn); // BOTH_SCTN : 원금이자 모두 상환, PRNA_RDMP_SCTN:원금상환, INTR_RDMP_SCTN:이자상환, OTHER_SCTN : 대상아님, DFR_SCTN : 거치기간
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);
			
			loanList.add(lnItm);

			if(i>700) {
				log.debug(">===========================================================<");
				log.debug(">======================== 무한루프방지 ========================<");
				log.debug(">===========================================================<");
				loopValue = false;
			}
						
		} while (loopValue);
		
		return loanList;
	}
			


	/**
	 * 거치기간 스케줄 생성
	 * @param inSvo
	 * @return
	 */
	public List<LoanData> dfrSchedule(CalculationDTO inCalcDTO) {
		
		List<LoanData> loanList = new ArrayList<LoanData>();
		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		String strRdmpSctn = null;		// 상환구간정보
		
		String DFR_TYPE = "DEFTYPE";	// 거치기간타입
		String SEC_TYPE = null;			// 첫번째회차인지 마지막회차인지 구분
		double ddCnt = 0l;
		
		boolean loopValue = true;		//do while 반복문 반복조건 

		int i = 0;

		do {
			
			i++;

			log.debug("dfrSchedule " + i + "회차");

			LoanData lnItm = new LoanData();
			
			lnItm.setSeq(i);				//회차			
			if(lnItm.getSeq() == 1) {
				lpStrDt = inCalcDTO.getExcDt();	// 대출실행일자
			} 
			else {
				lpStrDt = DateUtil.dayAdd(lpEndDt, 1); //대출실행일자에 1일 더하기
			}

			lpEndDt = dateAdd(lpStrDt, inCalcDTO.getIntrRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());	// 적용일자(시작일자)+이자상환주기
			strRdmpSctn = "DFR_SCTN";	// 거치구간
			
			// 만기일자보다 종료일자가 크다면 마지막 LOOP
			if(inCalcDTO.getDfrExpDt().compareTo(DateUtil.dayAdd(lpEndDt,1)) <= 0) {
				loopValue = false;	// 마지막LOOP처리
				SEC_TYPE = "LST_SEC";
				lpEndDt = inCalcDTO.getDfrExpDt();
			} else {
				if(lnItm.getSeq() == 1) {
					SEC_TYPE = "FST_SEC";
				} else {
					if(inCalcDTO.getExpDt().substring(0,6).compareTo(DateUtil.dayAdd(lpEndDt,1).substring(0,6)) == 0) {
						loopValue = false;	// 마지막LOOP처리
						SEC_TYPE = "LST_SEC";	
					} else {
						SEC_TYPE = "ING_SEC";
					}
				}
			}

			lnItm.setLoanBalance(inCalcDTO.getDealExcAmt());
			lnItm.setPaiRdmpDcd(inCalcDTO.getPaiRdmpDcd());
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(getBasDt(inCalcDTO, lpEndDt));
			lnItm.setRdmpSctn(strRdmpSctn); // BOTH_SCTN : 원금이자 모두 상환, PRNA_RDMP_SCTN:원금상환, INTR_RDMP_SCTN:이자상환, OTHER_SCTN : 대상아님, DFR_SCTN : 거치기간
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);
			
			loanList.add(lnItm);
			inCalcDTO.setSeqFst(lnItm.getSeq());

			log.debug(">===========================================================<");
			log.debug(">======================== 무한루프방지 ========================<");
			log.debug(">===========================================================<");
			
		} while (loopValue);
		return loanList;
	}
	
	
	
	
	/**
	 * 원금상환 스케줄 생성
	 * @param inCalcDTO
	 * @return
	 */
	public List<LoanData> prnaRdmpSchedule(CalculationDTO inCalcDTO) {
		
		List<LoanData> loanList = new ArrayList<LoanData>();
		
		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		String strRdmpSctn = null;		// 상환구간정보
		String DFR_TYPE = "PRNATYPE";	// 거치기간회차구분 PRNATYPE:원금상환 DEFTYPE:거치기간, BASETYPE:없는경우
		String SEC_TYPE = null;
		
		List<String> lpEndDtList = new ArrayList<String>();

		int prnaRdmpFrqcMnum = inCalcDTO.getPrnaRdmpFrqcMnum();	// 원금상환주기개월수
		
		boolean loopValue = true;
		int i = 0;
		do {
			
			i++;

			// log.debug("prnaRdmpSchedule" + i + "회차");
			// log.debug("DfrExpDt: " + inCalcDTO.getDfrExpDt());
			// log.debug("ExcDt: " + inCalcDTO.getExcDt());
			// log.debug("ExpDt: " + inCalcDTO.getExpDt());
			// log.debug("PrnaRdmpFrqcMnum(원금상환주기개월수): " + inCalcDTO.getPrnaRdmpFrqcMnum());
			// log.debug("getIntrPymDtCd(이자납입일자코드): " + inCalcDTO.getIntrPymDtCd());

			LoanData lnItm = new LoanData();
			
			lnItm.setSeq(i);
			if(lnItm.getSeq() == 1) {
				if(!"".equals(inCalcDTO.getDfrExpDt())) {
					lpStrDt = inCalcDTO.getDfrExpDt();
				} else {
					log.debug("###########거치만기일자 없음###########");
					lpStrDt = inCalcDTO.getExcDt();	// 대출실행일자
				}
			} else {
				lpStrDt = DateUtil.dayAdd(lpEndDt, 1);  
			}

			log.debug("lpStrDt: " + lpStrDt);
			log.debug("lpEndDt: " + lpEndDt);

			if("04".equals(inCalcDTO.getPaiRdmpDcd())) {
				strRdmpSctn = "PRNA_RDMP_SCTN";	// 원금상환구간
				lpEndDt = inCalcDTO.getExpDt();
			} else {
				// 상환구간지정
				if(i % prnaRdmpFrqcMnum == 0) {
					strRdmpSctn = "PRNA_RDMP_SCTN";	// 원금상환구간
				} else {
					strRdmpSctn = "OTHER_SCTN";		// 상환구간아님
				}
				
				if(i == 1){
					lpEndDt = dateAdd(lpStrDt, inCalcDTO.getPrnaRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());	// 적용일자(시작일자)+원금상환개월수+이자상환주기
				}else{

					log.debug("lpStrDt Month : " + lpStrDt.substring(0, 6));
					log.debug("lpEndDt before loop : " + lpEndDtList.get(i-2).substring(0, 6));

					if(lpStrDt.substring(0, 6).compareTo(lpEndDtList.get(i-2).substring(0, 6)) > 0){
						log.debug("CASE 01");
						log.debug("lpStrDt after motnAdd -1 : " + DateUtil.monthAdd(lpStrDt, -1));
						lpEndDt = dateAdd(DateUtil.monthAdd(lpStrDt, -1), inCalcDTO.getPrnaRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());

					}else{
						log.debug("CASE 02");

						lpEndDt = dateAdd(lpEndDt, inCalcDTO.getPrnaRdmpFrqcMnum(), inCalcDTO.getIntrPymDtCd());
					}

				}
				
					
				
				
				lpEndDtList.add(lpEndDt);
				
				
			}

			//log.debug("lpEndDt: " + lpEndDt);
			log.debug("expDt: " + inCalcDTO.getEndDt());
			log.debug("lpEndDt : " + lpEndDt);

			// 만기일자보다 종료일자가 크다면 마지막 LOOP
			if(inCalcDTO.getExpDt().compareTo(DateUtil.dayAdd(lpEndDt,1)) <= 0) {
				log.debug("#####################last loop#####################");

				loopValue = false;	// 마지막LOOP처리
				SEC_TYPE = "LST_SEC";
				lpEndDt = inCalcDTO.getExpDt();
			} else {
				if(lnItm.getSeq() == 1) {
					SEC_TYPE = "FST_SEC";
				} else {
					// if(inCalcDTO.getExpDt().substring(0,6).compareTo(DateUtil.dayAdd(lpEndDt,1).substring(0,6)) == 0) {
					// //if(inCalcDTO.getExpDt().compareTo(DateUtil.dayAdd(lpEndDt, 1)) == 0){
					// 	loopValue = false;	// 마지막LOOP처리
					// 	SEC_TYPE = "LST_SEC";	
					// } else {
						SEC_TYPE = "ING_SEC";
					//}
				}
			}
			lnItm.setLoanBalance(inCalcDTO.getDealExcAmt());
			lnItm.setPaiRdmpDcd(inCalcDTO.getPaiRdmpDcd());
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(getBasDt(inCalcDTO, lpEndDt));
			lnItm.setRdmpSctn(strRdmpSctn); // BOTH_SCTN : 원금이자 모두 상환, PRNA_RDMP_SCTN:원금상환, INTR_RDMP_SCTN:이자상환, OTHER_SCTN : 대상아님, DFR_SCTN : 거치기간
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);
				
			loanList.add(lnItm);

			if(i>30) {
				log.debug(">==================================================================<");
				log.debug(">======================== 무한루프방지(테스트용) ========================<");
				log.debug(">==================================================================<");
				loopValue = false;
			}

						
		} while (loopValue);
		
		return loanList;
	}
	
	/**
	 * 
	 * @param inCalcDTO
	 * @return
	 */
	public BigDecimal calcIntrValue(CalculationDTO inCalcDTO) {

		double dayRate = 0d;
		double ovduIntrRate = inCalcDTO.getOvduIntrRt()/(12/inCalcDTO.getIntrRdmpFrqcMnum());
		int ddCnt = DateUtil.dateDiff(inCalcDTO.getStrtDt(), inCalcDTO.getEndDt())+1; // 일수계산
		int actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), inCalcDTO.getEndDt());
		dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType2;				
		return ((inCalcDTO.getDealExcAmt().multiply(new BigDecimal(ovduIntrRate).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
		
	}
	/**
	 * 기준일자에 이자상환주기(개월) 더하기
	 * baseDt 기준일자, iAddCnt 추가일수, intrPymDtCd 이자납입일
	 * 
	 * @param baseDt 기준일자
	 * @param intrRdmpFrqcMnum 이자상환주기(개월)
	 * @param intrPymDtCd      이자납입일
	 * @return
	 */
	public String dateAdd(String baseDt
			            , int rdmpFrqcMnum 		/* 상환주기개월수 */
			            , String intrPymDtCd	/* 이자납입일자코드 */
			            ) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String baseMaxDay = null;
		String baseCalcDate = null;
		String rtnValue = null;
		String rinkDate = null;
		

		log.debug("baseDt : " + baseDt);
		log.debug("rdmpFrqcMnum: " + rdmpFrqcMnum);
		log.debug("intrPymDtCd: " + intrPymDtCd);

		try {
			
			String lastMaxDay;
			if("99".equals(intrPymDtCd)) {

				//log.debug("Case One");

				lastMaxDay = DateUtil.lastDate(baseDt).substring(6,8);
			} else {

				//log.debug("Case Two");

					lastMaxDay = intrPymDtCd;
				
			}

			log.debug("lastMaxDay: " + lastMaxDay);
			
			Date baseDate = dateFormat.parse(baseDt.substring(0,6).concat(lastMaxDay));

			Calendar baseCalendar = Calendar.getInstance();
			Calendar maxCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			
			baseCalendar.add(Calendar.DATE, -1);	
			baseCalcDate = dateFormat.format(baseCalendar.getTime());
			
			Date maxCalcDate = dateFormat.parse(baseCalcDate);
			maxCalendar.setTime(maxCalcDate);
			maxCalendar.set(Calendar.DATE, maxCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			baseMaxDay = dateFormat.format(maxCalendar.getTime());	

			if(("99".equals(intrPymDtCd)||baseMaxDay.substring(6, 8).equals(intrPymDtCd))
			 ||(baseMaxDay.substring(6, 8).compareTo(intrPymDtCd) <= 0)) {

				baseCalendar.add(Calendar.MONTH, rdmpFrqcMnum);
				baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));		
				rtnValue = dateFormat.format(baseCalendar.getTime());
				
			} else {

				
				baseCalendar.add(Calendar.MONTH, rdmpFrqcMnum);				
				if(baseCalcDate.substring(6, 8).compareTo(intrPymDtCd) > 0) {
					// 말일자가 아닌데 이자납입일이 기준일자를 지난경우 1+MONTH 처리
					baseCalendar.add(Calendar.MONTH, rdmpFrqcMnum+1);
					
					rinkDate = dateFormat.format(baseCalendar.getTime());
					rtnValue = rinkDate; 
				} else {
					rinkDate = dateFormat.format(baseCalendar.getTime());
					rtnValue = rinkDate; 
				}
			}
									
		} catch (ParseException e) {
			e.printStackTrace();
		}

		// String lastMaxDay = "";

		// if("99".equals(intrPymDtCd)) {

		// 	lastMaxDay = DateUtil.lastDate(baseDt).substring(6,8);
		// } else {

		// 	if(intrPymDtCd.length() == 1){
		// 		lastMaxDay = "0" + intrPymDtCd;
		// 	}else{
		// 		lastMaxDay = intrPymDtCd;
		// 	}

			

		// }

		// String rtnMonth = "";

		// baseCalcDate = DateUtil.dayAdd(baseDt, -1);

		// if(("99".equals(intrPymDtCd)||lastMaxDay.equals(intrPymDtCd))
		// 	||(lastMaxDay.compareTo(intrPymDtCd) <= 0)) {

		// 	// baseCalendar.add(Calendar.MONTH, rdmpFrqcMnum);
		// 	rtnMonth = DateUtil.monthAdd(baseDt, rdmpFrqcMnum);
		// 	//baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));		
		// 	rtnValue = rtnMonth.substring(0, 6) + lastMaxDay;
			
		// } else {

		// 	//baseCalendar.add(Calendar.MONTH, rdmpFrqcMnum);		
		// 	rtnMonth = DateUtil.monthAdd(baseDt, rdmpFrqcMnum);		
		// 	if(baseCalcDate.substring(6, 8).compareTo(intrPymDtCd) > 0) {
		// 		// 말일자가 아닌데 이자납입일이 기준일자를 지난경우 1+MONTH 처리
		// 		rtnMonth = DateUtil.monthAdd(baseDt, rdmpFrqcMnum+1);
		// 		//baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));		
		// 		rtnValue = rtnMonth.substring(0, 6) + lastMaxDay;
		// 	} else {
		// 		//rinkDate = dateFormat.format(baseCalendar.getTime());
		// 		rtnValue = rtnMonth.substring(0, 6) + lastMaxDay;
		// 	}
		// }
		
		return rtnValue;
		
	}
	
	/**
	 * 이자계산종료일구분+휴일처리구분에 따른 일자반환
	 * @param inSvo
	 * @param basDt
	 * @return 적용일자
	 */
	public String getBasDt(CalculationDTO inCalcDTO, String basDt) {

		String rtnValue = "";
		IBIMS991BVO out991 = ibims991BMapper.getBsnDt(basDt);

		log.debug("basDt: "+ basDt);
		log.debug("!!!!!!!!!!!!!");
		
		if("01".equals(inCalcDTO.getIntrClcEndDeDcd())) {	// 이자계산종료일구분 01휴일처리구분적용, 02휴일포함

			if("01".equals(inCalcDTO.getHldyPrcsDcd())) {	// 휴일처리구분 01직후 02직전
				rtnValue = out991.getAfDt();
			} else {
				rtnValue = out991.getBfDt();
			}			
		} else {
			rtnValue = basDt;
		}
		
		return rtnValue;
		
	}

	
	/**
	 * 윤년인지 여부를 리턴
	 * @param year
	 * @return
	 */
	public String LeapYearCheck(String year) {
		
		String rtnValue = "N";
		GregorianCalendar gc = new GregorianCalendar();
		if(gc.isLeapYear(Integer.parseInt(year))) {
			rtnValue = "Y";
		} else 
		{
			rtnValue = "N";
		}
		
		return rtnValue;
	}
	
	
	/**
	 * 윤년여부에 따른 년수리턴
	 * @param LeapYearYn
	 * @return
	 */
	public int LeapYearF(String LeapYearYn) {
		
		return (LeapYearYn=="Y")?366:365;
		
	}	
		
	
	/**
	 * 일수계산벙법코드에 따라 년도에 계산될 일수를 반환한다.
	 * 일수계산방법코드 3은 actual 11은 366, 1과4sms 365 2는 360	
	 * @param clcType 일수계산벙법코드
	 * @param baseDt  
	 * @return 년일수
	 */
	public int actualYear(String clcType, String baseDt) {
		
		int rtnValue = 365;
		
		if(baseDt.length() < 4) {
			System.out.println("$$$$$$$$$$$$$ actualYear 날짜 오류 ###############");
			return Integer.parseInt(baseDt);
		} else {
			
			if(clcType.equals("1")) {
				rtnValue = 365;
			} else if(clcType.equals("2")) {
				rtnValue = 360;
			} else if(clcType.equals("3")) {
				rtnValue = LeapYearF(LeapYearCheck(baseDt.substring(0,4)));
			} else if(clcType.equals("4")) {
				rtnValue = 12;
			} else if(clcType.equals("11")) {
				rtnValue = 366;
			} else {
				rtnValue = 365;
			}
				
			
		}
		return rtnValue;
		
	}	
	
	
	/**
	  * 01@원단위절사
	  *	02@원단위절상
	  *	03@10원단위절사
	  *	04@10원단위절상
	  *	05@소숫점2자리절사
	  *	06@소숫점2자리절상
	  * 07@원미만절사
	  * 
	  * @param val
	  * @return
	  */
	 private BigDecimal process_down(String intrSnnoPrcsDcd, BigDecimal val) {
	    BigDecimal divideVal = BigDecimal.ONE;
	  	BigDecimal amt = BigDecimal.ZERO;
	  	if("01".equals(intrSnnoPrcsDcd)){
			divideVal = new BigDecimal("10");
			amt = val.divide(divideVal, 0, RoundingMode.DOWN).multiply(divideVal, MathContext.DECIMAL128);
		}else if("02".equals(intrSnnoPrcsDcd)){
			divideVal = new BigDecimal("10");
			amt = val.divide(divideVal, 0, RoundingMode.HALF_UP).multiply(divideVal, MathContext.DECIMAL128);
		}else if("03".equals(intrSnnoPrcsDcd)){
			divideVal = new BigDecimal("100");
			amt = val.divide(divideVal, 0, RoundingMode.DOWN).multiply(divideVal, MathContext.DECIMAL128);
		}else if("04".equals(intrSnnoPrcsDcd)){
			divideVal = new BigDecimal("100");
			amt = val.divide(divideVal, 0, RoundingMode.HALF_UP).multiply(divideVal, MathContext.DECIMAL128);
		}else if("05".equals(intrSnnoPrcsDcd)){
			amt = val.divide(divideVal, 2, RoundingMode.DOWN);
		}else if("06".equals(intrSnnoPrcsDcd)){
			amt = val.divide(divideVal, 2, RoundingMode.HALF_UP);
		}else if("07".equals(intrSnnoPrcsDcd)){
			amt = val.setScale(0, RoundingMode.DOWN);
		}else{
			amt = val;
		}	 
	  	return amt;
	}

	/** 이자계산 시뮬레이터 파라미터 세팅 
	 * @param calcDto 원금/이자상환 계획정보 / 금리정보 / 상환 기본정보 파라미터 
	 * @return  시뮬레이션 결과 LIST
	 */
	public List<CalculationResultDTO> setIntrCalcSimulation(TB06015SVO param){

		log.debug("<<<<<<<<setIntrCalcSimulation parameter check!!!>>>>>>>>");
		log.debug("param.prdtCd::"+param.getPrdtCd());
		log.debug("param.excSn::"+param.getExcSn());
		log.debug("param.stdrDt::"+param.getStdrDt());

		CalculationDTO calcDto = new CalculationDTO();

		//기본정보 set
		TB06015SVO svo = new TB06015SVO();
		svo = ibims402BMapper.getDetailInfo(param);

		//금리정보 set
		List<IBIMS404BVO> intrInfoList = ibims404BMapper.getIntrRateInfoList(param);
		svo.setIntrtInfoList(intrInfoList);

		//원금상환 계획 정보 set
		List<IBIMS403BDTO> rdmpPlanList = ibims403bMapper.getRdmpSchedule(param);
		svo.setRdmpPlanList(rdmpPlanList);

		//이자상환 계획 정보 set
		List<IBIMS403BDTO> intrPlanList = ibims403bMapper.getIntrSchedule(param);
		svo.setIntrtPlanList(intrPlanList);


		String dfrExpDt = "";

		if(svo.getDfrExpMnum() != 0){
			dfrExpDt = DateUtil.monthAdd(svo.getExcDt(), svo.getDfrExpMnum());
		}

		calcDto.setPaiRdmpDcd(svo.getPaiRdmpDcd());					//원금상환방법
		calcDto.setExcSn(param.getExcSn());
		calcDto.setExcDt(svo.getExcDt());							//신규일자
		calcDto.setExpDt(svo.getMtrtDt());							//만기일자
		calcDto.setStdrDt(param.getStdrDt());						//기준일자(예정일자)
		calcDto.setDealExcBlce(svo.getDealExcBlce());				//대출잔액
		calcDto.setIntrBnaoDcd(svo.getIntrBnaoDcd());				//이자선후취 구분
		calcDto.setEqlRdmpAmt(svo.getEqlRdmpAmt());					//균등상환금액
		calcDto.setIntrPymDtCd(svo.getIntrPymDtCd());				//이자납입일
		calcDto.setPrnaRdmpFrqcMnum(svo.getPrnaRdmpFrqcMnum());		//원금상환주기
		calcDto.setIntrRdmpFrqcMnum(svo.getIntrRdmpFrqcMnum());		//이자상환주기
		calcDto.setRcvbIntrAmt(svo.getRcvbIntrAmt());				//미수이자금액
		calcDto.setHldyPrcsDcd(svo.getHldyPrcsDcd());				//휴일처리구분
		calcDto.setDfrExpMnum(svo.getDfrExpMnum());					//거치기간
		calcDto.setDfrExpDt(dfrExpDt);								//거치만기일자
		calcDto.setIntrDnumClcMthCd(svo.getIntrDnumClcMthCd());		//이자일수 계산방법
		calcDto.setLastPrnaRdmpDt(svo.getLastPrnaRdmpDt());			//최종원금상환일자
		calcDto.setTfdLyAplyDcd(svo.getTfdLyAplyDcd());				//초일말일 적용구분
		calcDto.setIntrSnnoPrcsDcd(svo.getIntrSnnoPrcsDcd());		//이자단수법 구분
		calcDto.setNxtIntrPymDt(svo.getNxtIntrPymDt());				//다음이자 납입일자
		calcDto.setIntrClcEndDeDcd(svo.getIntrClcEndDeDcd());		//이자계산종료일 구분
		calcDto.setOvduIntrRtDcd(svo.getOvduIntrRtDcd());			//연체이자율 구분
		calcDto.setLastIntrClcDt(svo.getLastIntrClcDt());			//최종이자 계산일자
		calcDto.setIntrtInfoList(svo.getIntrtInfoList());			//금리정보 리스트
		calcDto.setDealMrdpPrca(param.getDealMrdpPrca());			//중도상환 원금
		calcDto.setMdwyRdmpFeeRto(svo.getMdwyRdmpFeeRto());			//중도상환 수수료율
		calcDto.setOvduIntrRt(svo.getOvduIntrRt());					//연체금리
		calcDto.setPrcsDt(svo.getPrcsDt());							//처리일자

		calcDto.setRdmpPlanList(rdmpPlanList);						//원금상환계획정보
		calcDto.setIntrtPlanList(intrPlanList);						//이자상환계획정보
		calcDto.setIntrtInfoList(intrInfoList);						//금리기본정보
		calcDto.setPrdtCd(param.getPrdtCd());

		if(param.getPostUrl() == null){
			calcDto.setRunCd("1");
		}else{
			if(param.getPostUrl().equals("TB07030S")){
				calcDto.setRunCd("2");
			}else{
				calcDto.setRunCd("1");
			}
		}

		// if(intrInfoList.size() < 0){
		// 	return null;
		// }

		List<CalculationResultDTO> returnList = getIntrCalcSimulation(calcDto);

		return returnList;
	}



	/** 이자계산 시뮬레이터 
	 * @param calcDto 원금/이자상환 계획정보 / 금리정보 / 상환 기본정보 파라미터 
	 * @return  시뮬레이션 결과 LIST
	 */
	public List<CalculationResultDTO> getIntrCalcSimulation(CalculationDTO calcDto){

		List<CalculationResultDTO> outList = new ArrayList<CalculationResultDTO>();				//전체 상환 리스트(반환값)

		List<CalculationResultDTO> prnaCalcList = new ArrayList<CalculationResultDTO>();		//원금상환 리스트
		List<CalculationResultDTO> intrCalcList = new ArrayList<CalculationResultDTO>();		//이자상환 리스트
		List<CalculationResultDTO> earlyRpList = new ArrayList<CalculationResultDTO>();			//중도상환 리스트
		List<CalculationResultDTO> earlyRpCalcList = new ArrayList<CalculationResultDTO>();		//중도상환수수료 계산 리스트
		List<CalculationResultDTO> ovduCalcList = new ArrayList<CalculationResultDTO>();		//연체상환 계산 리스트

		List<CalculationResultDTO> prnaCalcList2 = new ArrayList<>();
		List<CalculationResultDTO> intrCalcList2 = new ArrayList<>();

		log.debug(">>> 금리정보 [" + calcDto.getIntrtInfoList() + "] <<<");
		log.debug(">>> 대출잔액 dealExcBlce ["+calcDto.getDealExcBlce()+"] <<<");
		log.debug(">>> 이자선후취 intrBnaoDcd ["+calcDto.getIntrBnaoDcd()+"] <<<");
		log.debug(">>> 균등상환금액 eqlRdmpAmt ["+calcDto.getEqlRdmpAmt()+"] <<<");
		log.debug(">>> 이자납입일 intrPymDtCd ["+calcDto.getIntrPymDtCd()+"] <<<");
		log.debug(">>> 이자상환주기(개월) intrRdmpFrqcMnum ["+calcDto.getIntrRdmpFrqcMnum()+"] <<<");
		log.debug(">>> 휴일처리구분 hldyPrcsDcd ["+calcDto.getHldyPrcsDcd()+"] <<<");
		log.debug(">>> 원금상환주기 prnaRdmpFrqcMnum ["+calcDto.getPrnaRdmpFrqcMnum()+"] <<<");
		log.debug(">>> 거치기간 dfrExpMnum ["+calcDto.getDfrExpMnum()+"] <<<");
		log.debug(">>> 거치만기일자 dfrExpDt ["+calcDto.getDfrExpDt()+"] <<<");
		log.debug(">>> 이자일수계산방법 intrDnumClcMthCd ["+calcDto.getIntrDnumClcMthCd()+"] <<<");
		log.debug(">>> 최종원금상환일자 lastPrnaRdmpDt ["+calcDto.getLastPrnaRdmpDt()+"] <<<");
		log.debug(">>> 초일말일적용구분 tfdLyAplyDcd ["+calcDto.getTfdLyAplyDcd()+"] <<<");
		log.debug(">>> 이자단수법구분 intrSnnoPrcsDcd ["+calcDto.getIntrSnnoPrcsDcd()+"] <<<");
		log.debug(">>> 다음이자납입일자 nxtIntrPymDt ["+calcDto.getNxtIntrPymDt()+"] <<<");
		log.debug(">>> 이자계산종료일구분 intrClcEndDeDcd ["+calcDto.getIntrClcEndDeDcd()+"] <<<");
		log.debug(">>> 연체이자율구분 ovduIntrRtDcd ["+calcDto.getOvduIntrRtDcd()+"] <<<");
		log.debug(">>> 최종이자계산일자 lastIntrClcDt ["+calcDto.getLastIntrClcDt()+"] <<<");
		log.debug(">>> 신규일자 ExcDt ["+calcDto.getExcDt()+"] <<<");
		log.debug(">>> 만기일자 ExpDt ["+calcDto.getExpDt()+"] <<<");
		log.debug(">>> 기준일자(예정일자) stdrDt ["+calcDto.getStdrDt()+"] <<<");

		log.debug(">>> 중도상환원금 dealMrdpPrca [" + calcDto.getDealMrdpPrca() + "]");
		log.debug(">>> 중도상환수수료율 mdwyRdmpFeeRto [" + calcDto.getMdwyRdmpFeeRto() + "]");

		if(calcDto.getRdmpPlanList().size() > 0){ 

			// List<IBIMS403BDTO> scdList = new ArrayList<IBIMS403BDTO>();		//중도상환 여부 판별용 상환계획정보 list
			List<IBIMS403BDTO> prnaScdlList = calcDto.getRdmpPlanList();
			List<IBIMS403BDTO> intrScdlList = calcDto.getIntrtPlanList();

			//log.debug("intrScdlList{}", intrScdlList);

			log.debug("calcDto.getDealMrdpPrca:::" + calcDto.getDealMrdpPrca());

			if(calcDto.getDealMrdpPrca() == null || calcDto.getDealMrdpPrca().compareTo(BigDecimal.ZERO) == 0){
				log.debug("#########중도상환 발생 X#########");
			}else{
				log.debug("#########중도상환 발생 O#########");

				prnaCalcList = listTypeSett2(calcDto, prnaScdlList);

				//log.debug("\n prnaCalcList ::: {}", prnaCalcList);

				//earlyRpCalcList = earlyRpnaCalc(calcDto, prnaCalcList);

				earlyRpCalcList = mdwyRdmpFeeCalc(calcDto, prnaCalcList);

				prnaCalcList2.addAll(prnaCalcList);
				// intrCalcList2 = intrCalc(calcDto, prnaCalcList2, intrScdlList);
				intrCalcList2 = listTypeSett(calcDto, intrScdlList);

				// log.debug("\n prnaCalcList2 ::: {}", prnaCalcList2);
				// log.debug("\n intrCalcList2 ::: {}", intrCalcList2);
			}

			prnaCalcList = listTypeSett(calcDto, prnaScdlList);

			//intrCalcList = intrCalc(calcDto, prnaCalcList, intrScdlList);
			intrCalcList = listTypeSett(calcDto, intrScdlList);

			log.debug("intrCalcList ::: {} ", intrCalcList);

			// if(earlyRpCalcList.size() > 0){

			// }

			//intrCalcList2 = intrCalcList;

			prnaCalcList = throwAfterBaseDt(calcDto, prnaCalcList);
			intrCalcList = throwAfterBaseDt(calcDto, intrCalcList);


		}else{//원금상환계획정보 파라미터에 없으면
			log.debug("#########원금상환 계획 정보 없음!!#############");

		}

		outList.addAll(prnaCalcList);
		outList.addAll(intrCalcList);

		//연체 리스트
		ovduCalcList = overduePrnaCalc(calcDto, outList);

		//outList.addAll(earlyRpList);
		outList.addAll(ovduCalcList);
		//outList.addAll(earlyRpCalcList);

		List<CalculationResultDTO> earlyIntrList = new ArrayList<>();

		log.debug("!!!!earlyRpCalcList.size() ::::" + earlyRpCalcList.size());

		if(earlyRpCalcList.size() > 0){
			log.debug("1번시나리오~~~");
			outList.addAll(earlyRpCalcList);

			// earlyIntrList = intrCalcWhenMdwy(calcDto, earlyRpCalcList, intrCalcList);
			// outList.addAll(earlyIntrList);

			List<IBIMS403BDTO> scdList = new ArrayList<IBIMS403BDTO>();
			List<IBIMS403BDTO> prnaScdlList = calcDto.getRdmpPlanList();
			List<IBIMS403BDTO> intrScdlList = calcDto.getIntrtPlanList();

			scdList.addAll(prnaScdlList);
			scdList.addAll(intrScdlList);

			calcDto.setDealMrdpPrca(listTypeSett2(calcDto, scdList).get(0).getPrarPrna());

			List<CalculationResultDTO> frstPrnaList = earlyRpnaCalc(calcDto, listTypeSett2(calcDto, scdList));

			//log.debug("\nfrstPrnaList:::{}", frstPrnaList);
			earlyIntrList = intrCalcWhenMdwy(calcDto, frstPrnaList, intrCalcList);

			outList.addAll(earlyIntrList);

			earlyRpList = rescheduling(calcDto, earlyRpCalcList, earlyIntrList, prnaCalcList2, intrCalcList2, intrCalcList);
			//log.debug("\ncalculation.earlyRpList ::: {}", earlyRpList);

			outList.addAll(earlyRpList);

		}else if(calcDto.getLastIntrClcDt() != null && calcDto.getLastIntrClcDt().compareTo(calcDto.getStdrDt()) <= 0){
			log.debug("2번시나리오~~~");
			if(listTypeSett2(calcDto, calcDto.getRdmpPlanList()).size() < 1){

			}else{

				log.debug("최종이자계산일자 ~ 기산일자(상환일자) 이자 계산");

				calcDto.setDealMrdpPrca(listTypeSett2(calcDto, calcDto.getRdmpPlanList()).get(0).getPrarPrna());
				List<CalculationResultDTO> frstPrnaList = earlyRpnaCalc(calcDto, listTypeSett2(calcDto, calcDto.getRdmpPlanList()));

				//log.debug("\nfrstPrnaList:::{}", frstPrnaList);

				// if(frstPrnaList.size() < 1){

				// }else{

				// }
				List<CalculationResultDTO> frstIntrList = intrCalcWhenMdwy(calcDto, frstPrnaList, intrCalcList);

				//log.debug("\nfrstIntrList:::{}", frstIntrList);
				if(calcDto.getRunCd().equals("1")){
					outList.addAll(frstIntrList);
				}else{

				}

				

				//List<CalculationResultDTO> reScdhList = rescheduling(calcDto, frstPrnaList, frstIntrList, listTypeSett2(calcDto, calcDto.getRdmpPlanList()), intrCalc(calcDto, listTypeSett2(calcDto, calcDto.getRdmpPlanList()), calcDto.getIntrtPlanList()), intrCalcList);

				//log.debug("\nreScdhList:::{}", reScdhList);

				//List<>
			}

			
		}else{
			log.debug("3번시나리오~~~");
		}

		//log.debug("\ncalculation.outList ::: {}", outList);

		//리스트 정렬 (시작일자 기준 오름차순 / 종료일자 기준 오름차순)
		outList.sort(Comparator.comparing(CalculationResultDTO::getStrtDt).thenComparing(CalculationResultDTO::getEndDt));

		//log.debug("\noutList ::: {}", outList);

		return outList;

	}


	/**
	 * List<IBIMS403BDTO> 타입 스케줄 List<CalculationDTO> 타입 스케줄로 매핑
	 * @param inCalcDTO				//이자계산 기본정보
	 * @param IBIMS403BDTOList		//IBIMS403BDTOList 타입 스케줄
	 * @return
	 */
	private List<CalculationResultDTO> listTypeSett(CalculationDTO inCalcDTO, List<IBIMS403BDTO> IBIMS403BDTOList){
		List<CalculationResultDTO> returnList = new ArrayList<CalculationResultDTO>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		BigDecimal bfBalance = inCalcDTO.getDealExcBlce();		//대상금액
		
		//int roopVal = 0;

		for(int i=0; i < IBIMS403BDTOList.size(); i++){
			//roopVal++;
			
			CalculationResultDTO returnDTO = new CalculationResultDTO();
			
			IBIMS403BDTO paramDTO = IBIMS403BDTOList.get(i);

			if(paramDTO.getRdmpPrarIntr() == null){
				if(i==0){	//첫회차
					//if(paramDTO.getPrcsCpltYn() == null || "N".equals(paramDTO.getPrcsCpltYn())){
						log.debug("첫회차는 대출잔액 가감 X");
					// }else{
					// 	bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
					// }
					
				}else{
					bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
				}
			}
			
			

			if(paramDTO.getPrcsCpltYn() == null || paramDTO.getPrcsCpltYn().isEmpty() || "N".equals(paramDTO.getPrcsCpltYn())){
				if(paramDTO.getRdmpPrarIntr() == null){		//원금상환계획정보

					
					

					String stdrDt = inCalcDTO.getStdrDt(); 	//기준일자

					String strtDt = "";
					String endDt = "";

					try {

						if(i == 0){		//첫회차

							strtDt = inCalcDTO.getExcDt();
							endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
	
						}else{
	
							strtDt = IBIMS403BDTOList.get(i-1).getPrarDt();
							endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
						}
						log.debug("stdrDt: "+ stdrDt);
						log.debug("strtDt: "+ strtDt);
						log.debug("endDt: "+endDt );

						Date stdrDate = dateFormat.parse(stdrDt);
						Date endDate = dateFormat.parse(endDt);

						if(endDate.before(stdrDate)){		//i회차 종료일이 기준일자 이전이면

							int prcsDnum = DateUtil.dateDiff(strtDt, endDt);
							
							returnDTO.setPaiTypCd("1");	//1: 원금 (원리금유형코드)
							returnDTO.setScxDcd("02");		//02: 원금상환 스케줄 (일정구분코드)
							returnDTO.setRdmpTmrd((i+1)+"");
							returnDTO.setPrarDt(paramDTO.getPrarDt());
							returnDTO.setPrarPrna(paramDTO.getPrarPrna());
							returnDTO.setBfBalance(paramDTO.getTrgtAmt());
							returnDTO.setStrtDt(strtDt);
							returnDTO.setEndDt(endDt);
							returnDTO.setPrcsDnum(prcsDnum);
		
							log.debug("원금상환 예정일자: "+ returnDTO.getPrarDt());
							log.debug("trgtAmt::: " + paramDTO.getTrgtAmt());
							log.debug("returnDto.BfBalance::: " + returnDTO.getBfBalance());

							returnList.add(returnDTO);

							log.debug("returnList{}", returnList);

						}else{
							log.debug("#############기준일자 이후 회차는 제외#############");
							//roopVal--;
						}

					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
					}

				}else{														//이자상환계획정보

					int prcsDnum = DateUtil.dateDiff(paramDTO.getStrtDt(), paramDTO.getEndDt()) + 1;
					
					returnDTO.setPaiTypCd("2");	//2: 정상이자
					returnDTO.setScxDcd("04");		//04: 이자상환 스케줄
					returnDTO.setRdmpTmrd(IBIMS403BDTOList.get(i).getRdmpTmrd());
					returnDTO.setPrarDt(paramDTO.getPrarDt());
					returnDTO.setPrarPrna(paramDTO.getTrgtAmt());
					returnDTO.setBfBalance(paramDTO.getTrgtAmt());
					returnDTO.setStrtDt(paramDTO.getStrtDt());
					returnDTO.setEndDt(paramDTO.getEndDt());
					returnDTO.setRdmpPrarIntr(paramDTO.getRdmpPrarIntr());
					returnDTO.setAplyIrt(paramDTO.getAplyIrt());
					returnDTO.setPrcsDnum(prcsDnum);

					log.debug("이자상환 예정일자: "+ returnDTO.getPrarDt());

					returnList.add(returnDTO);

					log.debug("returnList{}", returnList);
	
				}
			}else{
				log.debug("#####처리건은 제외#####");
				//roopVal--;
			}
		}
		return returnList;
	}


	/**
	 * List<IBIMS403BDTO> 타입 스케줄 List<CalculationDTO> 타입 스케줄로 매핑 (중도상환 리스트만)
	 * @param inCalcDTO			//이자계산 기본정보
	 * @param ibims403List		//IBIMS403BDTOList 타입 스케줄
	 * @return
	 */
	public List<CalculationResultDTO> listTypeSett2(CalculationDTO inCalcDTO, List<IBIMS403BDTO> ibims403List){
		List<CalculationResultDTO> returnList = new ArrayList<CalculationResultDTO>();

		BigDecimal bfBalance = inCalcDTO.getDealExcBlce();		//대상금액
		

		for(int i=0; i < ibims403List.size(); i++){
			//roopVal++;
			
			CalculationResultDTO returnDTO = new CalculationResultDTO();
			
			IBIMS403BDTO paramDTO = ibims403List.get(i);

			if(i > 0 && paramDTO.getRdmpPrarIntr() == null){
				bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
			}

			if(paramDTO.getPrcsCpltYn() == null || paramDTO.getPrcsCpltYn().equals("N")){//미처리
				
				if(paramDTO.getRdmpPrarIntr() == null){		//원금상환계획정보

					
					String stdrDt = inCalcDTO.getStdrDt(); 	//기준일자

					String strtDt = "";
					String endDt = "";

					if(i == 0){		//첫회차

						strtDt = inCalcDTO.getExcDt();
						endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);

					}else{
						
						strtDt = ibims403List.get(i-1).getPrarDt();
						endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
					}


						int prcsDnum = DateUtil.dateDiff(strtDt, endDt);

						returnDTO.setPaiTypCd("1");	//1: 원금
						returnDTO.setScxDcd("02");		//02: 원금상환 스케줄
						returnDTO.setRdmpTmrd((i+1)+"");
						returnDTO.setPrarDt(paramDTO.getPrarDt());
						returnDTO.setPrarPrna(paramDTO.getPrarPrna());
						returnDTO.setBfBalance(paramDTO.getTrgtAmt());
						returnDTO.setStrtDt(strtDt);
						returnDTO.setEndDt(endDt);
						returnDTO.setPrcsDnum(prcsDnum);
	
						log.debug("원금상환 예정일자: "+ returnDTO.getPrarDt());

						returnList.add(returnDTO);

						log.debug("returnList{}", returnList);


				}else{														
					log.debug("#####이자상환스케줄 제외#####");
				}
			}else{
				log.debug("#####처리건 제외#####");
			}
			
		}
		return returnList;
	}



	/**
	 * List<IBIMS403BDTO> 타입 스케줄 List<CalculationDTO> 타입 스케줄로 매핑 (처리/미처리 구분 X)
	 * @param inCalcDTO				//이자계산 기본정보
	 * @param IBIMS403BDTOList		//IBIMS403BDTOList 타입 스케줄
	 * @return
	 */
	private List<CalculationResultDTO> listTypeSett3(CalculationDTO inCalcDTO, List<IBIMS403BDTO> IBIMS403BDTOList){
		List<CalculationResultDTO> returnList = new ArrayList<CalculationResultDTO>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		BigDecimal bfBalance = inCalcDTO.getDealExcBlce();		//대상금액
		
		//int roopVal = 0;

		for(int i=0; i < IBIMS403BDTOList.size(); i++){
			//roopVal++;
			
			CalculationResultDTO returnDTO = new CalculationResultDTO();
			
			IBIMS403BDTO paramDTO = IBIMS403BDTOList.get(i);
			

				if(paramDTO.getRdmpPrarIntr() == null){		//원금상환계획정보

					bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());

					String stdrDt = inCalcDTO.getStdrDt(); 	//기준일자

					String strtDt = "";
					String endDt = "";

					try {

						if(i == 0){		//첫회차

							strtDt = inCalcDTO.getExcDt();
							endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
	
						}else{
	
							strtDt = IBIMS403BDTOList.get(i-1).getPrarDt();
							endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
						}
						log.debug("strtDt: "+ strtDt);
						log.debug("endDt: "+endDt );

						Date stdrDate = dateFormat.parse(stdrDt);
						Date endDate = dateFormat.parse(endDt);

						if(endDate.before(stdrDate)){		//i회차 종료일이 기준일자 이전이면

							int prcsDnum = DateUtil.dateDiff(strtDt, endDt);
							
							returnDTO.setPaiTypCd("1");	//1: 원금
							returnDTO.setScxDcd("02");		//02: 원금상환 스케줄
							returnDTO.setRdmpTmrd((i+1)+"");
							returnDTO.setPrarDt(paramDTO.getPrarDt());
							returnDTO.setPrarPrna(paramDTO.getPrarPrna());
							returnDTO.setBfBalance(bfBalance);
							returnDTO.setStrtDt(strtDt);
							returnDTO.setEndDt(endDt);
							returnDTO.setPrcsDnum(prcsDnum);
		
							log.debug("원금상환 예정일자: "+ returnDTO.getPrarDt());

							returnList.add(returnDTO);

							log.debug("returnList{}", returnList);

						}else{
							log.debug("#############기준일자 이후 회차는 제외#############");
							//roopVal--;
						}

					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
					}

				}else{														
					log.debug("#####이자상환스케줄 제외#####");
				}
			
		}
		return returnList;
	}

	/**
	 * 기준일자 전 날짜의 스케줄만 가져오기
	 * @param inCalcDTO					//상환 기본정보
	 * @param scdlList					//스케줄 리스트
	 * @return
	 */
	public List<CalculationResultDTO> throwAfterBaseDt(CalculationDTO inCalcDTO, List<CalculationResultDTO> scdlList){

		List<CalculationResultDTO> returnList = new ArrayList<CalculationResultDTO>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		String baseDt = inCalcDTO.getStdrDt();

		

		for(int i = 0; i < scdlList.size(); i++){

			CalculationResultDTO returnDto = scdlList.get(i);
			
			try {
				log.debug("baseDt: "+ baseDt);
				log.debug("endDt: " + returnDto.getEndDt());

				Date baseDate = dateFormat.parse(baseDt);
				Date strtDate = dateFormat.parse(returnDto.getStrtDt());
				Date endDate = dateFormat.parse(returnDto.getEndDt());

				if(endDate.before(baseDate) && strtDate.before(baseDate)){
					returnList.add(returnDto);
				}else{
					break;
				}
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			
		}
		return returnList; 
	}


	/**
	 * 원금에 따른 이자금액 계산
	 * @param inCalcDTO
	 * @param prnaCalcRstDTOList
	 * @return
	 */
	public List<CalculationResultDTO> intrCalc(CalculationDTO inCalcDTO, List<CalculationResultDTO> prnaCalcRstDTOList, List<IBIMS403BDTO> intrScdlList){
		//log.debug("!!!!!!intrCalc실행!!!!!!!!");

		List<CalculationResultDTO> intrCalcRstDTOList = new ArrayList<>();

		// 이자상환스케줄 생성
		int dfrSize = 0;
		int intrSize = 0;

		List<LoanData> intrSchList = loanListSett(inCalcDTO, intrScdlList);

		inCalcDTO.setDfrCnt(dfrSize);	
		inCalcDTO.setBaseCnt(intrSize);

		log.debug("DfrCnt: " + dfrSize);
		log.debug("BaseCnt: " + intrSize);

		int changeLoanCnt = 0;
		double oldAplyIntrt = 0d;
		double dIntrt = 0d;
		BigDecimal bfBalance = inCalcDTO.getDealExcBlce();		// 원금잔액

		for(int i = 0 ; i < intrSchList.size() ; i++){
			LoanData item = intrSchList.get(i);	
			CalculationResultDTO intrCalcRstDTO = new CalculationResultDTO();

			// 원금스케줄
			BigDecimal PrarPrnaAmt = BigDecimal.ZERO;

			log.debug("prnaCalcRstDTOList.size(): "+ prnaCalcRstDTOList.size());
			for(int v = 0 ; v < prnaCalcRstDTOList.size() ; v++) {

				CalculationResultDTO prnaItem = prnaCalcRstDTOList.get(v);
				
				if(item.getEndDt().compareTo(prnaItem.getEndDt()) > 0) {

					PrarPrnaAmt = PrarPrnaAmt.add(prnaItem.getPrarPrna());	// 예정원금
					
				} else {
					break;
				}
			}

			bfBalance = inCalcDTO.getDealExcBlce().subtract(PrarPrnaAmt);


			// 금리구간조회
			List<IBIMS404BVO> out404bf = inCalcDTO.getIntrtInfoList();
			List<IBIMS404BVO> out404 = new ArrayList<>();

			boolean noOverlap = false;

			for(int k = 0; k < out404bf.size(); k++){
				
				IBIMS404BVO bfVO = out404bf.get(k);

				noOverlap = bfVO.getAplyEndDt().compareTo(item.getStrtDt()) < 0 || bfVO.getAplyStrtDt().compareTo(item.getEndDt()) > 0;

				if(!noOverlap){
					log.debug( (k+1) + "번째 금리는 " + i + "번째 이자상환회차 기간에 포함됨");
					out404.add(bfVO);
				}else{
					log.debug( (k+1) + "번째 금리는 " + i + "번째 이자상환회차 기간에 포함되지 않음");
				}

			}

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";

			// 금리구간 Loop
			for(int w=0; w<out404.size(); w++){
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(w);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				dIntrt = ibItem.getAplyIntrt();
				item.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
				if(oldAplyIntrt != aplyIntrt) {
					oldAplyIntrt = aplyIntrt;
					changeLoanCnt = (i==1)?intrSchList.size():(intrSchList.size()-i);
				} 
				
					
				String strtDt = "";
				String endDt = "";
				
				if(item.getStrtDt().compareTo(ibItem.getAplyStrtDt()) >= 0) 
				{
					strtDt = item.getStrtDt();
				} else {
					strtDt = ibItem.getAplyStrtDt();
				}
				if(item.getEndDt().compareTo(ibItem.getAplyEndDt()) <= 0) 
				{
					endDt = item.getEndDt();
				} else {
					endDt = ibItem.getAplyEndDt();
				}
				
				if(strtDt.substring(0, 4).equals(endDt.substring(0, 4))) {
					
					ddCnt = DateUtil.dateDiff(strtDt, getBasDt(inCalcDTO, endDt))+1; // 일수계산
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt--;
							; 
						}
					}
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
					
						
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = DateUtil.dateDiff(strtDt, strLstDt)+1; 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", getBasDt(inCalcDTO, endDt))+1;
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt2--;
							;
						}
					}						
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
	
					actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
					
				}
			}//end of for

			// input dto data setting
			intrCalcRstDTO.setPaiTypCd("2");
			intrCalcRstDTO.setScxDcd("04");
			intrCalcRstDTO.setRdmpTmrd(Integer.toString(item.getSeq()));

			String stdrDt = DateUtil.dayAdd(item.getEndDt(),1);
			String prarDt = ibims991BMapper.getPrarDt(stdrDt);

			//intrCalcRstDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));
			intrCalcRstDTO.setPrarDt(prarDt);
			
			intrCalcRstDTO.setPrarPrna(bfBalance);										
			intrCalcRstDTO.setStrtDt(item.getStrtDt());
			intrCalcRstDTO.setEndDt(item.getEndDt());
			intrCalcRstDTO.setRdmpPrarIntr(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlySubInterest));
			intrCalcRstDTO.setAplyIrt(new BigDecimal(dIntrt));
			intrCalcRstDTOList.add(intrCalcRstDTO);


			log.debug("### 회차 :" + intrCalcRstDTO.getRdmpTmrd());
			log.debug("### 예정일자 :" + intrCalcRstDTO.getPrarDt());
			log.debug("### 예정월상환금액 :" + intrCalcRstDTO.getPrarRdmpAmt());
			log.debug("### 예정금액 :" + intrCalcRstDTO.getPrarPrna());
			log.debug("### 상환예정이자 :" + intrCalcRstDTO.getRdmpPrarIntr());
			log.debug("### 시작일자 :" + intrCalcRstDTO.getStrtDt());
			log.debug("### 종료일자 :" + intrCalcRstDTO.getEndDt());
			log.debug("### 적용금리 :" + intrCalcRstDTO.getAplyIrt());
			log.debug("### 대출잔액 :" + inCalcDTO.getDealExcBlce());
			log.debug("### 납입이자누계 :" + monthlySubInterest);
			log.debug("### 대출잔금 :" + bfBalance);
		}//end of for
		return intrCalcRstDTOList;
	}

	/**
	 * 연체원금 여부 & 수수료 계산 
	 * @param inCalcDTO					//상환 기본정보
	 * @param scdhList					//n회차 상환스케줄
	 * @return
	 */
	public List<CalculationResultDTO> overduePrnaCalc(CalculationDTO inCalcDTO, List<CalculationResultDTO> scdhList){
		
		List<CalculationResultDTO> ovduList = new ArrayList<CalculationResultDTO>();

		//SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		//Calendar c1 = Calendar.getInstance();	
		//String strToday = sdf.format(c1.getTime());		//현재날짜

		String baseDt = inCalcDTO.getStdrDt();			//기준일자

		BigDecimal ovduIntr = BigDecimal.ZERO;
		BigDecimal prarPrna = BigDecimal.ZERO;

		double ovduIntrRt = inCalcDTO.getOvduIntrRt();				//연체이자율 
		//String ovduIntrRtDcd = inCalcDTO.getOvduIntrRtDcd();		//연체이자율 구분 코드 (고정연체이자율/가산연체이자율)
		//String intrDnumClcMthCd = inCalcDTO.getIntrDnumClcMthCd();	//이자일수 계산방법
		
		//log.debug("strToday: "+ strToday);

		for(int i = 0; i < scdhList.size(); i++){
			CalculationResultDTO overduePrnaCalcRslt = new CalculationResultDTO();

			CalculationResultDTO scdhInfo = scdhList.get(i);
			String prarDt = scdhInfo.getPrarDt();			//상환예정일

			try {
			
				Date prarDate = dateFormat.parse(prarDt);
				//Date toDay = dateFormat.parse(strToday);
				Date baseDate = dateFormat.parse(baseDt);
	
				if(baseDate.before(prarDate)){						//상환예정일 지나지 않았을 경우
					log.debug("===========연체X===========");
	
				}else if(prarDate.before(baseDate)){				//상환예정일 지난 경우
					log.debug("===========!!!연체발생!!!===========");
					
					int ovduCnt = DateUtil.dateDiff(prarDt, baseDt)+1;			//연체일수
	
					//if(ovduIntrRtDcd.equals("1")){			//고정연체이자율 계산
						log.debug("연체이자율 고정연체이자로 계산");
	
						
						
						if(scdhInfo.getPaiTypCd().equals("1")){				//원금
							prarPrna = scdhInfo.getPrarPrna();		//상환예정원금
						}else if(scdhInfo.getPaiTypCd().equals("2")){			//이자
							prarPrna = scdhInfo.getRdmpPrarIntr();	//상환예정이자
						}
	
						double ovduIntrRate = ovduIntrRt/100.0;
						double ovduCnts = ovduCnt/365.0;
	
						BigDecimal ovduIntrRtB = new BigDecimal(ovduIntrRate);
						BigDecimal ovduCntB = new BigDecimal(ovduCnts);
	
						log.debug("연체대상금액: " + prarPrna);
						log.debug("연체이자율: " + ovduIntrRt);
						log.debug("연체일: " + ovduCnt+ "일");
	
						log.debug("ovduIntrRtB: " + ovduIntrRtB);
						log.debug("ovduCntB: " + ovduCntB);
	
						//연체이자 = 연체금액 * (연체이자율 / 100) * 연체일수 / 365
						ovduIntr = prarPrna.multiply(ovduIntrRtB).multiply(ovduCntB);
						log.debug("연체이자: " + ovduIntr);
	
					// }else if(ovduIntrRtDcd.equals("2")){	//가산연체이자율 계산 (todo: 가산연체율 전달받기)
					// 	log.debug("연체이자율 가산연체이자로 계산");
	
					// }
					
					// overduePrnaCalcRslt.setRdmpTmrd(i+1+"");
					if(scdhInfo.getPaiTypCd().equals("2")){		//이자
						overduePrnaCalcRslt.setPaiTypCd("4");				//4: 납부이자연체금액
						overduePrnaCalcRslt.setScxDcd("04");

						log.debug("연체구분: 이자연체이자");
					}else{				//원금
						overduePrnaCalcRslt.setPaiTypCd("5");				//5: 원금연체금액
						overduePrnaCalcRslt.setScxDcd("02");

						log.debug("연체구분: 원금연체이자");
					}
					
					overduePrnaCalcRslt.setRdmpTmrd(scdhInfo.getRdmpTmrd());
					overduePrnaCalcRslt.setStrtDt(prarDt);			//연체시작일
					overduePrnaCalcRslt.setEndDt(baseDt);			//연체종료일 todo: 빈값으로 둬도 되는지 확인
					overduePrnaCalcRslt.setPrarDt("");
					overduePrnaCalcRslt.setAplyIrt(new BigDecimal(ovduIntrRt));
					// overduePrnaCalcRslt.setRdmpPrarIntr(ovduIntr);	//연체이자
					overduePrnaCalcRslt.setRdmpPrarIntr(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), ovduIntr));//연체이자
					overduePrnaCalcRslt.setPrarPrna(prarPrna);
					overduePrnaCalcRslt.setBfBalance(prarPrna);		//대상금액
					ovduList.add(overduePrnaCalcRslt);

				}
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}	

		}//end of for

		// for(int i = 0; i < ovduList.size(); i++){
		// 	ovduList.get(i).setRdmpTmrd(i+1+"");
		// }


		return ovduList;
	}


	/**
	 * IBIMS403BDTOLIST => LoanDataLIST로 sett
	 * @param inCalcDTO					//상환 기본정보
	 * @param scdhList					//IBIMS403BDTOLIST
	 * @return
	 */
	public List<LoanData> loanListSett(CalculationDTO inCalcDTO, List<IBIMS403BDTO> scdhList){

		List<LoanData> loanList = new ArrayList<LoanData>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		for(int i=0; i<scdhList.size(); i++){

			//log.debug("예정일자: "+ inCalcDTO.getStdrDt());

			IBIMS403BDTO scdhInfo = scdhList.get(i);
			LoanData lnItm = new LoanData();
			//log.debug("처리완료여부 ::: {}", scdhInfo.getPrcsCpltYn());
			if(scdhInfo.getPrcsCpltYn() == null || "N".equals(scdhInfo.getPrcsCpltYn())){	//미처리

				if(scdhInfo.getRdmpPrarIntr() == null){			//원금상환계획정보

					lnItm.setSeq(i+1);
					lnItm.setPaiRdmpDcd(inCalcDTO.getPaiRdmpDcd());
					lnItm.setLoanBalance(inCalcDTO.getDealExcAmt());

					String strtDt = "";
					String endDt = "";

					String stdrDt = inCalcDTO.getStdrDt();		//기준일자
					String prarDt = scdhInfo.getPrarDt();		//상환예정일자

					try {
						
						Date prarDate = dateFormat.parse(prarDt);

						if(i == 0){			//첫회차
							log.debug("첫회차!!");

							strtDt = inCalcDTO.getExcDt();		
							endDt = DateUtil.dayAdd(prarDt, -1);

						}else if(i > 0){	//n회차 

							strtDt = scdhList.get(i-1).getPrarDt();
							endDt = DateUtil.dayAdd(prarDt, -1);
						}

						Date strtDate = dateFormat.parse(strtDt);
						Date stdrDate = dateFormat.parse(stdrDt);
						Date endDate = dateFormat.parse(endDt);

						log.debug("stdrDt: "+ stdrDt);
						log.debug("endDt: "+ endDt);

						log.debug("stdrDate: "+stdrDate);
						log.debug("endDate: "+endDate);

						//if(endDate.before(stdrDate)){		//i회차 종료일이 기준일자 이전이면

							lnItm.setStrtDt(strtDt);
							lnItm.setEndDt(endDt);
							lnItm.setDdCnt(DateUtil.dateDiff(stdrDt, endDt));

							loanList.add(lnItm);

						// }else{
						// 	log.debug("#############기준일자 이후 회차는 제외#############");
						// }
						
						
					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
					}

				}else{											//이자상환계획정보

					lnItm.setSeq(i+1);
					lnItm.setPaiRdmpDcd(inCalcDTO.getPaiRdmpDcd());
					lnItm.setLoanBalance(inCalcDTO.getDealExcAmt());
					lnItm.setStrtDt(scdhInfo.getStrtDt());
					
					try {
						
						Date baseDate = dateFormat.parse(inCalcDTO.getStdrDt());		//기준일자
						Date strtDate = dateFormat.parse(scdhInfo.getStrtDt());			//i회차 시작일
						Date endDate = dateFormat.parse(scdhInfo.getEndDt());			//i회차 종료일

						//if(endDate.before(baseDate)){				//i회차 시작일이 기준일자 이전 날짜인 경우

							lnItm.setEndDt(scdhInfo.getEndDt());	
							lnItm.setDdCnt(DateUtil.dateDiff(scdhInfo.getStrtDt(), scdhInfo.getEndDt()));
						
							// if(baseDate.before(endDate)){			//i회차 종료일 기준일자 이후 날짜인 경우
							// 	lnItm.setEndDt(inCalcDTO.getStdrDt());
							// 	lnItm.setDdCnt(DateUtil.dateDiff(scdhInfo.getStrtDt(), inCalcDTO.getStdrDt()));
							// }
		
							loanList.add(lnItm);
						//}

					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
					}

				}
				
			}else{
				log.debug("###########처리건은 제외############");
			}
		}

		return loanList;

	}


	/**
	 * 중도상환 여부 & 수수료 계산 
	 * @param inCalcDTO					//상환 기본정보
	 * @param scdhList					//상환스케줄 리스트
	 * @return
	 */
	public List<CalculationResultDTO> earlyRpnaCalc(CalculationDTO incaDto, List<CalculationResultDTO> scdhList){

		List<CalculationResultDTO> earlyRpCalcList = new ArrayList<>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		BigDecimal mrdpPrca = incaDto.getDealMrdpPrca();					//중도상환원금
		BigDecimal earlyRpFee = BigDecimal.ZERO;							//중도상환 수수료

		// String excDt = incaDto.getExcDt();								//대출실행일자
		// String expDt = incaDto.getExpDt();								//만기일자

		// double mdwyRdmpFeeRto = incaDto.getMdwyRdmpFeeRto();				//중도상환 수수료율
		// BigDecimal mdwyRdmpFeeRtoBd = new BigDecimal(mdwyRdmpFeeRto);

		CalculationDTO paramDTO = new CalculationDTO();

		paramDTO.setPrdtCd(incaDto.getPrdtCd());
		paramDTO.setStdrDt(incaDto.getStdrDt());
		paramDTO.setEndDt(scdhList.get(0).getEndDt());

		log.debug("prdtCd : " + incaDto.getPrdtCd());
		log.debug("endDt : " + incaDto.getEndDt());
		log.debug("stdrDt : " + incaDto.getStdrDt());

		BigDecimal mdwyRdmpFeeRto = ibims204bMapper.getMdwyRdmpFeeRto(paramDTO).divide(new BigDecimal(100));	//중도상환 수수료율

		for(int i = 0; i < scdhList.size(); i++){
			CalculationResultDTO scdhDTO = scdhList.get(i);

			CalculationResultDTO earlyRpDTO = new CalculationResultDTO();			//중도상환 수수료 스케줄
			CalculationResultDTO earlyPrnaDTO = new CalculationResultDTO();			//중도상환원금 스케줄

			String stdrDt = incaDto.getStdrDt();		//기준일자
			String strtDt = scdhDTO.getStrtDt();		//i회차 시작일자
			String endDt = scdhDTO.getEndDt();			//i회차 종료일자

			log.debug("stdrDt : " + stdrDt);
			log.debug("strtDt : " + strtDt);
			log.debug("endDt : " + endDt);

			BigDecimal prarPrna = scdhDTO.getPrarPrna();

			if(scdhDTO.getPrarPrna() == null || scdhDTO.getPrarPrna().compareTo(BigDecimal.ZERO) == 0){
				prarPrna = BigDecimal.ZERO;
			}

			if(prarPrna.compareTo(mrdpPrca) < 0){		//상환예정원금이 중도상환원금보다 작으면
				mrdpPrca = prarPrna;
			}
			
			try {
				Date stdrDate = dateFormat.parse(stdrDt);
				Date strtDate = dateFormat.parse(strtDt);
				Date endDate = dateFormat.parse(endDt);

				boolean isWithinRange = (stdrDate.after(strtDate) || stdrDate.equals(strtDate)) && (stdrDate.before(endDate) || stdrDate.equals(endDate));

				if(isWithinRange){		//상환예정일자보다 처리일자가 이전 시점인 경우
					log.debug("###########중도상환 발생##############");

					int rmDays = DateUtil.dateDiff(stdrDt, endDt)+1;			//잔존일수 (n회차 종료일 - 중도상환일자 (기준일자))
					int loanPeroid = DateUtil.dateDiff(strtDt, endDt)+1;		//대출기간 (n회차 종료일 - n회차 시작일)

					BigDecimal rmDaysB = new BigDecimal(rmDays);			//잔존일수
					BigDecimal loanPeroidB = new BigDecimal(loanPeroid);	//대출기간

					//중도상환 수수료율 = 상환금액 * 중도상환 수수료율 * (잔존기간 / 대출기간)
					earlyRpFee = mrdpPrca.multiply(mdwyRdmpFeeRto).multiply(rmDaysB.divide(loanPeroidB, 13, RoundingMode.HALF_UP));
					earlyRpFee = process_down(incaDto.getIntrSnnoPrcsDcd(), earlyRpFee);
					log.debug("중도상환 수수료: " + earlyRpFee);

					//중도상환 원금 스케줄 세팅...
					earlyPrnaDTO.setPaiTypCd("8");						//8: 중도상환수수료
					earlyPrnaDTO.setScxDcd("03");						//03: 수수료상환스케줄
					earlyPrnaDTO.setRdmpTmrd(scdhDTO.getRdmpTmrd());			//회차
					earlyPrnaDTO.setPrarPrna(mrdpPrca);							//대상금액
					earlyPrnaDTO.setBfBalance(scdhDTO.getBfBalance());
					earlyPrnaDTO.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
					earlyPrnaDTO.setStrtDt(strtDt);								//n회차 시작일자
					earlyPrnaDTO.setEndDt(stdrDt);								//종료일자 (중도상환일자 -1)

					earlyRpCalcList.add(earlyPrnaDTO);

					//중도상환 수수료 스케줄 세팅 ...
					earlyRpDTO.setRdmpTmrd(scdhDTO.getRdmpTmrd());				//회차
					earlyRpDTO.setPrarPrna(mrdpPrca);							//대상금액
					earlyRpDTO.setBfBalance(mrdpPrca);
					earlyRpDTO.setPaiTypCd("9");						//원리금구분코드 9: 중도상환 수수료
					earlyRpDTO.setScxDcd("02");							//02: 원금상환스케줄
					earlyRpDTO.setStrtDt(stdrDt);								//시작일자: 중도상환 일자
					earlyRpDTO.setEndDt(endDt);									//n회차 종료일자
					earlyRpDTO.setPrarDt("");
					earlyRpDTO.setPrcsDt("");
					earlyRpDTO.setAplyIrt(mdwyRdmpFeeRto.multiply(new BigDecimal(100)));					//적용이율 (중도상환 수수료율)
					earlyRpDTO.setRdmpPrarIntr(earlyRpFee);						//중도상환수수료 
					
					earlyRpCalcList.add(earlyRpDTO);
					
					break;

				}else{
					log.debug("###########중도상환X##############");
				}

				
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}

		}//end of for

		
		return earlyRpCalcList;
	}



	/**
	 * 상환대상원금, 정상이자, 연체이자, 중도상환원금, 중도상환수수료 합계 계산
	 * @param scdhList					//상환스케줄 리스트
	 * @return
	 */
	public CalculationSumDTO totalCalculation(CalculationDTO calcDTO, List<CalculationResultDTO> scdhList){

		String intrSnnoPrcsDcd = calcDTO.getIntrSnnoPrcsDcd();

		CalculationSumDTO totalCalcDTO = new CalculationSumDTO();

		BigDecimal totalIntr 			= BigDecimal.ZERO;			//정상이자합계
		BigDecimal totalPrna 			= BigDecimal.ZERO;			//예정원금합계
		BigDecimal totlaMrdpPrca 		= BigDecimal.ZERO;			//중도상환원금 합계
		BigDecimal totalMdwyRdmpFee 	= BigDecimal.ZERO;			//중도상환수수료 합계
		BigDecimal totalPrnaOvduIntr 	= BigDecimal.ZERO;			//원금연체이자 합계
		BigDecimal totalIntrOvduIntr	= BigDecimal.ZERO;			//이자연체이자 합계
		BigDecimal totalOvduIntr 		= BigDecimal.ZERO;          //총 연체이자 합계
		BigDecimal totalTrgtAmt 		= BigDecimal.ZERO;			//총 수납대상금액 합계

		for(int i = 0; i < scdhList.size(); i++){

			CalculationResultDTO scdhDTO = scdhList.get(i);

			String paiTypCd = scdhDTO.getPaiTypCd();

			if(paiTypCd == null){
				//log.debug("===중도상환스케줄===");
			}else if(paiTypCd.equals("1")){			//원금
				totalPrna = totalPrna.add(scdhDTO.getPrarPrna());

			}else if(paiTypCd.equals("2")){	//정상이자
				totalIntr = totalIntr.add(scdhDTO.getRdmpPrarIntr());

			}else if(paiTypCd.equals("3")){	//분할금연체금액
				//
			}else if(paiTypCd.equals("4")){	//납부이자연체금액
				totalIntrOvduIntr = totalIntrOvduIntr.add(scdhDTO.getRdmpPrarIntr());

			}else if(paiTypCd.equals("5")){	//원금연체금액
				totalPrnaOvduIntr = totalPrnaOvduIntr.add(scdhDTO.getRdmpPrarIntr());

			}else if(paiTypCd.equals("6")){	//환출이자
				//
			}else if(paiTypCd.equals("7")){	//미수이자
				//
			}else if(paiTypCd.equals("8")){	//중도상환원금
				totlaMrdpPrca = totlaMrdpPrca.add(scdhDTO.getPrarPrna());

			}else if(paiTypCd.equals("9")){	//중도상환수수료
				totalMdwyRdmpFee = totalMdwyRdmpFee.add(scdhDTO.getRdmpPrarIntr());

			}

		}

		totalOvduIntr = totalIntrOvduIntr.add(totalPrnaOvduIntr);

		totalTrgtAmt = totalIntr.add(totalOvduIntr).add(totalTrgtAmt).add(totalPrna).add(totalMdwyRdmpFee).add(totlaMrdpPrca);

		//log.debug("totlaMrdpPrca::: " + totlaMrdpPrca);

		// log.debug("intrSnnoPrcsDcd ::::" + intrSnnoPrcsDcd);

		totalCalcDTO.setTotalIntr(process_down(intrSnnoPrcsDcd, totalIntr));						//정상이자 합계 set
		totalCalcDTO.setTotalIntrOvduIntr(process_down(intrSnnoPrcsDcd, totalIntrOvduIntr));		//이자연체이자 합계 set
		totalCalcDTO.setTotalMdwyRdmpFee(process_down(intrSnnoPrcsDcd, totalMdwyRdmpFee));			//중도상환수수료 합계 set
		totalCalcDTO.setTotalOvduIntr(process_down(intrSnnoPrcsDcd, totalOvduIntr));				//연체이자 합계 set
		totalCalcDTO.setTotalPrna(process_down(intrSnnoPrcsDcd, totalPrna));						//상환대상원금 set
		totalCalcDTO.setTotalPrnaOvduIntr(process_down(intrSnnoPrcsDcd, totalPrnaOvduIntr));		//원금연체이자 합계 set
		totalCalcDTO.setTotlaMrdpPrca(process_down(intrSnnoPrcsDcd, totlaMrdpPrca));				//중도상환원금 합계 set
		totalCalcDTO.setTotalTrgtAmt(process_down(intrSnnoPrcsDcd, totalTrgtAmt));					//총 수납대상금액 합계 set
		
		return totalCalcDTO;
		

	}

	/*
	 * 선취이자 계산
	 */
	public BigDecimal getPrepdIntr(CalculationDTO param){

		BigDecimal rdmpPrarIntr = BigDecimal.ZERO;

		String strtDt = param.getExcDt();		//시작일
		String endDt = dateAdd(strtDt, param.getIntrRdmpFrqcMnum(), param.getIntrPymDtCd());//종료일

		double ddCnt = DateUtil.dateDiff(strtDt, endDt)+1; // 일수계산
		double aplyIntrt = param.getAplyIrt()/100;		   // 적용금리

		// int actualType = actualYear(param.getIntrDnumClcMthCd(), strtDt);

		// double dayRate = ((param.getIntrDnumClcMthCd()=="4")?param.getIntrRdmpFrqcMnum():ddCnt)/actualType;

		double dayRate = ddCnt/365;

		BigDecimal bfBalance = param.getDealExcAmt();	   //대상금액

		//rdmpPrarIntr = bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP);

		rdmpPrarIntr = bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP);

		return rdmpPrarIntr;
	}



	/**
	 * 중도상환 발생 시 이자 계산
	 * @param scdhList					//상환스케줄 리스트
	 * @return
	 */
	public List<CalculationResultDTO> intrCalcWhenMdwy(CalculationDTO inCalcDTO, List<CalculationResultDTO> scdhList, List<CalculationResultDTO> intrCalcList){

		List<CalculationResultDTO> intrList = new ArrayList<>();

		BigDecimal bfBalance = BigDecimal.ZERO;						//대상금액

		String strtDt = "";
		//String endDt = "";
		String stdrDt = inCalcDTO.getStdrDt();

		String rdmpTmrd = "";
		
		if(intrCalcList.size() > 0){
			strtDt = intrCalcList.get(intrCalcList.size()-1).getPrarDt();
			log.debug("intrCalcWhenMdwy - strtDt: " + strtDt);

			rdmpTmrd = Integer.toString(Integer.parseInt(intrCalcList.get(intrCalcList.size()-1).getRdmpTmrd())+1);
			//endDt = stdrDt;
		}else{
			strtDt = inCalcDTO.getExcDt();
			rdmpTmrd = "1";
		}


		for(int i = 0; i < scdhList.size(); i++){

			CalculationResultDTO item = scdhList.get(i);

			CalculationResultDTO intrDTO = new CalculationResultDTO();

			if(item.getScxDcd().equals("8")){				//중도상환원금

				bfBalance = item.getBfBalance();
				log.debug("대상금액: " + bfBalance);

				// if(bfBalance == null){			//null들어오는 경우 다 막아야함 (어디서 null이 들어가는지 확인 필요::: IBIMS403 TRGT_AMT컬럼)
				// 	bfBalance = BigDecimal.ZERO;
				// }

				//금리구간조회
				List<IBIMS404BVO> out404bf = inCalcDTO.getIntrtInfoList();
				List<IBIMS404BVO> out404 = new ArrayList<>();

				boolean noOverlap = false;					

				for(int k = 0; k < out404bf.size(); k++){
					
					IBIMS404BVO bfVO = out404bf.get(k);

					noOverlap = bfVO.getAplyEndDt().compareTo(strtDt) < 0 || bfVO.getAplyStrtDt().compareTo(item.getEndDt()) > 0;

					if(!noOverlap){
						log.debug( (k+1) + "번째 금리는 이자상환회차 기간에 포함됨");
						out404.add(bfVO);
					}else{
						log.debug( (k+1) + "번째 금리는 이자상환회차 기간에 포함되지 않음");
					}

				}

				BigDecimal monthlySubInterest = BigDecimal.ZERO;
				String aplyIntrtContent = "";
				String ddCntContent = "";

				double oldAplyIntrt = 0d;
				double dIntrt = 0d;

				// 금리구간 Loop
				for(int w=0; w<out404.size(); w++){
					String strLstDt = "";
					int actualType = 0;
					double ddCnt = 0d;
					double dayRate = 0d;
					
					int actualType2 = 0;
					double ddCnt2 = 0d;
					double dayRate2 = 0d;
					
					IBIMS404BVO ibItem = out404.get(w);

					double aplyIntrt = ibItem.getAplyIntrt()/100;
					dIntrt = ibItem.getAplyIntrt();

					if(strtDt.substring(0, 4).equals(stdrDt.substring(0, 4))) {
					
						ddCnt = DateUtil.dateDiff(strtDt, getBasDt(inCalcDTO, stdrDt))+1; // 일수계산
						ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
						actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
						// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
						dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
						monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
						
					} else {
						
							
						strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
						ddCnt = DateUtil.dateDiff(strtDt, strLstDt)+1; 
						ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
						
						actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
						// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
						dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;
						monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
												
						ddCnt2 = DateUtil.dateDiff(stdrDt.substring(0, 4)+"0101", getBasDt(inCalcDTO, stdrDt))+1;					
						ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
		
						actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), stdrDt);
						// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
						dayRate2 = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
						monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
						
					}
				}

				// input dto data setting
				//intrDTO.setPaiTypCd("2");

				intrDTO.setScxDcd("04");
				intrDTO.setPaiTypCd("2");
				intrDTO.setRdmpTmrd(rdmpTmrd);
				intrDTO.setPrarDt(item.getEndDt());
				intrDTO.setPrarPrna(bfBalance);										
				intrDTO.setStrtDt(strtDt);
				intrDTO.setEndDt(item.getEndDt());
				intrDTO.setRdmpPrarIntr(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlySubInterest));
				intrDTO.setAplyIrt(new BigDecimal(dIntrt));
				intrList.add(intrDTO);

			}else{
				log.debug("############### 중도상환원금 외 스케줄 제외 ###############");
			}

		}
		return intrList;
	}




	/**
	 * 중도상환 발생 시 이자상환스케줄 다시 만들기
	 * @param earlyCalcList				//중도상환원금 스케줄
	 * @param earlyIntrCalcList			//중도상환 이자 스케줄
	 * @param prnaList					//기존 원금상환 스케줄
	 * @param intrList					//기존 이자상환 스케줄
	 * @param inCalcDTO					//이자계산 기본정보
	 * @param intrCalcList				//중도상환 전 이자상환 스케줄
	 * @return
	 */
	public List<CalculationResultDTO> rescheduling(CalculationDTO inCalcDTO, List<CalculationResultDTO> earlyCalcList, List<CalculationResultDTO> earlyIntrCalcList, 
													List<CalculationResultDTO> prnaList, List<CalculationResultDTO> intrList, List<CalculationResultDTO> intrCalcList){

		List<CalculationResultDTO> reScdhPrnaList = new ArrayList<>();
		List<CalculationResultDTO> reScdhIntrList = new ArrayList<>();
		List<CalculationResultDTO> earlyPrnaList = new ArrayList<>();

		List<CalculationResultDTO> intrCalcList2 = new ArrayList<>();
		List<CalculationResultDTO> earlyIntrCalcList2 = new ArrayList<>();

		for(int i=0; i < intrCalcList.size(); i++){

			CalculationResultDTO intrCalcDTO = intrCalcList.get(i);
			CalculationResultDTO intrCalc2DTO = new CalculationResultDTO();

			intrCalc2DTO.setPaiTypCd(null);
			intrCalc2DTO.setScxDcd(intrCalcDTO.getScxDcd());
			intrCalc2DTO.setRdmpTmrd(intrCalcDTO.getRdmpTmrd());
			intrCalc2DTO.setPrarDt(intrCalcDTO.getPrarDt());
			intrCalc2DTO.setPrcsDt(intrCalcDTO.getPrcsDt());
			intrCalc2DTO.setPrarPrna(intrCalcDTO.getPrarPrna());
			intrCalc2DTO.setStrtDt(intrCalcDTO.getStrtDt());
			intrCalc2DTO.setEndDt(intrCalcDTO.getEndDt());
			intrCalc2DTO.setRdmpPrarIntr(intrCalcDTO.getRdmpPrarIntr());
			intrCalc2DTO.setAplyIrt(intrCalcDTO.getAplyIrt());
			intrCalc2DTO.setPrcsDnum(intrCalcDTO.getPrcsDnum());
			intrCalc2DTO.setPrarRdmpAmt(intrCalcDTO.getPrarRdmpAmt());
			intrCalc2DTO.setBfBalance(intrCalcDTO.getBfBalance());
			intrCalcList2.add(intrCalc2DTO);
		}

		for(int i=0; i < earlyIntrCalcList.size(); i++){

			CalculationResultDTO earlyIntrCalcDTO = earlyIntrCalcList.get(i);
			CalculationResultDTO earlyIntrCalc2DTO = new CalculationResultDTO();

			earlyIntrCalc2DTO.setPaiTypCd(null);
			earlyIntrCalc2DTO.setScxDcd(earlyIntrCalcDTO.getScxDcd());
			earlyIntrCalc2DTO.setRdmpTmrd(earlyIntrCalcDTO.getRdmpTmrd());
			earlyIntrCalc2DTO.setPrarDt(earlyIntrCalcDTO.getPrarDt());
			earlyIntrCalc2DTO.setPrcsDt(earlyIntrCalcDTO.getPrcsDt());
			earlyIntrCalc2DTO.setPrarPrna(earlyIntrCalcDTO.getPrarPrna());
			earlyIntrCalc2DTO.setStrtDt(earlyIntrCalcDTO.getStrtDt());
			earlyIntrCalc2DTO.setEndDt(earlyIntrCalcDTO.getEndDt());
			earlyIntrCalc2DTO.setRdmpPrarIntr(earlyIntrCalcDTO.getRdmpPrarIntr());
			earlyIntrCalc2DTO.setAplyIrt(earlyIntrCalcDTO.getAplyIrt());
			earlyIntrCalc2DTO.setPrcsDnum(earlyIntrCalcDTO.getPrcsDnum());
			earlyIntrCalc2DTO.setPrarRdmpAmt(earlyIntrCalcDTO.getPrarRdmpAmt());
			earlyIntrCalc2DTO.setBfBalance(earlyIntrCalcDTO.getBfBalance());
			earlyIntrCalcList2.add(earlyIntrCalc2DTO);
		}

		// intrCalcList2.addAll(intrCalcList);
		// earlyIntrCalcList2.addAll(earlyIntrCalcList);

		List<CalculationResultDTO> rsltList = new ArrayList<>();

		log.debug("<<<<<<<<<<<<<<<<<< rescheduling parameter check >>>>>>>>>>>>>>");
		log.debug("\n earlyCalcList ::: {}", earlyCalcList);
		log.debug("\n prnaList ::: {}", prnaList);
		log.debug("\n intrList ::: {}", intrList);

		for(int i = 0; i < earlyCalcList.size(); i++){
			CalculationResultDTO earlyCalcDTO = earlyCalcList.get(i);

			//CalculationResultDTO reScdhPrnaDTO = new CalculationResultDTO();

			if(earlyCalcDTO.getPaiTypCd().equals("8")){			//중도상환원금
				earlyPrnaList.add(earlyCalcDTO);
			}else{
				log.debug("##########중도상환 원금 외 스케줄 제외##########");
			}
		}

		//log.debug("\n earlyPrnaList ::: {}", reScdhPrnaList);

		for(int i = 0; i < prnaList.size(); i++){

			CalculationResultDTO prnaDTO = prnaList.get(i);
			CalculationResultDTO earlyDTO = earlyPrnaList.get(0);

			if(prnaDTO.getRdmpTmrd().equals(earlyDTO.getRdmpTmrd())){

				if(prnaDTO.getPrarPrna().equals(earlyDTO.getPrarPrna())){
					log.debug("중도상환원금 == 예정상환원금");

					//reScdhPrnaList.add(earlyDTO);

				}else{
					log.debug("중도상환원금 < 예정상환원금");

					CalculationResultDTO reScdhPrnaDTO1 = new CalculationResultDTO();
					CalculationResultDTO reScdhPrnaDTO2 = new CalculationResultDTO();

					reScdhPrnaDTO1.setBfBalance(prnaDTO.getBfBalance());		//대출잔액
					reScdhPrnaDTO1.setPrarPrna(earlyDTO.getPrarPrna());			//중도상환금액
					reScdhPrnaDTO1.setStrtDt(earlyDTO.getStrtDt());
					reScdhPrnaDTO1.setEndDt(earlyDTO.getEndDt());				
					reScdhPrnaDTO1.setPrarDt(inCalcDTO.getStdrDt());			//상환예정일(기준일)

					reScdhPrnaDTO2.setBfBalance(prnaDTO.getBfBalance().subtract(earlyDTO.getPrarPrna()));		//대출잔액 (기존 대출잔액 - 중도상환 원금)
					reScdhPrnaDTO2.setPrarPrna(prnaDTO.getPrarPrna().subtract(earlyDTO.getPrarPrna()));			//상환예정원금 (기존 상환예정원금 - 중도상환 원금)
					reScdhPrnaDTO2.setStrtDt(DateUtil.dayAdd(earlyDTO.getEndDt(), 1));					//시작일 (중도상환일 + 1)
					reScdhPrnaDTO2.setEndDt(prnaDTO.getEndDt());
					reScdhPrnaDTO2.setPrarDt(prnaDTO.getPrarDt());

					reScdhPrnaList.add(reScdhPrnaDTO1);
					reScdhPrnaList.add(reScdhPrnaDTO2);

				}

			}else{
				reScdhPrnaList.add(prnaDTO);
			}

		}
		// log.debug("\n reScdhPrnaList ::: {}", reScdhPrnaList);

		//inCalcDTO.setDealExcAmt(inCalcDTO.getDealExcBlce().subtract(inCalcDTO.getDealMrdpPrca()));
		inCalcDTO.setDealExcAmt(inCalcDTO.getDealExcBlce());
		//log.debug("newDealExcBlce: " + inCalcDTO.getDealExcAmt());

		inCalcDTO.setExcDt(DateUtil.dayAdd(inCalcDTO.getStdrDt(), 1));
		inCalcDTO.setDfrExpDt("");

		reScdhIntrList = intrCalculation(inCalcDTO, reScdhPrnaList);

		int reScdhRdmpTmrd = Integer.parseInt(earlyIntrCalcList.get(0).getRdmpTmrd());

		for(int i = 0; i < reScdhIntrList.size(); i++){
			reScdhIntrList.get(i).setRdmpTmrd(Integer.toString(reScdhRdmpTmrd+i+1));
		}

		//rsltList.addAll(intrCalcList2);
		//rsltList.addAll(earlyIntrCalcList2);
		rsltList.addAll(reScdhIntrList);

		for(int i = 0; i < rsltList.size(); i++){
			rsltList.get(i).setPaiTypCd(null);
		}

		//유효성 검사
		Iterator<CalculationResultDTO> iterator = rsltList.iterator();
        while (iterator.hasNext()) {
            CalculationResultDTO rsltDTO = iterator.next();

            if(rsltDTO.getRdmpPrarIntr().compareTo(BigDecimal.ZERO) <= 0){		//상환예정이자 0이나 음수면 무효
				iterator.remove();
			}else{
				// boolean isWithinRange = false;
				// for(int i = 0; i < earlyCalcList.size(); i++){

				// 	CalculationResultDTO mdwyPrnaDTO = earlyCalcList.get(i);

				// 	if(rsltDTO.getStrtDt().compareTo(DateUtil.dayAdd(mdwyPrnaDTO.getStrtDt(), -1)) >= 0 && rsltDTO.getEndDt().compareTo(mdwyPrnaDTO.getEndDt()) <= 0){
				// 		isWithinRange = true;
				// 		break;
				// 	}
				// }

				// if(isWithinRange){
				// 	iterator.remove();
				// }
			}
        }

		log.debug("\n rsltList ::: {}", rsltList);

		return rsltList;
	}



	/**
	 * 중도상환 여부 & 수수료 계산 
	 * @param inCalcDTO					//상환 기본정보
	 * @param scdhList					//상환스케줄 리스트
	 * @return
	 */
	public List<CalculationResultDTO> mdwyRdmpFeeCalc(CalculationDTO incaDto, List<CalculationResultDTO> scdhList){
		List<CalculationResultDTO> mdwyList = new ArrayList<>();			//중도상환 원금 + 수수료 스케줄 리스트 (반환값)
		List<CalculationResultDTO> mdwyScdhList = new ArrayList<>();

		//List<CalculationResultDTO> mdwyRdmpAmtList = new ArrayList<>();		//중도상환 원금 리스트
		//List<CalculationResultDTO> mdwyRdmpFeeList = new ArrayList<>();		//중도상환 수수료 리스트

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		for(int i = 0; i < scdhList.size(); i++){
			try {
				Date strtDate = dateFormat.parse(scdhList.get(i).getStrtDt());
				Date stdrDate = dateFormat.parse(incaDto.getStdrDt());
				Date endDate = dateFormat.parse(scdhList.get(i).getEndDt());
				Date prarDate = dateFormat.parse(scdhList.get(i).getPrarDt());

				//boolean isWithinRange = (stdrDate.after(strtDate) || stdrDate.equals(strtDate)) && (stdrDate.before(endDate) || stdrDate.equals(endDate));

				if(strtDate.before(stdrDate) && endDate.before(stdrDate)){		
					log.debug("###########중도상환 발생 전 기간 제외##############");

				}else{
					CalculationResultDTO mdwyScdhDTO = new CalculationResultDTO();

					mdwyScdhDTO.setStrtDt(scdhList.get(i).getStrtDt());
					mdwyScdhDTO.setEndDt(scdhList.get(i).getEndDt());
					mdwyScdhDTO.setPrarPrna(scdhList.get(i).getPrarPrna());
					mdwyScdhDTO.setRdmpTmrd(scdhList.get(i).getRdmpTmrd());
					mdwyScdhDTO.setBfBalance(scdhList.get(i).getBfBalance());

					mdwyScdhList.add(mdwyScdhDTO);
					
				}
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}	
		}

		BigDecimal mrdpPrca = incaDto.getDealMrdpPrca();					//중도상환원금
		log.debug("mrdpPrca::: " + incaDto.getDealMrdpPrca());

		BigDecimal mdwyRdmpFee = BigDecimal.ZERO;							//중도상환 수수료
		BigDecimal mdwyRdmpFeeRto = BigDecimal.ZERO;						//중도상환 수수료율

		BigDecimal totalPrarPrna = BigDecimal.ZERO;							//기존 상환예정원금 총합
		BigDecimal subtractMdwyAmt = incaDto.getDealMrdpPrca();				//중도상환원금 - 회차당 상환예정금

		for(int i = 0; i < mdwyScdhList.size(); i++){

			CalculationResultDTO scdhDto = mdwyScdhList.get(i);

			CalculationResultDTO mdwyRdmpAmtDto = new CalculationResultDTO();
			CalculationResultDTO mdwyRdmpFeeDto = new CalculationResultDTO();

			totalPrarPrna = totalPrarPrna.add(scdhDto.getPrarPrna());
			subtractMdwyAmt = subtractMdwyAmt.subtract(scdhDto.getPrarPrna());

			String stdrDt = incaDto.getStdrDt();		//기준일자
			String strtDt = scdhDto.getStrtDt();		//i회차 시작일자
			String endDt = scdhDto.getEndDt();			//i회차 종료일자

			String lpStrtDt = "";
			String lpEndDt = "";

			CalculationDTO mdwyRdmpFeeRtoParam = new CalculationDTO();		//중도상환 수수료율 구하기 위한 파라미터

			mdwyRdmpFeeRtoParam.setPrdtCd(incaDto.getPrdtCd());
			mdwyRdmpFeeRtoParam.setStdrDt(incaDto.getStdrDt());
			mdwyRdmpFeeRtoParam.setEndDt(scdhDto.getEndDt());

			mdwyRdmpFeeRto = ibims204bMapper.getMdwyRdmpFeeRto(mdwyRdmpFeeRtoParam).divide(new BigDecimal(100));

			// int rmDays = DateUtil.dateDiff(stdrDt, endDt)+1;			
			int loanPeroid = DateUtil.dateDiff(strtDt, endDt)+1;		

			int rmDays = 0;				//잔존일수 (n회차 종료일 - 중도상환일자 (기준일자))
			//int loanPeroid = 0;			//대출기간 (n회차 종료일 - n회차 시작일)
			

			if(i == 0){
				rmDays = DateUtil.dateDiff(stdrDt, endDt)+1;	
				lpStrtDt = stdrDt;	

			}else{
				rmDays = DateUtil.dateDiff(strtDt, endDt)+1;	
				lpStrtDt = strtDt;

			}

			BigDecimal rmDaysB = new BigDecimal(rmDays);			//잔존일수
			BigDecimal loanPeroidB = new BigDecimal(loanPeroid);	//대출기간

			if(totalPrarPrna.compareTo(mrdpPrca) <= 0){		 		//i회차 까지의 기존 상환예정 원금 총합이 중도상환 원금보다 작거나 같은 경우 
				//중도상환 수수료율 = 상환금액 * 중도상환 수수료율 * (잔존기간 / 대출기간)
				mdwyRdmpFee = scdhDto.getPrarPrna().multiply(mdwyRdmpFeeRto).multiply(rmDaysB.divide(loanPeroidB, 13, RoundingMode.HALF_UP));
				mdwyRdmpFee = process_down(incaDto.getIntrSnnoPrcsDcd(), mdwyRdmpFee);
				log.debug("중도상환 수수료(case1): " + mdwyRdmpFee);

				//중도상환 원금 스케줄 세팅...
				mdwyRdmpAmtDto.setPaiTypCd("8");						//8: 중도상환수수료
				mdwyRdmpAmtDto.setScxDcd("03");							//03: 수수료상환스케줄
				mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpAmtDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				mdwyRdmpAmtDto.setEndDt(endDt);									//종료일자 (중도상환일자 -1)

				mdwyList.add(mdwyRdmpAmtDto);

				//중도상환 수수료 스케줄 세팅 ...
				mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpFeeDto.setPrarPrna(scdhDto.getPrarPrna());							//대상금액
				mdwyRdmpFeeDto.setBfBalance(scdhDto.getPrarPrna());
				mdwyRdmpFeeDto.setPaiTypCd("9");						//원리금구분코드 9: 중도상환 수수료
				mdwyRdmpFeeDto.setScxDcd("02");							//02: 원금상환스케줄
				mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				mdwyRdmpFeeDto.setPrarDt("");
				mdwyRdmpFeeDto.setPrcsDt("");
				mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto.multiply(new BigDecimal(100)));					//적용이율 (중도상환 수수료율)
				mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				mdwyList.add(mdwyRdmpFeeDto);

				//중도상환 원금 스케줄 세팅...
				// mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpAmtDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				// mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				// mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				// mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				// mdwyRdmpAmtDto.setEndDt(endDt);									//종료일자 (중도상환일자)

				// mdwyList.add(mdwyRdmpAmtDto);

				// //중도상환 수수료 스케줄 세팅 ...
				// mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpFeeDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				// mdwyRdmpFeeDto.setBfBalance(scdhDto.getPrarPrna());
				// mdwyRdmpFeeDto.setScxDcd("9");							//원리금구분코드 9: 중도상환 수수료
				// mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				// mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				// mdwyRdmpFeeDto.setPrarDt("");
				// mdwyRdmpFeeDto.setPrcsDt("");
				// mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto);						//적용이율 (중도상환 수수료율)
				// mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				// mdwyList.add(mdwyRdmpFeeDto);
				
				if(totalPrarPrna.compareTo(mrdpPrca) == 0){
					break;
				}


			}else if(totalPrarPrna.compareTo(mrdpPrca) > 0){		//i회차 까지의 기존 상환예정 원금 총합이 중도상환 원금보다 큰 경우

				BigDecimal finalMdwyRdmp = BigDecimal.ZERO;

				if(i == 0){
					finalMdwyRdmp = mrdpPrca;
				}else{
					finalMdwyRdmp = mrdpPrca.subtract(totalPrarPrna.subtract(scdhDto.getPrarPrna()));
				}
				

				mdwyRdmpFee = finalMdwyRdmp.multiply(mdwyRdmpFeeRto).multiply(rmDaysB.divide(loanPeroidB, 13, RoundingMode.HALF_UP));
				mdwyRdmpFee = process_down(incaDto.getIntrSnnoPrcsDcd(), mdwyRdmpFee);
				log.debug("중도상환 수수료(case2): " + mdwyRdmpFee);

				//중도상환 원금 스케줄 세팅...
				mdwyRdmpAmtDto.setPaiTypCd("8");						//8: 중도상환수수료
				mdwyRdmpAmtDto.setScxDcd("03");							//03: 수수료상환스케줄
				mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpAmtDto.setPrarPrna(finalMdwyRdmp);	//대상금액
				mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				mdwyRdmpAmtDto.setEndDt(endDt);								//종료일자 (중도상환일자 -1)

				mdwyList.add(mdwyRdmpAmtDto);

				//중도상환 수수료 스케줄 세팅 ...
				mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpFeeDto.setPrarPrna(finalMdwyRdmp);						//대상금액
				mdwyRdmpFeeDto.setBfBalance(finalMdwyRdmp);
				mdwyRdmpFeeDto.setPaiTypCd("9");						//원리금구분코드 9: 중도상환 수수료
				mdwyRdmpFeeDto.setScxDcd("02");							//02: 원금상환스케줄
				mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				mdwyRdmpFeeDto.setPrarDt("");
				mdwyRdmpFeeDto.setPrcsDt("");
				mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto.multiply(new BigDecimal(100)));					//적용이율 (중도상환 수수료율)
				mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				mdwyList.add(mdwyRdmpFeeDto);

				// //중도상환 원금 스케줄 세팅...
				// mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpAmtDto.setPrarPrna(finalMdwyRdmp);						//대상금액
				// mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				// mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				// mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				// mdwyRdmpAmtDto.setEndDt(endDt);									//종료일자 (중도상환일자)

				// mdwyList.add(mdwyRdmpAmtDto);

				// //중도상환 수수료 스케줄 세팅 ...
				// mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpFeeDto.setPrarPrna(finalMdwyRdmp);						//대상금액
				// mdwyRdmpFeeDto.setBfBalance(finalMdwyRdmp);
				// mdwyRdmpFeeDto.setScxDcd("9");							//원리금구분코드 9: 중도상환 수수료
				// mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				// mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				// mdwyRdmpFeeDto.setPrarDt("");
				// mdwyRdmpFeeDto.setPrcsDt("");
				// mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto);						//적용이율 (중도상환 수수료율)
				// mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				// mdwyList.add(mdwyRdmpFeeDto);

				break;
			}

		}

		log.debug("\nmdwyList:::{}", mdwyList);

		return mdwyList;
	}

}



