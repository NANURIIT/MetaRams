package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA02BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DS01030SVO extends RAA02BDTO{
	
	@Getter
	@Setter
	public static class Parameters {
			
		private String start			  			  ;				// 조회시작날짜 
		private String end				  			  ;				// 조회종료날짜
		private String stdYr			  			  ;				// 기준년도
		private String rsltnDt						  ;             // 기준일자
		private String inspctDprtCcd	  			  ;				// 심사부서코드
		
		private String inspctDprtCcdNm	  			  ;				// 심사부서
		private String ownPNm	  		  			  ;				// 사원명
		private String riskMngCmmtt		  			  ;				// 리스크관리위원회
		private String riskInspctCnfrnc	  			  ;				// 리스크심사협의회	
		private String riskInspctFldWrkCnfrnc		  ;				// 리스크심사실무협의회
		private String ownPCnfrnc		  			  ;				// 심사역협의회
		private String wmGdsCnfrnc		  			  ;				// WM상품협의회
		private String crdtCnfrnc		  			  ;				// 신용공여실무협의회
		private String udwrtCnfrnc		  			  ;				// 인수실무협의회
		private String total	  		  			  ;				// 합계
	}
	

}
