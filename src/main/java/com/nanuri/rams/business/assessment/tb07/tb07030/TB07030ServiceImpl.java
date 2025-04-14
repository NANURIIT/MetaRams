package com.nanuri.rams.business.assessment.tb07.tb07030;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS406BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS994BMapper;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS406BVO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.vo.TB06015OVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB07030SVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.com.dto.EtprCrdtGrntAcctProcDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07030ServiceImpl implements TB07030Service {

 	@Autowired
 	private Calculation calculation;
 	@Autowired
 	private EtprCrdtGrntAcctProc acctProc;
	/* 약정기본 */
	private final  IBIMS401BMapper ibims401BMapper;
	/* 딜실행기본 */
	private final IBIMS402BMapper ibims402BMapper;
	/* 딜실행이력 */
	private final IBIMS402HMapper ibims402HMapper;
	/* 여신스케쥴기본 */
	private final IBIMS403BMapper ibims403BMapper;
	/* 여신스케쥴기본 */
	private final IBIMS403HMapper ibims403HMapper;
	/* 환율정보 */
	private final IBIMS994BMapper ibims994BMapper;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410BMapper;
	/* 이자계산내역 */
	private final IBIMS406BMapper ibims406BMapper;
	/* 연체기본 */
	private final IBIMS436BMapper ibims436BMapper;
	/* 사용자정보 */
	private final AuthenticationFacade facade;

	@Override
	public List<IBIMS403BVO> getRdmpList(IBIMS403BDTO paramData) {
		return ibims403BMapper.getRdmpList(paramData);
	}

	@Override
	public TB07030SVO getExchR(String paramData) {
		return ibims994BMapper.getExchR(paramData);
	}

	// 실행정보 상세내역 조회
	@Override
	public TB07030SVO getRdmpDetail(TB07030SVO paramData) {

		CalculationDTO calcDto = new CalculationDTO();
		CalculationSumDTO calcSumDto = new CalculationSumDTO();

		List<IBIMS403BVO> ibims403lst = new ArrayList<IBIMS403BVO>();
		List<IBIMS403BVO> ibims403RscdlList = new ArrayList<IBIMS403BVO>();
		List<IBIMS403BVO> param403lst = paramData.getIbims403Lst();

		for(int i = 0; i < param403lst.size(); i++) {

			//log.debug("!!!!!중도상환원금!!!!!!!: " + param403lst.get(i).getDealMrdpPrca());

			TB06015SVO inSvo = new TB06015SVO();
			inSvo.setPrdtCd(param403lst.get(i).getPrdtCd());
			inSvo.setExcSn(param403lst.get(i).getExcSn());
			inSvo.setDealMrdpPrca(param403lst.get(i).getDealMrdpPrca());
			inSvo.setStdrDt(paramData.getPrarDt());
			inSvo.setPostUrl("TB07030S");
			//log.debug("getRdmpDetail 처리완료여부 ::: {}", param403lst.get(i).getPrcsCpltYn());
			//inSvo.setPrcsCpltYn(param403lst.get(i).getPrcsCpltYn()); // 처리완료여부

			//log.debug("inSvo{}", inSvo);

			List<CalculationResultDTO> outCalc = calculation.setIntrCalcSimulation(inSvo);
			//List<CalculationResultDTO> outCalc = new ArrayList<CalculationResultDTO>();
			//log.debug("\n outCalc ::: [{}]", outCalc);
			TB06015SVO getDtlInf = ibims402BMapper.getDetailInfo(inSvo);
			String intrSnnoPrcsDcd = getDtlInf.getIntrSnnoPrcsDcd();
			//log.debug("\n getDtlInf ::: [{}]", getDtlInf);
			//log.debug("\n getDtlInf.getIntrSnnoPrcsDcd() ::: [{}]", getDtlInf.getIntrSnnoPrcsDcd());
			calcDto.setIntrSnnoPrcsDcd(intrSnnoPrcsDcd);

			Iterator<CalculationResultDTO> it = outCalc.iterator();
			while (it.hasNext()) {
				CalculationResultDTO item = it.next();
				//log.debug("\nCalculationResultDTO item = it.next()::::: [{}]", item);
				IBIMS403BVO setItem = new IBIMS403BVO();

				IBIMS403BVO setRscdlItem = new IBIMS403BVO();			// 중도상환 발생 시 이자상환스케줄 재설정

				if(item.getPaiTypCd() == null){							//중도상환 발생 시 이자상환스케줄 재설정

					setRscdlItem.setPmntAmt(item.getRdmpPrarIntr());
					setRscdlItem.setTrgtAmt(item.getPrarPrna());
					setRscdlItem.setPrdtCd(param403lst.get(i).getPrdtCd());
					setRscdlItem.setExcSn(param403lst.get(i).getExcSn());
					setRscdlItem.setScxDcd(item.getScxDcd());				// 일정구분코드
					setRscdlItem.setPaiTypCd(item.getPaiTypCd());         	// 원리금유형코드
					setRscdlItem.setRdmpTmrd(item.getRdmpTmrd()); 			// 상환회차
					setRscdlItem.setPrarDt(item.getPrarDt());   			// 예정일자
					//setItem.setPrarPrna(item.getPrarPrna());				// 예정원금
					setRscdlItem.setStrtDt(item.getStrtDt());				// 시작일자
					setRscdlItem.setEndDt(item.getEndDt());					// 종료일자
					setRscdlItem.setRdmpPrarIntr(item.getRdmpPrarIntr());	// 상환예정이자
					setRscdlItem.setAplyIrt(item.getAplyIrt());				// 이자율
					setRscdlItem.setIntrAplyDnum((int)DateUtil.dateDiff(item.getStrtDt(), item.getEndDt())+1);	// 처리일수

					ibims403RscdlList.add(setRscdlItem);

				}else{
					if( item.getPaiTypCd().equals("1") ){

						setItem.setPmntAmt(item.getPrarPrna());				// 예정원금
						setItem.setTrgtAmt(item.getBfBalance());			// 대상금액		

						setItem.setPrarPrna(item.getPrarPrna());			// 예정원금

					}else if(item.getPaiTypCd().equals("2")){

						log.debug("bfBalance::::::::" + item.getBfBalance());
						log.debug("prarPrna::::::" + item.getPrarPrna());

						setItem.setPmntAmt(item.getRdmpPrarIntr());
						setItem.setTrgtAmt(item.getPrarPrna());

					}else if(item.getPaiTypCd().equals("4") || item.getPaiTypCd().equals("5")){

						setItem.setPmntAmt(item.getRdmpPrarIntr());
						setItem.setTrgtAmt(item.getPrarPrna());

						//log.debug("연체이자: "+setItem.getPmntAmt());
						//log.debug("대상금액: "+setItem.getTrgtAmt());

					}else if(item.getPaiTypCd().equals("9")){		// 중도상환 수수료

						setItem.setPmntAmt(item.getRdmpPrarIntr());
						setItem.setTrgtAmt(item.getPrarPrna());

					}else if(item.getPaiTypCd().equals("8")){		// 중도상환 원금

						setItem.setPmntAmt(item.getPrarPrna());
						setItem.setTrgtAmt(item.getBfBalance());

						setItem.setPrarPrna(item.getPrarPrna());			// 예정원금

					}

					setItem.setPrdtCd(param403lst.get(i).getPrdtCd());
					setItem.setExcSn(param403lst.get(i).getExcSn());
					setItem.setScxDcd(item.getScxDcd());				// 일정구분코드
					setItem.setPaiTypCd(item.getPaiTypCd());         	// 원리금유형코드
					setItem.setRdmpTmrd(item.getRdmpTmrd()); 			// 상환회차
					setItem.setPrarDt(item.getPrarDt());   				// 예정일자
					//setItem.setPrarPrna(item.getPrarPrna());			// 예정원금
					setItem.setStrtDt(item.getStrtDt());				// 시작일자
					setItem.setEndDt(item.getEndDt());					// 종료일자
					setItem.setRdmpPrarIntr(item.getRdmpPrarIntr());	// 상환예정이자
					setItem.setAplyIrt(item.getAplyIrt());				// 이자율
					setItem.setIntrAplyDnum((int)DateUtil.dateDiff(item.getStrtDt(), item.getEndDt())+1);	// 처리일수
					//setItem.setTrgtAmt(item.getBfBalance());     		// 대상금액
					//setItem.setPmntAmt(("02".equals(item.getScxDcd()))?item.getPrarPrna():item.getRdmpPrarIntr());
					setItem.setPmntPrarAmt(setItem.getPmntAmt());

					ibims403lst.add(setItem);
				}

				// log.debug("\n ibims403RscdlList ::: {}", ibims403RscdlList);
				// log.debug("\n ibims403lst ::: {}", ibims403lst);

				CalculationSumDTO sumDto = calculation.totalCalculation(calcDto, outCalc);

				// log.debug(" 정상이자합계 :::: [{}]", sumDto.getTotalIntr());
				// log.debug(" 중도상환 수수료 합계 :::: [{}]", sumDto.getTotalMdwyRdmpFee());
				// log.debug(" 총 연체이자 합계 :::: [{}]", sumDto.getTotalOvduIntr());
				// log.debug(" 예정원금합계 :::: [{}]", sumDto.getTotalPrna());
				// log.debug(" 총 수납대상금액 합계 :::: [{}]", sumDto.getTotalTrgtAmt());
				// log.debug(" 중도상환 원금합계 :::: [{}]", sumDto.getTotlaMrdpPrca());
				calcSumDto.setTotalIntr(sumDto.getTotalIntr());
				calcSumDto.setTotalMdwyRdmpFee(sumDto.getTotalMdwyRdmpFee());
				calcSumDto.setTotalOvduIntr(sumDto.getTotalOvduIntr());
				calcSumDto.setTotalPrna(sumDto.getTotalPrna());
				calcSumDto.setTotalTrgtAmt(sumDto.getTotalTrgtAmt());
				calcSumDto.setTotlaMrdpPrca(sumDto.getTotlaMrdpPrca());
			}

		}//end of for

		ibims403lst.sort(Comparator.comparing(IBIMS403BVO::getTrgtAmt, Comparator.reverseOrder()).thenComparing(IBIMS403BVO::getStrtDt)
								   .thenComparing(IBIMS403BVO::getPaiTypCd));

		ibims403lst = sort403lst(ibims403lst);


		TB07030SVO tb07030svo = new TB07030SVO();

		tb07030svo.setIbims403DtlLst(ibims403lst);
		tb07030svo.setIbims403RscdlList(ibims403RscdlList);
		tb07030svo.setTotalDTO(calcSumDto);

		// log.debug("\n ibims403lst ::: {}", ibims403lst);
		// log.debug("\n ibims403RscdlList ::: {}", ibims403RscdlList);

		return tb07030svo;
	}

	//상환대상상세내역 정렬
	public List<IBIMS403BVO> sort403lst(List<IBIMS403BVO> ibims403lst){

		List<IBIMS403BVO> intrOvduList = new ArrayList<>();  // 이자연체 리스트
		List<IBIMS403BVO> prnaOvduList = new ArrayList<>();  // 원금연체 리스트
		List<IBIMS403BVO> mdwyFeeList = new ArrayList<>();	//중도상환수수료 리스트

		//연체 기록 추출
		Iterator<IBIMS403BVO> iterator = ibims403lst.iterator();
		while (iterator.hasNext()) {
			IBIMS403BVO item = iterator.next();

			if (item.getPaiTypCd().equals("4")) {			//납부이자연체금액
                intrOvduList.add(item);
                iterator.remove();
            } else if (item.getPaiTypCd().equals("5")) {	//원금연체금액
                prnaOvduList.add(item);
                iterator.remove();
            }else if(item.getPaiTypCd().equals("9")){
				mdwyFeeList.add(item);
				iterator.remove();
			}
		}

		List<IBIMS403BVO> sort403lst = new ArrayList<IBIMS403BVO>(ibims403lst);		//정렬 리스트

		//원금(1) 기준으로 원금연체금액 추가
		ListIterator<IBIMS403BVO> iterator2 = sort403lst.listIterator();
        while (iterator2.hasNext()) {
            IBIMS403BVO item = iterator2.next();

            if (item.getPaiTypCd().equals("1")) {
                for (IBIMS403BVO prnaOvduVO : prnaOvduList) {
                    if (item.getRdmpTmrd() == prnaOvduVO.getRdmpTmrd()) {
                        iterator2.add(prnaOvduVO);
                        break;
                    }
                }
            }
        }

		// 정상이자(2) 기준으로 이자연체금액 추가
        ListIterator<IBIMS403BVO> iterator3 = sort403lst.listIterator();
        while (iterator3.hasNext()) {
            IBIMS403BVO item = iterator3.next();

            if (item.getPaiTypCd().equals("2")) {
                for (IBIMS403BVO intrOvduVO : intrOvduList) {
                    if (item.getRdmpTmrd() == intrOvduVO.getRdmpTmrd()) {
                        iterator3.add(intrOvduVO);
                        break;
                    }
                }
            }
        }

		// 중도상환원금(8) 기준으로 중도상환수수료 추가
		ListIterator<IBIMS403BVO> iterator4 = sort403lst.listIterator();
		while (iterator4.hasNext()) {
            IBIMS403BVO item = iterator4.next();

            if (item.getPaiTypCd().equals("8")) {
                for (IBIMS403BVO mdwyFeeVO : mdwyFeeList) {
                    if (item.getRdmpTmrd() == mdwyFeeVO.getRdmpTmrd()) {
                        iterator4.add(mdwyFeeVO);
                        break;
                    }
                }
            }
        }

		return sort403lst;

	}


	@Override
	public int saveRdpm(TB07030SVO paramData) {

		BigDecimal ovduPrnaAmt = BigDecimal.ZERO;			//연체원금금액
		BigDecimal ovduIntrAmt = BigDecimal.ZERO;			//연체이자금액

		List<IBIMS436BVO> ovduParamList = new ArrayList<>();

		int rtnValue = 0;
		int iLastRdmpTmrd = 0;
		String prnaOvduDt = "";
		String intrOvduDt = "";
		String rkfrDt = LocalDate.now().toString().replace("-", "");
		BigDecimal mrdpFeeAmtSum = new BigDecimal(0);
		List<IBIMS403BVO> param403Lst = paramData.getIbims403Lst();
		List<IBIMS403BVO> param403DtlLst = paramData.getIbims403DtlLst();
		List<IBIMS403BVO> param403RscdLst = paramData.getIbims403RscdlList();

		log.debug("\n[saveRdpm]crdtGrntOvduIntAmt ::: " + paramData.getCrdtGrntOvduIntAmt());

		log.debug("\n[saveRdpm]param403RscdLst ::: {}", param403RscdLst);
		log.debug("\n[saveRdpm]param403Lst ::: {}", param403Lst);
		log.debug("\n[saveRdpm]param403DtlLst ::: {}", param403DtlLst);

		int iExTrsn = 0;
		for(int i=0;i<param403Lst.size();i++) {

			BigDecimal rdmpPrnaSmmAmt = BigDecimal.ZERO;
			BigDecimal rdmpIntrSmmAmt = BigDecimal.ZERO;
			//BigDecimal exmptAmt = BigDecimal.ZERO;
			IBIMS410BDTO in410bdto = new IBIMS410BDTO();
			IBIMS410BDTO ibims410bdto = new IBIMS410BDTO();
			IBIMS403BVO in403bdto = param403Lst.get(i);

			in410bdto.setPrdtCd(in403bdto.getPrdtCd());
			in410bdto.setExcSn(in403bdto.getExcSn());
			if(i==0) {
				iExTrsn = ibims410BMapper.getExTrSn(in410bdto);
			}

			mrdpFeeAmtSum = mrdpFeeAmtSum.add((in403bdto.getMrdpFeeAmt()==null?BigDecimal.ZERO:in403bdto.getMrdpFeeAmt()));

			for(int v=0; v<param403DtlLst.size(); v++) {

				IBIMS403BVO in403Dtlbvo = new IBIMS403BVO();
				param403DtlLst.get(v).setTrSn(iExTrsn);
				in403Dtlbvo = param403DtlLst.get(v);

				IBIMS406BVO in406BVO = new IBIMS406BVO();

				if(in403Dtlbvo.getPaiTypCd().compareTo("9") < 0) {//중도상환 x

					if((in403bdto.getPrdtCd().equals(in403Dtlbvo.getPrdtCd()))
					&& (in403bdto.getExcSn() == in403Dtlbvo.getExcSn())) {

						if(in403Dtlbvo.getPaiTypCd().equals("4") || in403Dtlbvo.getPaiTypCd().equals("5")){	//연체스케줄

							IBIMS436BVO ovduParamVo = new IBIMS436BVO();
							ovduParamVo.setPrdtCd(in403Dtlbvo.getPrdtCd());				//종목코드
							ovduParamVo.setExcSn(in403Dtlbvo.getExcSn());				//실행순번
							ovduParamVo.setOvduRlseDt(in403Dtlbvo.getPrcsDt());			//처리일자(==연체해제일자)

							if(in403Dtlbvo.getPaiTypCd().equals("4")){//연체이자 (이자)

								ovduParamVo.setOvduIntrAmt(in403Dtlbvo.getPmntPrarAmt());	//연체이자금액

							}else if(in403Dtlbvo.getPaiTypCd().equals("5")){//연체이자(원금)
	
								ovduParamVo.setOvduPrnaAmt(in403Dtlbvo.getPmntPrarAmt());	//연체원금금액
	
							}

							ovduParamList.add(ovduParamVo);

						}else{
							rtnValue = ibims403BMapper.saveIBIMS403B(param403DtlLst.get(v));		//여신스케줄기본
						}
						
						//exmptAmt = exmptAmt.add(in403Dtlbvo.getExmptAmt()==null?BigDecimal.ZERO:in403Dtlbvo.getExmptAmt());

						if(("1".equals(in403Dtlbvo.getPaiTypCd()))
						|| ("5".equals(in403Dtlbvo.getPaiTypCd()))
						|| ("8".equals(in403Dtlbvo.getPaiTypCd()))) {
							;//rdmpPrnaSmmAmt = rdmpPrnaSmmAmt.add(in403Dtlbvo.getPmntAmt()); // 원금 납부금액 합계
						} else {
							if(("2".equals(in403Dtlbvo.getPaiTypCd()))
							|| ("4".equals(in403Dtlbvo.getPaiTypCd()))) {
							;//	rdmpIntrSmmAmt = rdmpIntrSmmAmt.add(in403Dtlbvo.getPmntAmt()); // 이자 납부금액 합계
							}
						}
						if("5".equals(in403Dtlbvo.getPaiTypCd())) {
							;//prnaOvduDt = in403Dtlbvo.getPrarDt();
						} else if ("4".equals(in403Dtlbvo.getPaiTypCd())) {
							;//intrOvduDt = in403Dtlbvo.getPrarDt();
						}
						if("04".equals(in403bdto.getScxDcd())) {
							;//iLastRdmpTmrd = Integer.parseInt(in403Dtlbvo.getRdmpTmrd());
						}

						if(("2".equals(in403Dtlbvo.getPaiTypCd()))				//정상이자
						|| ("4".equals(in403Dtlbvo.getPaiTypCd()))				//납부이자연체금액
						|| ("7".equals(in403Dtlbvo.getPaiTypCd()))) {			//미수이자
							in406BVO.setPrdtCd(in403Dtlbvo.getPrdtCd());
							in406BVO.setTrSn(iExTrsn);
							in406BVO.setExcSn(in403Dtlbvo.getExcSn());
							in406BVO.setRkfrDt(paramData.getRkfrDt()); // 기산일자
							in406BVO.setIntrCalcStrtDt(in403Dtlbvo.getStrtDt());
							in406BVO.setIntrCalcEndDt(in403Dtlbvo.getEndDt());
							in406BVO.setPaiTypCd(in403Dtlbvo.getPaiTypCd());
							in406BVO.setTrgtDnum(in403Dtlbvo.getIntrAplyDnum());
							in406BVO.setAplyIntr(in403Dtlbvo.getAplyIrt());
							in406BVO.setDealTrgtAmt(in403Dtlbvo.getTrgtAmt());
							in406BVO.setNrmlIntAmt(in403Dtlbvo.getTrgtAmt());
							if("4".equals(in403Dtlbvo.getPaiTypCd())) {
								in406BVO.setCrdtGrntOvduIntAmt(in403Dtlbvo.getPmntAmt());
							}
							in406BVO.setMrdpFeeAmt((in403bdto.getMrdpFeeAmt()==null?BigDecimal.ZERO:in403bdto.getMrdpFeeAmt()));
							if("7".equals(in403Dtlbvo.getPaiTypCd())) {
								in406BVO.setCrdtGrntRcvbIntAmt(in403Dtlbvo.getPmntAmt());
							}
							in406BVO.setHndEmpno(facade.getDetails().getEno());
							ibims406BMapper.insertIBIMS0406B(in406BVO);
						}
					}
				}
			}

			//중도상환 발생 시 
			if(param403RscdLst.size() > 0){
				log.debug("#########중도상환 발생#########");

				for(int j=0; j < param403RscdLst.size(); j++){

					int dltRslt = 0;
					int insrtRslt = 0;

					IBIMS403BVO rscdVo = new IBIMS403BVO();
					param403RscdLst.get(j).setTrSn(iExTrsn);
					rscdVo = param403RscdLst.get(j);

					IBIMS406BVO in406BVO = new IBIMS406BVO();

					if((in403bdto.getPrdtCd().equals(rscdVo.getPrdtCd()))
					&& (in403bdto.getExcSn() == rscdVo.getExcSn())) {

						IBIMS403BDTO rscdParamDTO = new IBIMS403BDTO();			//기존 스케줄 삭제 파라미터
						rscdParamDTO.setPrdtCd(rscdVo.getPrdtCd());				//종목코드
						rscdParamDTO.setExcSn(rscdVo.getExcSn());				//실행일련번호
						rscdParamDTO.setScxDcd(rscdVo.getScxDcd());				//일정구분코드
						rscdParamDTO.setRdmpTmrd(rscdVo.getRdmpTmrd());			//상환회차 

						dltRslt = ibims403BMapper.deleteCrdlSchBss(rscdParamDTO);

						if(dltRslt > 0){

							rscdVo.setHndEmpno(facade.getDetails().getEno());	//조작사원번호
							insrtRslt = ibims403BMapper.rgstNewScdl(rscdVo);

							if(insrtRslt > 0){

								if(rscdVo.getScxDcd().equals("04")){	//이자스케줄 
									log.debug("신규 스케줄 (이자) >>> 여신이자계산내역 테이블 INSERT");
									
									in406BVO.setPrdtCd(rscdVo.getPrdtCd());
									in406BVO.setTrSn(iExTrsn);
									in406BVO.setExcSn(rscdVo.getExcSn());
									in406BVO.setRkfrDt(paramData.getRkfrDt()); // 기산일자
									in406BVO.setIntrCalcStrtDt(rscdVo.getStrtDt());
									in406BVO.setIntrCalcEndDt(rscdVo.getEndDt());
									in406BVO.setPaiTypCd("2");					//원리금유형 2:: 정상이자
									in406BVO.setTrgtDnum(rscdVo.getIntrAplyDnum());
									in406BVO.setAplyIntr(rscdVo.getAplyIrt());
									in406BVO.setDealTrgtAmt(rscdVo.getTrgtAmt());
									in406BVO.setNrmlIntAmt(rscdVo.getTrgtAmt());
									in406BVO.setHndEmpno(facade.getDetails().getEno());
									ibims406BMapper.insertIBIMS0406B(in406BVO);
								}else{
									log.debug("신규 스케줄 (원금)");
								}

							}else{
								log.debug("!!!!!스케줄 재생성 INSERT 에러!!!!!");
							}

						}else{
							log.debug("!!!!!기존 스케줄 삭제 에러!!!!!");
						}
					}
				}
			}

			//스케줄 이력 쌓기
			IBIMS403BVO in403AllListbvo = new IBIMS403BVO();
			in403AllListbvo.setPrdtCd(in403bdto.getPrdtCd());
			in403AllListbvo.setExcSn(in403bdto.getExcSn());
			in403AllListbvo.setTrSn(iExTrsn);
			List<IBIMS403BDTO> out403BList = ibims403BMapper.selectIBIMS403BList(in403AllListbvo);
			rtnValue = ibims403HMapper.insertIBIMS403H(out403BList);	// 여신스케줄기본이력

			// 약정기본
			IBIMS401BVO in401bvo = new IBIMS401BVO();
			in401bvo.setPrdtCd(in403bdto.getPrdtCd());
			IBIMS401BVO ibims401bvo = ibims401BMapper.getIBIMS401BInfo(in401bvo);

			paramData.setExmptSmmAmt((paramData.getExmptSmmAmt()==null)?BigDecimal.ZERO:paramData.getExmptSmmAmt());

			ibims410bdto.setPrdtCd(in403bdto.getPrdtCd());
			ibims410bdto.setTrSn(iExTrsn);
			ibims410bdto.setExcSn(in403bdto.getExcSn());
			ibims410bdto.setTrDt(rkfrDt); /* 거래일자 */
			ibims410bdto.setTrStatCd("01"); /* 거래상태코드 1정상 */
			ibims410bdto.setEtprCrdtGrntTrKindCd("20"); /* 거래종류코드 20상환 */
			ibims410bdto.setDealTrPrca(paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca()));								/* 딜거래원금 = 거래원금합계+중도상환원금 */
			ibims410bdto.setTrIntAmt((paramData.getNrmlIntAmt()==null?BigDecimal.ZERO:paramData.getNrmlIntAmt())
		             			 .add(paramData.getCrdtGrntOvduIntAmt()==null?BigDecimal.ZERO:paramData.getCrdtGrntOvduIntAmt()));  /* 딜거래이자금액 = 정상이자+연체이자 */
			ibims410bdto.setDealTrAmt(ibims410bdto.getDealTrPrca().add(ibims410bdto.getTrIntAmt()));  								/* 딜거래금액 = 거래원금합계+중도상환원금+딜거래이자금액 */

			ibims410bdto.setDealRdptObjtPrca(paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca()));  						/* 딜상환대상원금 = 거래원금합계+중도상환원금 */
			ibims410bdto.setDealMrdpPrca(paramData.getDealMrdpPrca()); 		/* 딜중도상환원금 */
			ibims410bdto.setNrmlIntAmt((paramData.getNrmlIntAmt()==null)?BigDecimal.ZERO:paramData.getNrmlIntAmt()); 						/* 정상이자금액 */
			ibims410bdto.setCrdtGrntOvduIntAmt((paramData.getCrdtGrntOvduIntAmt()==null)?BigDecimal.ZERO:paramData.getCrdtGrntOvduIntAmt());/* 신용공여연체이자금액 */
			ibims410bdto.setCrdtGrntRcvbIntAmt((paramData.getRcvbIntrSmmAmt()==null)?BigDecimal.ZERO:paramData.getRcvbIntrSmmAmt()); 		/* 신용공여미수이자금액 */
//			ibims410bdto.setPucrIntAmt(ibims403Lst.get(i).getPucrIntAmt()); /* 환출이자금액 */
			ibims410bdto.setTrFeeAmt(mrdpFeeAmtSum); /* 거래수수료금액 */	
//			ibims410bdto.setCostAmt(ibims403Lst.get(i).getCostAmt()); /* 비용금액 */
			ibims410bdto.setTrCrryCd(paramData.getCrryCd()); /* 거래통화코드 */
			ibims410bdto.setKrwTrslRt(paramData.getAplcExchR()); /* 원화환산율 == 적용환율 */
			ibims410bdto.setKrwTrslTrPrca((paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca()).subtract(paramData.getExmptSmmAmt())).multiply(paramData.getAplcExchR()).setScale(2, RoundingMode.HALF_UP)); /* 원화환산거래원금  */
			ibims410bdto.setKrwTrslTrIntAmt((paramData.getNrmlIntAmt()==null?BigDecimal.ZERO:paramData.getNrmlIntAmt())
								             .add(paramData.getCrdtGrntOvduIntAmt()==null?BigDecimal.ZERO:paramData.getCrdtGrntOvduIntAmt())
								             .multiply(paramData.getAplcExchR()).setScale(2, RoundingMode.HALF_UP)); 				/* 원화환산거래이자금액 == (정상이자+연체이자)*적용환율 */
