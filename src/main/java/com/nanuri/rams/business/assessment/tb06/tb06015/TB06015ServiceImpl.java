package com.nanuri.rams.business.assessment.tb06.tb06015;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS204BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.IBIMS991BVO;
import com.nanuri.rams.business.common.vo.TB06015OVO;
import com.nanuri.rams.business.common.vo.TB06015PVO;
import com.nanuri.rams.business.common.vo.TB06015PVO.PrnRdmpInfoVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.com.utils.DateUtil;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.calculation.LoanData;

// import com.nanuri.rams.business.assessment.tb06.tb06015.LoanData;

import static java.time.temporal.ChronoUnit.DAYS;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06015ServiceImpl implements TB06015Service {
	
	private static BigDecimal loanBalanceTotal = BigDecimal.ZERO;				//대출원금합계
	private static BigDecimal interestTotal = BigDecimal.ZERO;					//이자합계
	private static BigDecimal interestSubTotal = BigDecimal.ZERO;				//
	private static BigDecimal MonthlyBalancPayTotalSum = BigDecimal.ZERO;		//월상환급 합계

	private final IBIMS403BMapper ibims403bMapper;
	private final IBIMS404BMapper ibims404BMapper;
	private final IBIMS991BMapper ibims991BMapper;
	private final IBIMS402BMapper ibims402BMapper;
	private final IBIMS204BMapper ibims204BMapper;					//중도상환수수료율

	private final Calculation calculation;
	//private final DateUtil dateUtil;

	//실행순번 SlectBox 세팅
	@Override
	public List<String> getExcSn(String prdtCd){
		return ibims402BMapper.getExcSnTB06015P(prdtCd);
	}

	@Override
	public TB06015SVO setIntrCalcSimulation(TB06015PVO param){

		TB06015SVO svo = new TB06015SVO();
		svo = paramSett(param);	//TB06015PVO 파라미터 TB06015SVO로 변환

		svo.setLoanBalance(param.getDealExcBlce());					// 대출잔액 == 딜실행잔액
		svo.setBaseRate(param.getFxnIntrt()+param.getAddIntrt());	// 고정/기준금리+가산금리
		svo.setAplyIntrt(svo.getBaseRate()/100);					// 적용율

		CalculationDTO calcDto = new CalculationDTO();

		String dfrExpDt = "";

		if(svo.getDfrExpMnum() != 0){
			dfrExpDt = monthAdd(svo.getExcDt(), svo.getDfrExpMnum());
		}

		calcDto.setPaiRdmpDcd(svo.getPaiRdmpDcd());					//원금상환방법
		calcDto.setExcDt(svo.getExcDt());							//신규일자
		calcDto.setExpDt(svo.getMtrtDt());							//만기일자
		calcDto.setStdrDt(svo.getStdrDt());							//기준일자(예정일자)
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
		calcDto.setDealMrdpPrca(svo.getDealMrdpPrca());				//중도상환원금
		calcDto.setMdwyRdmpFeeRto(svo.getMdwyRdmpFeeRto());			//중도상환 수수료율
		calcDto.setOvduIntrRt(svo.getOvduIntrRt());					//연체금리
		calcDto.setPrcsDt(svo.getPrcsDt());							//처리일자

		calcDto.setPrdtCd(param.getPrdtCd());
		// calcDto.set

		// int daysInt1 = DateUtil.dateDiff(calcDto.getExcDt(), calcDto.getStdrDt());
		// int daysInt2 = DateUtil.dateDiff(calcDto.getExcDt(), calcDto.getExpDt());
		log.debug(">>> 금리정보 [" + calcDto.getIntrtInfoList() + "] <<<");
		//log.debug("적용금리: {}",param.getIntrtInfoList().get(0).getAplyIntrt() );
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
		log.debug(">>> 중도상환원금 dealMrdpPrca [" + calcDto.getDealMrdpPrca() + "]");
		log.debug(">>> 중도상환수수료 mdwyRdmpFeeRto [" + calcDto.getMdwyRdmpFeeRto() + "]");
		
		log.debug(">>> 신규일자 ExcDt ["+calcDto.getExcDt()+"] <<<");
		log.debug(">>> 만기일자 ExpDt ["+calcDto.getExpDt()+"] <<<");
		log.debug(">>> 기준일자(예정일자) stdrDt ["+calcDto.getStdrDt()+"] <<<");

		TB06015SVO returnVO = new TB06015SVO();

		List<CalculationResultDTO> calcRsltList = getIntrCalcSimulation(calcDto, param);
		//List<CalculationResultDTO> calcRsltList = calculation.getIntrCalcSimulation(calcDto);

		// if(calcRsltList.size() > 1){
			CalculationSumDTO totalDTO = totalCalculation(calcDto, calcRsltList);
			returnVO.setTotalDTO(totalDTO);
		//}
		

		List<TB06015OVO> scdhList = sortCalcList(calcDto, calcRsltList);

		returnVO.setScdhList(scdhList);
		

		return returnVO;
	}

	
	public List<CalculationResultDTO> getIntrCalcSimulation(CalculationDTO calcDto, TB06015PVO param) {

		List<CalculationResultDTO> prnaCalcList = new ArrayList<CalculationResultDTO>();		//원금상환 리스트
		List<CalculationResultDTO> intrCalcList = new ArrayList<CalculationResultDTO>();		//이자상환 리스트
		List<CalculationResultDTO> earlyRpList = new ArrayList<CalculationResultDTO>();			//중도상환 리스트
		List<CalculationResultDTO> earlyRpCalcList = new ArrayList<CalculationResultDTO>();		//중도상환수수료 계산 리스트

		List<CalculationResultDTO> calcList = new ArrayList<CalculationResultDTO>();			//상환 리스트 전체 (반환값)

		ArrayList<TB06015OVO> outList = new ArrayList<TB06015OVO>();


		if(param.getRdmpPlanList().size() < 1){			//원금상환계획정보 파라미터에 없으면

			log.debug("#########원금상환 계획 정보 없음!!#############");

			List<LoanData> testList = calculation.prnaRdmpSchedule(calcDto);

			prnaCalcList = prnaCalc(calcDto);					//원금 계산
			intrCalcList = intrCalc(calcDto, prnaCalcList);		//이자 계산

			if(calcDto.getDealMrdpPrca() == null || calcDto.getDealMrdpPrca() == BigDecimal.ZERO){
				log.debug("#########중도상환 발생X#########");
			}else{
				log.debug("#########중도상환 발생O#########");
	
				//earlyRpCalcList = earlyRpnaCalc(calcDto, prnaCalcList);
				earlyRpCalcList = mdwyRdmpFeeCalc(calcDto, prnaCalcList);
				//prnaCalcList = calcEarlyPrna(calcList, earlyRpCalcList);
			}

			prnaCalcList = throwAfterBaseDt(calcDto, prnaCalcList);
			intrCalcList = throwAfterBaseDt(calcDto, intrCalcList);

		}else{
			log.debug("#########원금상환 계획 정보 있음!!#############");

			List<IBIMS403BDTO> scdList = new ArrayList<IBIMS403BDTO>();
			List<IBIMS403BDTO> prnaScdlList = param.getRdmpPlanList();
			List<IBIMS403BDTO> intrScdlList = param.getIntrtPlanList();

			scdList.addAll(prnaScdlList);
			scdList.addAll(intrScdlList);

			//중도상환 리스트 
			if(calcDto.getDealMrdpPrca() == null || calcDto.getDealMrdpPrca().compareTo(BigDecimal.ZERO) == 0){
				log.debug("#########중도상환 발생X#########");
			}else{
				log.debug("#########중도상환 발생O#########");
				prnaCalcList = listTypeSett2(calcDto, scdList);
				//earlyRpCalcList = earlyRpnaCalc(calcDto, prnaCalcList);

				earlyRpCalcList = mdwyRdmpFeeCalc(calcDto, prnaCalcList);
				//prnaCalcList = calcEarlyPrna(calcList, earlyRpCalcList);
			}

			//원금상환 리스트(파라미터)
			prnaCalcList = listTypeSett3(calcDto, prnaScdlList);

			
		
			if(intrScdlList.size() < 1){
				
				log.debug("이자상환계획정보 없음 !!!!!!!!!");
				intrCalcList = intrCalc(calcDto, prnaCalcList);

			}else{
				log.debug("이자상환계획정보 있음 !!!!!!!!!");
				intrCalcList = intrCalcWithScdl(calcDto, prnaCalcList, intrScdlList);
			}

			intrCalcList = throwAfterBaseDt(calcDto, intrCalcList);

			//원금상환 리스트
			prnaCalcList = listTypeSett(calcDto, prnaScdlList);
		}


		calcList.addAll(prnaCalcList);
		calcList.addAll(intrCalcList);
		
		//연체 리스트
		List<CalculationResultDTO> ovduList = overduePrnaCalc(calcDto, calcList);

		calcList.addAll(earlyRpList);
		calcList.addAll(ovduList);

		List<CalculationResultDTO> earlyIntrList = new ArrayList<>();

		if(earlyRpCalcList.size() > 0){
			
			calcList.addAll(earlyRpCalcList);

			//earlyIntrList = intrCalcWhenMdwy(calcDto, earlyRpCalcList, intrCalcList);
			//calcList.addAll(earlyIntrList);

			List<IBIMS403BDTO> scdList = new ArrayList<IBIMS403BDTO>();
			List<IBIMS403BDTO> prnaScdlList = param.getRdmpPlanList();
			List<IBIMS403BDTO> intrScdlList = param.getIntrtPlanList();

			scdList.addAll(prnaScdlList);
			scdList.addAll(intrScdlList);

			calcDto.setDealMrdpPrca(listTypeSett2(calcDto, scdList).get(0).getPrarPrna());

			List<CalculationResultDTO> frstPrnaList = earlyRpnaCalc(calcDto, listTypeSett2(calcDto, scdList));

				//log.debug("\nfrstPrnaList:::{}", frstPrnaList);
			List<CalculationResultDTO> frstIntrList = intrCalcWhenMdwy(calcDto, frstPrnaList, intrCalcList);

			calcList.addAll(frstIntrList);
			
		}else if(calcDto.getLastIntrClcDt() != null && calcDto.getLastIntrClcDt().compareTo(calcDto.getStdrDt()) <= 0){

			List<IBIMS403BDTO> scdList = new ArrayList<IBIMS403BDTO>();
			List<IBIMS403BDTO> prnaScdlList = param.getRdmpPlanList();
			List<IBIMS403BDTO> intrScdlList = param.getIntrtPlanList();

			scdList.addAll(prnaScdlList);
			scdList.addAll(intrScdlList);

			if(listTypeSett2(calcDto, scdList).size() > 1){
				log.debug("최종이자계산일자 ~ 기산일자(상환일자) 이자 계산");

				calcDto.setDealMrdpPrca(listTypeSett2(calcDto, scdList).get(0).getPrarPrna());

				List<CalculationResultDTO> frstPrnaList = earlyRpnaCalc(calcDto, listTypeSett2(calcDto, scdList));

				//log.debug("\nfrstPrnaList:::{}", frstPrnaList);
				List<CalculationResultDTO> frstIntrList = intrCalcWhenMdwy(calcDto, frstPrnaList, intrCalcList);

				log.debug("\nfrstIntrList:::{}", frstIntrList);
				calcList.addAll(frstIntrList);
			}
			
			
		}

		return calcList;
	}


	/**
	 * 상환스케줄 정렬
	 * @param calcDto					//상환 기본정보
	 * @param calcList					//상환스케줄 리스트
	 * @return
	 */
	public ArrayList<TB06015OVO> sortCalcList(CalculationDTO calcDto, List<CalculationResultDTO> calcList){

		ArrayList<TB06015OVO> outList = new ArrayList<TB06015OVO>();


		Iterator<CalculationResultDTO> it = calcList.iterator();
		String paidRdmpDcd = "";
		while(it.hasNext()){
			String aplyIntrtContent = null;

			CalculationResultDTO item = it.next();

			TB06015OVO inVo = new TB06015OVO();

			double aplyIntrt = 0;

			BigDecimal prnaContent = BigDecimal.ZERO;
			BigDecimal intrContent = BigDecimal.ZERO;
			BigDecimal blncContent = BigDecimal.ZERO;

			String intrSnnoPrcsDcd = calcDto.getIntrSnnoPrcsDcd();

			if(item.getScxDcd().equals("1")){
				paidRdmpDcd = "원금(1)";

				prnaContent = process_down(intrSnnoPrcsDcd, item.getPrarPrna());
				blncContent = process_down(intrSnnoPrcsDcd, item.getBfBalance());

				inVo.setMonthlyBalancPayTotal(prnaContent);
				inVo.setMonthlyPayment(blncContent);

			}else if(item.getScxDcd().equals("2")){
				paidRdmpDcd = "정상이자(2)";

				intrContent = process_down(intrSnnoPrcsDcd, item.getRdmpPrarIntr());

				aplyIntrt = item.getAplyIrt().doubleValue();
				aplyIntrt = Math.round(aplyIntrt * 100.0) / 100.0;

				inVo.setMonthlyBalancPayTotal(intrContent);
				inVo.setMonthlyPayment(item.getPrarPrna());
				aplyIntrtContent = String.valueOf(aplyIntrt);
			}else if(item.getScxDcd().equals("4") || item.getScxDcd().equals("5")){

				if(item.getScxDcd().equals("4")){  		//납부이자연체금액
					paidRdmpDcd = "납부이자연체금액(4)";
				}else if(item.getScxDcd().equals("5")){	//원금연체금액
					paidRdmpDcd = "원금연체금액(5)";
				}
				

				intrContent = process_down(intrSnnoPrcsDcd, item.getRdmpPrarIntr());
				prnaContent = process_down(intrSnnoPrcsDcd, item.getPrarPrna());

				aplyIntrt = item.getAplyIrt().doubleValue();
				inVo.setMonthlyBalancPayTotal(intrContent);
				inVo.setMonthlyPayment(prnaContent);
				aplyIntrtContent = String.valueOf(aplyIntrt);
			}else if(item.getScxDcd().equals("9")){// 중도상환 수수료

				paidRdmpDcd = "중도상환 수수료(9)";

				intrContent = process_down(intrSnnoPrcsDcd, item.getRdmpPrarIntr());
				prnaContent = process_down(intrSnnoPrcsDcd, item.getPrarPrna());

				aplyIntrt = item.getAplyIrt().doubleValue();
				aplyIntrt = Math.round(aplyIntrt * 10000.0)/100.0;

				inVo.setMonthlyBalancPayTotal(intrContent);
				inVo.setMonthlyPayment(prnaContent);
				aplyIntrtContent = String.valueOf(aplyIntrt);

			}else if(item.getScxDcd().equals("8")){
				paidRdmpDcd = "중도상환원금(8)";

				prnaContent = process_down(intrSnnoPrcsDcd, item.getPrarPrna());
				blncContent = process_down(intrSnnoPrcsDcd, item.getBfBalance());

				inVo.setMonthlyBalancPayTotal(prnaContent);
				inVo.setMonthlyPayment(blncContent);

			}

			inVo.setSeq(item.getRdmpTmrd());
			inVo.setPaiRdmpDcd(paidRdmpDcd);
			inVo.setStrtDt(item.getStrtDt());
			inVo.setEndDt(item.getEndDt());
			inVo.setDdCnt(DateUtil.dateDiff(item.getStrtDt(), item.getEndDt())+1);
			inVo.setAplyIntrtContent(aplyIntrtContent);

			outList.add(inVo);

		}

		outList.sort(Comparator.comparing(TB06015OVO::getMonthlyPayment, Comparator.reverseOrder()).thenComparing(TB06015OVO::getStrtDt));


		List<TB06015OVO> intrOvduList = new ArrayList<>();  // 이자연체 리스트
        List<TB06015OVO> prnaOvduList = new ArrayList<>();  // 원금연체 리스트
		List<TB06015OVO> mdwyFeeList = new ArrayList<>();	//중도상환수수료 리스트

        // 연체 기록 추출
        Iterator<TB06015OVO> iterator = outList.iterator();
        while (iterator.hasNext()) {
            TB06015OVO outVO = iterator.next();

            if (outVO.getPaiRdmpDcd().equals("납부이자연체금액(4)")) {
                intrOvduList.add(outVO);
                iterator.remove();
            } else if (outVO.getPaiRdmpDcd().equals("원금연체금액(5)")) {
                prnaOvduList.add(outVO);
                iterator.remove();
            } else if(outVO.getPaiRdmpDcd().equals("중도상환 수수료(9)")){
				mdwyFeeList.add(outVO);
				iterator.remove();
			}
        }

        // 최종 리스트 생성 및 병합
        ArrayList<TB06015OVO> rtrnList = new ArrayList<>(outList);

        // 원금(1) 기준으로 원금연체금액 추가
        ListIterator<TB06015OVO> iterator2 = rtrnList.listIterator();
        while (iterator2.hasNext()) {
            TB06015OVO calcVO = iterator2.next();

            if (calcVO.getPaiRdmpDcd().equals("원금(1)")) {
                for (TB06015OVO prnaOvduVO : prnaOvduList) {
                    if (calcVO.getSeq() == prnaOvduVO.getSeq()) {
                        iterator2.add(prnaOvduVO);
                        break;
                    }
                }
            }
        }

        // 정상(2) 기준으로 이자연체금액 추가
        ListIterator<TB06015OVO> iterator3 = rtrnList.listIterator();
        while (iterator3.hasNext()) {
            TB06015OVO calcVO = iterator3.next();

            if (calcVO.getPaiRdmpDcd().equals("정상이자(2)")) {
                for (TB06015OVO intrOvduVO : intrOvduList) {
                    if (calcVO.getSeq() == intrOvduVO.getSeq()) {
                        iterator3.add(intrOvduVO);
                        break;
                    }
                }
            }
        }

		// 중도상환원금(8) 기준으로 중도상환수수료 추가
		ListIterator<TB06015OVO> iterator4 = rtrnList.listIterator();
		while (iterator4.hasNext()) {
            TB06015OVO calcVO = iterator4.next();

            if (calcVO.getPaiRdmpDcd().equals("중도상환원금(8)")) {
                for (TB06015OVO mdwyFeeVO : mdwyFeeList) {
                    if (calcVO.getSeq() == mdwyFeeVO.getSeq()) {
                        iterator4.add(mdwyFeeVO);
                        break;
                    }
                }
            }
        }
        return rtrnList;
	}


	/**
	 * 만기일시상환
	 * @param inSvo
	 * @param loanList
	 * @return
	 */
	public ArrayList<LoanData> calcPayment4(TB06015SVO inSvo, ArrayList<LoanData> loanList) {
		
		BigDecimal bfBalance = inSvo.getLoanBalance();
		ArrayList<LoanData> loanOutList = new ArrayList<LoanData>();
		loanBalanceTotal = BigDecimal.ZERO;
		interestSubTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;
		

		Iterator<LoanData> it = loanList.iterator();
		
		while(it.hasNext()) {
			
			LoanData item = it.next();

			LoanData outLnItm = new LoanData();
			outLnItm.setSeq(item.getSeq());
			outLnItm.setPaiRdmpDcd(item.getPaiRdmpDcd());
			outLnItm.setStrtDt(item.getStrtDt());
			outLnItm.setEndDt(item.getEndDt());
			
			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inSvo.getPrdtCd());
			inParm.setAplyStrtDt(item.getStrtDt());
			inParm.setAplyEndDt(item.getEndDt());
			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);
			// System.out.println(">>>>>>>>>>>>>>>>>>>> 금리구간건수 : ["+out404.size()+"] <<<<<<<<<<<<<<<<<");

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			BigDecimal interestSubTotal = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";
			
			// 금리구간 Loop
			for(int i=0; i<out404.size(); i++) 
			{
				
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				
				IBIMS404BVO ibItem = out404.get(i);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				outLnItm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
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
					
					ddCnt = dNumClc(strtDt, getBasDt(inSvo, endDt)); // 일수계산
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
//					System.out.println("######## 1-1. strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
							ddCnt--;
//							System.out.println("######## LAST 1. strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ########");
						}
					}
					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
											
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = dNumClc(strtDt, getBasDt(inSvo, strLstDt)); 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
//					System.out.println("######## 2-1. strtDt["+strtDt+"] endDt["+strLstDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = dNumClc(endDt.substring(0, 4)+"0101", endDt); 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
//					System.out.println("######## 2-1. strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt2["+ddCnt2+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
							ddCnt2--;
