package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인보증서담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS217B DTO
*/
public class IBIMS217BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         grteIsttDcd;                                     // 보증기관구분코드
    private String         grteIsttCd;                                      // 보증기관코드
    private String         grteIsttNm;                                      // 보증기관명
    private String         lgrteNm;                                         // 보증서명
    private String         grteCrryCd;                                      // 보증통화코드
    private BigDecimal     grteAmt;                                         // 보증금액
    private String         grteExprDt;                                      // 보증만료일자
    private String         mrtgGrteCtns;                                    // 담보보증내용
    private BigDecimal     mrtgRcgRto;                                      // 담보인정비율
    private BigDecimal     mrtgPrc;                                         // 담보가격
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}