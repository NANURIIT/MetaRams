package com.nanuri.rams.business.assessment.tb07.tb07150;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS203BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS346BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401HMapper;
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
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;
import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS346BDTO;
import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07150ServiceImpl implements TB07150Service {
	
	/* 딜승인금리 */
	private final IBIMS346BMapper ibims346BMapper;
	/* 약정기본 */
	private final  IBIMS401BMapper ibims401BMapper;
	/* 약정이력 */
	private final IBIMS401HMapper ibims401HMapper;
	/* 여신실행금리기본 */
	private final IBIMS404BMapper ibims404BMapper;	

	private final IBIMS201BMapper ibims201BMapper;

	private final IBIMS410BMapper ibims410BMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	private String rkfrDt = LocalDate.now().toString().replace("-", "");

	/**
	 * 원장정보조회
	 */
	@Override
	public TB07150SVO getCndChngLdgInf(TB07150SVO paramData) {
		
		TB07150SVO rtnObj = new TB07150SVO();

		// /* 변경전원장정보 */
		// rtnObj.setChngBfLdgInf(ibims401BMapper.getCndChngLdgInf(paramData));
		// /* 조건변경정보 */
		// rtnObj.setCndChngInf(ibims401BMapper.getCndChngLdgInf(paramData));
		
		/* 변경전원장정보 */
		rtnObj = ibims201BMapper.getCndChngBfInf(paramData.getPrdtCd());

		/* 변경전금리정보 */
		//rtnObj.setChngBf346BList(ibims346BMapper.selectIBIMS346BListInfo(paramData.getPrdtCd()));
		rtnObj.setChngBf404BList(ibims404BMapper.getIBIMS404ListInfo(paramData));
		/* 조건변경금리정보 */
		//rtnObj.setCndChng346BList(ibims346BMapper.selectIBIMS346BListInfo(paramData.getPrdtCd()));
		rtnObj.setCndChng404BList(ibims404BMapper.getIBIMS404ListInfo(paramData));

		return rtnObj;
		
	}

	//조건변경
	@Override
	public int cndChng(TB07150SVO param){

		int result = 0;

		IBIMS401BVO ibims401bVo = new IBIMS401BVO();
		IBIMS201BDTO ibims201bdto = new IBIMS201BDTO();

		// log.debug("parameter check::: cndChng");
		// for(int i=0; i < param.getCndChng346BList().size(); i++){
		// 	IBIMS346BDTO cndChng346BDTO = param.getCndChng346BList().get(i);

		// 	log.debug("cndChng346BDTO::: {}", cndChng346BDTO.getPrdtCd());
		// }

		// log.debug("param.getCndChng346BList().size():::"+ param.getCndChng346BList().size());
		// log.debug("chngDt:::"+ param.getChngDt());

		String rqsKndCd = param.getRqsKndCd();				// 조건변경 신청종류코드

		if(rqsKndCd.equals("02")){					// 02: 한도변경

			log.debug("#######한도변경#######");

			// BigDecimal eprzCrdlCtrcAmt = param.getEprzCrdlCtrcAmt();				//변경약정금액
			// BigDecimal chngBfEprzCrdlCtrcAmt = param.getChngBfEprzCrdlCtrcAmt();	//변경 전 약정금액
			
			ibims401bVo.setPrdtCd(param.getPrdtCd());							//종목코드
			ibims401bVo.setRqsKndCd(rqsKndCd);									//신청종류코드
			ibims401bVo.setEprzCrdlCtrcAmt(param.getEprzCrdlCtrcAmt());			//변경 약정금액
			ibims401bVo.setHndEmpno(facade.getDetails().getEno());				

			int lmtChngRslt = ibims401BMapper.cndChng(ibims401bVo);
			int hRslt = ibims401HMapper.rgstIBIMS401H(ibims401bVo);


			if(lmtChngRslt < 1){
				log.debug("!!!한도변경 오류!!!");
				result = 1;
			}else if(hRslt < 1){
				log.debug("!!!약정이력테이블 오류!!!");
				result = 1;
			}

			// if(eprzCrdlCtrcAmt.compareTo(chngBfEprzCrdlCtrcAmt) == 1){		//변경약정금액 > 변경 전 약정금액 (한도증액)인 경우
			// 	log.debug("##########한도증액##########");

			// 	int lmtIncrmntRslt = 0;
			// }
			// int trDtlsRslt = 0;

		}else if(rqsKndCd.equals("03")){			// 03: 기한변경

			log.debug("#######기한변경#######");

			ibims401bVo.setPrdtCd(param.getPrdtCd());						//종목코드
			ibims401bVo.setRqsKndCd(rqsKndCd);								//신청종류코드
			ibims401bVo.setCtrcExpDt(param.getCtrcExpDt());					//약정기본 약정만기일자
			ibims401bVo.setHndEmpno(facade.getDetails().getEno());	
			//todo: 기한변경은 딜승인기본테이블 만기일자도 수정해야하는지 확인 필요
			//ibims201bdto.setExpDt(param.getCtrcExpDt());					//딜승인기본 만기일자

			int tlmtChngRslt = ibims401BMapper.cndChng(ibims401bVo);
			int hRslt = ibims401HMapper.rgstIBIMS401H(ibims401bVo);

			if(tlmtChngRslt < 1){
				log.debug("!!!기한변경 오류!!!");
				result = 1;
			}else if(hRslt < 1){
				log.debug("!!!약정이력테이블 오류!!!");
				result = 1;
			}

		}else if(rqsKndCd.equals("31")){			// 31: 기한연장 + 금리변경

			log.debug("#######기한연장 + 금리변경#######");

			ibims401bVo.setPrdtCd(param.getPrdtCd());						//종목코드
			ibims401bVo.setRqsKndCd(rqsKndCd);								//신청종류코드
			ibims401bVo.setCtrcExpDt(param.getCtrcExpDt());					//약정기본 약정만기일자
			ibims401bVo.setHndEmpno(facade.getDetails().getEno());	

			int tlmtChngRslt = ibims401BMapper.cndChng(ibims401bVo);
			int hRslt = ibims401HMapper.rgstIBIMS401H(ibims401bVo);

			if(tlmtChngRslt < 1){
				log.debug("!!!기한변경 오류!!!");
				result = 1;
			}else if(hRslt < 1){
				log.debug("!!!약정이력테이블 오류!!!");
				result = 1;
			}else{

				List<IBIMS404BDTO> cndChng404BList = param.getCndChng404BList();		//변경금리정보

				//조작사원번호 세팅
				for(IBIMS404BDTO cndChngPara : cndChng404BList){
					cndChngPara.setHndEmpno(facade.getDetails().getEno());
				}

				IBIMS404BDTO ibims404Param = new IBIMS404BDTO();

				ibims404Param.setPrdtCd(param.getPrdtCd());
				ibims404Param.setExcSn(param.getExcSn());

				int dltChngBf404Blist = ibims404BMapper.deleteChngBf404BList(ibims404Param);		//변경 전 금리정보 삭제

				if(dltChngBf404Blist < 1){
					log.debug("!!!!!변경전 금리정보 삭제 오류!!!!!");
					result = 1;
				}else{

					int insrt404BListRslt = ibims404BMapper.insertChng404BList(cndChng404BList);

					if(insrt404BListRslt < 1){
						log.debug("!!!!!금리정보 등록 오류!!!!!");
						result = 1;
					}
				}

			}
			
			
		}else if(rqsKndCd.equals("04")){			// 04: 금리변경

			log.debug("#######금리변경#######");

			//List<IBIMS346BDTO> cndChng346BList = param.getCndChng346BList();		//변경금리정보

			List<IBIMS404BDTO> cndChng404BList = param.getCndChng404BList();		//변경금리정보

			//조작사원번호 세팅
			for(IBIMS404BDTO cndChngPara : cndChng404BList){
				cndChngPara.setHndEmpno(facade.getDetails().getEno());
			}

			IBIMS404BDTO ibims404Param = new IBIMS404BDTO();

			ibims404Param.setPrdtCd(param.getPrdtCd());
			ibims404Param.setExcSn(param.getExcSn());

			int dltChngBf404Blist = ibims404BMapper.deleteChngBf404BList(ibims404Param);		//변경 전 금리정보 삭제

			if(dltChngBf404Blist < 1){
				log.debug("!!!!!변경전 금리정보 삭제 오류!!!!!");
				result = 1;
			}else{

				int insrt404BListRslt = ibims404BMapper.insertChng404BList(cndChng404BList);

				if(insrt404BListRslt < 1){
					log.debug("!!!!!금리정보 등록 오류!!!!!");
					result = 1;
				}
			}
			

			// String prdtCd = cndChng346BList.get(0).getPrdtCd();

			// int dltIntrtList = ibims346BMapper.deleteIBIMS346B(prdtCd);

			// if(dltIntrtList > 0){

			// 	int intrtChngRslt = ibims346BMapper.insertIntrtInfoList(cndChng346BList);

			// 	if(intrtChngRslt < 1){
			// 		log.debug("!!!금리정보 insert 오류!!!");
			// 		result = 1;
			// 	}

			// }else{
			// 	log.debug("!!!기존 금리정보 삭제 오류!!!");
			// 	result = 1;
			// }
			
		}else if(rqsKndCd.equals("06")){			// 06: 차주변경

			log.debug("#######차주변경#######");

			ibims401bVo.setPrdtCd(param.getPrdtCd());						//종목코드
			ibims401bVo.setRqsKndCd(rqsKndCd);								//신청종류코드
			ibims401bVo.setPtxtTrOthrDscmNo(param.getTrOthrDscmNo());		//약정기본 거래상대방 식별번호
			ibims401bVo.setHndEmpno(facade.getDetails().getEno());	

			int trOthrChngRslt = ibims401BMapper.cndChng(ibims401bVo);

			if(trOthrChngRslt < 1){
				log.debug("!!!약정 차주변경 오류!!!");
				result = 1;
			}else{

				IBIMS201BVO ibims201bvo = new IBIMS201BVO();
				ibims201bvo.setPrdtCd(param.getPrdtCd());	//종목코드

				int sn = ibims201BMapper.getIBIMS201BSN(ibims201bvo);
				ibims201bvo.setSn(sn);						//일련번호
				ibims201bvo.setTrOthrDscmNo(param.getTrOthrDscmNo());		//거래상대방식별번호
				ibims201bvo.setHndEmpno(facade.getDetails().getEno());		//조작사원번호

				int setLastYnRslt = ibims201BMapper.setLastYnN(ibims201bvo);
				int insertIBIMS201BRslt = ibims201BMapper.cndChng201B(ibims201bvo);

				if(setLastYnRslt < 1){
					log.debug("!!!승인기본 LAST_YN 오류!!!");
					result = 1;
				}else if(insertIBIMS201BRslt < 1){
					log.debug("!!!승인기본 INSERT 오류!!!");
					result = 1;
				}
				
			}
			
		}else {
			log.debug("rqsKndCd:::" + param.getRqsKndCd());
			result = 1;
		}

		if(result == 0){
			log.debug("내역쌓기 (조건변경 성공 시)");

			IBIMS410BDTO hParam = new IBIMS410BDTO();

			hParam.setPrdtCd(param.getPrdtCd());				//종목코드
			hParam.setExcSn(param.getExcSn());					//실행일련번호

			int trSn = ibims410BMapper.getTrSn(hParam);

			hParam.setTrSn(trSn);								//거래일련번호

			hParam.setTrStatCd("1");					//거래상태코드(정상거래 1)
			LocalDate today = LocalDate.now();

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
			String formattedDate = today.format(formatter);
			hParam.setTrDt(formattedDate);						//거래일자

			hParam.setEtprCrdtGrntTrKindCd("33");			//거래종류코드 (33: 조건변경)
			hParam.setTrStfno(facade.getDetails().getEno());					//거래직원번호
			hParam.setHndEmpno(facade.getDetails().getEno());					//조작사원번호
			
			int saveDlTrList = ibims410BMapper.saveDlTrList(hParam);

			if(saveDlTrList < 1){
				log.debug("!!!거래내역 쌓기 오류!!!");
				result = 1;
			}else{
				log.debug("^o^");
			}


		}else{
			log.debug("내역쌓기 x (조건변경 실패 시)");
		}


		return result;
	} 

	//거래내역 매핑 todo:: 거래내역 쌓는 경우 확인받아야 함
	private IBIMS410BDTO set410bDto(TB07150SVO param){
		IBIMS410BDTO ibims410bdto = new IBIMS410BDTO();

		ibims410bdto.setPrdtCd(param.getPrdtCd());			//종목코드
		ibims410bdto.setExcSn(param.getExcSn());			//실행순번
		ibims410bdto.setTrDt(param.getChngDt());			//거래일자
		ibims410bdto.setTrStatCd("01");			//거래상태코드 01: 정상
		//ibims410bdto.setEtprCrdtGrntTrKindCd(rkfrDt);
		return ibims410bdto;
	}


} // class end


