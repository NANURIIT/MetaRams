package com.nanuri.rams.business.assessment.tb06.tb06040;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;
import com.nanuri.rams.business.common.dto.IBIMS346BDTO;
import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.TB06040SDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS202BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS346BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401HMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB06040SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06040ServiceImpl implements TB06040Service {

	private final IBIMS201BMapper ibims201BMapper;
	private final IBIMS202BMapper ibims202BMapper;
	private final IBIMS346BMapper ibims346BMapper;
	private final IBIMS401BMapper ibims401BMapper;
	private final IBIMS401HMapper ibims401HMapper;

	private final AuthenticationFacade facade;

	// 약정 및 해지 정보 조회
	@Override
	public TB06040SVO searchIBInfo(String prdtCd) {
		return ibims201BMapper.searchIBInfo(prdtCd);
	}

	// 약정 및 해지 정보 저장
	@Override
	public int saveCtrcCclcInfo(TB06040SDTO paramData) {

		int rtnValue = 0;

		IBIMS201BVO out201BVO = ibims201BMapper.selectOnlyOneIBIMS201B(paramData.getPrdtCd());
		out201BVO.setLastYn("N");
		rtnValue = ibims201BMapper.updateIBIMS201BDTO(out201BVO);
		out201BVO.setLastYn("Y");
		out201BVO.setPrgSttsCd(("1".equals(paramData.getCtrcCclcDcd()))?"501":"502");
		rtnValue = ibims201BMapper.regPrdtCd(out201BVO);

		// 딜승인정보 조회
		IBIMS201BDTO ibims201bdto = ibims201BMapper.selectOnlyOneIBIMS201B(paramData.getPrdtCd());
		// 딜승인정보+약정정보로 여신기본 설정
		IBIMS401BDTO ibims401bdto = set401b(ibims201bdto, paramData);

		if( "1".equals(paramData.getCtrcCclcDcd()) ) {

			if(("90".equals(ibims201bdto.getPrdtLclsCd()))
			 ||("91".equals(ibims201bdto.getPrdtLclsCd()))) {

				IBIMS202BDTO in202bdto = new IBIMS202BDTO();
				in202bdto.setPrdtCd(paramData.getPrdtCd());
				// 딜승인현금흐름기본 - 상환구분/금리정보
				IBIMS202BDTO ibims202bdto = ibims202BMapper.selectIBIMS202BDTOInfo(in202bdto);
				IBIMS346BDTO ibims346bdto = new IBIMS346BDTO();
				ibims346bdto.setPrdtCd(paramData.getPrdtCd());
				ibims346bdto.setAplyStrtDt(paramData.getCtrcDt());					/* 적용시작일자 */
				//ibims346bdto.setAplyEndDt(paramData.getCtrcExpDt());				/* 적용종료일자 */
				ibims346bdto.setAplyEndDt("25001231");								/* 적용종료일자 2024.08.04 임대표님 MAX EndDt로 설정변경 요청 */
				ibims346bdto.setStdrIntrtKndCd(paramData.getStdrIntrtKndCd());   	/* 기준금리종류코드 */
				ibims346bdto.setFxnIntrt(paramData.getStdrIntrt());					/* 기준금리 */
				ibims346bdto.setAddIntrt(paramData.getAddIntrt());					/* 가산금리 */
				/* 금리변동주기코드를 등록하는 곳이 없어 일단 변동주기개월수를 승인시점에 입력받기 때문에 '개월'로 적용함 >> 1_이자납입주기 2_일 3_개월 */
				ibims346bdto.setIntrtCngeFrqcCd("3");
				if(ibims202bdto == null) {
					ibims346bdto.setIntrtCngeFrqcMnum(0);
				} else {
					ibims346bdto.setIntrtCngeFrqcMnum((ibims202bdto.getIntrtCngeFrqcMnum()==null)?0:ibims202bdto.getIntrtCngeFrqcMnum());
				}
				/* 적용일수구분코드를 등록하는 곳이 없어 일단 적용일수구분코드를 승인시점에 입력받기 때문에 '이자계산초일'로 적용함 >> 1_이자계산초일 2_이자계산말일 */
				ibims346bdto.setAplyDnumDcd("1");
				ibims346bdto.setStdrIntrtAplyDnum(DateUtil.dateDiff(paramData.getCtrcDt(), paramData.getCtrcExpDt()));
				ibims346bdto.setHndEmpno(facade.getDetails().getEno());	// 조작사원번호

				int Cnt = ibims346BMapper.selectCntIBIMS346B(paramData.getPrdtCd());
				if(Cnt > 0) {
					rtnValue = ibims346BMapper.deleteIBIMS346B(paramData.getPrdtCd());
				}
				rtnValue = ibims346BMapper.insertIBIMS346B(ibims346bdto);


			}
			IBIMS401BDTO in401bdto = new IBIMS401BDTO();
			in401bdto.setPrdtCd(ibims401bdto.getPrdtCd());
			IBIMS401BVO out401bdto = ibims401BMapper.getIBIMS401BBaseInfo(in401bdto);
			ibims401bdto.setEprzCrdlLdgSttsCd("1");
			if(out401bdto == null) {
				rtnValue = ibims401BMapper.saveIBIMS401BInfo(ibims401bdto);
			} else {
				rtnValue = ibims401BMapper.updateIBIMS401B(ibims401bdto);
			}
		} else {
			ibims401bdto.setEprzCrdlLdgSttsCd("99");
			rtnValue = ibims401BMapper.updateCclcInfo(ibims401bdto);
		}
		rtnValue = ibims401HMapper.insertIBIMS401H(ibims401bdto);


		return rtnValue;

	}


	private IBIMS401BDTO set401b(IBIMS201BDTO getParam, TB06040SDTO disParam) {

		IBIMS401BDTO setParam = new IBIMS401BDTO();

		setParam.setPrdtCd(getParam.getPrdtCd()); /* 상품코드 */
		setParam.setRqsSn(getParam.getSn());
		setParam.setPtxtTrOthrDscmNo(getParam.getTrOthrDscmNo()); /* 거래상대방식별번호 */
		setParam.setStdrIntrt(disParam.getStdrIntrt()); /* 기준금리 */
		setParam.setAddIntrt(disParam.getAddIntrt()); /* 가산금리 */
		setParam.setTotIntrt(disParam.getTotIntrt()); /* 총금리 */
		setParam.setFrsMngmBdcd(getParam.getFrsMngmBdcd()); /* 최초관리부점코드 */
		setParam.setMngmBdcd(getParam.getMngmBdcd()); 		/* 관리부점코드 */
		setParam.setPrdtClsfCd(getParam.getPrdtClsfCd()); /* 기업여신상품분류코드 */
		setParam.setPrdtMdclCd(getParam.getPrdtMdclCd()); /* 기업여신상품중분류코드 */
		setParam.setPrdtLclsCd(getParam.getPrdtLclsCd()); /* 기업여신상품대분류코드 */
		setParam.setActsCd(getParam.getActsCd()); /* 계정과목코드 */
		setParam.setEprzCrdlAcctJobCd(getParam.getAcctJobCd()); /* 기업여신회계업무코드 */
		setParam.setEprzCrdlAcctUnJobCd(getParam.getAcctUnJobCd()); /* 기업여신회계단위업무코드 */
		setParam.setEprzCrdlAcctTrCd(getParam.getAcctTrCd()); /* 기업여신회계거래코드 */
		setParam.setEprzCrdlApvlDt(getParam.getApvlDt()); /* 기업여신승인일자 */
		setParam.setEprzCrdlApvlAmt(getParam.getEprzCrdlApvlAmt()); /* 기업여신승인금액 */
		setParam.setCrryCd(getParam.getTrCrryCd()); /* 통화코드 */
		setParam.setCtrcDt(disParam.getCtrcDt()); /* 약정일자 */
		setParam.setCtrcExpDt(disParam.getCtrcExpDt()); /* 약정만기일자 */
		setParam.setStdrIntrtKndCd(getParam.getStdrIntrtKndCd()); /* 기준금리종류코드 */
		setParam.setEprzCrdlCtrcAmt(disParam.getEprzCrdlCtrcAmt()); /* 기업여신약정금액 */
		setParam.setEprzCrdlIndvLmtDcd(getParam.getEprzCrdlIndvLmtDcd()); /* 기업여신개별한도구분코드 */
		setParam.setEprzCrdlIntrRcvnMthCd(getParam.getEprzCrdlIntrRcvnMthCd()); /* 기업여신이자수취방법코드 */
		setParam.setEprzCrdlIntrBnaoDcd(getParam.getIntrBnaoDcd()); /* 기업여신이자선후취구분코드 */
		setParam.setEprzCrdlTfdLyAplyDcd(getParam.getTfdLyAplyDcd()); /* 기업여신초일말일적용구분코드 */
		setParam.setEprzCrdlIntrSnnoPrcsDcd(getParam.getIntrSnnoPrcsDcd()); /* 기업여신이자단수처리구분코드 */
		setParam.setEprzCrdlPaiRdmpDcd(getParam.getPaiRdmpDcd()); /* 기업여신원리금상환구분코드 */
		setParam.setPrnaRdmpFrqcMnum(getParam.getPrnaRdmpFrqcMnum()); /* 원금상환주기개월수 */
		setParam.setIntrRdmpFrqcMnum(getParam.getIntrRdmpFrqcMnum()); /* 이자상환주기개월수 */
		setParam.setPrnaDfrPrdMnum(getParam.getPrnaDfrPrdMnum()); /* 원금거치기간개월수 */
		setParam.setEprzCrdlOrtnFndCd(getParam.getOrtnFndCd()); /* 기업여신운용펀드코드 */
		setParam.setEprzCrdlCtrtNo(getParam.getEprzCrdlCtrtNo()); /* 기업여신계약번호 */
		setParam.setPfLoanYn(getParam.getPfLoanYn()); /* pf대출여부 */
		setParam.setUndwFnnYn(getParam.getUndwFnnYn()); /* 인수금융여부 */
		setParam.setInvIdtrtSmitYn(getParam.getInvIdtrtSmitYn()); /* 투자확약서제출여부 */
		setParam.setTrgYn(getParam.getTrgYn()); /* 트리거여부 */
		setParam.setTrgCndCtns(getParam.getTrgCndCtns()); /* 트리거조건내용 */
		setParam.setInvIdtrtSmitDt(getParam.getInvIdtrtSmitDt()); /* 투자확약서제출일자 */
		setParam.setChrrEmpno(getParam.getChrrEmpno()); /* 담당자사원번호 */
		setParam.setSubChrrEmpno(getParam.getSubChrrEmpno()); /* 서브담당자사원번호 */
		setParam.setEdDt(getParam.getEdDt()); /* 종결일자 */
		setParam.setEprzCrdlCtrtEndRsnCd(getParam.getEprzCrdlCtrtEndRsnCd()); /* 기업여신계약종료사유코드 */
		setParam.setEprzCrdlCtrtEndRsnCtns(getParam.getEprzCrdlCtrtEndRsnCtns()); /* 기업여신계약종료사유내용 */
		setParam.setTrchAplyYn(getParam.getTrchAplyYn()); /* 트렌치적용여부 */
		setParam.setBdbtRsvsRcknStdrLclsCd(getParam.getBdbtRsvsRcknStdrLclsCd()); /* 대손준비금산정기준대분류코드 */
		setParam.setBdbtRsvsRcknStdrMdclCd(getParam.getBdbtRsvsRcknStdrMdclCd()); /* 대손준비금산정기준중분류코드 */
		setParam.setBdbtRsvsRcknStdrSclsCd(getParam.getBdbtRsvsRcknStdrSclsCd()); /* 대손준비금산정기준소분류코드 */
		setParam.setBdbtRsvsRcknStdrRto(getParam.getBdbtRsvsRcknStdrRto()); /* 대손준비금산정기준비율 */
		setParam.setEprzCrdlCtrtAmt(getParam.getEprzCrdlCtrtAmt()); /* 기업여신계약금액 */
		setParam.setThcoPtciAmt(getParam.getThcoPtciAmt()); /* 당사참여금액 */
		setParam.setEprzCrdlIntrDnumClcMthCd(getParam.getIntrDnumClcMthCd()); /* 기업여신이자일수계산방법코드 */
		setParam.setEprzCrdlHldyPrcsDcd(getParam.getHldyPrcsDcd()); /* 기업여신휴일처리구분코드 */
		setParam.setCclcDt(disParam.getCclcDt()); 						/* 해지일자 */
		setParam.setEprzCrdlCclcRsnCd(disParam.getEprzCrdlCclcRsnCd()); /* 기업여신해지사유코드 */
		setParam.setCclcRsnCtns(disParam.getCclcRsnCtns()); 			/* 해지사유내용 */
		setParam.setEprzCrdlWeekMrtgKndCd(getParam.getEprzCrdlWeekMrtgKndCd()); /* 기업여신주담보종류코드 */
		setParam.setOvduIntrRt(getParam.getOvduIntrRt()); /* 연체이자율 */
		setParam.setEprzCrdlOvduIntrRtDcd(getParam.getOvduIntrRtDcd()); /* 기업여신연체이자율구분코드 */
		setParam.setEprzCrdlIntrClcEndDeDcd(getParam.getIntrClcEndDeDcd()); /* 기업여신이자계산종료일구분코드 */
		setParam.setIntrHdwtClcYn(getParam.getIntrHdwtClcYn()); /* 이자수기계산여부 */
		setParam.setInvJdgmComtNo(getParam.getInvJdgmComtNo()); /* 투자심사위원회번호 */
		setParam.setCtrcCclcDcd(disParam.getCtrcCclcDcd()); /* 약정해지구분코드 */
		setParam.setHndEmpno(facade.getDetails().getEno());	// 조작사원번호

		return setParam;
	}

}