//							System.out.println("######## LAST 2. strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt["+ddCnt2+"] ########");
							
						}
					}		
			
					actualType2 = actualYear(inSvo.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));

				}
				
			}	//	end for 
			outLnItm.setAplyIntrtContent(aplyIntrtContent);
			//outLnItm.setDdCnt(ddCnt);

			outLnItm.setDdCntContent(ddCntContent);
			outLnItm.setMonthlyInterest(process_down(inSvo.getIntrSnnoPrcsDcd(), monthlySubInterest));
			interestTotal = interestTotal.add(process_down(inSvo.getIntrSnnoPrcsDcd(), monthlySubInterest));
			
			// 마지막 회차인경우 
			if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {
				
//				System.out.println("########## 마지막 ###############");
				
				// 납입원금
				outLnItm.setMonthlyPayment(inSvo.getLoanBalance());
				loanBalanceTotal = loanBalanceTotal.add(inSvo.getLoanBalance());
				
				// 월상환금
				outLnItm.setMonthlyBalancPayTotal(loanBalanceTotal.add(outLnItm.getMonthlyInterest()));
				MonthlyBalancPayTotalSum = MonthlyBalancPayTotalSum.add(loanBalanceTotal.add(outLnItm.getMonthlyInterest()));
				
				// 회차기준 대출잔금
				outLnItm.setMonthlyBalance(BigDecimal.ZERO);	
				
			} else {
				
				// 납입원금
				outLnItm.setMonthlyPayment(BigDecimal.ZERO);
				loanBalanceTotal = loanBalanceTotal.add(BigDecimal.ZERO);
				
				// 월상환금(원리금)
				outLnItm.setMonthlyBalancPayTotal(outLnItm.getMonthlyInterest());
				MonthlyBalancPayTotalSum = MonthlyBalancPayTotalSum.add(outLnItm.getMonthlyInterest());
				 
				// 회차기준 대출잔금
				outLnItm.setMonthlyBalance(BigDecimal.ZERO);	
				
			}
			
			// 납입원금누계
			outLnItm.setMonthlyPaymentTotal(BigDecimal.ZERO);
			
			loanOutList.add(outLnItm);

		} // end while
		
		
		return loanOutList;
	}

	
	/**
	 * 원금불균등상환
	 * @param inSvo
	 * @param loanList
	 * @return
	 */
	public ArrayList<LoanData> calcPayment3(TB06015SVO inSvo, ArrayList<LoanData> loanList){

		BigDecimal changeBalance = inSvo.getLoanBalance(); 		// 변동잔액
		BigDecimal bfBalance = inSvo.getLoanBalance();			// 원금잔액

		ArrayList<LoanData> loanOutList = new ArrayList<LoanData>();
		loanBalanceTotal = BigDecimal.ZERO;
		interestSubTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;

		Iterator<LoanData> it = loanList.iterator();
		int loopCnt = 0;
		int ryCnt = 0;
		double oldAplyIntrt = 0d;

		while(it.hasNext()){

			loopCnt++;

			LoanData item = it.next();

			LoanData outLnItm = new LoanData();
			outLnItm.setSeq(item.getSeq());
			outLnItm.setPaiRdmpDcd(item.getPaiRdmpDcd());
			outLnItm.setStrtDt(item.getStrtDt());
			outLnItm.setEndDt(item.getEndDt());
			outLnItm.setMonthlyPayment(item.getMonthlyPayment());			//N회차 상환예정원금

			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inSvo.getPrdtCd());
			inParm.setAplyStrtDt(item.getStrtDt());
			inParm.setAplyEndDt(item.getEndDt());
			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);

			log.debug(outLnItm.getSeq() + "회차 금리구간건수: " + out404.size());
			log.debug(outLnItm.getSeq() + "회차 원금상환방법: "+ outLnItm.getPaiRdmpDcd());
			log.debug(outLnItm.getSeq() + "회차 시작일: " + outLnItm.getStrtDt());
			log.debug(outLnItm.getSeq() + "회차 종료일: " + outLnItm.getEndDt());
			log.debug(outLnItm.getSeq() + "회차 일수: " + item.getDdCnt());
			log.debug(outLnItm.getSeq() + "회차 상환예정원금: " + item.getMonthlyPayment());

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			BigDecimal interestSubTotal = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";

			for(int i=0; i<out404.size(); i++) {		//금리구간 Loop

				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(i);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				outLnItm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));

				log.debug("적용 금리 : " + outLnItm.getAplyIntrt());

				

				
			}//end of for

			


		}//end of while



		return loanOutList;
	}

	/**
	 * 원리금균등분할상환
	 * @param inSvo
	 * @param loanList
	 * @return
	 */
	public ArrayList<LoanData> calcPayment2(TB06015SVO inSvo, ArrayList<LoanData> loanList) {

		BigDecimal MonthlyPaymentTotal = BigDecimal.ZERO; 		// 균등상환금액
		BigDecimal changeBalance = inSvo.getLoanBalance(); 		// 변동잔액
		BigDecimal bfBalance = inSvo.getLoanBalance();			// 원금잔액
		int loanAplyCount = (int)inSvo.getMonthlyLoanCnt()-inSvo.getDfrCnt(); // 원금배분기간 = 총회차 - 거치기간회차		
		int changeLoanCnt = 0;									// 변동기간
		ArrayList<LoanData> loanOutList = new ArrayList<LoanData>();
		loanBalanceTotal = BigDecimal.ZERO;
		interestSubTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;
		
//		// 원리금계산1 => 대출금액*이자율/12
//		BigDecimal eqltRdptAmtCal1 = bfBalance.multiply(new BigDecimal(inSvo.getAplyIntrt())).divide(new BigDecimal("12"), 9, RoundingMode.HALF_DOWN);
//		
//		// 원리금계산2 => (1+이자율/12)^총회차
//		BigDecimal eqltRdptAmtCal2 = (BigDecimal.ONE.add(new BigDecimal(inSvo.getAplyIntrt()).divide(new BigDecimal("12"), 9, RoundingMode.HALF_DOWN))).pow((int)inSvo.getMonthlyLoanCnt());
//		
//		// 원리금계산3 => (1+이자율/12)^총회차-1
//		BigDecimal eqltRdptAmtCal3 = (BigDecimal.ONE.add(new BigDecimal(inSvo.getAplyIntrt()).divide(new BigDecimal("12"), 9, RoundingMode.HALF_DOWN))).pow((int)inSvo.getMonthlyLoanCnt()).subtract(BigDecimal.ONE);
//		
//		
//		System.out.println("계산1 : "+eqltRdptAmtCal1);
//		System.out.println("계산2 : "+eqltRdptAmtCal2);
//		System.out.println("계산3 : "+eqltRdptAmtCal3.toPlainString());
//		System.out.println("총상환회차 : "+inSvo.getMonthlyLoanCnt());
//		System.out.println("대출금액 : "+bfBalance);
//		System.out.println("적용금리 : "+inSvo.getAplyIntrt());
//		
//		/*
//		 * 원리금계산 => 대출금액*이자율/12*(1+이자율/12)^총회차/((1+이자율/12)^총회차-1)
//		 * 원리금계산 => 원리금계산1 * 원리금계산2 / 원리금계산3
//		 * 위 두식은 같은것임 식별하기 쉽게하기 위하여 나누어 표현함    
//		 */
//		MonthlyPaymentTotal = eqltRdptAmtCal1.multiply(eqltRdptAmtCal2).divide(eqltRdptAmtCal3, 9, RoundingMode.HALF_UP);
//		MonthlyPaymentTotal = process_down(inSvo.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal);
		
//		double monthlyRate = inSvo.getBaseRate()/12/100;
//		
//		BigDecimal denominator = new BigDecimal(Math.pow(monthlyRate+1, loanAplyCount)-1);
//		BigDecimal molecule  = bfBalance.multiply(new BigDecimal(monthlyRate*(Math.pow(monthlyRate+1, loanAplyCount))));
//		MonthlyPaymentTotal = process_down(inSvo.getIntrSnnoPrcsDcd(), molecule.divide(denominator, 9, RoundingMode.HALF_UP));	// 월상환금
//		
//		System.out.println("#$####### MonthlyPaymentTotal["+MonthlyPaymentTotal+"] #$#######");
		
		Iterator<LoanData> it = loanList.iterator();
		int loopCnt = 0;
		int ryCnt = 0;
		double oldAplyIntrt = 0d;
		
		while(it.hasNext()) {

			loopCnt++;
			LoanData item = it.next();
			
			LoanData outLnItm = new LoanData();
			outLnItm.setSeq(item.getSeq());
			outLnItm.setPaiRdmpDcd(item.getPaiRdmpDcd());
			outLnItm.setStrtDt(item.getStrtDt());
			outLnItm.setEndDt(item.getEndDt());

			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inSvo.getPrdtCd());
			inParm.setAplyStrtDt(item.getStrtDt());
			inParm.setAplyEndDt(item.getEndDt());
			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);
			// System.out.println(">>>>>>>>>>>>>>>>>>>> 금리구간건수 : ["+out404.size()+"] <<<<<<<<<<<<<<<<<");

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
//			BigDecimal interestSubTotal = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";
			double ddcntTtl = 0d;
			
			// 금리구간 Loop
			for(int i=0; i<out404.size(); i++) 
			{
			
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(i);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				outLnItm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
				if(oldAplyIntrt != aplyIntrt) {
					oldAplyIntrt = aplyIntrt;
					changeBalance = bfBalance;
					changeLoanCnt = (loopCnt==1)?loanAplyCount:(loanAplyCount-loopCnt);
					System.out.println("#======================================================================================================================================================= #$#######");
					System.out.println("#======================================================================================================================================================= #$#######");
					System.out.println("#$####### loopCnt["+loopCnt+"] aplyIntrt["+aplyIntrt+"] oldAplyIntrt["+oldAplyIntrt+"] changeBalance["+changeBalance+"] changeLoanCnt["+changeLoanCnt+"] #$#######");
					System.out.println("#======================================================================================================================================================= #$#######");
					System.out.println("#======================================================================================================================================================= #$#######");
				} 
				
				double monthlyRate = aplyIntrt/12;				
				// 원리금계산1 => 대출금액*이자율/12
				BigDecimal eqltRdptAmtCal1 = inSvo.getLoanBalance().multiply(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP));			
				// 원리금계산2 => (1+이자율/12)^총회차
				BigDecimal eqltRdptAmtCal2 = (BigDecimal.ONE.add(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP))).pow(changeLoanCnt);
				// 원리금계산3 => (1+이자율/12)^총회차-1
				BigDecimal eqltRdptAmtCal3 = (BigDecimal.ONE.add(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP)).pow(changeLoanCnt).subtract(BigDecimal.ONE));
				
				System.out.println("계산1 : "+eqltRdptAmtCal1);
				System.out.println("계산2 : "+eqltRdptAmtCal2);
				System.out.println("계산3 : "+eqltRdptAmtCal3.toPlainString());
				System.out.println("총상환회차 : "+changeLoanCnt);
				System.out.println("대출금액 : "+inSvo.getLoanBalance());
				System.out.println("적용금리 : "+aplyIntrt);
				
				/*
				 * 원리금계산 => 대출금액*이자율/12*(1+이자율/12)^총회차/((1+이자율/12)^총회차-1)
				 * 원리금계산 => 원리금계산1 * 원리금계산2 / 원리금계산3
				 * 위 두식은 같은것임 식별하기 쉽게하기 위하여 나누어 표현함    
				 */
				MonthlyPaymentTotal = eqltRdptAmtCal1.multiply(eqltRdptAmtCal2).divide(eqltRdptAmtCal3, 9, RoundingMode.HALF_UP);
				
