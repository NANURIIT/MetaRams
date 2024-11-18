package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS203BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 딜승인수수료설정기본 table(IBIMS203BDTO) VO
 */
public class IBIMS203BVO extends IBIMS203BDTO {
    private String         pageDcd;    
    private String         actsNm;				// 계정과목명
    private String         ifrsFeeRcogNm;		// 수수료인식구분코드
    private String         eprzCrdlFeeRcogNm;	// 기업여신수수료인식구분명
    private String         eprzCrdlTxtnTpNm;	// 기업여신과세유형구분명
    private String         eprzCrdlFeeKndNm;	// 기업여신수수료종류명
}
