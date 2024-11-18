package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class AS04210SVO {
	
	@Getter
	@Setter
	@ToString
	public static class SearchVO{
		private String inspctCnfrncCcd;						// 심사협의구분코드
		private String stdYr;								// 결의년도
		private String inspctCnfrncSqcSq;					// 회차
		private String rsltnDt;								// 결의일자
		private String chkF;								// 체크
		private String eno;									// 사번
		private String empNm;								// 사원명	
		private String rnkNo;								// 순위번호	
		private String ibDealNo;							// IBDEAL번호
		private String riskInspctCcd;						// 리스크심사구분코드
		private String lstCCaseCcd;							// 부수안건구분코드
	}
	
	@Getter
	@Setter
	public static class CASEInfo{
		private String chk;									// 심사협의구분코드
		private String inspctCnfrncCcd;						// 심사협의구분코드
		private String inspctCnfrncCcdNm;					// 심사협의구분코드
		private String stdYr;								// 심사협의구분코드
		private String inspctCnfrncSqcSq;					// 심사협의구분코드
		private String rsltnDt;								// 심사협의구분코드
		private String rsltnTm;								// 심사협의구분코드
		private String rgstF;								// 심사협의구분코드
		private String rnkNo;								// 심사협의구분코드
		private String rsltnRsltCd;							// 심사협의구분코드
		private String rsltnRsltCdNm;						// 심사협의구분코드
		private String sdnCndtF;							// 심사협의구분코드
		private String etcCndtF;							// 심사협의구분코드
		private String ibDealNo;							// 심사협의구분코드
		private String riskInspctCcd;						// 결의년도
		private String riskInspctCcdNm;						// 결의년도
		private String lstCCaseCcd;							// 회차
		private String lstCCaseCcdNm;						// 회차
		private String ibDealNm;							// 결의일자
		private String hdqtCd;								// 체크
		private String hdqtNm;								// 사번
		private String dprtCd;								// 사원명
		private String dprtNm;								// 사원명
		private String chrgPEno;							// 사원명
		private String chrgPNm;								// 사원명
		private String ownPEno;								// 사원명
		private String ownPNm;								// 사원명
		private String invstCrncyCd;						// 사원명
		private String invstCrncyCdNm;						// 사원명
		private String crncyAmt;							// 사원명
		private String ptcpAmt;								// 사원명
		private String rcgAmt;								// 사원명
		private String inspctPrgrsStCd;						// 사원명
		private String prgrsStNm;							// 사원명
		private String fnshF;								// 사원명
		private String cnfrncFnshF;							// 사원명
		private String rprF;								// 사원명
	}
	
	@Getter
	@Setter
	public static class MMBRInfo{
		private String chk;									// 심사협의구분코드
		private String inspctCnfrncCcd;						// 심사협의구분코드
		private String inspctCnfrncCcdNm;					// 심사협의구분코드
		private String stdYr;								// 심사협의구분코드
		private String inspctCnfrncSqcSq;					// 심사협의구분코드
		private String rnkNo;								// 심사협의구분코드
		private String atdncPEno;							// 심사협의구분코드
		private String atdncP;								// 심사협의구분코드
		private String atdncPrxyEno;						// 심사협의구분코드
		private String atdncPrxyNm;							// 심사협의구분코드
		private String cmmttMmbrCcd;						// 심사협의구분코드
		private String aprvOpstnCcd;						// 심사협의구분코드
		private String aprvOpstnCcdNm;						// 심사협의구분코드
		private String rvwCmmtCntnt;						// 심사협의구분코드
		private String realAtdncF;							// 심사협의구분코드
		private String cnfrPEno;							// 심사협의구분코드
		private String cnfrPNm;								// 심사협의구분코드
		private String cnfrDyTm;							// 심사협의구분코드
		private String rgstDt;								// 심사협의구분코드
		private String inqRnk;								// 심사협의구분코드
	}
	
	@Getter
	@Setter
	public static class IBDEALInfo{
		private String inspctCnfrncCcd;						// 심사협의구분코드
		private String inspctCnfrncCcdNm;					// 심사협의구분코드
		private String stdYr;								// 심사협의구분코드
		private String inspctCnfrncSqcSq;					// 심사협의구분코드
		private String rnkNo;								// 심사협의구분코드
		private String sq;									// 심사협의구분코드
		private String rsltnRsltCd;							// 심사협의구분코드
		private String rsltnRsltCdNm;						// 심사협의구분코드
		private String sdnCndtF;							// 심사협의구분코드
		private String etcCndtF;							// 심사협의구분코드
		private String rcgAmt;								// 사원명
		private String rsltCntnt;							// 사원명
		private String ibDealNo;							// 심사협의구분코드
		private String riskInspctCcd;						// 결의년도
		private String riskInspctCcdNm;						// 결의년도
		private String lstCCaseCcd;							// 회차
		private String lstCCaseCcdNm;						// 회차
		private String ibDealNm;							// 결의일자
		private String inspctPrgrsStCd;						// 사원명
		private String inspctPrgrsStCdNm;					// 사원명
		private String invstCrncyCd;						// 사원명
		private String invstCrncyCdNm;						// 사원명
		private String crncyAmt;							// 사원명
		private String ptcpAmt;								// 사원명
		private String riskRcgNo;							// 사원명
		private String cnfrncNtmCndtlCntnt;					// 사원명
		
		private String cnclRsnCntnt;						// 사원명
		private String hndlDprtCd;							// 사원명
		private String hndlPEno;							// 사원명
	}
	
	
}
