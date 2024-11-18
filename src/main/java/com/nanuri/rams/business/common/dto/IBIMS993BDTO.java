package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 펀드정보 Table.IBIMS993B DTO
*/
public class IBIMS993BDTO {
    private String         fndCd;                                // 펀드코드
    private String         fndNm;                                // 펀드명
    private String         fndDvsnNm;                            // 펀드구분명
    private String         stupDt;                               // 설정일자
    private String         fndTpNm;                              // 펀드유형명
    private String         prdtClsfCd;                           // 상품분류코드
    private String         stnCd;                                // 협회표준코드
}