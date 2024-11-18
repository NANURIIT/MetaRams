package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 기초자산정보 table(RAA03BDTO) DTO */
public class RAA03BDTO {
    private String 	   ibDealNo;				// IBDEAL번호
    private String 	   riskInspctCcd;			// 리스크심사구분코드
    private String 	   lstCCaseCcd;				// 부수안건구분코드
    private int    	   itemSq;					// 항목일련번호
    
    private String 	   bscAstsKndCd;			// 기초자산종류코드
    private String 	   bscAstsCntnt;			// 기초자산내용
    private BigDecimal opnPrcValAmt;			// 시가평가금액
    private String 	   bscAstsIsngCorpNo;		// 기초자산발행법인번호
    private String 	   invstCrncyCd;			// 투자통화코드
    private BigDecimal crncyAmt;				// 통화금액
    private BigDecimal aplcExchR;				// 적용환율
    private String 	   rnmcno;					// 실명확인번호

    private Date   	   hndlDyTm;				// 처리일시
    private String     hndlDprtCd;				// 처리부점코드
    private String     hndlPEno;				// 처리자사번
    
}
