package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 금융기관정보 Table.IBIMS992B DTO
*/
public class IBIMS992BDTO {
    private String         fnltCd;                                // 금융기관코드
    private String         fnltNm;                                // 금융기관명
}