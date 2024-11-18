package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 여신기본 Table.IBIMS401B DTO
*/
public class IBIMS401BDTO {
    private String         prdtCd;                                 // 상품코드
    private long           rgstSn;                                 // 등록일련번호
    private String         eprzCrdlLdgSttsCd;                      // 기업여신원장상태코드
    private long           rqsSn;                                  // 신청일련번호
    private String         ptxtTrOthrDscmNo;                       // 명목거래상대방식별번호
    private BigDecimal     stdrIntrt;                              // 기준금리
    private BigDecimal     addIntrt;                               // 가산금리
    private BigDecimal     totIntrt;                               // 총금리
    private String         frsMngmBdcd;                            // 최초관리부점코드
    private String         mngmBdcd;                               // 관리부점코드
    private String         prdtClsfCd;   		                   // 상품분류코드
    private String         prdtMdclCd;                    		   // 상품중분류코드
    private String         prdtLclsCd;                     		   // 상품대분류코드
    private String         actsCd;                                 // 계정과목코드
    private String         eprzCrdlAcctJobCd;                      // 기업여신회계업무코드
    private String         eprzCrdlAcctUnJobCd;                    // 기업여신회계단위업무코드
    private String         eprzCrdlAcctTrCd;                       // 기업여신회계거래코드
    private String         eprzCrdlApvlDt;                         // 기업여신승인일자
    private BigDecimal     eprzCrdlApvlAmt;                        // 기업여신승인금액
    private String         crryCd;                                 // 통화코드
    private String         eprzCrdlLoanPrdDcd;                     // 기업여신대출기간구분코드
    private String         ctrcDt;                                 // 약정일자
    private String         ctrcExpDt;                              // 약정만기일자
    private String         stdrIntrtKndCd;                         // 기준금리종류코드
    private BigDecimal     eprzCrdlCtrcAmt;                        // 기업여신약정금액
    private String         debtCrtfIssDt;                          // 부채증명서발급일자
    private BigDecimal     prpmtAmt;                               // 가지급금액
    private String         eprzCrdlIndvLmtDcd;                     // 기업여신개별한도구분코드
    private String         eprzCrdlIntrRcvnMthCd;                  // 기업여신이자수취방법코드
    private String         eprzCrdlIntrBnaoDcd;                    // 기업여신이자선후취구분코드
    private String         eprzCrdlTfdLyAplyDcd;                   // 기업여신초일말일적용구분코드
    private String         eprzCrdlIntrSnnoPrcsDcd;                // 기업여신이자단수처리구분코드
    private String         eprzCrdlPaiRdmpDcd;                     // 기업여신원리금상환구분코드
    private int            prnaRdmpFrqcMnum;                       // 원금상환주기개월수
    private int            intrRdmpFrqcMnum;                       // 이자상환주기개월수
    private int            prnaDfrPrdMnum;                         // 원금거치기간개월수
    private int            tlmtPrfLoseFrqcNum;                     // 기한이익상실주기수
    private String         tlmtPrfLoseDt;                          // 기한이익상실일자
    private String         tlmtPrfRsrrDt;                          // 기한이익부활일자
    private String         eprzCrdlOrtnFndCd;                      // 기업여신운용펀드코드
    private String         eprzCrdlCtrtNo;                         // 기업여신계약번호
    private String         pfLoanYn;                               // pf대출여부
    private String         undwFnnYn;                              // 인수금융여부
    private String         invIdtrtSmitYn;                         // 투자확약서제출여부
    private String         trgYn;                                  // 트리거여부
    private String         trgCndCtns;                             // 트리거조건내용
    private String         invIdtrtSmitDt;                         // 투자확약서제출일자
    private String         chrrEmpno;                              // 담당자사원번호
    private String         subChrrEmpno;                           // 서브담당자사원번호
    private String         edDt;                                   // 종결일자
    private String         eprzCrdlCtrtEndRsnCd;                   // 기업여신계약종료사유코드
    private String         eprzCrdlCtrtEndRsnCtns;                 // 기업여신계약종료사유내용
    private String         trchAplyYn;                             // 트렌치적용여부
    private String         bdbtRsvsRcknStdrLclsCd;                 // 대손준비금산정기준대분류코드
    private String         bdbtRsvsRcknStdrMdclCd;                 // 대손준비금산정기준중분류코드
    private String         bdbtRsvsRcknStdrSclsCd;                 // 대손준비금산정기준소분류코드
    private BigDecimal     bdbtRsvsRcknStdrRto;                    // 대손준비금산정기준비율
    private BigDecimal     eprzCrdlCtrtAmt;                        // 기업여신계약금액
    private BigDecimal     thcoPtciAmt;                            // 당사참여금액
    private String         eprzCrdlIntrDnumClcMthCd;               // 기업여신이자일수계산방법코드
    private String         eprzCrdlHldyPrcsDcd;                    // 기업여신휴일처리구분코드
    private String         cclcDt;                                 // 해지일자
    private String         eprzCrdlCclcRsnCd;                      // 기업여신해지사유코드
    private String         cclcRsnCtns;                            // 해지사유내용
    private String         eprzCrdlWeekMrtgKndCd;                  // 기업여신주담보종류코드
    private BigDecimal     ovduIntrRt;                             // 연체이자율
    private String         eprzCrdlOvduIntrRtDcd;                  // 기업여신연체이자율구분코드
    private String         trrcDt;                                 // 이수관일자
    private String         eprzCrdlIntrClcEndDeDcd;                // 기업여신이자계산종료일구분코드
    private String         intrHdwtClcYn;                          // 이자수기계산여부
    private String         invJdgmComtNo;                          // 투자심사위원회번호
    private String         bdbtAlwcRcknLmtStdrDcd;                 // 대손충당금산정한도기준구분코드
    private String         ctrcCclcDcd;                            // 약정해지구분코드
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid
    private IBIMS402BDTO   ibims402BDTO;                           // 여신실행정보
    private IBIMS348BDTO   ibims348BDTO;                           // 딜승인수수료스케줄기본
}