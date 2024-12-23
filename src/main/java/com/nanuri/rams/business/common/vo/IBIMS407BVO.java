package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS407BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 *  출자금 거래등록
 */
public class IBIMS407BVO extends IBIMS407BDTO {

    private String empNm;
    private String prdtNm;
    private String trCrryCd;
    private String fndNm;
    private String fnltNm;          
    private String dprtNm;
    private String stdrExrt;
    private String rqsEmpnm;

}
