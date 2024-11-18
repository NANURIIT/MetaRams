package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 기타투자정보 Table.IBIMS405B DTO
*/
public class IBIMS405BDTO {
    private String         prdtCd;                                 // 상품코드
    private int            trSn;                                   // 거래일련번호
    private BigDecimal     excSn;                                  // 실행일련번호
    private String         etprCrdtGrntTrKindCd;                   // 거래종류코드
    private String         nsFndCd;                                // 고유자산펀드코드
    private String         synsCd;                                 // 적용코드
    private String         holdPrpsDcd;                            // 보유목적구분코드
    private String         ippDcd;                                 // 입출구분코드
    private BigDecimal     trQnt;                                  // 거래수량
    private BigDecimal     trUnpr;                                 // 거래단가
    private BigDecimal     trAmt;                                  // 거래금액
    private BigDecimal     trtx;                                   // 거래세
    private BigDecimal     fee;                                    // 수수료
    private BigDecimal     excalAmt;                               // 정산금액
    private String         trDt;                                   // 거래일자
    private String         stlDt;                                  // 결제일자
    private String         opntNsFndCd;                            // 상대고유자산펀드코드
    private BigDecimal     opntTrSn;                               // 상대거래일련번호
    private String         xtnlIsttCd;                             // 외부기관코드
    private String         sctyAcno;                               // 증권계좌번호
    private BigDecimal     fndsIstrSn;                             // 자금지시일련번호
    private String         rqsEmpno;                               // 신청사원번호
    private String         apvlYn;                                 // 승인여부
    private String         cnclYn;                                 // 취소여부
    private String         rfnDt;                                  // 환불일자
    private BigDecimal     alctQnt;                                // 배정수량
    private BigDecimal     rfnAmt;                                 // 환불금액
    private BigDecimal     rfnGoldKrwFndsIstrSn;                   // 환불금원화자금지시일련번호
    private String         sttmNo;                                 // 전표번호
    private String         rfnSttmNo;                              // 환불전표번호
    private String         rfnCnclYn;                              // 환불취소여부
    private String         stlAcno;                                // 결제계좌번호
    private String         stlXtnlIsttCd;                          // 결제외부기관코드
    private String         lstDt;                                  // 상장일자
    private String         bntpSpacYn;                             // 채권형spac여부
    private String         trDptCd;                                // 거래부서코드
    private BigDecimal     trdeExrt;                               // 매매환율
    private BigDecimal     trslAmt;                                // 환산금액
    private BigDecimal     prfdCorpIntx;                           // 선급법인세
    private BigDecimal     wholIssuShqt;                           // 전체발행좌수
    private BigDecimal     hldgShqt;                               // 보유좌수
    private BigDecimal     qotaRt;                                 // 지분율
    private BigDecimal     evlPflsAmt;                             // 평가손익금액
    private BigDecimal     tradPflsAmt;                            // 매매손익금액
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}