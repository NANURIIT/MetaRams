package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인부동산담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS214B DTO
*/
public class IBIMS214BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         drcMrtgYn;                                       // 직접담보여부
    private String         ovssMrtgYn;                                      // 국외담보여부
    private String         aprsMthCd;                                       // 감정방법코드(감정구분코드)
    private String         aprsEvlIsttCd;                                   // 감정평가기관코드
    private String         crevIsttNm;                                      // 시가평가기관명
    private String         crevStdrCd;                                      // 시가평가기준코드
    private String         aprsPrpsCd;                                      // 감정목적코드
    private String         aprsDt;                                          // 감정일자
    private String         lctpAddr;                                        // 소재지주소
    private String         rlesSqmsCtns;                                    // 부동산면적내용
    private String         aprsCrryCd;                                      // 감정통화코드
    private BigDecimal     aprsPrc;                                         // 감정가격
    private BigDecimal     krwTrslAprsPrc;                                  // 원화환산감정가격
    private BigDecimal     mrtgRcgRto;                                      // 담보인정비율
    private BigDecimal     mrtgRto;                                         // 담보비율
    private BigDecimal     mrtgPrc;                                         // 담보가격
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}