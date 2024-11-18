package com.nanuri.rams.business.common.dto;


import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 담보정보 Table.RAA06B DTO
 * */
public class RAA06BDTO {
	private String     ibDealNo;				//IBDEAL번호
	private String 	   riskInspctCcd;			//리스크심사구분코드
	private String 	   lstCCaseCcd; 			//부수안건구분코드
	private int 	   itemSq;					//항목일련번호	
	private String	   mrtgKndCcd;				//담보종류구분코드	
	private String 	   mrtgRsnCntnt;			//담보사유내용
	private BigDecimal mrtgValAmt;				//담보평가금액
	private String	   rgtRnkCcd;				//권리순위구분코드
	private String 	   mrtgDtlsCcd;				//담보상세구분코드
	private String 	   mrtgAcqstStmCcd;			//담보취득방식구분코드
	private String 	   mrtgAcqstDtlsCcd;		//담보취득상세구분코드
	private String	   invstCrncyCd;			//투자통화코드
	private BigDecimal crncyAmt;				//통화금액
	private BigDecimal aplcExchR;				//적용환율
	private Date	   hndlDyTm;				//처리일시
	private String	   hndlDprtCd;				//처리부점코드
	private String	   hndlPEno;				//처리자사번


}
