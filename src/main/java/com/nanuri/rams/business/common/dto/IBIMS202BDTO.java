package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인현금흐름기본 Table.IBIMS202B DTO
*/
public class IBIMS202BDTO {
    private String         prdtCd;                                // 상품코드
    private String         aplyDt;                                // 적용일자
    private String         aictStdrIntrtKndCd;                    // 올인코스트기준금리종류코드
    private BigDecimal     aictAddIntrt;                          // 올인코스트가산금리
    private String         stdrIntrtKndCd;                        // 기준금리종류코드
    private BigDecimal     addIntrt;                              // 가산금리
    private String         intrBnaoDcd;                           // 이자선후취구분코드
    private String         tfdLyAplyDcd;                          // 초일말일적용구분코드
    private String         intrSnnoPrcsDcd;                       // 이자단수처리구분코드
    private String         intrDnumClcMthCd;                      // 이자일수계산방법코드
    private String         hldyPrcsDcd;                           // 휴일처리구분코드
    private String         frsIntrRcveDt;                         // 최초이자수령일자
    private String         paiRdmpDcd;                            // 원리금상환구분코드
    private String         pymDtAcrdYn;                           // 납입일자일치여부
    private String         rgstDt;                                // 등록일자
    private int		       prnaRdmpFrqcMnum;                      // 원금상환주기개월수
    private int		       pttnRdmpNbtm;                          // 분할상환횟수
    private BigDecimal     eqlRdmpAmt;                            // 균등상환금액
    private Integer		   prnaDfrPrdMnum;                        // 원금거치기간개월수
    private BigDecimal     ovduIntrRt;                            // 연체이자율
    private String         ovduIntrRtDcd;                         // 연체이자율구분코드
    private BigDecimal     istmDtmRdmpAmt;                        // 할부일시상환금액
    private BigDecimal     rcvbIntrAplyIrt;                       // 미수이자적용이율
    private String         intrClcEndDeDcd;                       // 이자계산종료일구분코드
    private String         intrHdwtClcYn;                         // 이자수기계산여부
    private int     		intrRdmpFrqcMnum;                      // 이자상환주기개월수
    private Date           hndDetlDtm;                            // 조작상세일시
    private String         hndEmpno;                              // 조작사원번호
    private String         hndTmnlNo;                             // 조작단말기번호
    private String         hndTrId;                               // 조작거래id
    private String         guid;                                  // guid
    private String         mdwyRdmpYn;                            // 중도상환여부
    private Integer		   intrCngeFrqcMnum;                      // 금리변동주기개월수
    private BigDecimal     fxnIntrt;                              // 고정금리
    private String         rqsKndCd;                              // 기업여신신청종류코드
    private String         ctrcExpDt;                              // 약정만기일자
}