//			ibims410bdto.setWcrcTrslTrFeeAmt(mrdpFeeAmtSum.multiply(paramData.getAplcExchR()).setScale(2, RoundingMode.HALF_UP)); 	/* 원화환산거래수수료금액 == 수수료수납금액 */

//			ibims410bdto.setWcrcTrslCostAmt(ibims403Lst.get(i).getWcrcTrslCostAmt()); /* 원화환산비용금액 */
			ibims410bdto.setAcctJobCd("G2"); /* 회계업무코드 */
//			ibims410bdto.setActgUnitAfrsCd(ibims403Lst.get(i).getActgUnitAfrsCd()); /* 회계단위업무코드 */
//			ibims410bdto.setActgTrCd(ibims403Lst.get(i).getActgTrCd()); /* 회계거래코드 */
//			ibims410bdto.setActgErlmSeq(ibims403Lst.get(i).getActgErlmSeq()); /* 회계등록순번 */

			// 대출계약상환->기산일자(상환일자)
			ibims410bdto.setRkfrDt(paramData.getPrarDt()); 			/* 기산일자 */
//			ibims410bdto.setFndsDvsnCd(ibims403Lst.get(i).getFndsDcd()); /* 자금구분코드 */
//			ibims410bdto.setRctmIsttCd(ibims403Lst.get(i).getRctmIsttCd()); /* 입금기관코드 */
//			ibims410bdto.setRctmBano(ibims403Lst.get(i).getBrkgAcno()); /* 입금은행계좌번호 */
//			ibims410bdto.setDpowName(ibims403Lst.get(i).getAchdNm()); /* 예금주명 */
//			ibims410bdto.setHdwrPrcsYn(ibims403Lst.get(i).getHdwrPrcsYn()); /* 수기처리여부 */

			ibims410bdto.setAcptPtclSmtlAmt(paramData.getRdmpPrnaSmmAmt()); /* 수납내역합계금액 == 상환대상총금액 */

			// 은행입금?? 입금원장명에 따라 딜대체, 딜타점, 딜자기앞수표등에 매핑되어야 하는게 아닌지? 코드가 없어서 현재는 알수 없음
			ibims410bdto.setDealAltnAmt(paramData.getDealAltnAmt()); /* 딜대체금액 == 은행입금?? */
			ibims410bdto.setDealCashAmt(paramData.getDealCashAmt()); /* 딜현금금액 */