//				double monthlyRate = aplyIntrt/12;
//				
//				BigDecimal denominator = new BigDecimal(Math.pow(monthlyRate+1, changeLoanCnt)-1);
//				BigDecimal molecule  = changeBalance.multiply(new BigDecimal(monthlyRate*(Math.pow(monthlyRate+1, changeLoanCnt))));
//				MonthlyPaymentTotal = molecule.divide(denominator, 9, RoundingMode.HALF_UP);	// 월상환금
////				MonthlyPaymentTotal = process_down(inSvo.getIntrSnnoPrcsDcd(), molecule.divide(denominator, 9, RoundingMode.HALF_UP));	// 월상환금
//				System.out.println("#$####### MonthlyPaymentTotal["+MonthlyPaymentTotal+"] monthlyRate["+monthlyRate+"] oldAplyIntrt["+oldAplyIntrt+"] changeBalance["+changeBalance+"] changeLoanCnt["+changeLoanCnt+"] #$#######");
				
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
					
					ddCnt = dNumClc(strtDt, getBasDt(inSvo, endDt)); // 일수계산
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt--;
							; 
//							System.out.println("######## LAST 1. strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ########");
						}
					}
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
//					System.out.println("######## 1-1. bfBalance["+bfBalance+"] strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					

					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
//					System.out.println("######## monthlySubInterest 1. bfBalance["+bfBalance+"] aplyIntrt["+aplyIntrt+"] dayRate["+dayRate+"] ddCnt["+ddCnt+"] actualType["+actualType+"] #######");
//					interestSubTotal =     interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
					
						
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = dNumClc(strtDt, strLstDt); 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
//					System.out.println("######## monthlySubInterest 2-1. bfBalance["+bfBalance+"] aplyIntrt["+aplyIntrt+"] dayRate["+dayRate+"] ddCnt["+ddCnt+"] actualType["+actualType+"] #######");					
//					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
//					System.out.println("######## 2-1. bfBalance["+bfBalance+"] strtDt["+strtDt+"] endDt["+strLstDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] monthlySubInterest["+monthlySubInterest+"] ########");
											
					ddCnt2 = dNumClc(endDt.substring(0, 4)+"0101", getBasDt(inSvo, endDt));
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt2--;
							;
//							System.out.println("######## LAST 2. bfBalance["+bfBalance+"] strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt["+ddCnt2+"]  ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
							
						}
					}						
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
	
					actualType2 = actualYear(inSvo.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
//					System.out.println("######## monthlySubInterest 2-2. bfBalance["+bfBalance+"] aplyIntrt["+aplyIntrt+"] dayRate2["+dayRate2+"] ddCnt2["+ddCnt2+"] actualType2["+actualType2+"] #######");					
//					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
//					System.out.println("######## 2-2. bfBalance["+bfBalance+"] strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt2["+ddCnt2+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"]  monthlySubInterest["+monthlySubInterest+"]########");
					
				}
				
				ddcntTtl = ddCnt + ddCnt2;
			}	//	end for
			//double ddcnt = Double.parseDouble(ddCntContent[0]);		

			outLnItm.setAplyIntrtContent(aplyIntrtContent);
			outLnItm.setDdCnt(ddcntTtl);
			outLnItm.setDdCntContent(ddCntContent);
			outLnItm.setMonthlyInterest(process_down(inSvo.getIntrSnnoPrcsDcd(), monthlySubInterest));
//			outLnItm.setMonthlyInterest(monthlySubInterest);
			interestTotal = interestTotal.add(monthlySubInterest);

			
			if(loopCnt <= inSvo.getDfrCnt()) {
				
				// 납입원금
				outLnItm.setMonthlyPayment(new BigDecimal(0));
				loanBalanceTotal = loanBalanceTotal.add(new BigDecimal(0));
				
				// 납입원금누계
				outLnItm.setMonthlyPaymentTotal(new BigDecimal(0));
//				bfMonthlyBalance = (new BigDecimal(0));
				
				// 월상환금
				outLnItm.setMonthlyBalancPayTotal(BigDecimal.ZERO);
				MonthlyBalancPayTotalSum = BigDecimal.ZERO;
				
			} else {
				
				ryCnt++;
				
				// 월상환금
				outLnItm.setMonthlyBalancPayTotal(process_down(inSvo.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal));
//				outLnItm.setMonthlyBalancPayTotal(MonthlyPaymentTotal);
				MonthlyBalancPayTotalSum = MonthlyBalancPayTotalSum.add(MonthlyPaymentTotal);
				
				// 납입원금
				outLnItm.setMonthlyPayment(process_down(inSvo.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal.subtract(monthlySubInterest)));
//				outLnItm.setMonthlyPayment(MonthlyPaymentTotal.subtract(monthlySubInterest));
				
				// 납입원금누계
				loanBalanceTotal = loanBalanceTotal.add(MonthlyPaymentTotal.subtract(monthlySubInterest));
				outLnItm.setMonthlyPaymentTotal(process_down(inSvo.getIntrSnnoPrcsDcd(), loanBalanceTotal));				
//				outLnItm.setMonthlyPaymentTotal(loanBalanceTotal);
				
				if(ryCnt == 1) {
					// 대출잔금
					outLnItm.setMonthlyBalance(process_down(inSvo.getIntrSnnoPrcsDcd(), inSvo.getLoanBalance().subtract(MonthlyPaymentTotal.subtract(monthlySubInterest))));
//					outLnItm.setMonthlyBalance(inSvo.getLoanBalance().subtract(MonthlyPaymentTotal.subtract(monthlySubInterest)));
					bfBalance = inSvo.getLoanBalance().subtract(MonthlyPaymentTotal.subtract(monthlySubInterest));	
					
				} else { 
					// 대출잔금
					outLnItm.setMonthlyBalance(process_down(inSvo.getIntrSnnoPrcsDcd(), inSvo.getLoanBalance().subtract(loanBalanceTotal)));
//					outLnItm.setMonthlyBalance(inSvo.getLoanBalance().subtract(loanBalanceTotal));
					bfBalance = inSvo.getLoanBalance().subtract(loanBalanceTotal);	
				}
		
			}
//			System.out.println("######## 회차["+outLnItm.getSeq()+"] 납입원금["+outLnItm.getMonthlyPayment()+"] 이자["+outLnItm.getMonthlyInterest()+"] 월상환금["+outLnItm.getMonthlyBalancPayTotal()+"] 납입원금누계["+outLnItm.getMonthlyPaymentTotal()+"] 대출잔금["+outLnItm.getMonthlyBalance()+"] ########");
			
			loanOutList.add(outLnItm);
			
//			if(loopCnt>10)break;
		} // end while
		
		
		return loanOutList;
	}
	
	/**
	 * 원금균등상환방식처리
	 * @param inSvo
	 * @param loanList
	 * @return
	 */
	public ArrayList<LoanData> calcPayment1(TB06015SVO inSvo, ArrayList<LoanData> loanList) {

		BigDecimal MonthlyPaymentTotal = BigDecimal.ZERO; 		// 균등상환금액
		BigDecimal bfBalance = inSvo.getLoanBalance();
		int loanAplyCount = (int)inSvo.getMonthlyLoanCnt()-inSvo.getDfrCnt(); // 원금배분기간 = 총회차 - 거치기간회차
		ArrayList<LoanData> loanOutList = new ArrayList<LoanData>();
		loanBalanceTotal = BigDecimal.ZERO;
		interestSubTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;
		
		MonthlyPaymentTotal = bfBalance.divide(new BigDecimal(loanAplyCount), 9, RoundingMode.HALF_UP);	
		
		Iterator<LoanData> it = loanList.iterator();
		int loopCnt = 0;
		while(it.hasNext()) {
			
			loopCnt++;
			LoanData item = it.next();

			LoanData outLnItm = new LoanData();
			outLnItm.setSeq(item.getSeq());
			outLnItm.setPaiRdmpDcd(item.getPaiRdmpDcd());
			outLnItm.setStrtDt(item.getStrtDt());
			outLnItm.setEndDt(item.getEndDt());
			
			// 금리구간조회
			IBIMS404BVO inParm = new IBIMS404BVO();
			inParm.setPrdtCd(inSvo.getPrdtCd());
			inParm.setAplyStrtDt(item.getStrtDt());
			inParm.setAplyEndDt(item.getEndDt());
			List<IBIMS404BVO> out404 = ibims404BMapper.getBaseRateList(inParm);
//			System.out.println(">>>>>>>>>>>>>>>>>>>> 금리구간건수 : ["+out404.size()+"] loopCnt["+loopCnt+"] <<<<<<<<<<<<<<<<<");

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			BigDecimal interestSubTotal = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";
			
			// 금리구간 Loop
			for(int i=0; i<out404.size(); i++) 
			{
				
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
								
				IBIMS404BVO ibItem = out404.get(i);
				double aplyIntrt = ibItem.getAplyIntrt()/100;
				outLnItm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
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
					
					ddCnt = dNumClc(strtDt, getBasDt(inSvo, endDt)); // 일수계산
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
//					System.out.println("######## 1-1. strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
							ddCnt--;
//							System.out.println("######## LAST 1. strtDt["+strtDt+"] endDt["+endDt+"] ddCnt["+ddCnt+"] ########");
						}
					}
					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					
				} else {
					
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = dNumClc(strtDt, getBasDt(inSvo, strLstDt)); 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					System.out.println("######## 2-1. strtDt["+strtDt+"] endDt["+strLstDt+"] ddCnt["+ddCnt+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					actualType = actualYear(inSvo.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt)/actualType;					
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));

					ddCnt2 = dNumClc(endDt.substring(0, 4)+"0101", getBasDt(inSvo, endDt)); 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
					System.out.println("######## 2-1. strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt2["+ddCnt2+"] ddCntContent["+ddCntContent+"] aplyIntrtContent["+aplyIntrtContent+"] ########");
					
					if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
							ddCnt2--;
