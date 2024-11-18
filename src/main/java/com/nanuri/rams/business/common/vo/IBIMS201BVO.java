package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 딜승인기본 table(IBIMS201BDTO) VO
 */
public class IBIMS201BVO extends IBIMS201BDTO {
    private String         pageDcd;

    private String        sumRcgAmt;                 	        		   // 딜승인금액합계
    private String     	  entpHnglNm;                    				   // 업체한글명
    private String     	  cnsbDcd;                    					   // 전결협의체
    private String        chrrEmpnm;                                       // 담당사원명
    private String        empNm;                                       	   // 담당자명
    private String        rgstEndDt;									   // 등록종료일자
    private String        apvlEndDt;									   // 승인종료일자
    private String        prgSttsCdNm;									   // 진행상태코드명
    private String        prdtLclsCdNm;									   // 기업여신상품대분류코드
    private String        prdtMdclCdNm;									   // 기업여신상품중분류코드
    private String        prdtClsfCdNm;									   // 기업여신상품분류코드
    private String        ibPrdtClsfCdNm;								   // ib상품분류코드
    
    private String dprtNm;   			// 부서명
    private String empNm2;   			// 담당자명
	private String bzepName; 			// 거래상대방명
	private String prgSttsNm; 			// 진행상태명
	private BigDecimal dealExcAmt; 		/* 투자금액 */
	private BigDecimal dealExcBlce;		/* 투자잔액 */
	
	private String ctrcDt1;				// 승인일자1
	private String ctrcDt2;				// 승인일자2
	
}