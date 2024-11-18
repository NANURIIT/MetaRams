package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AS04310SVO {
	
	@Getter
	@Setter
	public static class SearchVO{
		private String inspctCnfrncCcd		;
		private String stdYr				;
		private String inspctCnfrncSqcSq	;
		private String rsltnDtStart			;
		private String rsltnDtEnd			;
	}

	@Getter
	@Setter
	public static class DealInfo{
		private String inspctCnfrncCcd    ;
		private String inspctCnfrncCcdNm    ;
		private String inspctCnfrncSqcSq  ;
		private String rsltnDt            ;
		private String rnkNo              ;
		private String hdqtCd             ;
		private String hdqtNm             ;
		private String dprtCd             ;
		private String dprtNm             ;
		private String lstCCaseCcd        ;
		private String lstCCaseCcdNm        ;
		private String riskInspctCcd      ;
		private String riskInspctCcdNm      ;
		private String ibDealNm           ;
		private String checkItemCd        ;
		private String checkItemCdNm        ;
		private String crncyAmt           ;
		private String rcgAmt             ;
		private String invstCrncyCd       ;
		private String invstCrncyCdNm       ;
		private String invstPrdMmC        ;
		private String cnfrncNtmCndtlCntnt;
		private String rsltnRsltCd        ;
		private String rsltnRsltCdNm        ;
		private String rsltCntnt          ;
		private String sdnCndtF           ;
		private String etcCndtF           ;
		private String inspctDprtCcd      ;
		private String ownPEno            ;
		private String ownPNm             ;
		private String ibDealNo           ;
		private String mtngCcd            ;
		private String inspctPrgrsStCd    ;
		private String riskRcgNo          ;
		private String aplcExptDt         ;
		private String riskInspctRsltnCcd ;
		private String ptcpAmt            ;
		private String chrgPEno           ;
		private String chgrPNm            ;
	}
	
}
