package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 금융감독원보고자료관리 CPC3 보고서 양식 DTO
*/
public class IBIMS704BDTO {
 
    private String stdrYm;                   //      기준년월
    private String fndRptsTpDcd;             //      펀드보고서유형구분코드
    private String rgstDt;                   //      등록일자
    private String dcsnDt;                   //      확정일자
    private String dcsnYn;                   //      확정여부
    private String rgstEmpno;                //      등록사원번호
    private String dcsnRgstEmpno;            //      확정등록사원번호
    private Date hndDetlDtm;                 //      조작상세일시
    private String hndEmpno;                 //      조작사원번호
    private String hndTmnlNo;                //      조작단말기번호
    private String hndTrId;                  //      조작거래ID
    private String guid;                     //      GUID
    private String dprtCd;                   //      부서코드

}
