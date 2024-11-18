package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS703BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 금융감독원보고자료관리 CPC3 보고서 양식 VO
*/
public class IBIMS703BVO extends IBIMS703BDTO{
    
    private String stdrYm;
    private String prvStdrYm;
    private String dptCd;
    private String prdtNm;
    private String ncrRt;
    private List<IBIMS703BDTO> cpcList;

}

