package com.nanuri.rams.business.common.vo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산 사후관리
 * */
public class PM22010SVO{

	private String cnctOption;				// 안건연결 여부
	private String ibDealNo;				// IBDEAL번호
	private String ibDealNm;				// IBDEAL명 - 안건명
	private String riskInspctCcd;			// 리스크심사구분코드
	private String riskInspctCcdNm;			// 리스크심사구분코드명 - 신규/재부의정보
	private String lstCCaseCcd;				// 부수안건구분코드
	private String lstCCaseCcdNm;			// 부수안건구분코드명 - 부수안건정보
	private String dprtCd;					// 부서코드
	private String dprtCdNm;				// 부서명
	private String chrgpEno;				// 심사역
	private String empNm;					// 심사역이름
	private String inspctPrgrsStCd;			// 진행상태	
	private String inspctPrgrsStCdNm;		// 진행상태명

}
