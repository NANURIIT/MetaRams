package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 부실자산안건연결정보 Table.IBIMS610B DTO
*/
public class IBIMS610BDTO {
    
    private String dealNo;              //  딜번호
    private String jdgmDcd;             //  심사구분코드
    private String mtrDcd;              //  부수안건구분코드
    private BigDecimal sn;              //  일련번호
    private String cnctDealNo;          //  연계DEAL번호
    private String cnctJdgmDcd;         //  연계리스크심사구분코드
    private String cnctMtrDcd;          //  연계부수안건구분코드
    private String etcCntnt;            //  기타내용
    private String rgstDt;              //  등록일자
    private String rgstTm;              //  등록시간
    private String fstRgstPEno;         //  최초등록자사번
    private Date hndlDyTm;              //  처리일시
    private String hndlDprtCd;          //  처리부서코드
    private String hndlPEno;            //  처리자사번
    private Date hndDetlDtm;            //  조작상세일시
    private String hndEmpno;            //  조작사원번호
    private String hndTmnlNo;           //  조작단말기번호
    private String hndTrId;             //  조작거래id
    private String guid;                //  guid

}