//							System.out.println("######## LAST 2. strtDt["+endDt.substring(0, 6)+"01"+"] endDt["+endDt+"] ddCnt["+ddCnt2+"] ########");
							
						}
					}		
			
					actualType2 = actualYear(inSvo.getIntrDnumClcMthCd(), endDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate2 = ((inSvo.getIntrDnumClcMthCd()=="4")?inSvo.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;					
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
					interestSubTotal = interestSubTotal.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
				
				}
				
			}	//	end for 
			outLnItm.setAplyIntrtContent(aplyIntrtContent);
			outLnItm.setDdCntContent(ddCntContent);
			outLnItm.setMonthlyInterest(process_down(inSvo.getIntrSnnoPrcsDcd(), monthlySubInterest));
			interestTotal = interestTotal.add(monthlySubInterest);
			
			if(loopCnt <= inSvo.getDfrCnt()) {
				
				// 납입원금
				outLnItm.setMonthlyPayment(new BigDecimal(0));
				loanBalanceTotal = loanBalanceTotal.add(new BigDecimal(0));
				
				// 납입원금누계
				outLnItm.setMonthlyPaymentTotal(new BigDecimal(0));
					
				// 월상환금
				outLnItm.setMonthlyBalancPayTotal(new BigDecimal(0));
				MonthlyBalancPayTotalSum = BigDecimal.ZERO;
					
				outLnItm.setMonthlyBalance(bfBalance);
				
				
			} else {
				
				// 납입원금
				outLnItm.setMonthlyPayment(process_down(inSvo.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal));
				
				// 납입원금누계
				loanBalanceTotal = loanBalanceTotal.add(MonthlyPaymentTotal);
				outLnItm.setMonthlyPaymentTotal(process_down(inSvo.getIntrSnnoPrcsDcd(), loanBalanceTotal));
				
				// 월상환금
				outLnItm.setMonthlyBalancPayTotal(outLnItm.getMonthlyPayment().add(outLnItm.getMonthlyInterest()));
				MonthlyBalancPayTotalSum = MonthlyBalancPayTotalSum.add(MonthlyPaymentTotal.add(monthlySubInterest));
				
				// 회차기준 대출잔금
				if( loanAplyCount == loopCnt ) {
//					System.out.println("########## 마지막 ###############");
					// 회차기준 대출잔금
					outLnItm.setMonthlyBalance(BigDecimal.ZERO);
					bfBalance = BigDecimal.ZERO;
				} else {
					// 회차기준 대출잔금
					outLnItm.setMonthlyBalance(process_down(inSvo.getIntrSnnoPrcsDcd(), bfBalance.subtract(MonthlyPaymentTotal)));
					bfBalance = bfBalance.subtract(MonthlyPaymentTotal);
				}
				
			}


			
			loanOutList.add(outLnItm);

						
		} // end while
		
		return loanOutList;
		
	}

	/**
	 * 원금균등 or 원리금균등인경우 거치만기일자를 추가
	 * @param inSvo
	 * @return
	 */
	public ArrayList<LoanData> scheduleType1(TB06015SVO inSvo) {
		
		ArrayList<LoanData> loanList = new ArrayList<LoanData>();
		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		
		String DFR_TYPE = "DEFTYPE";	// 거치기간타입
		String SEC_TYPE = null;			// 첫번째회차인지 마지막회차인지 구분
		double ddCnt = 0l;
		loanBalanceTotal = BigDecimal.ZERO;					//대출원금합계
		interestTotal = BigDecimal.ZERO;					//이자합계
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;			//월상환금 합계

		System.out.println("===================================================================");
		System.out.println("### 실행일자["+inSvo.getExcDt()+"] 만기일자["+inSvo.getMtrtDt()+"] 거치만기일자["+inSvo.getDfrExpDt()+"]이자["+inSvo.getBaseRate()+"] 이자납입일자["+inSvo.getIntrPymDtCd()+"] 이자상환주기["+inSvo.getIntrRdmpFrqcMnum()+"] 이자일수계산방법["+inSvo.getIntrDnumClcMthCd()+"] @@@@@");
		System.out.println("===================================================================");
		
		boolean loopValue = true;		//do while 반복문 반복조건 

		int i = 0;

		do {
			
			i++;

			LoanData lnItm = new LoanData();
			
			lnItm.setSeq(i);				//회차			
			if(lnItm.getSeq() == 1) {
				lpStrDt = inSvo.getExcDt();	// 대출실행일자
			} 
			else {
				// N회차부터는 +1
				lpStrDt = dayAdd(lpEndDt, 1); //대출실행일자에 1일 더하기
			}

			//System.out.println(" lpStrDt["+lpStrDt+"] intrRdmpFrqcMnum["+`intrRdmpFrqcMnum+"] intrPymDtCd["+intrPymDtCd+"]");
			lpEndDt = dateAdd(lpStrDt, inSvo);	// 적용일자(시작일자)+이자상환주기

			// 만기일자보다 종료일자가 크다면 마지막 LOOP
			if(inSvo.getDfrExpDt().compareTo(lpEndDt) <= 0) {
				
				loopValue = false;	// 마지막LOOP처리
				SEC_TYPE = "LST_SEC";
//				System.out.println(">>> 종료시점 <<<");
					
				// 양편넣기&&마지막회차인경우 +1 을 적용
				// 나머지는 -1 적용 날짜계산시 +1로 처리
				if ("2".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 02양편넣기
					lpEndDt = inSvo.getDfrExpDt();
				} else {									 
					lpEndDt = inSvo.getDfrExpDt();
				} 
				ddCnt = dNumClc(lpStrDt, lpEndDt);				//거치기간 구하기
				
			} else {
				/*
				 * 시작일자 종료일자에 대한 일수구하기
				 * TFDY_LSTD_APLY_CD : 단편넣기(1), 양편넣기(2)
				 * SEC_TYPE : FST_SEC(시작구간), LST_SEC:마지막구간
				 */
				if(lnItm.getSeq() == 1) {
					SEC_TYPE = "FST_SEC";
//					System.out.println(">>> 시작시점 <<<");
				} else {
					SEC_TYPE = "ING_SEC";
				}

				ddCnt = dNumClc(lpStrDt, lpEndDt);

			}
			
			/*
			 * 거치기간이라서 단편넣기와 상관없이 -1 처리를 제외
			if (tfdLyAplyDcd.equals("01")) {		// 초일말일적용구분 == 01단편넣기
				if(loopValue == false) {
					ddCnt--;
				}
			}
			*/					
			
			lnItm.setPaiRdmpDcd(inSvo.getPaiRdmpDcd());
			lnItm.setDdCnt(ddCnt);
			lnItm.setAplyIntrt(inSvo.getAplyIntrt());
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(lpEndDt);
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);
			
			System.out.println("scheduleType1 @@@@@ ["+lnItm.getSeq()+"]["+lpStrDt+"]["+lpEndDt+"]["+SEC_TYPE+"] 일수["+ddCnt+"] 거치기간회차구분["+DFR_TYPE+"] @@@@@");
						
			loanList.add(lnItm);
			
			if(i>700) {
				System.out.println(">===========================================================<");
				System.out.println(">======================== 무한루프방지 ========================<");
				System.out.println(">===========================================================<");
				loopValue = false;
			}
						
		} while (loopValue);
		
		return loanList;
	}
	
		

	/**
	 * 거치기간을 제외한 스케줄정보
	 * @param seqFst
	 * @param inSvo
	 * @return
	 */
	public ArrayList<LoanData> scheduleType2(int seqFst, TB06015SVO inSvo) {
		
		ArrayList<LoanData> loanList = new ArrayList<LoanData>();
		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		
		String DFR_TYPE = "BASETYPE";	// 거치기간회차구분 DEFTYPE:거치기간, BASETYPE:없는경우
		String SEC_TYPE = null;
		double ddCnt = 0l;
		loanBalanceTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;

		System.out.println("===================================================================");
		System.out.println("### 실행일자["+inSvo.getExcDt()+"] 만기일자["+inSvo.getMtrtDt()+"] 거치만기일자["+inSvo.getDfrExpDt()+"]이자["+inSvo.getBaseRate()+"] 이자납입일자["+inSvo.getIntrPymDtCd()+"] 이자상환주기["+inSvo.getIntrRdmpFrqcMnum()+"] 이자일수계산방법["+inSvo.getIntrDnumClcMthCd()+"] @@@@@");
		System.out.println("===================================================================");
		
		boolean loopValue = true;
		int i = 0;
		do {
			
			i++;

			LoanData lnItm = new LoanData();
			lnItm.setSeq(i+seqFst);			
			if(lnItm.getSeq() == 1) {
				lpStrDt = inSvo.getExcDt();	// 대출실행일자
			} else {
				// N회차부터는 +1
				if(!"".equals(inSvo.getDfrExpDt()) || !inSvo.getDfrExpDt().isEmpty()) {
					// 거치기간만기일자가 존재하면 거치기간만기일자를 시작일자로 설정
					if((seqFst+1) == lnItm.getSeq()) {
						// 분할상환 구간에 첫번째 회차인경우만
						lpStrDt = dayAdd(inSvo.getDfrExpDt(), 1);
					} else {
						lpStrDt = dayAdd(lpEndDt, 1);  
					}
				} else {
					lpStrDt = dayAdd(lpEndDt, 1);  
				}
			}

//			System.out.println("dayAdd 후 lpStrDt["+lpStrDt+"]  lpEndDt["+lpEndDt+"] ");
			lpEndDt = dateAdd(lpStrDt, inSvo);	// 적용일자(시작일자)+이자상환주기

//			System.out.println("### inSvo.getMtrtDt()["+inSvo.getMtrtDt()+"] lpEndDt["+lpEndDt+"]  @@@@@");
			
			// 만기일자보다 종료일자가 크다면 마지막 LOOP
			if(inSvo.getMtrtDt().compareTo(dayAdd(lpEndDt,1)) <= 0) {

//				System.out.println("### 만기일자보다 종료일자가 큰경우  @@@@@");
				loopValue = false;	// 마지막LOOP처리
				SEC_TYPE = "LST_SEC";
//				System.out.println(">>> 종료시점 <<<");
					
				// 양편넣기인 경우 만기일자를 종료일자로 설정
				if ("2".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 02양편넣기
					lpEndDt = inSvo.getMtrtDt();
				} 
//				else {
//					lpEndDt = inSvo.getMtrtDt();
//				} 
//				else {
//					ddCnt = dNumClc(tfdLyAplyDcd , SEC_TYPE, lpStrDt, lpEndDt);
//				}

				ddCnt = dNumClc(lpStrDt, lpEndDt);
				
			} else {
//				System.out.println("### 만기일자보다 종료일자가 작은경우  @@@@@");
				/*
				 * 시작일자 종료일자에 대한 일수구하기
				 * TFDY_LSTD_APLY_CD : 단편넣기(1), 양편넣기(2)
				 * SEC_TYPE : FST_SEC(시작구간), LST_SEC:마지막구간
				 */
				if(lnItm.getSeq() == 1) {
					SEC_TYPE = "FST_SEC";
//					System.out.println(">>> 시작시점 <<<");
				} else {
					SEC_TYPE = "ING_SEC";
				}

				ddCnt = dNumClc(lpStrDt, lpEndDt);

			}
					
//			System.out.println("### 1. loopValue["+loopValue+"] SEC_TYPE["+SEC_TYPE+"] inSvo.getTfdLyAplyDcd["+inSvo.getTfdLyAplyDcd()+"] ddCnt["+ddCnt+"] @@@@@");
			if ("1".equals(inSvo.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
				if(loopValue == false) {
//					System.out.println("### 2. loopValue["+loopValue+"] SEC_TYPE["+SEC_TYPE+"] inSvo.getTfdLyAplyDcd["+inSvo.getTfdLyAplyDcd()+"] ddCnt["+ddCnt+"] @@@@@");
//					ddCnt--;
					;
				}
			}			
			
			
			lnItm.setPaiRdmpDcd(inSvo.getPaiRdmpDcd());
			lnItm.setDdCnt(ddCnt);
			lnItm.setAplyIntrt(inSvo.getAplyIntrt());
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(lpEndDt);
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);
			
			System.out.println("scheduleType2 @@@@@ ["+lnItm.getSeq()+"]["+lpStrDt+"]["+lpEndDt+"]["+SEC_TYPE+"] 일수["+ddCnt+"] 거치기간회차구분["+DFR_TYPE+"] @@@@@");
				
			loanList.add(lnItm);
			
			if(i>710) {
				System.out.println(">===========================================================<");
				System.out.println(">======================== 무한루프방지 ========================<");
				System.out.println(">===========================================================<");
				loopValue = false;
			}
						
		} while (loopValue);
		
		return loanList;
	}

	/**
	 * 원금상환계획정보에 따른 스케줄정보 (원금불균등상환)
	 * @param seqFst
	 * @param inSvo
	 * @return
	 */
	public ArrayList<LoanData> scheduleType3(int seqFst, TB06015SVO inSvo) {
		ArrayList<LoanData> loanList = new ArrayList<LoanData>();
		//ArrayList<Double> ddCntList = new ArrayList<Double>();

		SimpleDateFormat inputFormatter = new SimpleDateFormat("M/d/yy");
		SimpleDateFormat outputFormatter = new SimpleDateFormat("yyyyMMdd");

		String lpStrDt = null;			// N회차>시작일자
		String lpEndDt = null;			// N회차>종료일자
		
		String DFR_TYPE = "BASETYPE";	// 거치기간회차구분 DEFTYPE:거치기간, BASETYPE:없는경우
		String SEC_TYPE = null;
		double ddCnt = 0l;
		loanBalanceTotal = BigDecimal.ZERO;
		interestTotal = BigDecimal.ZERO;
		MonthlyBalancPayTotalSum = BigDecimal.ZERO;

		for(int i=0; i < inSvo.getPrnRdmpInfoList().size(); i++){

			String formattedDateBf = "";
			String formattedDate = "";
			LoanData lnItm = new LoanData();
			lnItm.setSeq(inSvo.getPrnRdmpInfoList().get(i).getRdmpSeq());			//상환회차

			if(lnItm.getSeq() == 1) {		//첫 회차
				lpStrDt = inSvo.getExcDt();	// 대출실행일자

				try {
					Date date = inputFormatter.parse(inSvo.getPrnRdmpInfoList().get(i).getRdmpDueDt());
					
					formattedDate = outputFormatter.format(date);

				} catch (ParseException e) {
					System.out.println("잘못된 날짜 형식입니다: " + e.getMessage());
				}

				lpEndDt = formattedDate;

				SEC_TYPE = "FST_SEC";

			}else if(lnItm.getSeq() != 1){	//첫 회차가 아니면
				
				try {
					Date date = inputFormatter.parse(inSvo.getPrnRdmpInfoList().get(i).getRdmpDueDt());
					Date dateBf = inputFormatter.parse(inSvo.getPrnRdmpInfoList().get(i-1).getRdmpDueDt());
					
					formattedDate = outputFormatter.format(date);
					formattedDateBf = outputFormatter.format(dateBf);

				} catch (ParseException e) {
					System.out.println("잘못된 날짜 형식입니다: " + e.getMessage());
				}

				lpStrDt = formattedDateBf;
				lpEndDt = formattedDate;

				SEC_TYPE = "ING_SEC";
			}

			ddCnt = dNumClc(lpStrDt, lpEndDt);

			if(lnItm.getSeq() == inSvo.getPrnRdmpInfoList().size()){
				SEC_TYPE = "LST_SEC";
			}

			lnItm.setPaiRdmpDcd(inSvo.getPaiRdmpDcd());
			lnItm.setDdCnt(ddCnt);
			lnItm.setAplyIntrt(inSvo.getAplyIntrt());
			lnItm.setMonthlyPayment(inSvo.getPrnRdmpInfoList().get(i).getPrnRdmpAmt());			//납입원금
			lnItm.setStrtDt(lpStrDt);
			lnItm.setEndDt(lpEndDt);
			lnItm.setSectionType(SEC_TYPE);
			lnItm.setDfrType(DFR_TYPE);

			log.debug(lnItm.getSeq() + "회차 시작일자: "+ lpStrDt);
			log.debug(lnItm.getSeq() + "회차 종료일자: " + lpEndDt);
			log.debug("납입원금: "+ lnItm.getMonthlyPayment());
			log.debug(lnItm.getSeq() + "회차 일수: " + ddCnt);

			log.debug("SEC_TYPE: " + SEC_TYPE);

			loanList.add(lnItm);

		}
		return loanList;
	}

	// /**
	//  * 상환스케줄 
	//  * @param inSvo
	//  * @return
	//  */
	// public ArrayList<LoanData> repaymentSchedule(TB06015SVO inSvo){

	// 	ArrayList<LoanData> loanList = new ArrayList<LoanData>();
	// 	String lpStrDt = null;			// N회차>시작일자
	// 	String lpEndDt = null;			// N회차>종료일자
		
	// 	String DFR_TYPE = "";			// 거치기간회차구분 DEFTYPE:거치기간, BASETYPE:없는경우
	// 	String SEC_TYPE = null;			// 첫번째회차인지 마지막회차인지 구분
	// 	double ddCnt = 0l;
	// 	loanBalanceTotal = BigDecimal.ZERO;					//대출원금합계
	// 	interestTotal = BigDecimal.ZERO;					//이자합계
	// 	MonthlyBalancPayTotalSum = BigDecimal.ZERO;			//월상환금 합계

	// 	//log.debug("거치만기일자: "+ inSvo.getDfrExpDt());

	// 	switch (inSvo.getPaiRdmpDcd()) {
	// 		case "01":			//원금균등
	// 			log.debug("=============원금균등상환=============");

	// 			if(!inSvo.getDfrExpDt().equals("")){
	// 				log.debug("============거치기간O============");


		
		
	// 			}else{
	// 				log.debug("============거치기간x============");
	// 			}
				
	// 			break;
			
	// 		case "02":			//원리금 균등
				
	// 			log.debug("=============원리금균등상환=============");

	// 			if(!inSvo.getDfrExpDt().equals("")){
	// 				log.debug("============거치기간O============");
		
		
	// 			}else{
	// 				log.debug("============거치기간x============");
	// 			}

	// 			break;

	// 		case "03":			//원금불균등

	// 			log.debug("=============원금불균등상환=============");

	// 			if(!inSvo.getDfrExpDt().equals("")){
	// 				log.debug("============거치기간O============");
		
		
	// 			}else{
	// 				log.debug("============거치기간x============");
	// 			}

	// 			break;

	// 		case "04":			//만기일시상환

	// 			break;
	// 	}

		
	// 	return loanList;

	// }
	
	/**
	 * 이자계산종료일구분+휴일처리구분에 따른 일자반환
	 * @param inSvo
	 * @param basDt
	 * @return 적용일자
	 */
	public String getBasDt(TB06015SVO inSvo, String basDt) {

		String rtnValue = "";
		IBIMS991BVO inParm = new IBIMS991BVO();
		//inParm.setStdrDt(basDt);
		IBIMS991BVO out991 = ibims991BMapper.getBsnDt(basDt);
		
		if("01".equals(inSvo.getIntrClcEndDeDcd())) {	// 이자계산종료일구분 01휴일처리구분적용, 02휴일포함

			if("01".equals(inSvo.getHldyPrcsDcd())) {	// 휴일처리구분 01직후 02직전
				rtnValue = out991.getAfDt();
			} else {
				rtnValue = out991.getBfDt();
			}			
		} else {
			rtnValue = basDt;
		}
		
		System.out.println(">> getBasDt 기준일자:["+basDt+"] 이자계산종료일구분["+inSvo.getIntrClcEndDeDcd()+"] 휴일처리구분["+inSvo.getHldyPrcsDcd()+"] <<");
		return rtnValue;
		
	}
	
	/**
	 * 입력한 일자에 마지막일자를 리턴
	 * @param baseDt
	 * @return 입력일자에 해당하는 월의 마지막일자
	 */
	public String lastDate(String baseDt) {

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			
			Date baseDate = dateFormat.parse(baseDt);
			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			rtnValue = dateFormat.format(baseCalendar.getTime());	
			System.out.println(">> lastDate rtnValue:["+rtnValue+"] <<");
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}
	
	/**
	 * 월 더하기 
	 * @param baseDt
	 * @param iAddCnt
	 * @return
	 */
	public String monthAdd(String baseDt, int iAddCnt) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			Date baseDate = dateFormat.parse(baseDt);

			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.add(Calendar.MONTH, iAddCnt);

            System.out.println("monthAdd : baseDt["+baseDt+"] iAddCnt["+String.valueOf(iAddCnt)+"] baseCalendar["+dateFormat.format(baseCalendar.getTime())+"]");
			rtnValue = dateFormat.format(baseCalendar.getTime());
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}
	
	/**
	 * 일수 더하기
	 * @param baseDt
	 * @param iAddCnt
	 * @return baseDt+iAddCnt
	 */
	public String dayAdd(String baseDt, int iAddCnt) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			Date baseDate = dateFormat.parse(baseDt);

			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.add(Calendar.DATE, iAddCnt);

