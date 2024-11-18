package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS006BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 권한별메뉴화면사용권한설정 VO
 */
public class IBIMS006BVO extends IBIMS006BDTO {

    private String rgstEmpNm;
    private String hndDt;
    private String hndTm;
    private String hndEmpNm;
    private String oldAthCd;

}
