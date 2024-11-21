package com.nanuri.rams.business.assessment.tb03.tb03020;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.dto.IBIMS116BDTO;
import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS100BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS101BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS116BMapper;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAC02BMapper;
import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;
import com.nanuri.rams.com.WF.WorkFlow;
import com.nanuri.rams.com.dto.WorkFlowDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB03020ServiceImpl implements TB03020Service {

	/* Deal기본정보 */
	// private final RAC02BMapper rac02BMapper;
	/* 심사안건일별상세 */
	// private final RAA01BMapper raa01BMapper;
	/* 심사안건평가관리 */
	// private final RAA02BMapper raa02BMapper;
	/* 오늘의할일 */
	private final IBIMS100BMapper ibims100BMapper;
	/* 딜 기본정보 */
	private  final IBIMS101BMapper ibims101BMapper;
	/* 공동영업관리자 정보 */
	private final IBIMS116BMapper ibims116BMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	/* WF */
	private final WorkFlow workFlow;
	private final WorkFlowMapper workFlowMapper;

	@Override
	public IBIMS101BVO getBscDealDetail(IBIMS101BDTO dealInfo) {
		IBIMS101BVO returnVal = ibims101BMapper.getBscDealDetail(dealInfo);
		returnVal.setEnoPList(ibims116BMapper.getEnoPList(dealInfo.getDealNo()));
		return returnVal;
	}

	@Override
	public String saveDeal(IBIMS101BDTO dealInfo) {

		dealInfo.setHndEmpno(facade.getDetails().getEno());

		log.debug("HndEmpno::: " + facade.getDetails().getEno());
		/* 딜번호 채번 */
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

		/* 등록일자 */
		LocalDate curntYr = LocalDate.now();
		dealInfo.setRgstDt(curntYr.toString().replaceAll("-", ""));
		if( dealInfo.getDealNo() == null ) {
			String dprtCd = facade.getDetails().getDprtCd();

			log.debug("dprtCd::: " + facade.getDetails().getDprtCd());
			String time = now.format(formatter);

			dealInfo.setDealNo(dprtCd + time);
		}else{
			// 최종여부 수정
			ibims101BMapper.updateLastYn(dealInfo.getDealNo());
		}
		// 순번 채번
		dealInfo.setSn(ibims101BMapper.selectDealNoFormat(dealInfo));
		/**
		 *   IBIMS101B 딜등록시 비어있는 컬럼이 많아서 
		 *   구분코드는 00
		 * 	 여부는 N
		 * 	 으로 임시 세팅 TODO
		 * 	 날짜는 오늘날짜
		 * */
		DateTimeFormatter formatterNow = DateTimeFormatter.ofPattern("yyyyMMdd");
		String time = now.format(formatterNow);
		dealInfo.setPrdtIflwPathDcd("00");		// 상품유입경로 구분코드
		dealInfo.setInvTrgtDcd("00");				// 투자대상 구분코드
		dealInfo.setInvTpDcd("0000");					// 투자유형구분코드
		dealInfo.setInvShpCd("00");					// 투자형태코드
		dealInfo.setInvWyCd("00");						// 투자방식코드
		dealInfo.setLstYn("N");							// 상장여부
		dealInfo.setDmsCrdtGrdDcd("00");			// 국내신용등급구분코드
		dealInfo.setCrdtInqDt(time);							// 신용조회일자
		dealInfo.setBusiDcd("00");						// 사업구분코드
		dealInfo.setBusiDetlDcd("00");				// 사업상세구분코드
		dealInfo.setIbPrdtClsfCd("00");			// 투자상품분류코드
		dealInfo.setActsCd("00000000000");				// 계정과목코드
		dealInfo.setOrtnFndCd("00000000");			// 운용펀드코드
		dealInfo.setPplcFndYn("N");					// 사모펀드여부
		dealInfo.setUntpFndYn("N");					// 단위형펀드여부
		dealInfo.setDskCd("0000");						// 데스크코드
		dealInfo.setHoldPrpsDcd("0");				// 보유목적구분코드
		dealInfo.setOffrSrvcDcd("0");				// 제공서비스구분코드
		dealInfo.setThcoRlDcd("0");					// 당사역할구분코드
		//dealInfo.setInvPrdMnum();								// 투자기간개월수 decimal 5,0 으로 되잇음 수정필요..
		dealInfo.setSocYn("N");							// soc여부
		dealInfo.setSocDcd("00");						// soc구분코드
		dealInfo.setSppiSfcYn("N");					// SPPI충족여부
		dealInfo.setMrtgStupYn("N");					// 담보설정여부
		dealInfo.setAltnInvYn("N"); 					// 대체투자여부
		dealInfo.setRlesFnnYn("N");					// 부동산금융여부
		dealInfo.setRlesFnnDetlDcd("00");		// 부동산금융상세구분코드
		dealInfo.setProjFnnYn("N");					// 프로젝트금융여부
		dealInfo.setCrdtRifcAplyYn("N");			// 신용보강적용여부
		dealInfo.setDecdDt(time);								// 결재일자
		dealInfo.setDcfcBdcd(facade.getDetails().getBdCd());	// 결재자부점코드
		dealInfo.setDcfcEmpNo(facade.getDetails().getEno());	// 결재자사번

		UUID wfId = UUID.randomUUID();

        log.debug("wfId.toString(): " + wfId.toString());

		dealInfo.setWfId(wfId.toString());						// 워크플로우 ID
		dealInfo.setWfState("01");						// 워크플로우 상태

		wfRgstIBIMS101B(dealInfo);

		// 딜 정보 저장
		ibims101BMapper.saveDeal(dealInfo);
		
		// 공동영업관리자 정보 삭제 
		ibims116BMapper.deleteMngP(dealInfo.getDealNo());
		if( dealInfo.getEnoPList().size() > 0 ) {
			for(IBIMS116BDTO temp : dealInfo.getEnoPList()){
				temp.setDealNo(dealInfo.getDealNo());
				temp.setRgstDt(Integer.toString(curntYr.getYear()));
				temp.setHndEmpno(facade.getDetails().getEno());
			}
			// 공동영업관리자 정보 등록
			ibims116BMapper.registMngP(dealInfo.getEnoPList());
		}

		return dealInfo.getDealNo();
	}

	// 결재요청
	@Override
	public int reqApproveDeal(IBIMS100BVO.selectVO toDoInfo){

		// 임시
		int result = 0;

		// 파라미터 셋팅
		toDoInfo.setSn(ibims100BMapper.getSeqNo(toDoInfo));
		toDoInfo.setRgstEmpno(facade.getDetails().getEno());
		toDoInfo.setPrcsEmpno(facade.getDetails().getEno());
		toDoInfo.setHndEmpno(facade.getDetails().getEno());
		toDoInfo.setDelYn("0");
		
		// 트랜젝션 요청
		ibims100BMapper.insertIBIMS100BInfo(toDoInfo);
		// rac02BMapper.reqApproveDeal(toDoInfo.getRmrk().substring(9));
		
		return result;

	}

	// 결재승인
	@Override
	public int cnfmDeal(IBIMS101BDTO dealInfo){

		// /* String -> BigDecimal 형변환 */
		// BigDecimal tlAmt = new BigDecimal(dealInfo.get("tlAmt"));
		// BigDecimal crncyAmt = new BigDecimal(dealInfo.get("crncyAmt"));

		// /* RAA01B RAA02B INSERT를 위한 DTO 인스턴스화 */
		// RAA01BDTO raa01BDTO = new RAA01BDTO();
		// RAA02BDTO raa02BDTO = new RAA02BDTO();
		// IBIMS100BVO.selectVO ibims100BVO = new IBIMS100BVO.selectVO();

		// // RAA01B INSERT
		// raa01BDTO.setIbDealNo(dealInfo.get("ibDealNo"));
		// raa01BDTO.setIbDealNm(dealInfo.get("ibDealNm"));
		// raa01BDTO.setTlAmt(tlAmt);
		// raa01BDTO.setPtcpAmt(dealInfo.get("ptcpAmt"));
		// raa01BDTO.setTlErnAmt(dealInfo.get("tlErnAmt"));
		// raa01BDTO.setWrtErnAmt(dealInfo.get("wrtErnAmt"));
		// raa01BDTO.setEntpRnm(dealInfo.get("entpRnm"));
		// raa01BDTO.setWrtDt(dealInfo.get("wrtDt"));
		// raa01BDTO.setMtrtDt(dealInfo.get("mtrtDt"));
		// raa01BDTO.setInvstNtnCd(dealInfo.get("invstNtnCd"));
		// raa01BDTO.setInvstCrncyCd(dealInfo.get("invstCrncyCd"));
		// raa01BDTO.setCrncyAmt(crncyAmt);
		// raa01BDTO.setInvstGdsLdvdCd(dealInfo.get("invstGdsLdvdCd"));
		// raa01BDTO.setInvstGdsMdvdCd(dealInfo.get("invstGdsMdvdCd"));
		// raa01BDTO.setInvstGdsSdvdCd(dealInfo.get("invstGdsSdvdCd"));
		// raa01BDTO.setInvstGdsDtlsDvdCd(dealInfo.get("invstGdsDtlsDvdCd"));
		// raa01BDTO.setCoprtnTypCd(dealInfo.get("coprtnTypCd"));
		// raa01BDTO.setHdqtCd(dealInfo.get("hdqtCd"));
		// raa01BDTO.setDprtCd(dealInfo.get("dprtCd"));
		// raa01BDTO.setChrgPEno(dealInfo.get("chrgPEno"));
		// raa01BDTO.setHndlDprtCd(facade.getDetails().getDprtCd());
		// raa01BDTO.setHndlPEno(facade.getDetails().getEno());

		// raa01BMapper.insertDealInfo(raa01BDTO);

		// // RAA02B INSERT
		// raa02BDTO.setIbDealNo(dealInfo.get("ibDealNo"));
		// raa02BDTO.setRiskInspctCcd("01");
		// raa02BDTO.setLstCCaseCcd("00");
		// raa02BDTO.setIbDealNm(dealInfo.get("ibDealNm"));
		// raa02BDTO.setPtcpAmt(dealInfo.get("ptcpAmt"));
		// raa02BDTO.setTlErnAmt(dealInfo.get("tlErnAmt"));
		// raa02BDTO.setWrtErnAmt(dealInfo.get("wrtErnAmt"));
		// raa02BDTO.setWrtDt(dealInfo.get("wrtDt"));
		// raa02BDTO.setMtrtDt(dealInfo.get("mtrtDt"));
		// raa02BDTO.setInvstNtnCd(dealInfo.get("invstNtnCd"));
		// raa02BDTO.setInvstCrncyCd(dealInfo.get("invstCrncyCd"));
		// raa02BDTO.setCrncyAmt(crncyAmt);
		// raa02BDTO.setInvstGdsLdvdCd(dealInfo.get("invstGdsLdvdCd"));
		// raa02BDTO.setInvstGdsMdvdCd(dealInfo.get("invstGdsMdvdCd"));
		// raa02BDTO.setInvstGdsSdvdCd(dealInfo.get("invstGdsSdvdCd"));
		// raa02BDTO.setInvstGdsDtlsDvdCd(dealInfo.get("invstGdsDtlsDvdCd"));
		// raa02BDTO.setCoprtnTypCd(dealInfo.get("coprtnTypCd"));
		// raa02BDTO.setHdqtCd(dealInfo.get("hdqtCd"));
		// raa02BDTO.setDprtCd(dealInfo.get("dprtCd"));
		// raa02BDTO.setChrgPEno(dealInfo.get("chrgPEno"));
		// raa02BDTO.setHndlDprtCd(facade.getDetails().getDprtCd());
		// raa02BDTO.setHndlPEno(facade.getDetails().getEno());
		// raa02BDTO.setFstRgstPDprtCd(facade.getDetails().getDprtCd());

		// raa02BMapper.insertDealInfo(raa02BDTO);
		
		// // IBIMS100B UPDATE 개발중
		// ibims100BVO.setEmpno(dealInfo.get("pyntEno"));
		// ibims100BVO.setRmrk(dealInfo.get("ibDealNo"));

		// ibims100BMapper.updateIBIMS100BInfO(ibims100BVO);

		// return rac02BMapper.cnfmDeal(dealInfo.get("ibDealNo"));

		int result = 0;

		WorkFlowDTO paramDto = new WorkFlowDTO();

		String wfId = dealInfo.getWfId();				//워크플로우 ID
		String rtnYn = dealInfo.getRtnYn();				//반송여부

		paramDto.setWfId(wfId);
		paramDto.setRtnYn(rtnYn);					

		String nextStepId = workFlowMapper.getNxtStepId(paramDto);

		log.debug("nextStepId ::: " + nextStepId);

		paramDto.setNextStepId(nextStepId);				//다음 STEP_ID
		paramDto.setRtnCnts("");				//반송사유
		paramDto.setMemoCnts("");				//결재사유

		int aprvRslt = workFlowMapper.aprvWf(paramDto);
		int update101Rslt = workFlowMapper.mergeIBIMS101B(paramDto);
		int hisRslt = workFlowMapper.wfHisRgst(paramDto);

		if(nextStepId.equals("99")){		//STEP 99까지 간 경우 WF 삭제
			workFlowMapper.finishWF(paramDto);
		}	

		if(aprvRslt == 0 && update101Rslt == 0 && hisRslt == 0){
			result = 1;
		}

		return result;
	}

	// 반송
	// @Override
	// public int rejtDeal(String mngDealNo){
	// 	return rac02BMapper.rejtDeal(mngDealNo);
	// }

	// 딜등록 화면 진입시 딜번호 채번..
	@Override
	public String getDealNo(){
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String dprtCd = facade.getDetails().getDprtCd();
		String time = now.format(formatter);
		String dealNo = dprtCd + time;
		return dealNo;
	}

	//IBIMS101B WorkFlow 등록
	public int wfRgstIBIMS101B(IBIMS101BDTO dealInfo){

		WorkFlowDTO workFlowDTO = new WorkFlowDTO();
		workFlowDTO.setWfMapNm("딜기본정보등록");

		String wfMapId = workFlowMapper.getWfMapId(workFlowDTO);

		workFlowDTO.setWfId(dealInfo.getWfId());							//WF_ID
		workFlowDTO.setWfMapId(wfMapId);									//todo: WF 맵 ID 공통코드 없음
		workFlowDTO.setWfStepId("01");								//WF 스텝 ID (결재 요청 시 01 최초 부여)
		workFlowDTO.setAprvEmpNo(dealInfo.getChrrEmpno());					//결재자 사원번호
		workFlowDTO.setRtnYn("N");									//반송여부
		// workFlowDTO.setAprvDttm(dealInfo.getdtt);
		workFlowDTO.setJobCnts(dealInfo.getDealNm());						//작업내용(DEAL_NM)
		workFlowDTO.setExcAuthCd("0"); 							//예외권한코드(0:사용안함|1:특정인|2:특정부서|3:ALL)
		workFlowDTO.setEtc(dealInfo.getDealNo() + dealInfo.getSn());		//etc (PK + PK 문자열 조합)

		return workFlow.wfRgst(workFlowDTO);
	}
}