//            System.out.println("dayAdd : baseDt["+baseDt+"] iAddCnt["+String.valueOf(iAddCnt)+"] baseCalendar["+dateFormat.format(baseCalendar.getTime())+"]");
			rtnValue = dateFormat.format(baseCalendar.getTime());
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
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
	public String dateAdd(String baseDt, TB06015SVO inSvo) {

		log.debug("baseDt : ", baseDt);
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String baseMaxDay = null;
		String baseCalcDate = null;
		String rtnValue = null;
		String rinkDate = null;
		int intrRdmpFrqcMnum = (int)inSvo.getIntrRdmpFrqcMnum(); 
		String intrPymDtCd = inSvo.getIntrPymDtCd();
		String checkDt = "";
		
//		System.out.println("baseDt:["+baseDt+"]iAddCnt["+intrRdmpFrqcMnum+"]intrPymDtCd["+intrPymDtCd+"]");
		
		try {
			
			Date baseDate = dateFormat.parse(baseDt.substring(0,6).concat(intrPymDtCd));

			Calendar baseCalendar = Calendar.getInstance();
			Calendar maxCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			
			baseCalendar.add(Calendar.DATE, -1);	// add 1 months : 5.15~6.15 > 5.15~6.14
			baseCalcDate = dateFormat.format(baseCalendar.getTime());
//			System.out.println("baseCalcDate:["+baseCalcDate+"]");
			
			Date maxCalcDate = dateFormat.parse(baseCalcDate);
			maxCalendar.setTime(maxCalcDate);
			maxCalendar.set(Calendar.DATE, maxCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			baseMaxDay = dateFormat.format(maxCalendar.getTime());	// 입력일자에 마지막일자

//			System.out.println(" baseCalcDate["+baseCalcDate+"] baseMaxDay["+baseMaxDay+"] ");
			
			// 이자납입일코드를 선택한 일자가 말일이거나 해당월에 마지막날인경우 
			// or 그달에 마지막날보 이자납입일자가 큰일수를 선택한 경우 (예:2월인데 28,29 보다 큰 30,31을 선택한 경우)
			if(("99".equals(intrPymDtCd)||baseMaxDay.substring(6, 8).equals(intrPymDtCd))
			 ||(baseMaxDay.substring(6, 8).compareTo(intrPymDtCd) <= 0)) {
				
//				System.out.println("111111111111 baseCalendar.getTime()["+dateFormat.format(baseCalendar.getTime())+"]");
				
				// 이자상환주기를 더한다.
				baseCalendar.add(Calendar.MONTH, intrRdmpFrqcMnum);
				// 이자주기를 더한 일자도 말일자로 설정
				baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));		
				rtnValue = dateFormat.format(baseCalendar.getTime());
				
//				System.out.println("99 >>> rtnValue["+rtnValue+"] rinkDate["+rinkDate+"]");
			} else {
				
				baseCalendar.add(Calendar.MONTH, intrRdmpFrqcMnum);
//				System.out.println("2222222222222 baseCalendar.getTime()["+dateFormat.format(baseCalendar.getTime())+"]");
				
				if(baseCalcDate.substring(6, 8).compareTo(intrPymDtCd) > 0) {
//					System.out.println("333333333");
					// 말일자가 아닌데 이자납입일이 기준일자를 지난경우 1+MONTH 처리
					baseCalendar.add(Calendar.MONTH, intrRdmpFrqcMnum+1);
					rinkDate = dateFormat.format(baseCalendar.getTime());
					rtnValue = rinkDate; //rinkDate.substring(0, 6).concat(intrPymDtCd);
				} else {
//					System.out.println("44444444444");
					rinkDate = dateFormat.format(baseCalendar.getTime());
					rtnValue = rinkDate; //rinkDate.substring(0, 6).concat(intrPymDtCd);
				}

//				System.out.println("00 >> rtnValue["+rtnValue+"]rinkDate["+rinkDate+"] intrPymDtCd["+intrPymDtCd+"] ");
			}
						
//			System.out.println("rtnValue:["+rtnValue+"]");
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}
		
	/**
	 * 입력받은 값에 해당하는 월의 마지막일자 리턴
	 * @param baseDt
	 * @return
	 */
	public String actualMaxDay(String baseDt) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			Date baseDate = dateFormat.parse(baseDt);

			Calendar baseCalendar = Calendar.getInstance();
			Calendar maxCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
	
			maxCalendar.setTime(baseDate);		
			maxCalendar.set(Calendar.DATE, maxCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));

			// 입력일자가 그달에 말일자이면 상환주기를 적용한 달도 말일자로 적용
			if(baseCalendar.compareTo(maxCalendar) == 0) {
				rtnValue = "Y";
			} else {
				rtnValue = "N";
			}

			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}
			
	
	/**
	 * 시작일자 종료일자에 대한 일수구하기
	 * @param stdrDt
	 * @param lastDt
	 * @return
	 */
	public double dNumClc(String stdrDt, String lastDt) {
		
		double rtnValue = 0D;
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate date1 = LocalDate.parse(stdrDt, formatter);
        LocalDate date2 = LocalDate.parse(lastDt, formatter); //LocalDate.now();
        
        double days = DAYS.between(date1, date2);
        days++;	 
        rtnValue = days;
        
		return rtnValue;
		
	}
	
	/**
	 * 일수계산벙법코드에 따라 월에 계산될 일수를 반환한다.
	 * 일수계산방법코드 4인경우만 30일 이고 1,2,3,4,11는 actual
	 * @param clcType 타입
	 * @param stdrDt
	 * @param lastDt
	 * @return
	 */
	public double dNumClc(String clcType, String stdrDt, String lastDt) {
		
		double days = 0D;
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate date1 = LocalDate.parse(stdrDt, formatter);
        LocalDate date2 = LocalDate.parse(lastDt, formatter); //LocalDate.now();
        days = DAYS.between(date1, date2);
		return (clcType=="4")?30:days;
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
//		System.out.println("$$$$$$$$$$$$$ actualYear["+clcType+"]["+baseDt+"] ###############");
		
		if(baseDt.length() < 4) {
//			System.out.println("$$$$$$$$$$$$$ 날짜 오류 ###############");
			log.debug("$$$$$$$$$$$$$ 날짜 오류 ###############");
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
	 * 윤년여부에 따른 년일수리턴
	 * @param baseDt
	 * @return 윤년인경우 366 평년이면 365 리턴
	 */
	public int actualYear(String baseDt) {
		
		String rtnValue = "";
		
		if(baseDt.length() < 4) {
			System.out.println("$$$$$$$$$$$$$ 날짜 오류 ###############");
			return Integer.parseInt(baseDt);
		} else {
			rtnValue = LeapYearCheck(baseDt.substring(0,4));
		}
		return LeapYearF(rtnValue);
		
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
	 * FROM~TO사이에 윤년이 존재하는지 체크
	 * @param fstYear
	 * @param lstYear
	 * @return
	 */
	public int LeapYearCheck(String fstYear, String lstYear) {
		
		int rtnCnt = 0;
		GregorianCalendar gc = new GregorianCalendar();
		int chkValue = Integer.valueOf(fstYear);
		do {
			
			if(gc.isLeapYear(chkValue)) {
				rtnCnt++;
			}
			chkValue++;
			
		} while(chkValue<=Long.valueOf(lstYear));

		
		return rtnCnt;
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
		}	 
	  	
	  	return amt;
	  	//return val;
	 } 
	 
	
	//inParam 객체 변환 (TB06015PVO -> TB06015SVO)
	private TB06015SVO paramSett(TB06015PVO inParam) {
		TB06015SVO outParam = TB06015SVO.builder()
										.paiRdmpDcd(inParam.getPaiRdmpDcd())
										.excDt(inParam.getExcDt())
										.dealExcBlce(inParam.getDealExcBlce())
									    .intrBnaoDcd(inParam.getIntrBnaoDcd())
									    .mtrtDt(inParam.getMtrtDt())
									    .eqlRdmpAmt(inParam.getEqlRdmpAmt())
									    .intrPymDtCd(inParam.getIntrPymDtCd())
									    .intrRdmpFrqcMnum(inParam.getIntrRdmpFrqcMnum())
									    .rcvbIntrAmt(inParam.getRcvbIntrAmt())
									    .hldyPrcsDcd(inParam.getHldyPrcsDcd())
									    .prnaRdmpFrqcMnum(inParam.getPrnaRdmpFrqcMnum())
									    .dfrExpMnum(inParam.getDfrExpMnum())
									    .intrDnumClcMthCd(inParam.getIntrDnumClcMthCd())
									    .lastPrnaRdmpDt(inParam.getLastPrnaRdmpDt())
									    .tfdLyAplyDcd(inParam.getTfdLyAplyDcd())
									    .intrSnnoPrcsDcd(inParam.getIntrSnnoPrcsDcd())
									    .intrClcEndDeDcd(inParam.getIntrClcEndDeDcd())
									    .ovduIntrRtDcd(inParam.getOvduIntrRtDcd())
									    .lastIntrClcDt(inParam.getLastIntrClcDt())
										.nxtIntrPymDt(inParam.getNxtIntrPymDt())
									    .fxnIntrt(inParam.getFxnIntrt())
									    .addIntrt(inParam.getAddIntrt())
									    .stdrDt(inParam.getStdrDt())
									    .prdtCd(inParam.getPrdtCd())
										.prnRdmpInfoList(inParam.getPrnRdmpInfoList())
										.intrtInfoList(inParam.getIntrtInfoList())
										.rdmpPlanList(inParam.getRdmpPlanList())
										.intrtPlanList(inParam.getIntrtPlanList())
										.prcsCpltYn(inParam.getPrcsCpltYn())
										.ovduIntrRt(inParam.getOvduIntrRt())
										.mdwyRdmpFeeRto(inParam.getMdwyRdmpFeeRto())
										.prcsDt(inParam.getPrcsDt())
										.dealMrdpPrca(inParam.getDealMrdpPrca())
										.build();
		return outParam;
	}

	//엑셀 업로드 검증
	@Override
	public String excelVrfi(TB06015PVO param){
		String vrfiRslt = "";		//검증결과

		BigDecimal dealExcBlce = param.getDealExcBlce();	//대출잔액
		String excDt = param.getExcDt();					//신규일자 (실행일자)
		String mtrtDt = param.getMtrtDt();					//만기일자

		log.debug("검증할 엑셀데이터 행 개수: " + param.getPrnRdmpInfoList().size());

		return vrfiRslt;
	}

	//기본정보 및 금리정보 조회
	@Override
	public List<TB06015SVO> getDetailInfo(TB06015SVO param){

		List<TB06015SVO> returnList = new ArrayList<TB06015SVO>();

		// //param.setStdrDt("20240723");

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

		returnList.add(svo);
		// Calculation calc = new Calculation(ibims404BMapper, ibims991BMapper, ibims402BMapper, ibims403bMapper);

		// List<CalculationResultDTO> rsltList = calc.setIntrCalcSimulation(param);

		// log.debug("rsltList{}", rsltList);
		

		return returnList;
	}

	/**
	 * 원금스케쥴 및 원금계산
	 * @param inCalcDTO
	 * @return
	 */
	public List<CalculationResultDTO> prnaCalc(CalculationDTO inCalcDTO){
		BigDecimal loanBalanceTotal = BigDecimal.ZERO;				//대출원금합계	

		// List<LoanData> prnaSchList = loanListSett(inCalcDTO, schList);

		// log.debug("prnaSchList.size(): "+ prnaSchList.size());

		inCalcDTO.setSeqFst(0);
		List<LoanData> prnaSchList = calculation.prnaRdmpSchedule(inCalcDTO);
		BigDecimal monthlyPayment = BigDecimal.ZERO;


		int changeLoanCnt = 0;
		double oldAplyIntrt = 0d;
		double dIntrt = 0d;
		BigDecimal MonthlyPaymentTotal = BigDecimal.ZERO; 		// 균등상환금액
		BigDecimal bfBalance = inCalcDTO.getDealExcBlce();		// 원금잔액 == 대출잔액	

		//log.debug("bfBalance : " + bfBalance);

		List<CalculationResultDTO> prnaCalcRstDTOList = new ArrayList<>();

		for(int i = 0; i < prnaSchList.size(); i++){
			LoanData itm = prnaSchList.get(i);
			CalculationResultDTO prnaCalcRstDTO = new CalculationResultDTO();

			List<IBIMS404BVO> out404 = inCalcDTO.getIntrtInfoList();			//금리정보

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";

			//금리구간 Loop
			for(int j = 0; j < out404.size(); j++){
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;

				IBIMS404BVO ibItem = out404.get(j);
				double aplyIntrt = out404.get(j).getAplyIntrt()/100;
				dIntrt = out404.get(j).getAplyIntrt();
				itm.setAplyIntrt(aplyIntrt);
				aplyIntrtContent = ("".equals(aplyIntrtContent.trim()))?aplyIntrtContent.concat(String.valueOf(aplyIntrt*100)):aplyIntrtContent.concat(" &#47; "+String.valueOf(aplyIntrt*100));
				
				log.debug("aplyIntrtContent: " + aplyIntrtContent);

				if(oldAplyIntrt != aplyIntrt) {
					oldAplyIntrt = aplyIntrt;
					changeLoanCnt = (i==1)?prnaSchList.size():(prnaSchList.size()-i);
				} 

				double monthlyRate = aplyIntrt/(12/inCalcDTO.getPrnaRdmpFrqcMnum());
				
				if("02".equals(inCalcDTO.getPaiRdmpDcd())) {
					
					// 원리금계산1 => 대출금액*이자율/12
					BigDecimal eqltRdptAmtCal1 = inCalcDTO.getDealExcBlce().multiply(new BigDecimal(monthlyRate).setScale(9, RoundingMode.HALF_UP));			
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
					
					log.debug("MonthlyPaymentTotal: " + MonthlyPaymentTotal );

				} else {
					monthlyPayment = inCalcDTO.getDealExcBlce().divide(new BigDecimal(prnaSchList.size()), 9, RoundingMode.HALF_UP);

					log.debug("monthlyPayment: "+ monthlyPayment);
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
					
					ddCnt = DateUtil.dateDiff(strtDt, calculation.getBasDt(inCalcDTO, endDt))+1; // 일수계산
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
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(monthlyRate).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", calculation.getBasDt(inCalcDTO, endDt))+1;
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
			prnaCalcRstDTO.setScxDcd("1");
			prnaCalcRstDTO.setRdmpTmrd(Integer.toString(i+1));
			prnaCalcRstDTO.setPrarDt(DateUtil.dayAdd(itm.getEndDt(),1));

			if("02".equals(inCalcDTO.getPaiRdmpDcd())) {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), MonthlyPaymentTotal.subtract(monthlySubInterest)));
				prnaCalcRstDTO.setPrarRdmpAmt(MonthlyPaymentTotal);	// 원리금균등만..
				prnaCalcRstDTO.setRdmpPrarIntr(monthlySubInterest);	// 원리금균등만..
			} else if("04".equals(inCalcDTO.getPaiRdmpDcd())) {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), inCalcDTO.getDealExcBlce()));	

			} else {
				prnaCalcRstDTO.setPrarPrna(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlyPayment));
				prnaCalcRstDTO.setPrarRdmpAmt(monthlyPayment);
			}
			prnaCalcRstDTO.setStrtDt(itm.getStrtDt());
			prnaCalcRstDTO.setEndDt(itm.getEndDt());
			prnaCalcRstDTO.setAplyIrt(new BigDecimal(dIntrt));
			
			// 납입원금누계
			loanBalanceTotal = loanBalanceTotal.add(MonthlyPaymentTotal.subtract(monthlySubInterest));				
			if(i == 0) {
				//bfBalance = inCalcDTO.getDealExcBlce().subtract(MonthlyPaymentTotal.subtract(monthlySubInterest));	
				bfBalance = inCalcDTO.getDealExcBlce();							//첫회차 가감 x
			} else { 
				bfBalance = bfBalance.subtract(prnaCalcRstDTO.getPrarPrna());	//n회차부터 대상금액 = 대출잔액 - 상환금액
				//bfBalance = inCalcDTO.getDealExcBlce().subtract(loanBalanceTotal);
			}
			prnaCalcRstDTO.setBfBalance(bfBalance);
			log.debug("### 회차 :"+prnaCalcRstDTO.getRdmpTmrd());
			log.debug("### 예정일자 :"+prnaCalcRstDTO.getPrarDt());
			log.debug("### 예정월상환금액 :"+prnaCalcRstDTO.getPrarRdmpAmt());
			log.debug("### 예정금액 :"+prnaCalcRstDTO.getPrarPrna());
			log.debug("### 상환예정이자 :"+prnaCalcRstDTO.getRdmpPrarIntr());
			log.debug("### 시작일자 :"+prnaCalcRstDTO.getStrtDt());
			log.debug("### 종료일자 :"+prnaCalcRstDTO.getEndDt());
			log.debug("### 적용금리 :"+prnaCalcRstDTO.getAplyIrt());
			log.debug("### 대출원금 :"+inCalcDTO.getDealExcBlce());
			log.debug("### 납입원금누계 :"+loanBalanceTotal);
			log.debug("### 대출잔금 :"+bfBalance);
			
			prnaCalcRstDTOList.add(prnaCalcRstDTO);
		} // for end
	

		return prnaCalcRstDTOList;
	}


	/**
	 * 원금상환계획정보 & 기본정보 참조하여 원금상환스케줄 생성 
	 * @param inCalcDTO 		기본정보
	 * @param prnaScdlList		원금상환계획정보
	 * @return
	 */
	public List<CalculationResultDTO> prnaCalculator(CalculationDTO inCalcDTO, List<CalculationResultDTO> prnaScdlList){

		List<CalculationResultDTO> calcRsltList = new ArrayList<CalculationResultDTO>();



		return calcRsltList;

	}


	/**
	 * 원금에 따른 이자금액 계산
	 * @param inCalcDTO
	 * @param prnaCalcRstDTOList
	 * @return
	 */
	public List<CalculationResultDTO> intrCalc(CalculationDTO inCalcDTO, List<CalculationResultDTO> prnaCalcRstDTOList){
		//log.debug("!!!!!!intrCalc실행!!!!!!!!");

		List<CalculationResultDTO> intrCalcRstDTOList = new ArrayList<>();

		// 이자상환스케줄 생성
		int dfrSize = 0;
		int intrSize = 0;

		List<LoanData> intrSchList = new ArrayList<LoanData>();
		List<LoanData> intrSchList2 = new ArrayList<LoanData>();


		if(!inCalcDTO.getDfrExpDt().isEmpty() || !"".equals(inCalcDTO.getDfrExpDt())) { 
			log.debug("거치만기일자 존재!!!");

			intrSchList = calculation.dfrSchedule(inCalcDTO);
			intrSchList2 = calculation.intrRdmpSchedule(inCalcDTO);
			
			dfrSize = intrSchList.size();
			intrSize = intrSchList2.size();
			intrSchList.addAll(intrSchList2);
		} else {
			log.debug("거치만기일자 없음!!!");

			intrSchList = calculation.intrRdmpSchedule(inCalcDTO);
			intrSize = intrSchList.size();
		}
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

			log.debug(i + "회차 납입원금 : " + PrarPrnaAmt);

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

			//log.debug("out404.size(): " + out404.size());

			BigDecimal monthlySubInterest = BigDecimal.ZERO;
			String aplyIntrtContent = "";
			String ddCntContent = "";

			// 금리구간 Loop
			for(int w=0; w<out404.size(); w++){

				//monthlySubInterest = BigDecimal.ZERO;
				String strLstDt = "";
				int actualType = 0;
				double ddCnt = 0d;
				double dayRate = 0d;
				
				int actualType2 = 0;
				double ddCnt2 = 0d;
				double dayRate2 = 0d;
				
				IBIMS404BVO ibItem = out404.get(w);
				double aplyIntrt = ibItem.getAplyIntrt()/100;

				log.debug("intrCalc <aplyIntrt>: " + aplyIntrt);
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
					
					ddCnt = DateUtil.dateDiff(strtDt, calculation.getBasDt(inCalcDTO, endDt))+1; // 일수계산
					if ("1".equals(inCalcDTO.getTfdLyAplyDcd())) {		// 초일말일적용구분 == 01단편넣기
						if("BASETYPE".equals(item.getDfrType()) && "LST_SEC".equals(item.getSectionType())) {	// 마지막회차
//							ddCnt--;
							; 
						}
					}
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd().equals("4"))?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;	

					log.debug("inCalcDTO.getIntrDnumClcMthCd(): " + inCalcDTO.getIntrDnumClcMthCd());
					log.debug("inCalcDTO.getIntrRdmpFrqcMnum(): " + inCalcDTO.getIntrRdmpFrqcMnum());
					log.debug("actualType: " + actualType);
					log.debug("ddcnt: " + ddCnt);
					log.debug("dayRate: " + dayRate);
					
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
					//monthlySubInterest = (bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP));
					log.debug("CASE1 monthlySubInterest: " + monthlySubInterest);
					log.debug("수식 CASE1: " + bfBalance + "*" + aplyIntrt + "*" + dayRate);
					
				} else {
					
						
					strLstDt = strtDt.substring(0, 4)+"1231"; //lastDate(strtDt);
					ddCnt = DateUtil.dateDiff(strtDt, strLstDt)+1; 
					ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt)):ddCntContent.concat(" &#47; "+String.valueOf(ddCnt));
					
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), strtDt);
					// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
					dayRate = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt)/actualType;
					monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate))).setScale(9, RoundingMode.HALF_UP)));
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", calculation.getBasDt(inCalcDTO, endDt))+1;
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
					log.debug("ddCnt: "+ ddCnt);
					log.debug("CASE2 monthlySubInterest: " + monthlySubInterest);
					log.debug("수식 CASE2: " + bfBalance + "*" + aplyIntrt + "*" + dayRate2);
				}
			}//end of for

			// input dto data setting
			intrCalcRstDTO.setScxDcd("2");
			intrCalcRstDTO.setRdmpTmrd(Integer.toString(i+1));
			intrCalcRstDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));
			intrCalcRstDTO.setPrarPrna(bfBalance);										
			intrCalcRstDTO.setStrtDt(item.getStrtDt());
			intrCalcRstDTO.setEndDt(item.getEndDt());
			intrCalcRstDTO.setRdmpPrarIntr(monthlySubInterest);
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
	 * 원금에 따른 이자금액 계산
	 * @param inCalcDTO
	 * @param prnaCalcRstDTOList
	 * @return
	 */
	public List<CalculationResultDTO> intrCalcWithScdl(CalculationDTO inCalcDTO, List<CalculationResultDTO> prnaCalcRstDTOList, List<IBIMS403BDTO> intrScdlList){
		//log.debug("!!!!!!intrCalc실행!!!!!!!!");

		List<CalculationResultDTO> intrCalcRstDTOList = new ArrayList<>();

		// 이자상환스케줄 생성
		int dfrSize = 0;
		int intrSize = 0;

		List<LoanData> intrSchList = calculation.loanListSett(inCalcDTO, intrScdlList);
		// List<LoanData> intrSchList2 = new ArrayList<LoanData>();


		// if(!inCalcDTO.getDfrExpDt().isEmpty() || !"".equals(inCalcDTO.getDfrExpDt())) { 
		// 	log.debug("거치만기일자 존재!!!");

		// 	intrSchList = dfrSchedule(inCalcDTO);
		// 	intrSchList2 = intrRdmpSchedule(inCalcDTO);
			
		// 	dfrSize = intrSchList.size();
		// 	intrSize = intrSchList2.size();
		// 	intrSchList.addAll(intrSchList2);
		// } else {
		// 	log.debug("거치만기일자 없음!!!");

		// 	intrSchList = intrRdmpSchedule(inCalcDTO);
		// 	intrSize = intrSchList.size();
		// }
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
					
					ddCnt = DateUtil.dateDiff(strtDt, calculation.getBasDt(inCalcDTO, endDt))+1; // 일수계산
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
											
					ddCnt2 = DateUtil.dateDiff(endDt.substring(0, 4)+"0101", calculation.getBasDt(inCalcDTO, endDt))+1;
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
			// intrCalcRstDTO.setPaiTypCd("2");
			// intrCalcRstDTO.setScxDcd("04");
			// intrCalcRstDTO.setRdmpTmrd(Integer.toString(item.getSeq()));
			// intrCalcRstDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));
			// intrCalcRstDTO.setPrarPrna(bfBalance);										
			// intrCalcRstDTO.setStrtDt(item.getStrtDt());
			// intrCalcRstDTO.setEndDt(item.getEndDt());
			// intrCalcRstDTO.setRdmpPrarIntr(process_down(inCalcDTO.getIntrSnnoPrcsDcd(), monthlySubInterest));
			// intrCalcRstDTO.setAplyIrt(new BigDecimal(dIntrt));
			// intrCalcRstDTOList.add(intrCalcRstDTO);


			// log.debug("### 회차 :" + intrCalcRstDTO.getRdmpTmrd());
			// log.debug("### 예정일자 :" + intrCalcRstDTO.getPrarDt());
			// log.debug("### 예정월상환금액 :" + intrCalcRstDTO.getPrarRdmpAmt());
			// log.debug("### 예정금액 :" + intrCalcRstDTO.getPrarPrna());
			// log.debug("### 상환예정이자 :" + intrCalcRstDTO.getRdmpPrarIntr());
			// log.debug("### 시작일자 :" + intrCalcRstDTO.getStrtDt());
			// log.debug("### 종료일자 :" + intrCalcRstDTO.getEndDt());
			// log.debug("### 적용금리 :" + intrCalcRstDTO.getAplyIrt());
			// log.debug("### 대출잔액 :" + inCalcDTO.getDealExcBlce());
			// log.debug("### 납입이자누계 :" + monthlySubInterest);
			// log.debug("### 대출잔금 :" + bfBalance);

			// input dto data setting
			intrCalcRstDTO.setScxDcd("2");
			intrCalcRstDTO.setRdmpTmrd(Integer.toString(item.getSeq()));
			intrCalcRstDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));
			intrCalcRstDTO.setPrarPrna(bfBalance);										
			intrCalcRstDTO.setStrtDt(item.getStrtDt());
			intrCalcRstDTO.setEndDt(item.getEndDt());
			intrCalcRstDTO.setRdmpPrarIntr(monthlySubInterest);
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
			

			if(paramDTO.getPrcsCpltYn() == null || paramDTO.getPrcsCpltYn().equals("N")){
				if(paramDTO.getRdmpPrarIntr() == null){		//원금상환계획정보

					if(i==0){	//첫회차
						if(paramDTO.getPrcsCpltYn() == null || paramDTO.getPrcsCpltYn().equals("N")){
							log.debug("첫회차는 대출잔액 가감 X");
						}else{
							bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
						}
						
					}else{
						bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
					}
					

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
	
							returnDTO.setScxDcd("1");//1: 원금상환 스케줄
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

				}else{														//이자상환계획정보
	
					int prcsDnum = DateUtil.dateDiff(paramDTO.getStrtDt(), paramDTO.getEndDt());
	
					returnDTO.setScxDcd("2");//4: 이자상환 스케줄
					returnDTO.setRdmpTmrd((i+1)+"");
					returnDTO.setPrarDt(paramDTO.getPrarDt());
					returnDTO.setPrarPrna(paramDTO.getPrarPrna());
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

		log.debug("\nibims403List::: {}", ibims403List);
		

		for(int i=0; i < ibims403List.size(); i++){
			//roopVal++;
			
			CalculationResultDTO returnDTO = new CalculationResultDTO();
			
			IBIMS403BDTO paramDTO = ibims403List.get(i);

			if(paramDTO.getPrcsCpltYn() == null || paramDTO.getPrcsCpltYn().equals("N")){//미처리
				
				if(!(paramDTO.getPrarPrna() == null)){		//원금상환계획정보

					String stdrDt = inCalcDTO.getStdrDt(); 	//기준일자

					String strtDt = "";
					String endDt = "";

					if(i == 0){		//첫회차

						strtDt = inCalcDTO.getExcDt();
						endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);

					}else{
						log.debug("bfBalance:: " + bfBalance);
						log.debug("PrarPrna:: " + paramDTO.getPrarPrna());

						bfBalance = bfBalance.subtract(paramDTO.getPrarPrna());
						strtDt = ibims403List.get(i-1).getPrarDt();
						endDt = DateUtil.dayAdd(paramDTO.getPrarDt(), -1);
					}


						int prcsDnum = DateUtil.dateDiff(strtDt, endDt);

						returnDTO.setScxDcd("1");//1: 원금상환 스케줄
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
					log.debug("#####이자상환스케줄 제외#####");
				}
			}else{
				log.debug("#####처리건 제외#####");
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
				Date baseDate = dateFormat.parse(baseDt);
				//Date strtDate = dateFormat.parse(returnDto.getStrtDt());
				Date endDate = dateFormat.parse(returnDto.getEndDt());

				if(endDate.before(baseDate)){
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

			if(scdhInfo.getPrcsCpltYn() == null ||  scdhInfo.getPrcsCpltYn().equals("N")){	//미처리

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

						if(endDate.before(stdrDate)){		//i회차 종료일이 기준일자 이전이면

							lnItm.setStrtDt(strtDt);
							lnItm.setEndDt(endDt);
							lnItm.setDdCnt(DateUtil.dateDiff(stdrDt, endDt));

							loanList.add(lnItm);

						}else{
							log.debug("#############기준일자 이후 회차는 제외#############");
						}
						
						
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

						if(endDate.before(baseDate)){				//i회차 시작일이 기준일자 이전 날짜인 경우

							lnItm.setEndDt(scdhInfo.getEndDt());	
							lnItm.setDdCnt(DateUtil.dateDiff(scdhInfo.getStrtDt(), scdhInfo.getEndDt()));
						
							// if(baseDate.before(endDate)){			//i회차 종료일 기준일자 이후 날짜인 경우
							// 	lnItm.setEndDt(inCalcDTO.getStdrDt());
							// 	lnItm.setDdCnt(DateUtil.dateDiff(scdhInfo.getStrtDt(), inCalcDTO.getStdrDt()));
							// }
		
							loanList.add(lnItm);
						}

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

		CalculationDTO paramDTO = new CalculationDTO();

		paramDTO.setPrdtCd(incaDto.getPrdtCd());
		paramDTO.setStdrDt(incaDto.getStdrDt());
		paramDTO.setEndDt(scdhList.get(0).getEndDt());

		log.debug("prdtCd : " + incaDto.getPrdtCd());
		log.debug("endDt : " + incaDto.getEndDt());
		log.debug("stdrDt : " + incaDto.getStdrDt());

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		BigDecimal mrdpPrca = incaDto.getDealMrdpPrca();					//중도상환원금
		BigDecimal earlyRpFee = BigDecimal.ZERO;							//중도상환 수수료

		BigDecimal mdwyRdmpFeeRto = ibims204BMapper.getMdwyRdmpFeeRto(paramDTO).divide(new BigDecimal(100));	//중도상환 수수료율

		for(int i = 0; i < scdhList.size(); i++){
			CalculationResultDTO scdhDTO = scdhList.get(i);

			CalculationResultDTO earlyRpDTO = new CalculationResultDTO();			//중도상환 수수료 스케줄
			CalculationResultDTO earlyPrnaDTO = new CalculationResultDTO();			//중도상환원금 스케줄

			String stdrDt = incaDto.getStdrDt();		//기준일자
			String strtDt = scdhDTO.getStrtDt();		//i회차 시작일자
			String endDt = scdhDTO.getEndDt();			//i회차 종료일자

			BigDecimal prarPrna = scdhDTO.getPrarPrna();

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
					earlyPrnaDTO.setRdmpTmrd(scdhDTO.getRdmpTmrd());			//회차
					earlyPrnaDTO.setPrarPrna(mrdpPrca);							//대상금액
					earlyPrnaDTO.setBfBalance(scdhDTO.getBfBalance());
					earlyPrnaDTO.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
					earlyPrnaDTO.setStrtDt(strtDt);								//n회차 시작일자
					earlyPrnaDTO.setEndDt(stdrDt);								//종료일자 (중도상환일자)

					earlyRpCalcList.add(earlyPrnaDTO);

					//중도상환 수수료 스케줄 세팅 ...
					earlyRpDTO.setRdmpTmrd(scdhDTO.getRdmpTmrd());				//회차
					earlyRpDTO.setPrarPrna(mrdpPrca);							//대상금액
					earlyRpDTO.setBfBalance(mrdpPrca);
					earlyRpDTO.setScxDcd("9");							//원리금구분코드 9: 중도상환 수수료
					earlyRpDTO.setStrtDt(stdrDt);								//시작일자: 중도상환 일자
					earlyRpDTO.setEndDt(endDt);									//n회차 종료일자
					earlyRpDTO.setPrarDt("");
					earlyRpDTO.setPrcsDt("");
					earlyRpDTO.setAplyIrt(mdwyRdmpFeeRto);						//적용이율 (중도상환 수수료율)
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

			int actualType = 0;
			//double ovduCnts = 0;

			try {
			
				Date prarDate = dateFormat.parse(prarDt);
				//Date toDay = dateFormat.parse(strToday);
				Date baseDate = dateFormat.parse(baseDt);
	
				if(baseDate.before(prarDate)){						//상환예정일 지나지 않았을 경우
					log.debug("===========연체X===========");
	
				}else if(prarDate.before(baseDate)){				//상환예정일 지난 경우
					log.debug("===========!!!연체발생!!!===========");
					
					double ovduCnt = DateUtil.dateDiff(prarDt, baseDt)+1;			//연체일수
					actualType = actualYear(inCalcDTO.getIntrDnumClcMthCd(), baseDt);
	
					//if(ovduIntrRtDcd.equals("1")){			//고정연체이자율 계산
						log.debug("연체이자율 고정연체이자로 계산");
	
						
						
						if(scdhInfo.getScxDcd().equals("1")){				//원금
							prarPrna = scdhInfo.getPrarPrna();		//상환예정원금
						}else if(scdhInfo.getScxDcd().equals("2")){		//이자
							prarPrna = scdhInfo.getRdmpPrarIntr();	//상환예정이자
						}
	
						double ovduIntrRate = ovduIntrRt/100.0;
						double ovduCnts = ovduCnt/365.0;

						//ovduCnts =((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ovduCnt)/actualType;
						//ovduCnts =((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ovduCnt)/actualType;

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
					if(scdhInfo.getScxDcd().equals("2")){		//이자
						overduePrnaCalcRslt.setScxDcd("4");				//4: 납부이자연체금액
					}else{				//원금
						overduePrnaCalcRslt.setScxDcd("5");				//5: 원금연체금액
					}
					overduePrnaCalcRslt.setRdmpTmrd(scdhInfo.getRdmpTmrd());
					overduePrnaCalcRslt.setStrtDt(prarDt);			//연체시작일
					overduePrnaCalcRslt.setEndDt(baseDt);			//연체종료일 todo: 빈값으로 둬도 되는지 확인
					overduePrnaCalcRslt.setPrarDt("");
					overduePrnaCalcRslt.setAplyIrt(new BigDecimal(ovduIntrRt));
					overduePrnaCalcRslt.setRdmpPrarIntr(ovduIntr);	//연체이자
					overduePrnaCalcRslt.setPrarPrna(prarPrna);
					overduePrnaCalcRslt.setBfBalance(prarPrna);		//대상금액
					ovduList.add(overduePrnaCalcRslt);

				}
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}	

		}//end of for



		return ovduList;
		

	}

	/**
	 * List<IBIMS403BDTO> 타입 스케줄 List<CalculationDTO> 타입 스케줄로 매핑
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
	
							returnDTO.setScxDcd("1");//1: 원금상환 스케줄
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
	 * 중도상환 발생한 회차의 원금상환스케줄 상환원금, 대상금액 수정
	 * @param prnaCaclList				//원금상환 리스트
	 * @param earlyPrnaCalcList			//중도상환 수수료 리스트
	 * @return
	 */
	public List<CalculationResultDTO> calcEarlyPrna(List<CalculationResultDTO> prnaCaclList, List<CalculationResultDTO> earlyPrnaCalcList){

		String seq = earlyPrnaCalcList.get(0).getRdmpTmrd();
		String stdrDt = earlyPrnaCalcList.get(0).getStrtDt();
		BigDecimal earlyPrarPrna = earlyPrnaCalcList.get(0).getPrarPrna();



		CalculationResultDTO earlyPrnaDTO = new CalculationResultDTO();			//중도상환스케줄

		log.debug("중도상환 발생 회차 : "+ seq);
		log.debug("중도상환일 : " + stdrDt);
		log.debug("중도상환금액 : " + earlyPrarPrna);

		for(int i = 0; i < prnaCaclList.size(); i++){
			CalculationResultDTO calcDTO = prnaCaclList.get(i);

			if(calcDTO.getRdmpTmrd().equals(seq) && calcDTO.getScxDcd().equals("1")){

				calcDTO.setPrarPrna(calcDTO.getPrarPrna().divide(earlyPrarPrna));			//상환예정원금 - 중도상환원금

				earlyPrnaDTO.setPrarPrna(earlyPrarPrna);					//중도상환원금
				earlyPrnaDTO.setRdmpTmrd(calcDTO.getRdmpTmrd());			//회차
				earlyPrnaDTO.setPrarDt(stdrDt);
				earlyPrnaDTO.setStrtDt(calcDTO.getStrtDt());				//시작일
				earlyPrnaDTO.setEndDt(DateUtil.dayAdd(stdrDt, -1));			//종료일
				earlyPrnaDTO.setScxDcd("9");
				//earlyPrnaDTO.setPaiTypCd("02");

				break;

			}else{
				log.debug("########################원금상환 외 스케줄 제외 / "+ seq + "회차 외 스케줄 제외########################");
			}
		}
		prnaCaclList.add(earlyPrnaDTO);

		return prnaCaclList;
	}


	/**
	 * 상환대상원금, 정상이자, 연체이자, 중도상환원금, 중도상환수수료 합계 계산
	 * @param scdhList					//상환스케줄 리스트
	 * @return
	 */
	public CalculationSumDTO totalCalculation(CalculationDTO calcDTO, List<CalculationResultDTO> scdhList){

		String intrSnnoPrcsDcd = calcDTO.getIntrSnnoPrcsDcd();		//단수법
		String stdrDt = calcDTO.getStdrDt();						//기준일자
		String expDt = calcDTO.getExpDt();							//만기일자

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");


		List<String> intrList = new ArrayList<>();
		List<String> prnaList = new ArrayList<>();

		CalculationSumDTO totalCalcDTO = new CalculationSumDTO();

		BigDecimal totalIntr 			= BigDecimal.ZERO;			//정상이자합계
		BigDecimal totalPrna 			= BigDecimal.ZERO;			//예정원금합계
		BigDecimal totlaMrdpPrca 		= BigDecimal.ZERO;			//중도상환원금 합계
		BigDecimal totalMdwyRdmpFee 	= BigDecimal.ZERO;			//중도상환수수료 합계
		BigDecimal totalPrnaOvduIntr 	= BigDecimal.ZERO;			//원금연체이자 합계
		BigDecimal totalIntrOvduIntr	= BigDecimal.ZERO;			//이자연체이자 합계
		BigDecimal totalOvduIntr 		= BigDecimal.ZERO;          //총 연체이자 합계
		BigDecimal totalTrgtAmt 		= BigDecimal.ZERO;			//총 수납대상금액 합계

		String nextPrarIntrDt = "";		//다음 원금상환일
		String nextPrarPrnaDt = "";		//다음 이자납입일
		String lstPrarIntrDT = "";		//최종 이자계산일

		for(int i = 0; i < scdhList.size(); i++){

			CalculationResultDTO scdhDTO = scdhList.get(i);

			String paiTypCd = scdhDTO.getScxDcd();

			if(paiTypCd.equals("1")){			//원금
				totalPrna = totalPrna.add(scdhDTO.getPrarPrna());
				//log.debug("원금 " + i + "회차 상환예정일 : " + scdhDTO.getPrarDt());
				prnaList.add(scdhDTO.getPrarDt());


			}else if(paiTypCd.equals("2")){	//정상이자
				totalIntr = totalIntr.add(scdhDTO.getRdmpPrarIntr());
				//log.debug("이자" + i + "회차 상환예정일 : " + scdhDTO.getPrarDt());
				intrList.add(scdhDTO.getPrarDt());

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

		intrList.sort(String::compareTo);
		prnaList.sort(String::compareTo);

		if(intrList.size() > 0){
			lstPrarIntrDT = intrList.get(intrList.size()-1);

			nextPrarIntrDt = DateUtil.monthAdd(intrList.get(intrList.size()-1), calcDTO.getIntrRdmpFrqcMnum());

			if(stdrDt.compareTo(expDt) > 0){
				nextPrarIntrDt = "";
			}

		}else{
			nextPrarIntrDt =DateUtil.dayAdd(DateUtil.monthAdd(calcDTO.getExcDt(), calcDTO.getIntrRdmpFrqcMnum()), 1);
		}

		if(prnaList.size() > 0){
			nextPrarPrnaDt = DateUtil.monthAdd(prnaList.get(prnaList.size()-1), calcDTO.getPrnaRdmpFrqcMnum());

			if(stdrDt.compareTo(expDt) > 0){
				nextPrarPrnaDt = "";
			}

		}else{
			nextPrarPrnaDt = DateUtil.dayAdd(DateUtil.monthAdd(calcDTO.getExcDt(), calcDTO.getPrnaRdmpFrqcMnum()), 1);
		}

		log.debug("다음이자납입일 : " + nextPrarIntrDt);
		log.debug("다음원금상환일 : " + nextPrarPrnaDt);

		totalOvduIntr = totalIntrOvduIntr.add(totalPrnaOvduIntr);

		totalTrgtAmt = totalIntr.add(totalOvduIntr).add(totalTrgtAmt).add(totalPrna).add(totalMdwyRdmpFee).add(totlaMrdpPrca);

		totalCalcDTO.setTotalIntr(process_down(intrSnnoPrcsDcd, totalIntr));						//정상이자 합계 set
		totalCalcDTO.setTotalIntrOvduIntr(process_down(intrSnnoPrcsDcd, totalIntrOvduIntr));		//이자연체이자 합계 set
		totalCalcDTO.setTotalMdwyRdmpFee(process_down(intrSnnoPrcsDcd, totalMdwyRdmpFee));			//중도상환수수료 합계 set
		totalCalcDTO.setTotalOvduIntr(process_down(intrSnnoPrcsDcd, totalOvduIntr));				//연체이자 합계 set
		totalCalcDTO.setTotalPrna(process_down(intrSnnoPrcsDcd, totalPrna));						//상환대상원금 set
		totalCalcDTO.setTotalPrnaOvduIntr(process_down(intrSnnoPrcsDcd, totalPrnaOvduIntr));		//원금연체이자 합계 set
		totalCalcDTO.setTotlaMrdpPrca(process_down(intrSnnoPrcsDcd, totlaMrdpPrca));				//중도상환원금 합계 set
		totalCalcDTO.setTotalTrgtAmt(process_down(intrSnnoPrcsDcd, totalTrgtAmt));					//총 수납대상금액 합계 set

		totalCalcDTO.setLastPrarIntrDt(lstPrarIntrDT);
		totalCalcDTO.setNextPrarIntrDt(nextPrarIntrDt);
		totalCalcDTO.setNextPrarPrnaDt(nextPrarPrnaDt);
		
		return totalCalcDTO;

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
					
						ddCnt = DateUtil.dateDiff(strtDt, calculation.getBasDt(inCalcDTO, stdrDt))+1; // 일수계산
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
												
						ddCnt2 = DateUtil.dateDiff(stdrDt.substring(0, 4)+"0101", calculation.getBasDt(inCalcDTO, stdrDt))+1;					
						ddCntContent = ("".equals(ddCntContent.trim()))?ddCntContent.concat(String.valueOf(ddCnt2)):ddCntContent.concat(","+String.valueOf(ddCnt2));
		
						actualType2 = actualYear(inCalcDTO.getIntrDnumClcMthCd(), stdrDt);
						// 이자일수계산방법(4) 30/360인경우 == 대상금액*적용이율*이자상환주기/12 로 처리 그외는 대상금액*일수*적용이율/이자일수계산방법
						dayRate2 = ((inCalcDTO.getIntrDnumClcMthCd()=="4")?inCalcDTO.getIntrRdmpFrqcMnum():ddCnt2)/actualType2;
						monthlySubInterest = monthlySubInterest.add((bfBalance.multiply(new BigDecimal(aplyIntrt).multiply(new BigDecimal(dayRate2))).setScale(9, RoundingMode.HALF_UP)));
						
					}
				}

				// input dto data setting
				//intrDTO.setPaiTypCd("2");
				intrDTO.setScxDcd("2");
				intrDTO.setRdmpTmrd(rdmpTmrd);
				intrDTO.setPrarDt(DateUtil.dayAdd(item.getEndDt(),1));
				intrDTO.setPrarPrna(bfBalance);										
				intrDTO.setStrtDt(item.getStrtDt());
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
				//Date prarDate = dateFormat.parse(scdhList.get(i).getPrarDt());

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

			mdwyRdmpFeeRto = ibims204BMapper.getMdwyRdmpFeeRto(mdwyRdmpFeeRtoParam).divide(new BigDecimal(100));

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
				// mdwyRdmpAmtDto.setPaiTypCd("8");						//8: 중도상환수수료
				// mdwyRdmpAmtDto.setScxDcd("03");							//03: 수수료상환스케줄
				// mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpAmtDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				// mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				// mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				// mdwyRdmpAmtDto.setStrtDt(strtDt);								//n회차 시작일자
				// mdwyRdmpAmtDto.setEndDt(stdrDt);								//종료일자 (중도상환일자 -1)

				// mdwyList.add(mdwyRdmpAmtDto);

				// //중도상환 수수료 스케줄 세팅 ...
				// mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpFeeDto.setPrarPrna(mrdpPrca);							//대상금액
				// mdwyRdmpFeeDto.setBfBalance(mrdpPrca);
				// mdwyRdmpFeeDto.setPaiTypCd("9");						//원리금구분코드 9: 중도상환 수수료
				// mdwyRdmpFeeDto.setScxDcd("02");							//02: 원금상환스케줄
				// mdwyRdmpFeeDto.setStrtDt(stdrDt);								//시작일자: 중도상환 일자
				// mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				// mdwyRdmpFeeDto.setPrarDt("");
				// mdwyRdmpFeeDto.setPrcsDt("");
				// mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto.multiply(new BigDecimal(100)));					//적용이율 (중도상환 수수료율)
				// mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				// mdwyList.add(mdwyRdmpFeeDto);

				//중도상환 원금 스케줄 세팅...
				mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpAmtDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				mdwyRdmpAmtDto.setEndDt(endDt);									//종료일자 (중도상환일자)

				mdwyList.add(mdwyRdmpAmtDto);

				//중도상환 수수료 스케줄 세팅 ...
				mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpFeeDto.setPrarPrna(scdhDto.getPrarPrna());				//대상금액
				mdwyRdmpFeeDto.setBfBalance(scdhDto.getPrarPrna());
				mdwyRdmpFeeDto.setScxDcd("9");							//원리금구분코드 9: 중도상환 수수료
				mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				mdwyRdmpFeeDto.setPrarDt("");
				mdwyRdmpFeeDto.setPrcsDt("");
				mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto);						//적용이율 (중도상환 수수료율)
				mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				mdwyList.add(mdwyRdmpFeeDto);
				
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
				// mdwyRdmpAmtDto.setPaiTypCd("8");						//8: 중도상환수수료
				// mdwyRdmpAmtDto.setScxDcd("03");							//03: 수수료상환스케줄
				// mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpAmtDto.setPrarPrna(totalPrarPrna.subtract(mrdpPrca));	//대상금액
				// mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				// mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				// mdwyRdmpAmtDto.setStrtDt(strtDt);								//n회차 시작일자
				// mdwyRdmpAmtDto.setEndDt(stdrDt);								//종료일자 (중도상환일자 -1)

				// mdwyList.add(mdwyRdmpAmtDto);

				// //중도상환 수수료 스케줄 세팅 ...
				// mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				// mdwyRdmpFeeDto.setPrarPrna(mrdpPrca);							//대상금액
				// mdwyRdmpFeeDto.setBfBalance(mrdpPrca);
				// mdwyRdmpFeeDto.setPaiTypCd("9");						//원리금구분코드 9: 중도상환 수수료
				// mdwyRdmpFeeDto.setScxDcd("02");							//02: 원금상환스케줄
				// mdwyRdmpFeeDto.setStrtDt(stdrDt);								//시작일자: 중도상환 일자
				// mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				// mdwyRdmpFeeDto.setPrarDt("");
				// mdwyRdmpFeeDto.setPrcsDt("");
				// mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto.multiply(new BigDecimal(100)));					//적용이율 (중도상환 수수료율)
				// mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				// mdwyList.add(mdwyRdmpFeeDto);

				//중도상환 원금 스케줄 세팅...
				mdwyRdmpAmtDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpAmtDto.setPrarPrna(finalMdwyRdmp);						//대상금액
				mdwyRdmpAmtDto.setBfBalance(scdhDto.getBfBalance());
				mdwyRdmpAmtDto.setScxDcd("8");							//원리금구분코드 8: 중도상환원금
				mdwyRdmpAmtDto.setStrtDt(lpStrtDt);								//n회차 시작일자
				mdwyRdmpAmtDto.setEndDt(endDt);									//종료일자 (중도상환일자)

				mdwyList.add(mdwyRdmpAmtDto);

				//중도상환 수수료 스케줄 세팅 ...
				mdwyRdmpFeeDto.setRdmpTmrd(scdhDto.getRdmpTmrd());				//회차
				mdwyRdmpFeeDto.setPrarPrna(finalMdwyRdmp);						//대상금액
				mdwyRdmpFeeDto.setBfBalance(finalMdwyRdmp);
				mdwyRdmpFeeDto.setScxDcd("9");							//원리금구분코드 9: 중도상환 수수료
				mdwyRdmpFeeDto.setStrtDt(lpStrtDt);								//시작일자: 중도상환 일자
				mdwyRdmpFeeDto.setEndDt(endDt);									//n회차 종료일자
				mdwyRdmpFeeDto.setPrarDt("");
				mdwyRdmpFeeDto.setPrcsDt("");
				mdwyRdmpFeeDto.setAplyIrt(mdwyRdmpFeeRto);						//적용이율 (중도상환 수수료율)
				mdwyRdmpFeeDto.setRdmpPrarIntr(mdwyRdmpFee);					//중도상환수수료 
				
				mdwyList.add(mdwyRdmpFeeDto);

				break;
			}

		}

		log.debug("\nmdwyList:::{}", mdwyList);

		return mdwyList;
	}

}


