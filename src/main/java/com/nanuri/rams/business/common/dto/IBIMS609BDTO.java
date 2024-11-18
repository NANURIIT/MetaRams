package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 부실자산시효관리정보 Table.IBIMS609B DTO
*/
public class IBIMS609BDTO {

    private String dealNo;              //  딜번호
    private String jdgmDcd;             //  심사구분코드
    private String mtrDcd;              //  부수안건구분코드
    private BigDecimal sn;              //  일련번호
    private String efctOcrncDt;         //  효력발생일자
    private String efctEndDt;           //  효력종료일자
    private String efctMngCntnt;        //  효력관리내용
    private String rgstDt;              //  등록일자
    private String rgstTm;              //  등록시간
    private String fstRgstPEno;         //  최초등록자사번
    private Date hndlDyTm;              //  처리일시
    private String hndlDprtCd;          //  처리부서코드
    private String hndlPEno;            //  처리자사번
    private String efctMngTrgtCcd;      //  효력관리대상구분코드
    private String dbtOngNm;            //  채무기관명
    private String corpRgstNo;          //  법인등록번호
    private String spcltBndF;           //  특수채권여부
    private String efctMngBs;           //  효력관리근거
    private Date hndDetlDtm;            //  조작상세일시
    private String hndEmpno;            //  조작사원번호
    private String hndTmnlNo;           //  조작단말기번호
    private String hndTrId;             //  조작거래id
    private String guid;                //  guid
    
}