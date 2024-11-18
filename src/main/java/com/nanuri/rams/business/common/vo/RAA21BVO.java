package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
/*
 * 협의체회차정보 Table.RAA21B VO
 * */
public class RAA21BVO {
	
	@Getter
	@Setter
	public static class AS04110SVO{
		private String inspctCnfrncCcd;							// 심사협의구분코드
		private String stdYr;									// 결의년도
		private String inspctCnfrncSqcSq;						// 회차
		private String rsltnDt;									// 결의일자
		
		// 기본정보
		private String rsltnTm;									// 결의시간
		private String rgstF;									// 등록여부
		private String inspctPrgrsStCd;							// 심사진행상태코드
		private String inspctPrgrsStCdNm;						// 심사진행상태코드명
		private String rnkNo;									// 조회순위
		
		// 위원정보
		private String chk;										// 체크
		private String atdncPEno;								// 참석자사번
		private String atdncP;									// 참석자
		private String atdncPrxyEno;							// 참석대리인사번
		private String atdncPrxyNm;								// 참석대리인명
		private String cmmttMmbrCcd;							// 위원회멤버구분코드
		private String inqRnk;									// 조회순위
		
	}
	
	@Getter
	@Setter
	public static class CASEVO{
		// 안건정보
		private String chk				;		// 체크
		private String inspctCnfrncCcd  ;		// 심사협의구분코드
		private String stdYr            ;		// 기준년도
		private String inspctCnfrncSqcSq;		// 심사협의회차일련번호
		private String rnkNo            ;		// 순위번호
		private String sq               ;		// 일련번호
		private String ibDealNo         ;		// IBDEAL번호
		private String ibDealNm         ;		// IBDEAL명
		private String riskInspctCcd    ;		// 리스크심사구분코드
		private String riskInspctCcdNm  ;		// 리스크심사구분코드명
		private String lstCCaseCcd      ;		// 부수안건구분코드
		private String lstCCaseCcdNm    ;		// 부수안건구분코드명
		private String hdqtCd           ;		// 본부코드
		private String hdqtNm           ;		// 본부명
		private String dprtCd           ;		// 부점코드
		private String dprtNm           ;		// 부점명
		private String chrgPEno         ;		// 담당자사번
		private String chrgPNm          ;		// 담당자명
		private String inspctDprtCcd	;		// 심사부서구분코드
		private String inspctDprtNm		;		// 심사부서구분명
		private String ownPEno          ;		// 소유자사번(담당심사역)
		private String ownPNm           ;		// 소유자명(담당심사역)
		private String inspctPrgrsStCd  ;		// 심사진행상태코드
		private String inspctPrgrsStNm	;		// 심사진행상태코드명
		private String rsltnDt			;		// 결의일자
	}
	
}
