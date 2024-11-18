package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인기타담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS218B DTO
*/
public class IBIMS218BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         etcMrtgTpCd;                                     // 기타담보유형코드
    private String         etcMrtgKndCd;                                    // 기타담보종류코드
    private String         mrtgCdCtns;                                      // 담보코드내용
    private String         mrtgCtns;                                        // 담보내용
    private String         etcMrtgGrdCtns;                                  // 기타담보등급내용
    private BigDecimal     mrtgQnt;                                         // 담보수량
    private BigDecimal     mrtgUnpr;                                        // 담보단가
    private BigDecimal     mrtgAmt;                                         // 담보금액
    private BigDecimal     mrtgRto;                                         // 담보비율
    private BigDecimal     avblMrtgPrc;                                     // 가용담보가격
    private String         etcMrtgAcqMthCd;                                 // 기타담보취득방법코드
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}