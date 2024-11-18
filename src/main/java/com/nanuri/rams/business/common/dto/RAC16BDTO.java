package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 기업여신승인기본 table(RAC16BDTO) DTO */
public class RAC16BDTO {
    private String     ibDealNo;                      // IB관리번호
    private String     riskInspctCcd;                 // 리스크심사구분코드, TODO: 일련번호
    private String     lstCCaseCcd;                   // 부수안건구분코드, TODO: 일련번호
    private int        sq;                            // 일련번호
    private String     prdtCd;                        // 상품코드
    private String     prdtNm;                        // 상품명
    private String     eprzCrdlRqsKndCd;              // 기업여신신청종류코드
    private String     eprzCrdlPrgSttsCd;             // 기업여신진행상태코드
    private BigDecimal rqsSn;                         // 신청일련번호
    private String     ptxtTrOthrDscmNo;              // 명목거래상대방식별번호
    private String     frsMngmBdcd;                   // 최초관리부점코드
    private String     mngmBdcd;                      // 관리부점코드
    private String     eprzCrdlPrdtClsfCd;            // 기업여신상품분류코드
    private String     eprzCrdlPrdtMdclCd;            // 기업여신상품중분류코드
    private String     eprzCrdlPrdtLclsCd;            // 기업여신상품대분류코드
    private String     actsCd;                        // 계정과목코드
    private String     eprzCrdlAcctJobCd;             // 기업여신회계업무코드
    private String     eprzCrdlAcctUnJobCd;           // 기업여신회계단위업무코드
    private String     eprzCrdlAcctTrCd;              // 기업여신회계거래코드
    private BigDecimal eprzCrdlApvlAmt;               // 기업여신승인금액
    private String     crryCd;                        // 통화코드
    private String     apvlDt;                        // 승인일자
    private String     expDt;                         // 만기일자
    private String     eprzCrdlIndvLmtDcd;            // 기업여신개별한도구분코드
    private String     eprzCrdlIntrRcvnMthCd;         // 기업여신이자수취방법코드
    private String     eprzCrdlIntrBnaoDcd;           // 기업여신이자선후취구분코드
    private String     eprzCrdlTfdLyAplyDcd;          // 기업여신초일말일적용구분코드
    private String     eprzCrdlIntrSnnoPrcsDcd;       // 기업여신이자단수처리구분코드
    private String     eprzCrdlPaiRdmpDcd;            // 기업여신원리금상환구분코드
    private BigDecimal prnaRdmpFrqcMnum;              // 원금상환주기개월수
    private BigDecimal intrRdmpFrqcMnum;              // 이자상환주기개월수
    private BigDecimal prnaDfrPrdMnum;                // 원금거치기간개월수
    private String     eprzCrdlOrtnFndCd;             // 기업여신운용펀드코드
    private String     eprzCrdlCtrtNo;                // 기업여신계약번호
    private String     pfLoanYn;                      // PF대출여부
    private String     undwFnnYn;                     // 인수금융여부
    private String     invIdtrtSmitYn;                // 투자확약서제출여부
    private String     trgYn;                         // 트리거여부
    private String     trgCndCtns;                    // 트리거조건내용
    private String     invIdtrtSmitDt;                // 투자확약서제출일자
    private String     chrrEmpno;                     // 담당자사원번호
    private String     subChrrEmpno;                  // 서브담당자사원번호
    private String     eprzCrdlDcrbAthDcd;            // 기업여신전결권한구분코드
    private String     edDt;                          // 종결일자
    private String     eprzCrdlCtrtEndRsnCd;          // 기업여신계약종료사유코드
    private String     eprzCrdlCtrtEndRsnCtns;        // 기업여신계약종료사유내용
    private String     trchAplyYn;                    // 트렌치적용여부
    private String     bdbtRsvsRcknStdrLclsCd;        // 대손준비금산정기준대분류코드
    private String     bdbtRsvsRcknStdrMdclCd;        // 대손준비금산정기준중분류코드
    private String     bdbtRsvsRcknStdrSclsCd;        // 대손준비금산정기준소분류코드
    private BigDecimal bdbtRsvsRcknStdrRto;           // 대손준비금산정기준비율
    private BigDecimal eprzCrdlCtrtAmt;               // 기업여신계약금액
    private BigDecimal eprzCrdlInvAmt;                // 기업여신투자금액
    private BigDecimal thcoPtciAmt;                   // 당사참여금액
    private BigDecimal prdtTotAmt;                    // 상품총금액
    private String     eprzCrdlIntrDnumClcMthCd;      // 기업여신이자일수계산방법코드
    private String     eprzCrdlHldyPrcsDcd;           // 기업여신휴일처리구분코드
    private String     eprzCrdlStdrIntrtKndCd;        // 기업여신기준금리종류코드
    private BigDecimal fxnIntrt;                      // 고정금리
    private BigDecimal addIntrt;                      // 가산금리
    private BigDecimal intrtCngeFrqcMnum;             // 금리변동주기개월수
    private BigDecimal hdwtEvlAmt;                    // 수기평가금액
    private String     eprzCrdlWeekMrtgKndCd;         // 기업여신주담보종류코드
    private BigDecimal ovduIntrRt;                    // 연체이자율
    private String     eprzCrdlOvduIntrRtDcd;         // 기업여신연체이자율구분코드
    private BigDecimal totRdmpTmrd;                   // 총상환회차
    private BigDecimal eprzCrdlEqlRdmpAmt;            // 기업여신균등상환금액
    private BigDecimal istmDtmRdmpAmt;                // 할부일시상환금액
    private BigDecimal rcvbIntrAplyIrt;               // 미수이자적용이율
    private BigDecimal eprzCrdlIntrErnAmt;            // 기업여신이자수익금액
    private BigDecimal fndsPrcrCtAmt;                 // 자금조달비용금액
    private String     eprzCrdlIntrClcEndDeDcd;       // 기업여신이자계산종료일구분코드
    private String     intrHdwtClcYn;                 // 이자수기계산여부
    private String     eprzCrdlGrdCd;                 // 기업여신등급코드
    private String     eprzCrdlDshnRtGrdCd;           // 기업여신부도율등급코드
    private String     sppiSfcYn;                     // SPPI충족여부
    private String     eprzCrdlOrtnPrdtClsfCd;        // 기업여신운용상품분류코드
    private String     eprzCrdlIntrtExpDcd;           // 기업여신금리만기구분코드
    private BigDecimal intrtRestFrqcMnum;             // 금리재설정주기개월수
    private String     invJdgmComtNo;                 // 투자심사위원회번호
    private int        fileAttSq;                     // 파일첨부일련번호
    private String     fstHndlPEno;                   // 최초등록자사번
    private Date       fstHndlDyTm;                   // 최초등록일자
    private String     lstHndlPEno;                   // 최종변경자사번
    private Date       lstHndlDyTm;                   // 최종변경일시
    private String     earlyRepayYn;                  // 중도상환여부
}