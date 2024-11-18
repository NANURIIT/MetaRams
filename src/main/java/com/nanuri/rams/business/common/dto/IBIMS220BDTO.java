package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인이해관계자기본
*/
public class IBIMS220BDTO {
    private String         prdtCd;                                   		// 상품코드
    private BigDecimal     trOthrSn;                                      	// 거래상대방일련번호
    private String         trOthrDscmNo;                                    // 거래상대방식별번호
    private String         itrRelrChrCd;                                    // 이해관계자성격코드
    private String         itrRelrShpCd;                                    // 이해관계자형태코드
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
    
}