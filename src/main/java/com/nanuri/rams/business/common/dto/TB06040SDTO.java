package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 약정 및 해지 화면 TB06040S DTO
*/
public class TB06040SDTO extends IBIMS401BDTO {
    private String dealNo;
    private String nmcpMtrDcd;
    private String lstCCaseDcd;
    private String ctrcCclcDcd;
}