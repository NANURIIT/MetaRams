package com.nanuri.rams.business.assessment.tb07.tb07050;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015PVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB06040SVO;
import com.nanuri.rams.business.common.vo.TB07050SVO;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07050ServiceImpl implements TB07050Service {

    // 딜승인기본
    private final IBIMS201BMapper ibims201bMp;

    // 여신스케줄기본
    private final IBIMS403BMapper ibims403bMp;

    // 사용자정보
	private final AuthenticationFacade facade;

    // 계산기
    private final Calculation calc;
    private final IBIMS403BMapper ibims403bMapper;
    private final IBIMS402BMapper ibims402BMapper;
    private final IBIMS404BMapper ibims404BMapper;

    // 원리금 스케줄관리 조회
    @Override
    public TB06040SVO getPrnaRdmpSch(IBIMS403BDTO input) {
        // return
        TB06040SVO ret = new TB06040SVO();
        List<IBIMS403BDTO> retList = new ArrayList<>();

        // input
        String prdtCd = input.getPrdtCd(); // 종목코드
        String scxDcd = input.getScxDcd(); // 일정구분코드
        // test
        long excSn = input.getExcSn();

        log.debug("prdtCd ::: {}", prdtCd);
        log.debug("scxDcd ::: {}", scxDcd);
        log.debug("excSn ::: {}", excSn);

        // 약정정보
        TB06040SVO out201b = ibims201bMp.searchIBInfo(prdtCd);
        ret.setPrdtCd(out201b.getPrdtCd());                              // 종목코드
        ret.setTrOthrDscmNo(out201b.getTrOthrDscmNo());                  // 거래상대방번호
        ret.setTrOthrDscmNm(out201b.getTrOthrDscmNm());                  // 거래상대방명
        ret.setPaiRdmpDcd(out201b.getPaiRdmpDcd());                      // 원리금상환구분코드
        ret.setRqsKndCd(out201b.getRqsKndCd());                          // 기업여신신청종류코드
        ret.setPrdtClsfCd(out201b.getPrdtClsfCd());                      // 기준금리종류코드
        ret.setApvlAmt(out201b.getApvlAmt());                            // 기업여신승인금액
        ret.setIndvLmtDcd(out201b.getIndvLmtDcd());                      // 기업여신개별한도구분코드
        ret.setPrnaRdmpFrqcMnum(out201b.getPrnaRdmpFrqcMnum());          // 원금상환주기개월수
        ret.setIntrRdmpFrqcMnum(out201b.getIntrRdmpFrqcMnum());          // 이자상환주기개월수
        ret.setStdrIntrtKndCd(out201b.getStdrIntrtKndCd());              // 기준금리종류코드
        ret.setTrCrryCd(out201b.getTrCrryCd());                          // 통화코드
        ret.setStdrIntrt(out201b.getStdrIntrt());                        // 기준금리
        ret.setAddIntrt(out201b.getAddIntrt());                          // 가산금리
        ret.setIntrBnaoDcd(out201b.getIntrBnaoDcd());                    // 이자선후취구분코드
        ret.setCtrcDt(out201b.getCtrcDt());                              // 약정일자
        ret.setCtrcExpDt(out201b.getCtrcExpDt());                        // 약정만기일자
        ret.setEprzCrdlCtrcAmt(out201b.getEprzCrdlCtrcAmt());            // 기업여신약정금액
        ret.setRgstDt(out201b.getRgstDt());                              // 등록일자

        TB06015SVO inTb06015svo = new TB06015SVO();
        inTb06015svo.setPrdtCd(prdtCd);
        inTb06015svo.setExcSn(excSn);


        if ( "02".equals(scxDcd) ) { // 원금상환스케줄
            List<IBIMS403BDTO> rdmpSch = ibims403bMp.getRdmpSchedule(inTb06015svo);

            for (IBIMS403BDTO ibims403bdto : rdmpSch) {
                ibims403bdto.setScxDcd("02"); // 일정구분코드
                retList.add(ibims403bdto);
            };
            ret.setRdmpPlanList(retList);
        } else if ( "04".equals(scxDcd) ) { // 이자상환스케줄

            //List<CalculationResultDTO> rsltList = calculationSett(input);

            //log.debug("rsltList {}" , rsltList);
            List<IBIMS403BDTO> intrRdmpSch = ibims403bMp.getIntrSchedule(inTb06015svo);
            log.debug("intrRdmpSch ::: {}", intrRdmpSch);
            for (IBIMS403BDTO ibims403bdto : intrRdmpSch) {
                ibims403bdto.setScxDcd("04"); // 일정구분코드
                retList.add(ibims403bdto);
            };
            ret.setIntrtPlanList(intrRdmpSch);
        } else if ( "01".equals(scxDcd) ) {
            List<IBIMS403BDTO> excSch = ibims403bMp.getExcSchedule(inTb06015svo);

            ret.setExcSchList(excSch);
        }

        return ret;
    }


    /*
     *
     *  calcDto sett
     *
     */
    public List<CalculationResultDTO> calculationSett(IBIMS403BDTO inputDto){

        //CalculationDTO returnDto = new CalculationDTO();

        List<CalculationResultDTO> returnList = new ArrayList<CalculationResultDTO>();

        TB06015SVO paramVO = new TB06015SVO();

        String prdtCd = inputDto.getPrdtCd();      //종목코드
        Long excSn = inputDto.getExcSn();

        paramVO.setExcSn(excSn);
        paramVO.setPrdtCd(prdtCd);

        returnList = setIntrCalcSimul(paramVO);

        return returnList;
    }

    /** 이자계산 시뮬레이터 파라미터 세팅
	 * @param calcDto 원금/이자상환 계획정보 / 금리정보 / 상환 기본정보 파라미터
	 * @return  시뮬레이션 결과 LIST
	 */
	public List<CalculationResultDTO> setIntrCalcSimul(TB06015SVO param){

		CalculationDTO calcDto = new CalculationDTO();

		//기본정보 set
		TB06015SVO svo = new TB06015SVO();
		svo = ibims402BMapper.getDetailInfo(param);

        log.debug("svo.mtrtDt: " +  svo.getMtrtDt());
        log.debug("svo.mtrtDt: " +  svo.getExcDt());
        log.debug("svo.mtrtDt: " +  svo.getStdrDt());

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
		calcDto.setExcDt(svo.getExcDt());							//신규일자
		calcDto.setExpDt(svo.getMtrtDt());							//만기일자
		calcDto.setStdrDt(svo.getMtrtDt());						//기준일자(예정일자)
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
		calcDto.setMdwyRdmpFeeRto(svo.getMdwyRdmpFeeRto());			//중도상환 수수료율
		calcDto.setOvduIntrRt(svo.getOvduIntrRt());					//연체금리
		calcDto.setPrcsDt(svo.getPrcsDt());							//처리일자

		calcDto.setRdmpPlanList(rdmpPlanList);						//원금상환계획정보
		calcDto.setIntrtPlanList(intrPlanList);						//이자상환계획정보
		calcDto.setIntrtInfoList(intrInfoList);						//금리기본정보

		List<CalculationResultDTO> returnList = calc.getIntrCalcSimulation(calcDto);

		return returnList;
	}


    // 원리금 스케줄관리 실행
    @Override
    public int savePrnaRdmpSch(TB07050SVO input) {

        int result = 0;

        // LocalDate currentDate = LocalDate.now(); // 현재 날짜 가져오기
        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd"); // 날짜 형식 지정
        // String formattedDate = currentDate.format(formatter); // 현재 날짜를 지정된 형식으로 변환

        // facade inf.
        String eno = facade.getDetails().getEno(); // 사원번호

        String prdtCd = input.getPrdtCd(); // 종목코드
        String scxDcd = input.getScxDcd(); // 일정구분코드
        // long excSn = input.getExcSn(); // 실행일련번호
        log.debug("prdtCd ::: [{}]", prdtCd);
        log.debug("scxDcd ::: [{}]", scxDcd);

        List<TB07050SVO> rdmpPlanList = input.getRdmpPlanList();    // 원금상환스케줄
        List<TB07050SVO> intrtPlanList = input.getIntrtPlanList();  // 이자상환스케줄
        List<TB07050SVO> excList = input.getExcSchList();           // 실행스케줄

        // List<IBIMS403BDTO> inDto = new ArrayList<>();            // List<IBIMS403BDTO> ArrayList 생성
        if ( "02".equals(scxDcd) ) {    // 원금상환스케줄
            for (TB07050SVO tb07050svo : rdmpPlanList) {

            String rowType = tb07050svo.getRowType();

                if ( "I".equals(rowType) ) {
                    log.debug(" \n 원금상환스케줄 rowType :::: [{}]", rowType);
                    //long excSn = ibims403bMp.getExcSn(prdtCd); // 신규 실행일련번호 채번


                    //log.debug(" \nexcSn ::: {}", excSn);

                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    //tb07050svo.setExcSn(excSn);               // 실행일련번호
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    String rdmpTmrd = ibims403bMp.getPaiSchTmrd(tb07050svo);
                    tb07050svo.setRdmpTmrd(rdmpTmrd);         // 상환회차
                    log.debug(" \n 원금상환스케줄 rdmpTmrd :::: [{}]", rdmpTmrd);
                    //tb07050svo.setPrcsCpltYn("Y"); // 처리완료여부
                    //tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID
                    // inDto.add(tb07050svo);
                    result = ibims403bMp.insertCrdlSchBss(tb07050svo);
                }

                if ( "M".equals(rowType) ) {
                    log.debug(" \n 원금상환스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    //tb07050svo.setPrcsCpltYn("Y"); // 처리완료여부
                    //tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    result = ibims403bMp.updateCrdlSchBss(tb07050svo);
                }

                if ( "D".equals(rowType) ) {
                    log.debug(" \n 원금상환스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    //tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    // inDto.add(tb07050svo);

                    result = ibims403bMp.deleteCrdlSchBss(tb07050svo);
                }
            }
        }
        if ( "04".equals(scxDcd) ) {    // 이자상환스케줄
            for (TB07050SVO tb07050svo : intrtPlanList) {

                String rowType = tb07050svo.getRowType();

                if ( "I".equals(rowType) ) {
                    log.debug(" \n 이자상환스케줄 rowType :::: [{}]", rowType);
                    // long excSn = ibims403bMp.getExcSn(prdtCd); // 신규 실행일련번호 채번

                    //log.debug(" \nexcSn ::: {}", excSn);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    // tb07050svo.setExcSn(excSn);               // 실행일련번호
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    String rdmpTmrd = ibims403bMp.getPaiSchTmrd(tb07050svo);
                    tb07050svo.setRdmpTmrd("");         // 상환회차
                    //tb07050svo.setPrcsCpltYn("Y"); // 처리완료여부
                    // tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    // inDto.add(tb07050svo);

                    result = ibims403bMp.insertCrdlSchBss(tb07050svo);
                }

                if ( "M".equals(rowType) ) {
                    log.debug(" \n 이자상환스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    //tb07050svo.setPrcsCpltYn("Y"); // 처리완료여부
                    // tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    // inDto.add(tb07050svo);

                    result = ibims403bMp.updateCrdlSchBss(tb07050svo);
                }

                if ( "D".equals(rowType) ) {
                    log.debug(" \n 이자상환스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    // tb07050svo.setPrcsDt(formattedDate);      // 처리일자
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    // inDto.add(tb07050svo);

                    result = ibims403bMp.deleteCrdlSchBss(tb07050svo);
                }
            }
        }

        if ( "01".equals(scxDcd) ) {    // 실행스케줄
            for (TB07050SVO tb07050svo : excList) {

                String rowType = tb07050svo.getRowType();
                IBIMS403BDTO in403Dto = new IBIMS403BDTO();
                in403Dto.setPrdtCd(prdtCd);
                in403Dto.setScxDcd(scxDcd);

                if ( "I".equals(rowType) ) {
                    log.debug(" \n 실행스케줄 rowType :::: [{}]", rowType);
                    long excSn = ibims403bMp.getExcSchExcSn(in403Dto); // 실행스케줄 실행일련번호 채번(PK라서 채번만)

                    log.debug(" \n 실행스케줄 excSn :::: [{}]", excSn);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setExcSn(excSn);               // 실행일련번호
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    // String rdmpTmrd = ibims403bMp.getPaiSchTmrd(tb07050svo);
                    tb07050svo.setRdmpTmrd("");      // 상환회차
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    result = ibims403bMp.insertCrdlSchBss(tb07050svo);
                }

                if ( "M".equals(rowType) ) {
                    log.debug(" \n 실행스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    result = ibims403bMp.updateCrdlSchBss(tb07050svo);
                }

                if ( "D".equals(rowType) ) {
                    log.debug(" \n 실행스케줄 rowType :::: [{}]", rowType);
                    tb07050svo.setPrdtCd(prdtCd);             // 종목코드
                    tb07050svo.setScxDcd(scxDcd);             // 일정구분코드
                    tb07050svo.setHndEmpno(eno);              // 조작사원번호
                    tb07050svo.setHndTmnlNo("");    // 조작단말기번호
                    tb07050svo.setGuid("");              // GUID

                    result = ibims403bMp.deleteCrdlSchBss(tb07050svo);
                }
            }
        }

        return result;
    };

    // 원리금 스케줄관리 실행일련번호 조회
    @Override
    public List<Map<String, Object>> srchExcSn(IBIMS403BDTO input) {
        return ibims403bMp.srchExcSn(input);
    }
}