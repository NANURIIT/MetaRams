package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MO44010SVO {

	@Getter
	@Setter
	public static class SearchVO{
		private String stdDt;							// 기준일자
		private String eno;								// 사원번호
		private String inspctDprtCcd;					// 심사부서구분코드
		private String checked;							// 확인완료포함
	}

	@Getter
	@Setter
	public static class DealInfo{
		private String stdDt;
		private String entpNm;
		private String rprstPHnglNm;
		//private String corpRgstNo;
		private String crno;
		private String crdtAcdntOcrncDtls;
		private String ibDealNo;
		private String riskInspctCcd;
		private String lstCCaseCcd;
		private String ibDealNm;
		private String inspctDprtCcd;
		private String inspctDprtCcdNm;
		private String ownPEno;
		private String empNm;
		private String fstCnfrDt;
		private String ansAcptDt;
		private String exmntRsltCntnt;
	}

	@Getter
	@Setter
	public static class ExmntInfo{
		private String stdDt;
		private String ibDealNo;
		private String exmntRsltCntnt;
		private String riskInspctCcd;
		private String lstCCaseCcd;
		private String hndlDprtCd;
		private String hndlPEno;
	}


}
