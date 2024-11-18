package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인동산담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS215B DTO
*/
public class IBIMS215BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         mrtgCtns;                                        // 담보내용
    private String         mvppMrtgKndCd;                                   // 동산담보종류코드
    private String         aprsMthCd;                                       // 감정방법코드
    private String         aprsDt;                                          // 감정일자
    private String         aprsEvlIsttCd;                                   // 감정평가기관코드
    private String         opprPrsmFdtnCtns;                                // 시가추정근거내용
    private BigDecimal     aprsPrc;                                         // 감정가격
    private String         mrtgAcqMthCd;                                    // 담보취득방법코드
    private BigDecimal     mrtgRto;                                         // 담보비율
    private BigDecimal     mrtgPrc;                                         // 담보가격
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}