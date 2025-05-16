package com.nanuri.rams.business.common.tt;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TT03040SDTO {
	private String dealNumbeer;
	private String createStartDate;
	private String createEndDate;
	
	// IBIMS101BDTO
	private String dealNo; // 딜번호
	private String sn; // 일련번호
	private String stdrYear; // 기준년도
	private String lastYn; // 최종여부
	private String rgstDt; // 등록일자
	private String decdDt; // 결재일자
	private int decdSn; // 결재일련번호
	private String delYn; // 삭제여부
	private String hndDetlDtm; // 조작상세일시
	private String hndEmpno; // 조작사원번호

	/* 2023-12-04 추가된 컬럼 */
	private String corptnTypCd; // 협업유형코드
	private String bookCd; // 북코드
	private String invPrdtDtlsDvdCd; // 투자상품상세분류코드
	private String bnkBd; // 은행부점
	private String invstCty; // 투자도시
	private String bzsacalCd; // 기업규모코드
	private String indTypDvdCd; // 업종분류코드
	private String irls; // 계열
	private String crdtGrdCd; // 신용등급코드
	private String lstMkt; // 상장시장
	private String csucCmpDscmNo; // 시공사식별번호
	private String crdtEhcmntCcd; // 신용보감구분코드
	private BigDecimal ltv; // LTV
	private String ovrsCorpCoprtnCd; // 해외법인협업
	private String etcCntn; // 기타의견

	/* KEEP */
	private String busiDetlDcd; // 사업상세구분코드
	private String lstYn; // 상장여부
	private String pplcFndYn; // 사모펀드여부
	private String untpFndYn; // 단위형펀드여부
	private String hndTmnlNo; // 조작단말기번호
	private String hndTrId; // 조작거래id
	private String guid; // guid
	private String inqDvsn; // TB03040S 사업정보조회 기준일자 구분
	private String start; // TB03040S 사업정보조회 시작일
	private String end; // TB03040S 사업정보조회 종료일

	/* 기본정보 */
	private String dealNm; // 딜명
	private String prdtIflwPathDcd; // 상품유입경로구분코드
	private String invDealCntn; // 딜내용
	private String invTrgtDcd; // 투자대상구분코드
	private String invTpDcd; // 투자유형구분코드
	private String invShpCd; // 투자형태코드
	private String invWyCd; // 투자방식코드
	private String busiDcd; // 사업구분코드
	private String busiDcdNm; // 사업구분코드명
	private String ntnCd; // 국가코드
	private String dmsCrdtGrdDcd; // 국내신용등급구분코드
	private String crdtInqDt; // 신용조회일자
	private String ptxtTrOthrDscmNo; // 거래상대방식별번호
	private String ptxtTrOthrDscmNm; // 거래상대방식별명

	/* 자산분류 */
	private String invPrdtLclsCd; // 투자상품대분류코드
	private String invPrdtMdclCd; // 투자상품중분류코드
	private String invPrdtClsfCd; // 투자상품분류코드
	private String ibPrdtClsfCd; // ib상품분류코드
	private String actsCd; // 계정과목코드
	private String ortnFndCd; // 운용펀드코드
	private String dskCd; // 데스크코드
	private String holdPrpsDcd; // 보유목적구분코드
	private String offrSrvcDcd; // 제공서비스구분코드
	private String thcoRlDcd; // 당사역할구분코드
	private BigDecimal invPrdMnum; // 투자기간개월수
	private String socYn; // soc여부
	private String socDcd; // soc구분코드
	private String sppiSfcYn; // sppi충족여부
	private String mrtgStupYn; // 담보설정여부
	private String altnInvYn; // 대체투자여부
	private String rlesFnnYn; // 부동산금융여부
	private String rlesFnnDetlDcd; // 부동산금융상세구분코드
	private String projFnnYn; // 프로젝트금융여부
	private String crdtRifcAplyYn; // 신용보강적용여부

	/* 수익정보 */
	private String invAmtDcsnYn; // 투자금액확정여부
	private BigDecimal allInvAmt; // 총투자금액
	private String thcoPtciAmtDcsnYn; // 당사참여금액확정여부
	private BigDecimal thcoPtciAmt; // 당사참여금액
	private BigDecimal allErnAmt; // 전체수익금액
	private BigDecimal theYearErnAmt; // 당해수익금액
	private BigDecimal baltErnAmt; // 기표수익금액
	private BigDecimal intrErnAmt; // 이자수익금액
	private String crryCd; // 통화코드
	private BigDecimal crryAmt; // 통화금액
	private String baltDt; // 기표일자
	private String expDt; // 만기일자

	/* 직원정보 */
	private String chrrEmpno; // 담당자사원번호
	private String chrrEmpnm; // 담당자사원명
	private String mngmBdcd; // 관리부점코드
	private String mngmBdcdNm; // 관리부점명
	private String dcfcEmpNo; // 결재자사원번호
	private String dcfcBdcd; // 결재자부점코드

	/* IBIMS103B 진행상태 */
	private String mtrPrgSttsDcd; // 안건진행상태코드
	private String mtrPrgSttsDcdNm; // 안건진행상태코드명

	private String wfId; // 워크플로우ID
	private String wfState; // 워크플로우 상태
	private String rtnYn; // 반송여부

	// IBIMS002B
	private String cmnsCdGrp; // 공통코드그룹
	private String cdVlNm; // 코드값명
	private String rsltCdVl; // 변환후코드ID

	private String oldCdVlId; // 올코

	// IBIMS003B
	private String empno; // 사원번호
	private String empNm; // 사원명
	private String usrDcd; // 사용자구분코드
	private String athCd; // 권한코드
	private String engEmpNm; // 영문사원명
	private String cpin; // 고객식별번호
	private String brdt; // 생년월일
	private String rnmCnfmNo; // 실명확인번호
	private String empSttsDcd; // 사원상태구분코드
	private String pwd; // 비밀번호
	private String lginPwd; // 로그인비밀번호
	private String rgstRsn; // 등록사유
	private String pwdChngDt; // 비밀번호변경일자
	private String lginPwdChngDt; // 로그인비밀번호변경일자
	private int pwdErrNbtm; // 비밀번호오류횟수
	private int lginPwdErrNbtm; // 로그인비밀번호오류횟수
	private int odsPwdErrNbtm; // ODS비밀번호오류횟수
	private String dprtNm; // 부서명
	private String bdNm; // 부점명
	private String opstDcd; // 직위구분코드
	private String clspDcd; // 직급구분코드
	private String jbgpDcd; // 직군구분코드
	private String osdtDcd; // 직책구분코드
	private String dtyDcd; // 직무구분코드
	private String empDcd; // 사원구분코드
	private String ecnyDt; // 입사일자
	private String rtrmDt; // 퇴직일자
	private String gnfdDt; // 발령일자
	private String atno; // 전화지역번호
	private String tlno; // 전화번호
	private String ptblTlno; // 휴대전화번호
	private String wncpTlno; // 사내전화번호
	private String emlAddr; // 이메일주소
	private String dy90CnnYn; // 90일접속여부
	private String cnnPmssYn; // 접속허용여부
	private String delEmpno; // 삭제사원번호

	private Boolean isLocked;

	// IBIMS103B
	private String mtrAbbrNm; // 안건약어명
	private String raRsltnDcd; // RA결의구분코드
	private String raDealDcd; // RADEAL구분코드
	private String riskRcgNo; // 리스크승인번호
	private String mainInvstTrgtNm; // 주요투자대상명
	private BigDecimal aplyExrt; // 적용환율
	private BigDecimal krwTrslPtfdAmt; // 원화환산부의금액
	private String checkItemCd; // 점검항목코드(업무구분)
	private String raBsnsZoneCd; // RA사업지역코드
	private String invstThingDcd; // 투자물건구분코드
	private String dlDprtNm1; // 거래부점명1
	private String dlDprtNm2; // 거래부점명2
	private String dlDprtNm3; // 거래부점명3
	private String hdqtCd; // 본부코드
	private String bdcd; // 부점코드
	private String dprtCd; // 부서코드
	private String ownPEno; // 심사역사번
	private String esgYn; // ESG여부
	private String esgMngDmnCd; // ESG관리영역코드
	private String esgInvstAmtCd; // ESG투자금액코드
	private String esgInvstTrgtCd; // ESG투자대상코드
	private String esgRiskInspctTrgtDcd; // ESG리스크심사대상구분코드
	private String bsnsDprtEsgGrdDcd; // 사업부서ESG등급구분코드
	private String bsnsDprtEsgGrdCmmt; // 사업부서ESG등급의견
	private String inspctDprtEsgGrdDcd; // 심사부서ESG등급구분코드
	private String inspctDprtEsgGrdCmmt; // 심사부서ESG등급의견
	private BigDecimal wrtErnAmt; // 기표수익금액(수수료수익)
	private BigDecimal rcvblErnAmt; // 미수수익금액(투자수익)
	private String mrtgOfrYn; // 담보제공여부
	private String ensrYn; // 보증여부
	private String rspsbCmplDcd; // 책임준공구분코드
	private String entpNm; // 업체명
	private String bzno; // 사업자등록번호
	private String corpNo; // 법인번호
	private String busiDptOpnn; // 사업부서의견
	private String bscAstsInptExptF; // 기초자산입력예정여부
	private String insGrdInptExptF; // 내부등급입력예정여부
	private String cncCmpnyInptExptF; // 연결회사입력예정여부
	private String cnsbMtgNo; // 협의체회의번호(협의체구분코드_결의년도_일련번호)
	private String riskInspctRsltnCcd;
	private String ownDt;
	// ----------------------------- 20240613 정희조 추가 ----------------------------//
	private String rsltnYr; // 결의년도

}
