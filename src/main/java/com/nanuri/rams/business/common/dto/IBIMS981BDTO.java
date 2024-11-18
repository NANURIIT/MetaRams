package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
기일관리내역 Table.IBIMS820B DTO
*/
@Getter
@Setter
@ToString
public class IBIMS981BDTO {

    private String dudtMngmNo;          //  기일관리번호
    private int erlmSeq;                //  등록순번
    private String dealNo;              //  딜번호
    private String prdtCd;              //  상품코드
    private String dudtDpchTpDcd;       //  기일통보유형코드
    private String chrrStfno;           //  담당자직원번호
    private String subChrrStfno;        //  부담당자직원번호
    private String mngmOrgno;           //  관리조직번호
    private String erlmDt;              //  등록일자
    private String actnPrarDt;          //  조치예정일자
    private String actnDt;              //  조치일자
    private String useYn;               //  사용여부
    private String dpchYn;              //  통보여부
    private String delYn;               //  삭제여부
    private Date hndDetlDtm;            //  조작상세일시
    private String hndEmpno;            //  조작사원번호
    private String hndTmnlNo;           //  조작단말기번호
    private String hndTrId;             //  조작거래ID
    private String guid;                //  GUID

}