//			ibims410bdto.setDealBkchAmt(ibims403Lst.get(i).getDealBkchAmt()); /* 딜자기앞수표금액 */
//			ibims410bdto.setDealCkblAmt(ibims403Lst.get(i).getDealCkblAmt()); /* 딜타점권금액 */

//			ibims410bdto.setBillPoutYn(ibims403Lst.get(i).getBillPoutYn()); /* 계산서출력여부 */
//			ibims410bdto.setTrbkPoutYn(ibims403Lst.get(i).getTrbkPoutYn()); /* 거래장출력여부 */
			ibims410bdto.setRclmDvsnCd(paramData.getRclmDvsnCd()); /* 회수구분코드 */
//			ibims410bdto.setPucrIntAltnAmt(ibims403Lst.get(i).getPucrIntAltnAmt()); /* 환출이자대체금액 */
//			ibims410bdto.setPucrIntRctmAmt(ibims403Lst.get(i).getPucrIntRctmAmt()); /* 환출이자입금금액 */
//			ibims410bdto.setClcnFeeAmt(ibims403Lst.get(i).getClcnFeeAmt()); /* 추심수수료금액 */
//			ibims410bdto.setImptStmpAmt(ibims403Lst.get(i).getImptStmpAmt()); /* 수입인지금액 */
//			ibims410bdto.setFeeTotAmt(mrdpFeeAmtSum); /* 수수료총금액 */
//			ibims410bdto.setRvseCnclDvsnCd(ibims403Lst.get(i).getRvseCnclDvsnCd()); /* 정정취소구분코드 */
//			ibims410bdto.setRvseCnclRsonText(ibims403Lst.get(i).getRvseCnclRsonText()); /* 정정취소사유내용 */
//			ibims410bdto.setRvseCnclTrSeq(ibims403Lst.get(i).getRvseCnclTrSeq()); /* 정정취소거래순번 */
			if("2".equals(ibims401bvo.getEprzCrdlIndvLmtDcd())) {
				if((ibims410bdto.getTrAfLoanRmnd()==null)||(ibims410bdto.getTrAfLoanRmnd().compareTo(BigDecimal.ZERO) == 0)) {
					ibims410bdto.setTrAfLoanRmnd(BigDecimal.ZERO);
				} else {
					ibims410bdto.setTrAfLoanRmnd(ibims410bdto.getTrAfLoanRmnd().subtract(ibims410bdto.getDealRdptObjtPrca()));
				}
			}
			ibims410bdto.setRdmpTmrd(iLastRdmpTmrd); /* 상환회차 */

