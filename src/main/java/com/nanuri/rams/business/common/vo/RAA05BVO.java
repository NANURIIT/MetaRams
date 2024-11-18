package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 내부등급정보 Table.RAA05B VO
 * */
public class RAA05BVO {

	private String ibDealNo;				// IBDEAL번호
	private String riskInspctCcd;			// 리스크심사구분코드
	private String lstCCaseCcd; 			// 부수안건구분코드
	private String itemSq;					// 항목일련번호	
	private String insGrdTrgtF;		   		// 내부등급대상여부
	private String spcltFncTrgtF;			// 특수금융대상여부
	private String spcltFncMngNo;			// 특수금융관리번호
	private String outsCrdtGrdCcd;			// 외부신용등급구분코드(SL내부등급)
	private String brrwrCorpNo;				// 차주법인번호
	private String insCrdtGrdCcd;			// 내부신용등급구분코드
	private String rnmcno;					// 실명확인번호 
	private Date hndlDyTm;					// 처리일시
	private String hndlDprtCd;				// 처리부점코드
	private String hndlPEno;				// 처리자사번
	private String entpHnglNm;				// 한글법인명

	private String insCrdtGrdCcd2;			//sl비대상 내부등급
	
	private String outsCrdtGrdCcdNm;		//외부신용등급구분코드명(SL내부등급)
	private String insCrdtGrdCcdNm;			//내부신용등급구분코드명
}