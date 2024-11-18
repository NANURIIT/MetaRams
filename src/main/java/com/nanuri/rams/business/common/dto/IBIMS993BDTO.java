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

    private String fndCd;           //  펀드코드
    private String fndNm;           //  펀드명
    private String fndDvsnNm;       //  펀드구분명
    private String stupDt;          //  설정일자
    private String fndTpNm;         //  펀드유형명
    private String prdtClsfCd;      //  상품분류코드
    private String stnCd;           //  협회표준코드
    private Date hndDetlDtm;        //  조작상세일시
    private String hndEmpno;        //  조작사원번호
    private String hndTmnlNo;       //  조작단말기번호
    private String hndTrId;         //  조작거래ID
    private String guid;            //  GUID

}