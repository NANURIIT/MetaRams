package com.nanuri.rams.business.common.vo;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 * 사후관리 현황보고
 * */
public class PM22110SVO {
	private String ibDealNo;				// IBDEAL번호
	private String ibDealNm;				// IBDEAL명
	
	private String riskInspctCcd;			// 리스크심사구분코드
	private String lstCCaseCcd;				// 부수안건구분코드
	private String raDealCcd;				// RADEAL구분코드
	
	private String riskRcgNo;				// 리스크승인번호
	
	private String dprtCd;					// 부점코드
	private String dprtNm;					// 부점명
	
	private String chrgPEno;				// 담당자사번
	private String chrgPEnoNm;				// 담당자이름
	
	private String fncGdsDvdCd; 			// 금융상품분류코드
	private String fncGdsDvdCdNm;			// 금융상품분류코드명
	
	private String inspctDprtCcd;			// 심사부서구분코드
	private String inspctDprtCcdNm;			// 심사부서구분코드명
	
	private String ownPEno;					// 소유자사번 - 심사역
	private String ownPEnoNm;				// 소유자명 - 심사역이름
	
	private String rsltnCnfrncCcd;			// 결의협의회구분코드
	private String rsltnCnfrncCcdNm;		// 결의협의회구분코드명
	
	private String invstAstsNm;				// 투자자산명
	
	private String astsQtyDvdCd;			// 자산건전성분류코드
	private String astsQtyDvdCdNm;			// 자산건전성분류코드명
	
	private String riskInspctMngSttsCd;		// 리스크심사관리단계코드
	private String riskInspctMngSttsCdNm;	// 리스크심사관리단계코드명
	
	private String ctrtStrtDt;				// 계약시작일자
	
	private String krwRa;					// 원화잔액

	/* 모니터링 정보*/
	private String caseMntrCntnt;                              // 안건모니터링내용
	private String caseMntrDtlsCntnt;                          // 안건모니터링상세내용
	private String mainSttn;                                   // 주요현황
	private String astsOutln;                                  // 자산개요
	private String wrkngSttn;                                  // 운용현황
	private String prgrsLps1;                                  // 진행경과1
	private String prgrsLps2;                                  // 진행경과2
	private String prgrsLps3;                                  // 진행경과3

}
