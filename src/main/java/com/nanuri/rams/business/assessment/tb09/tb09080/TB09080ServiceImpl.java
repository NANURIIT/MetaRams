package com.nanuri.rams.business.assessment.tb09.tb09080;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS406BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.dto.IBIMS420BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS406BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS406BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB09080ServiceImpl implements TB09080Service {
	
	/* 여신기본 */
	private final  IBIMS401BMapper ibims401BMapper;
	/* 여신실행기본 */
	private final IBIMS402BMapper ibims402BMapper;
	/* 여신스케쥴기본 */
	private final IBIMS403BMapper ibims403BMapper;
	// 딜거래내역
	private final IBIMS410BMapper ibims410bMapper;
	// 여신이자계산내역
	private final IBIMS406BMapper ibims406bMapper;
	// 딜수수료수납내역
	private final IBIMS420BMapper ibims420bMapper;

	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;
	
	// 여신원장조회
	@Override
	public IBIMS401BVO srchCrdlLdg(IBIMS401BVO input) {
		// return 
		IBIMS401BVO resObj = new IBIMS401BVO();
		
		String srchF = input.getSrchF();	// 조회구분

		String prdtCd = input.getPrdtCd();	// 종목코드
		long rqsSn = input.getExcSn();		// 신청일련번호
		long trSn = input.getTrSn();		// 거래일련번호
		long excSn = input.getExcSn();		// 실행일련번호


		log.debug("excSn ::: {}", excSn);
		if ( true ) {
			// 여신원장조회
			IBIMS401BVO crdlLdg = ibims401BMapper.selectCrdlLdg(input);
			
			log.debug("crdlLdg ::: {}", crdlLdg);
	
			resObj.setPrdtCd(crdlLdg.getPrdtCd()); // 종목코드
			resObj.setEprzCrdlLdgSttsCd(crdlLdg.getEprzCrdlLdgSttsCd()); // 기업여신원장상태코드
			resObj.setRqsSn(crdlLdg.getRqsSn()); // 신청일련번호
			resObj.setPtxtTrOthrDscmNo(crdlLdg.getPtxtTrOthrDscmNo()); // 거래상대방식별번호
			resObj.setPtxtTrOthrDscmNm(crdlLdg.getPtxtTrOthrDscmNm()); // 거래상대방명
			resObj.setStdrIntrt(crdlLdg.getStdrIntrt()); // 기준금리
			resObj.setAddIntrt(crdlLdg.getAddIntrt()); // 가산금리
			resObj.setTotIntrt(crdlLdg.getTotIntrt()); // 총금리
			resObj.setFrsMngmBdcd(crdlLdg.getFrsMngmBdcd()); // 최초관리부점코드
			resObj.setMngmBdcd(crdlLdg.getMngmBdcd()); // 관리부점코드
			resObj.setMngmBdcdNm(crdlLdg.getMngmBdcdNm()); // 관리부점코드
			resObj.setEprzCrdlPrdtClsfCd(crdlLdg.getEprzCrdlPrdtClsfCd()); // 기업여신상품분류코드
			resObj.setEprzCrdlPrdtMdclCd(crdlLdg.getEprzCrdlPrdtMdclCd()); // 기업여신상품중분류코드
			resObj.setEprzCrdlPrdtLclsCd(crdlLdg.getEprzCrdlPrdtLclsCd()); // 기업여신상품대분류코드
			resObj.setActsCd(crdlLdg.getActsCd()); // 계정과목코드
			resObj.setEprzCrdlAcctJobCd(crdlLdg.getEprzCrdlAcctJobCd()); // 기업여신회계업무코드
			resObj.setEprzCrdlAcctUnJobCd(crdlLdg.getEprzCrdlAcctUnJobCd()); // 기업여신회계단위업무코드
			resObj.setEprzCrdlAcctTrCd(crdlLdg.getEprzCrdlAcctTrCd()); // 기업여신회계거래코드
			resObj.setEprzCrdlApvlDt(crdlLdg.getEprzCrdlApvlDt()); // 기업여신승인일자
			resObj.setEprzCrdlApvlAmt(crdlLdg.getEprzCrdlApvlAmt()); // 기업여신승인금액
			resObj.setCrryCd(crdlLdg.getCrryCd()); // 통화코드
			resObj.setEprzCrdlLoanPrdDcd(crdlLdg.getEprzCrdlLoanPrdDcd()); // 기업여신대출기간구분코드
			resObj.setCtrcDt(crdlLdg.getCtrcDt()); // 약정일자
			resObj.setCtrcExpDt(crdlLdg.getCtrcExpDt()); // 약정만기일자
			resObj.setStdrIntrtKndCd(crdlLdg.getStdrIntrtKndCd()); // 기준금리종류코드
			resObj.setEprzCrdlCtrcAmt(crdlLdg.getEprzCrdlCtrcAmt()); // 기업여신약정금액
			resObj.setDebtCrtfIssDt(crdlLdg.getDebtCrtfIssDt()); // 부채증명서발급일자
			resObj.setPrpmtAmt(crdlLdg.getPrpmtAmt()); // 가지급금액
			resObj.setEprzCrdlIndvLmtDcd(crdlLdg.getEprzCrdlIndvLmtDcd()); // 기업여신개별한도구분코드
			resObj.setEprzCrdlIntrRcvnMthCd(crdlLdg.getEprzCrdlIntrRcvnMthCd()); // 기업여신이자수취방법코드
			resObj.setEprzCrdlIntrBnaoDcd(crdlLdg.getEprzCrdlIntrBnaoDcd()); // 기업여신이자선후취구분코드
			resObj.setEprzCrdlTfdLyAplyDcd(crdlLdg.getEprzCrdlTfdLyAplyDcd()); // 기업여신초일말일적용구분코드
			resObj.setEprzCrdlIntrSnnoPrcsDcd(crdlLdg.getEprzCrdlIntrSnnoPrcsDcd()); // 기업여신이자단수처리구분코드
			resObj.setEprzCrdlPaiRdmpDcd(crdlLdg.getEprzCrdlPaiRdmpDcd());// 기업여신원리금상환구분코드
			resObj.setPrnaRdmpFrqcMnum(crdlLdg.getPrnaRdmpFrqcMnum());// 원금상환주기개월수
			resObj.setIntrRdmpFrqcMnum(crdlLdg.getIntrRdmpFrqcMnum());// 이자상환주기개월수
			resObj.setPrnaDfrPrdMnum(crdlLdg.getPrnaDfrPrdMnum());// 원금거치기간개월수
			resObj.setTlmtPrfLoseFrqcNum(crdlLdg.getTlmtPrfLoseFrqcNum());// 기한이익상실주기수
			resObj.setTlmtPrfLoseDt(crdlLdg.getTlmtPrfLoseDt());// 기한이익상실일자
			resObj.setTlmtPrfRsrrDt(crdlLdg.getTlmtPrfRsrrDt());// 기한이익부활일자
			resObj.setEprzCrdlOrtnFndCd(crdlLdg.getEprzCrdlOrtnFndCd());// 기업여신운용펀드코드
			resObj.setEprzCrdlOrtnFndNm(crdlLdg.getEprzCrdlOrtnFndNm());// 기업여신운용펀드명
			resObj.setEprzCrdlCtrtNo(crdlLdg.getEprzCrdlCtrtNo());// 기업여신계약번호
			resObj.setPfLoanYn(crdlLdg.getPfLoanYn());// pf대출여부
			resObj.setUndwFnnYn(crdlLdg.getUndwFnnYn());// 인수금융여부
			resObj.setInvIdtrtSmitYn(crdlLdg.getInvIdtrtSmitYn());// 투자확약서제출여부
			resObj.setTrgYn(crdlLdg.getTrgYn());// 트리거여부
			resObj.setTrgCndCtns(crdlLdg.getTrgCndCtns());// 트리거조건내용
			resObj.setInvIdtrtSmitDt(crdlLdg.getInvIdtrtSmitDt());// 투자확약서제출일자
			resObj.setChrrEmpno(crdlLdg.getChrrEmpno());// 담당자사원번호
			resObj.setChrrEmpnm(crdlLdg.getChrrEmpnm());// 담당자사원명
			resObj.setSubChrrEmpno(crdlLdg.getSubChrrEmpno());// 서브담당자사원번호
			resObj.setEdDt(crdlLdg.getEdDt());// 종결일자
			resObj.setEprzCrdlCtrtEndRsnCd(crdlLdg.getEprzCrdlCtrtEndRsnCd());// 기업여신계약종료사유코드
			resObj.setEprzCrdlCtrtEndRsnCtns(crdlLdg.getEprzCrdlCtrtEndRsnCtns());// 기업여신계약종료사유내용
			resObj.setTrchAplyYn(crdlLdg.getTrchAplyYn());// 트렌치적용여부
			resObj.setBdbtRsvsRcknStdrLclsCd(crdlLdg.getBdbtRsvsRcknStdrLclsCd());// 대손준비금산정기준대분류코드
			resObj.setBdbtRsvsRcknStdrMdclCd(crdlLdg.getBdbtRsvsRcknStdrMdclCd());// 대손준비금산정기준중분류코드
			resObj.setBdbtRsvsRcknStdrSclsCd(crdlLdg.getBdbtRsvsRcknStdrSclsCd());// 대손준비금산정기준소분류코드
			resObj.setBdbtRsvsRcknStdrRto(crdlLdg.getBdbtRsvsRcknStdrRto());// 대손준비금산정기준비율
			resObj.setEprzCrdlCtrtAmt(crdlLdg.getEprzCrdlCtrtAmt());// 기업여신계약금액
			resObj.setThcoPtciAmt(crdlLdg.getThcoPtciAmt());// 당사참여금액
			resObj.setEprzCrdlIntrDnumClcMthCd(crdlLdg.getEprzCrdlIntrDnumClcMthCd());// 기업여신이자일수계산방법코드
			resObj.setEprzCrdlHldyPrcsDcd(crdlLdg.getEprzCrdlHldyPrcsDcd());// 기업여신휴일처리구분코드
			resObj.setCclcDt(crdlLdg.getCclcDt());// 해지일자
			resObj.setEprzCrdlCclcRsnCd(crdlLdg.getEprzCrdlCclcRsnCd());// 기업여신해지사유코드
			resObj.setCclcRsnCtns(crdlLdg.getCclcRsnCtns());// 해지사유내용
			resObj.setEprzCrdlWeekMrtgKndCd(crdlLdg.getEprzCrdlWeekMrtgKndCd());// 기업여신주담보종류코드
			resObj.setOvduIntrRt(crdlLdg.getOvduIntrRt());// 연체이자율
			resObj.setEprzCrdlOvduIntrRtDcd(crdlLdg.getEprzCrdlOvduIntrRtDcd());// 기업여신연체이자율구분코드
			resObj.setTrrcDt(crdlLdg.getTrrcDt());// 이수관일자
			resObj.setEprzCrdlIntrClcEndDeDcd(crdlLdg.getEprzCrdlIntrClcEndDeDcd());// 기업여신이자계산종료일구분코드
			resObj.setIntrHdwtClcYn(crdlLdg.getIntrHdwtClcYn());// 이자수기계산여부
			resObj.setInvJdgmComtNo(crdlLdg.getInvJdgmComtNo());// 투자심사위원회번호
			resObj.setBdbtAlwcRcknLmtStdrDcd(crdlLdg.getBdbtAlwcRcknLmtStdrDcd());// 대손충당금산정한도기준구분코드
			resObj.setCtrcCclcDcd(crdlLdg.getCtrcCclcDcd());// 약정해지구분코드
			resObj.setDealExcAmt(crdlLdg.getDealExcAmt()); // 대출금액
			resObj.setDealTrPrca(crdlLdg.getDealTrPrca()); // 딜거래원금
			resObj.setHndDetlDtm(crdlLdg.getHndDetlDtm());// 조작상세일시
			resObj.setHndEmpno(crdlLdg.getHndEmpno());// 조작사원번호
			resObj.setHndTmnlNo(crdlLdg.getHndTmnlNo());// 조작단말기번호
			resObj.setHndTrId(crdlLdg.getHndTrId());// 조작거래id
			resObj.setGuid(crdlLdg.getGuid());// guid
	
			resObj.setPrgSttsCd(crdlLdg.getPrgSttsCd()); // 진행상태
			log.debug("adsadasfasf::::{}", crdlLdg.getPrgSttsCd());
			// 약정기본
			IBIMS402BVO ibims402bvo = new IBIMS402BVO();
			ibims402bvo.setPrdtCd(prdtCd);
			ibims402bvo.setExcSn(excSn);
			IBIMS402BVO ctrcBss = ibims402BMapper.selectOneIBIMS402B(ibims402bvo); 
			resObj.setIbims402BDTO(ctrcBss);
	
			// 딜거래내역
			IBIMS410BDTO ibims410bDto = new IBIMS410BDTO();
			IBIMS410BVO ibims410bVo = new IBIMS410BVO();
			ibims410bVo.setPrdtCd(prdtCd);
			ibims410bVo.setExcSn(excSn);
			log.debug("\ndlTr ::: {}", excSn);
			List<IBIMS410BVO> dlTrHisList = ibims410bMapper.getDlTrHistoryList(ibims410bVo);
			System.out.print(dlTrHisList);
			//resObj.setTrDtls(dlTrList);
		}


		// trDtls
		// intrTrDtls
		// feeRcivDtls

		return resObj;
	}
	
	// 여신원장 실행순번 조회
	@Override
	public List<Map<String, Object>> srchExcSn(IBIMS401BDTO input) {
		return ibims402BMapper.srchExcSn(input);
	}

	// 거래내역 조회
	@Override
	public IBIMS410BVO inqTrDtls(IBIMS410BVO input) {
		IBIMS410BVO ibims410bvo = new IBIMS410BVO();

		List<IBIMS410BVO> dlTrList = ibims410bMapper.getDlTrHistoryList(input);

		ibims410bvo.setTrDtls(dlTrList);

		return ibims410bvo;
	};

	// 실행원장 조회
	@Override
	public IBIMS402BVO inqExcLdg(IBIMS402BVO input) {
		// 약정기본
		IBIMS402BVO inqExcLdg = ibims402BMapper.selectOneIBIMS402B(input); 
		// resObj.setIbims402BDTO(ctrcBss);
		return inqExcLdg;
	};

} // class end