//			ibims410bdto.setDealPxdfPrca(ibims403Lst.get(i).getDealPxdfPrca()); /* 딜대지급원금 */
//			ibims410bdto.setPxdfIntAmt(ibims403Lst.get(i).getPxdfIntAmt()); /* 대지급이자금액 */
//			ibims410bdto.setPxdfEtcAmt(ibims403Lst.get(i).getPxdfEtcAmt()); /* 대지급기타금액 */
			ibims410bdto.setOrgno(facade.getDetails().getBdCd()); /* 조직번호 */
			ibims410bdto.setTrStfno(facade.getDetails().getEno()); /* 거래직원번호 */
//			ibims410bdto.setDcfcStfno(ibims403Lst.get(i).getDcfcStfno()); /* 결재자직원번호 */
//			ibims410bdto.setClmSeq(ibims403Lst.get(i).getClmSeq()); /* 청구순번 */
//			ibims410bdto.setActgSynsCd(ibims403Lst.get(i).getActgSynsCd()); /* 회계적요코드 */
//			ibims410bdto.setSynsText(ibims403Lst.get(i).getSynsText()); /* 적요내용 */
//			ibims410bdto.setTaxBillEvdcErlmDt(ibims403Lst.get(i).getTaxBillEvdcErlmDt()); /* 세금계산서증빙등록일자 */
//			ibims410bdto.setTaxBillEvdcErlmSeq(ibims403Lst.get(i).getTaxBillEvdcErlmSeq()); /* 세금계산서증빙등록순번 */
//			ibims410bdto.setTaxBillPrcsSeq(ibims403Lst.get(i).getTaxBillPrcsSeq()); /* 세금계산서처리순번 */
//			ibims410bdto.setBillEvdcErlmDt(ibims403Lst.get(i).getBillEvdcErlmDt()); /* 계산서증빙등록일자 */
//			ibims410bdto.setBillEvdcErlmSeq(ibims403Lst.get(i).getBillEvdcErlmSeq()); /* 계산서증빙등록순번 */
//			ibims410bdto.setBillPrcsSeq(ibims403Lst.get(i).getBillPrcsSeq()); /* 계산서처리순번 */
//			ibims410bdto.setVat(ibims403Lst.get(i).getVat()); /* 부가세 */
//			ibims410bdto.setIssuBillEvdcErlmDt(ibims403Lst.get(i).getIssuBillEvdcErlmDt()); /* 발행계산서증빙등록일자 */
//			ibims410bdto.setIssuBillPrcsSeq(ibims403Lst.get(i).getIssuBillPrcsSeq()); /* 발행계산서처리순번 */
//			ibims410bdto.setDfrmFeePrcaEclsYn(ibims403Lst.get(i).getDfrmFeePrcaEclsYn()); /* 지급수수료원금제외여부 */
//			ibims410bdto.setDfrmFeeClmObjtAmt(ibims403Lst.get(i).getDfrmFeeClmObjtAmt()); /* 지급수수료청구대상금액 */
//			ibims410bdto.setMrdpFeeAmt(in403bdto.getMrdpFeeAmt()); /* 중도상환수수료금액 */
//			ibims410bdto.setChckIssuIsttName(ibims403Lst.get(i).getChckIssuIsttName()); /* 수표발행기관명 */
			ibims410bdto.setEarlyRepayYn(in403bdto.getMrdpYn()); /* 중도상환여부 */
			ibims410bdto.setRctmDt(paramData.getPrarDt()); /* 입금일자 == 기산일자(상환일자) */
