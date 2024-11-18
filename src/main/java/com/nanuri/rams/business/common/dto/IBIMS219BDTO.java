package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인실물담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS219B DTO
*/
public class IBIMS219BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         drcMrtgYn;                                       // 직접담보여부
    private String         ovssEvlIsttYn;                                   // 국외평가기관여부
    private String         aprsEvlIsttCd;                                   // 감정평가기관코드
    private String         crevIsttNm;                                      // 시가평가기관명
    private String         aprsDt;                                          // 감정일자
    private String         rlthMrtgKndCd;                                   // 실물담보종류코드
    private String         mrtgCtns;                                        // 담보내용
    private BigDecimal     mrtgQnt;                                         // 담보수량
    private String         aprsStdrCd;                                      // 감정기준코드
    private String         aprsCrryCd;                                      // 감정통화코드
    private BigDecimal     aprsPrc;                                         // 감정가격
    private BigDecimal     krwTrslAprsPrc;                                  // 원화환산감정가격
    private BigDecimal     mrtgRcgRto;                                      // 담보인정비율
    private BigDecimal     mrtgRto;                                         // 담보비율
    private BigDecimal     mrtgPrc;                                         // 담보가격
    private String         hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}