package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS348BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 딜승인수수료스케줄기본 table(IBIMS348BDTO) VO
 */
public class IBIMS348BVO extends IBIMS348BDTO {
    private String         rowType;             // row status

    private String         pageDcd;    
    private String 		   feeBnapNm; 			// 수수료선후급구분명 
    private String         feeKndNm;			// 수수료종류명
    private String         actsNm;				// 계정과목명
    private String         ifrsFeeRcogNm;		// IFRS수수료인식구분명
    private String 		   feeRcogDcdNm; 		// 수수료인식구분명    
    private String         txtnTpNm;			// 과세유형구분명
    private String         busiNmcpCplTxtnYn;   // 사업부수수료과세여부
    
    private String 		   eprzCrdlRgstSttsCd;  // 기업여신등록상태코드     
    private String 		   eprzCrdlFeeKndCd;	// 기업여신수수료종류코드    
    private BigDecimal 	   eprzCrdlFeeStdrAmt;  // 기업여신수수료기준금액    
    private String 		   eprzCrdlFeeRcogDcd;  // 기업여신수수료인식구분코드 
    private BigDecimal 	   splmTxa; 			// 부가세액 
    private String 		   eprzCrdlTxtnTpDcd;   // 기업여신과세유형구분코드 
    private BigDecimal     dtmRcogAmt; 			// 일시인식금액            
    private BigDecimal     prlnFee; 			// 이연수수료 
    private BigDecimal     mngmDtmRcogAmt; 		// 관리일시인식금액         
    private BigDecimal     mngmPrlnFee; 		// 관리이연수수료          
    private String 		   rstrnPrdtCd; 		// 환출상품코드           
    private long 		   rstrnTrSn; 			// 환출거래일련번호        
    private BigDecimal     rstrnFee; 			// 환출수수료              
    
    private long           hgrkTrSn;            // 상위거래일련번호
    List<IBIMS348BVO> feeSchList;               // 수수료스케줄관리 리스트
}

