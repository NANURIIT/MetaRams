package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS701BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 금융감독원보고자료관리 CPC1 보고서 양식 VO
*/
public class IBIMS701BVO extends IBIMS701BDTO{

    private String stdrYm;
    private String prvStdrYm;
    private String dptCd;
    private String ncrRt;
    private List<IBIMS701BDTO> cpcList;

}