//			ibims410bdto.setTrObjtBsnNo(ibims403Lst.get(i).getTrObjtBsnNo()); /* 거래대상기업체번호 */
//			ibims410bdto.setNoprErngEtcAmt(ibims403Lst.get(i).getNoprErngEtcAmt()); /* 영업외수익기타금액 */
//			ibims410bdto.setNoprCostEtcAmt(ibims403Lst.get(i).getNoprCostEtcAmt()); /* 영업외비용기타금액 */
//			ibims410bdto.setRcvbRstrYn(); /* 미수환원여부 */
//			ibims410bdto.setRcvbYn(); /* 미수여부 */
			ibims410bdto.setHndEmpno(facade.getDetails().getEno());	/* 조작사원번호 */
			ibims410bdto.setHndTmnlNo(""); /* 조작단말기번호 */
			ibims410bdto.setHndTrId(""); /* 조작거래ID */
			ibims410bdto.setGuid(""); /* GUID */
			rtnValue = ibims410BMapper.saveDlTrList(ibims410bdto);	// 딜거래내역

			EtprCrdtGrntAcctProcDTO inDTO = new EtprCrdtGrntAcctProcDTO();
			inDTO.setPrdtCd(in403bdto.getPrdtCd());
			inDTO.setExcSn(in403bdto.getExcSn());
			inDTO.setTrCrcyCd(paramData.getCrryCd());	  		/* 거래통화코드 */
			inDTO.setTrAmt(ibims410bdto.getDealTrPrca().add(ibims410bdto.getTrIntAmt()));
			inDTO.setTrPrca(paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca()));	/* 거래원금 */
			inDTO.setTrIntAmt((paramData.getNrmlIntAmt()==null?BigDecimal.ZERO:paramData.getNrmlIntAmt())
		                  .add(paramData.getCrdtGrntOvduIntAmt()==null?BigDecimal.ZERO:paramData.getCrdtGrntOvduIntAmt())); /* 거래이자금액 */
			inDTO.setTrFeeAmt(mrdpFeeAmtSum);   			/* 수수료수납금액 */
			inDTO.setWcrcTrslRt(paramData.getAplcExchR()); 	/* 원화환산율 */
			inDTO.setActgAfrsCd("G2");						/* 회계업무코드 */
			inDTO.setRkfrDt(rkfrDt); 						/* 기산일자 */
			inDTO.setCanYn("N");
			inDTO.setEtprCrdtGrntTrKindCd(inDTO.getActgAfrsCd());
			EtprCrdtGrntAcctProcDTO outDTO = acctProc.acctPrcs(inDTO);

			if(mrdpFeeAmtSum.compareTo(BigDecimal.ZERO) > 0 ) {
				in410bdto.setEtprCrdtGrntTrKindCd("21");	 /* 거래종류코드 21수수료수납 */
				long iFeeTrsn = ibims410BMapper.getFeeTrSn(in410bdto);
				ibims410bdto.setTrSn(iFeeTrsn);
				ibims410bdto.setEtprCrdtGrntTrKindCd(in410bdto.getEtprCrdtGrntTrKindCd());
				ibims410bdto.setTrFeeAmt((in403bdto.getMrdpFeeAmt()==null?BigDecimal.ZERO:in403bdto.getMrdpFeeAmt())); 		/* 거래수수료금액 */
				ibims410bdto.setMrdpFeeAmt((in403bdto.getMrdpFeeAmt()==null?BigDecimal.ZERO:in403bdto.getMrdpFeeAmt())); 	/* 중도상환수수료금액 */
				ibims410bdto.setKrwTrslTrFeeAmt((in403bdto.getMrdpFeeAmt()==null?BigDecimal.ZERO:in403bdto.getMrdpFeeAmt()).multiply(paramData.getAplcExchR()).setScale(2, RoundingMode.HALF_UP)); /* 원화환산거래수수료금액 == 수수료수납금액 */
				ibims410bdto.setFeeTotAmt(mrdpFeeAmtSum); /* 수수료총금액 */
				ibims410bdto.setDealTrPrca(BigDecimal.ZERO);	/* 딜거래원금 == 거래원금합계 */
				ibims410bdto.setTrIntAmt(BigDecimal.ZERO); 		/* 거래이자금액 == 정상이자+연체이자 */
				ibims410bdto.setDealTrAmt(BigDecimal.ZERO);  	/* 딜거래금액 == 거래원금+거래이자금액 */
				ibims410bdto.setDealRdptObjtPrca(BigDecimal.ZERO); /* 딜상환대상원금 */
				ibims410bdto.setDealMrdpPrca(BigDecimal.ZERO); /* 딜중도상환원금 */
				ibims410bdto.setNrmlIntAmt(BigDecimal.ZERO); /* 정상이자금액 */
				ibims410bdto.setCrdtGrntOvduIntAmt(BigDecimal.ZERO); /* 신용공여연체이자금액 */
				ibims410bdto.setCrdtGrntRcvbIntAmt(BigDecimal.ZERO); /* 신용공여미수이자금액 */
				ibims410bdto.setKrwTrslTrPrca(BigDecimal.ZERO); /* 원화환산거래원금  */
				ibims410bdto.setKrwTrslTrIntAmt(BigDecimal.ZERO); /* 원화환산거래이자금액 == (정상이자+연체이자)*적용환율 */
				ibims410bdto.setAcctJobCd("G3"); /* 회계업무코드 */
				ibims410bdto.setPucrIntAltnAmt(BigDecimal.ZERO); /* 환출이자대체금액 */
				ibims410bdto.setPucrIntRctmAmt(BigDecimal.ZERO); /* 환출이자입금금액 */
				ibims410bdto.setTrAfLoanRmnd(BigDecimal.ZERO);
				rtnValue = ibims410BMapper.saveDlTrList(ibims410bdto);	// 딜거래내역

				EtprCrdtGrntAcctProcDTO inDTO1 = new EtprCrdtGrntAcctProcDTO();
				inDTO1.setPrdtCd(in403bdto.getPrdtCd());
				inDTO1.setExcSn(in403bdto.getExcSn());
				inDTO1.setTrCrcyCd(paramData.getCrryCd());	  		/* 거래통화코드 */
				inDTO1.setTrAmt(BigDecimal.ZERO);
				inDTO1.setTrPrca(BigDecimal.ZERO);	/* 거래원금 */
				inDTO1.setTrIntAmt(BigDecimal.ZERO); /* 거래이자금액 */
				inDTO1.setTrFeeAmt(mrdpFeeAmtSum);   			/* 수수료수납금액 */
				inDTO1.setWcrcTrslRt(paramData.getAplcExchR()); /* 원화환산율 */
				inDTO1.setActgAfrsCd("G3");						/* 회계업무코드 */
				inDTO1.setRkfrDt(rkfrDt); 						/* 기산일자 */
				inDTO1.setCanYn("N");
				inDTO1.setEtprCrdtGrntTrKindCd(inDTO1.getActgAfrsCd());
				EtprCrdtGrntAcctProcDTO outDTO1 = acctProc.acctPrcs(inDTO1);
			}

			IBIMS402BVO in402bvo = new IBIMS402BVO();
			in402bvo.setPrdtCd(in403bdto.getPrdtCd());
			in402bvo.setExcSn(in403bdto.getExcSn());
			IBIMS402BVO nxt402bvo = ibims402BMapper.getNxtRdmpDt(in402bvo);
			IBIMS402BVO ibims402bvo = ibims402BMapper.selectOneIBIMS402B(in402bvo);

			ibims402bvo.setLastPrnaRdmpDt(nxt402bvo.getLastPrnaRdmpDt()); 	/*  최종원금상환일자  */
			ibims402bvo.setLastIntrClcDt(nxt402bvo.getLastIntrClcDt());   	/*  최종이자계산일자  */
			ibims402bvo.setNxtRdmpPrarDt(nxt402bvo.getNxtRdmpPrarDt());  	/*  다음상환예정일자  */
			ibims402bvo.setNxtIntrPymDt(nxt402bvo.getNxtIntrPymDt());     	/*  다음이자납입일자  */
			ibims402bvo.setPrnaOvduDt(DateUtil.dayAdd(nxt402bvo.getNxtRdmpPrarDt(), 1));    /*  원금연체일자  */
			ibims402bvo.setIntrOvduDt(DateUtil.dayAdd(nxt402bvo.getNxtIntrPymDt(), 1));     /*  이자연체일자  */
			ibims402bvo.setLastRdmpTmrd(iLastRdmpTmrd);     				/*  최종상환회차  */

			// if("2".equals(ibims401bvo.getEprzCrdlIndvLmtDcd())) {
				ibims402bvo.setDealExcBlce(ibims402bvo.getDealExcBlce().subtract(paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca())));  /*  딜실행잔액  */
				ibims402bvo.setKrwTrslExcBlce(ibims402bvo.getKrwTrslExcBlce().subtract(paramData.getRdmpTrgtPrna().add(paramData.getDealMrdpPrca()).multiply(ibims402bvo.getKrwTrslRt())));     /*  원화환산실행잔액  */
			//}
			rtnValue = ibims402BMapper.uptExcInfo(ibims402bvo);			// 딜실행기본
			rtnValue = ibims402HMapper.insertIBIMS402H(ibims402bvo);	// 딜실행기본이력 생성

		}

		// //연체기본 상환여부 플래그 변경
		rtnValue = ovduRealese(ovduParamList);

		return rtnValue;
		//return 0;
	}

	/**
	 * 연체기본 상환여부 플래그 변경
	 * @param ovduParamList			//LIST <IBIMS436BVO>
	 */
	private int ovduRealese(List<IBIMS436BVO> ovduParamList){

		List <IBIMS436BVO> groupList = new ArrayList<>();
		int rslt = 0;

		//prdtCd, excSn 기준으로 ovduPrnaAmt, ovduIntrAmt 합계 구하기 start
		for (IBIMS436BVO current : ovduParamList) {
			boolean isGrouped = false;
	
			for (IBIMS436BVO result : groupList) {
				if (result.getPrdtCd().equals(current.getPrdtCd()) &&
					result.getExcSn() == current.getExcSn()) {
	
					result.setOvduPrnaAmt(result.getOvduPrnaAmt().add(current.getOvduPrnaAmt()));
					result.setOvduIntrAmt(result.getOvduIntrAmt().add(current.getOvduIntrAmt()));
	
					isGrouped = true;
					break;
				}
			}
	
			if (!isGrouped) {
				IBIMS436BVO newItem = new IBIMS436BVO();
				newItem.setPrdtCd(current.getPrdtCd());
				newItem.setExcSn(current.getExcSn());
				newItem.setOvduPrnaAmt(current.getOvduPrnaAmt());
				newItem.setOvduIntrAmt(current.getOvduIntrAmt());
	
				groupList.add(newItem);
			}
		}
		//end

		//상환여부 플래그 변경 start
		for(int i=0; i<groupList.size(); i++){
			IBIMS436BVO groupVo = groupList.get(i);

			BigDecimal totalOvduPrnaAmt = BigDecimal.ZERO;		//연체원금금액합계
			BigDecimal totalOvduIntrAmt = BigDecimal.ZERO;		//연체이자금액합계

			log.debug("[ovduRealese] groupVo.prdtCd ::: " + groupVo.getPrdtCd());
			log.debug("[ovduRealese] groupVo.excSn ::: " + groupVo.getExcSn());

			List<IBIMS436BVO> prnaOvduBscList = ibims436BMapper.getPrnaOvduBscList(groupVo);//원금연체내역
			List<IBIMS436BVO> intrOvduBscList = ibims436BMapper.getIntrOvduBscList(groupVo);//이자연체내역 

			//원금연체내역 플래그 변경 start
			if(prnaOvduBscList.size() > 0){

				for(int j = 0; j < prnaOvduBscList.size(); j++){
					log.debug("[ovduRealese] 원금연체내역 플래그 변경 start");
	
					IBIMS436BVO prnaOvduBscVo = prnaOvduBscList.get(j);
					BigDecimal ovduPrnaAmt = prnaOvduBscVo.getOvduPrnaAmt();//원금연체금액
	
					totalOvduPrnaAmt = totalOvduPrnaAmt.add(ovduPrnaAmt);
	
					if(groupVo.getOvduPrnaAmt().compareTo(totalOvduPrnaAmt) > 0){//상환연체원금금액 > 연체원금금액
						log.debug("[ovduRealese] 상환연체원금금액 > 연체원금금액 ::: 원금 상환 플래그 변경중...");
						rslt = ibims436BMapper.ovduSttsCdFlagCng(prnaOvduBscVo);
	
					}else{//상환연체원금금액 <= 연체원금금액
						log.debug("[ovduRealese] 상환연체원금금액 <= 연체원금금액 ::: 상환 플래그 변경 종료");
						break;
					}
	
				}

			}else{
				log.debug("[ovduRealese] 원금연체내역 없음!!!!");
				log.debug("[ovduRealese] prdtCd::: " + groupVo.getPrdtCd());
				log.debug("[ovduRealese] excSn::: " + groupVo.getExcSn());
			}
			//원금연체내역 플래그 변경 end

			//이자연체내역 플래그 변경 start
			if(intrOvduBscList.size() > 0){

				for(int k = 0; k < intrOvduBscList.size(); k++){
					log.debug("[ovduRealese] 이자연체내역 플래그 변경 start");

					IBIMS436BVO intrOvduBscVo = intrOvduBscList.get(k);
					BigDecimal intrOvduAmt = intrOvduBscVo.getOvduIntrAmt();//이자연체금액

					totalOvduIntrAmt = totalOvduIntrAmt.add(intrOvduAmt);

					if(groupVo.getOvduIntrAmt().compareTo(totalOvduIntrAmt) > 0){//상환연체이자금액 > 연체이자금액
						log.debug("[ovduRealese] 상환연체이자금액 > 연체이자금액 ::: 이자 상환 플래그 변경중...");
						rslt = ibims436BMapper.ovduSttsCdFlagCng(intrOvduBscVo);
	
					}else{//상환연체이자금액 <= 연체이자금액
						log.debug("[ovduRealese] 상환연체이자금액 <= 연체이자금액 ::: 상환 플래그 변경 종료");
						break;
					}

				}

			}else{
				log.debug("[ovduRealese] 이자연체내역 없음!!!!");
				log.debug("[ovduRealese] prdtCd::: " + groupVo.getPrdtCd());
				log.debug("[ovduRealese] excSn::: " + groupVo.getExcSn());
			}
			//이자연체내역 플래그 변경 end

		}
		//상환여부 플래그 변경 end

		return rslt;

	}

}