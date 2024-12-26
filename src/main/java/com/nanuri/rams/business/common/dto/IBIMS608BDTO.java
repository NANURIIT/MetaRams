package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 부실자산법적절차정보 Table.IBIMS608B DTO
*/
public class IBIMS608BDTO {
    
    private String dealNo;              //  딜번호    
    private String ibDealNo;              //  딜번호    
    private String jdgmDcd;             //  심사구분코드
    private String mtrDcd;              //  부수안건구분코드
    private int    sn;                  //  일련번호
    private String lglPrcrCcd;          //  법적절차구분코드
    private String lglPrcrCcdNm;          //  법적절차구분
    private String lglPrcrKndCcd;       //  법적절차종류구분코드
    private String lglPrcrKndCcdNm;       //  법적절차종류구분
    private String lglPrcrCntnt;        //  법적절차내용
    private String crtrmInfo;           //  법원정보
    private String acdntNo;             //  사건번호
    private String rgstDt;              //  등록일자
    private String rgstTm;              //  등록시간
    private String fstRgstPEno;         //  최초등록자사번
    private String fstRgstPEnoNm;         //  최초등록자
    private Date hndlDyTm;              //  처리일시
    private String hndlDprtCd;          //  처리부서코드
    private String hndlPEno;            //  처리자사번
    private Date hndDetlDtm;            //  조작상세일시
    private String hndEmpno;            //  조작사원번호
    private String hndTmnlNo;           //  조작단말기번호
    private String hndTrId;             //  조작거래id
    private String guid;                //  guid

}