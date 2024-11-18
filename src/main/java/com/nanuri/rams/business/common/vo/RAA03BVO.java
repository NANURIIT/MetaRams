package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 기초자산정보 Table.RAA03B VO
 * */
public class RAA03BVO {
	private String ibDealNo;				// IBDEAL번호
    private String riskInspctCcd;			// 리스크심사구분코드
    private String lstCCaseCcd;				// 부수안건구분코드
    private String itemSq;					// 항목일련번호
    private String bscAstsKndCd;			// 기초자산종류코드
    private String bscAstsCntnt;			// 기초자산내용
    private BigDecimal opnPrcValAmt;		// 시가평가금액
    private String bscAstsIsngCorpNo;		// 기초자산발행법인번호
    private String bscAstsIsngHnglCorpNm;	// 기초자산발행한글법인명
    private String invstCrncyCd;			// 투자통화코드
    private BigDecimal crncyAmt;			// 통화금액
    private BigDecimal aplcExchR;			// 적용확율
    private String rnmcno;					// 실명확인번호
    private String hndlDyTm;				// 처리일시
    private String hndlDprtCd;				// 처리부점코드
    private String hndlPEno;				// 처리자사번
    
    private String bscAstsKndCdNm;			// 기초자산종류코드명
}
