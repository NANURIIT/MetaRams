package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 관계사정보 RAA04B Table
 * */
public class RAA04BVO {

	private String ibDealNo;				//IBDEAL번호
	private String riskInspctCcd; 			//리스크심사구분코드
	private String lstCCaseCcd; 			//부수안건구분코드
	private String itemSq;					//항목일련번호
	private String cncCmpnyClsfCd;			//연결회사구분코드
	private String isngOgnCorpNo;			//발행기관법인번호
	private String rnmcno;					//실명확인번호 
	private String mxStkhdNm;				//최대주주명
	private Date hndlDyTm;					//처리일시
	private String hndlDprtCd;				//처리부점코드
	private String hndlPEno;				//처리자사번
	private String entpHnglNm;				//한글법인명
	private String cdVlId;					//법인형태코드
	private String cdVlNm;					//법인형태코드명
	
}
