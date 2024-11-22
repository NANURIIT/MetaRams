package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TB04020SVO {
	String rgstDtStart;
	String rgstDtEnd;
	String dprtCd;
	String dprtNm;
	String crryCd;
	String dealNo;
	String dbcd;

	@Getter
	@Setter
	public static class checkDealDetails {
		private String ibDealNo;			// DEAL번호
		private String dscDt;				// DSC일자
		private String ibDealNm;			// DEAL명
		private String ptcpAmt;				// 참여금액
		private String wrtDt;				// 기표일(예정)
		private String mtrtDt;				// 만기일(예정)
		private String hdqtCd;				// 본부
		private String dprtCd;				// 부서
		private String chrgPEno;			// 직원
		private String coprtnTypCd;			// 협업유형
		private String tlErnAmt;			// 전체수익
		private String rcvblErnAmt;			// 수수료수익
		private String wrtErnAmt;			// 투자수익
		private String entpRnm;				// 업체명
		private String crdtGrdCd;			// 신용등급
		private String gdsDvd1Nm;			// 상품1
		private String gdsDvd2Nm;			// 상품2
		private String gdsDvd3Nm;			// 상품3
		private String gdsDvd4Nm;			// 상품4
		private String invstNtnCd;			// 투자국가
		private String invstCrryCd;		// 투자통화
		private BigDecimal crryAmt;			// 통화금액
		private String riskInspctCcd;		// 신규/재부의 정보
		private String riskInspctCcdNm;		// 신규/재부의 정보명
		private String lstccaseCcd;			// 부수안건구분코드
		private String lstccaseCcdNm;		// 부수안건구분코드명
		private String inspctPrgrsStCd;		// 심사진행상태코드
		private String inspctPrgrsStCdNm;	// 심사진행상태코드명
		private String ownPEno;				// 심사역
		private String ownPNm;				// 심사역
		private String fstRgstDt;			// 접수배정일
		private String riskInspctRsltnCcd;	// 접수배정일
	}
}
