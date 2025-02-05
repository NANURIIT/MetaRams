package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS517BDTO {

    private String dealNo;              //딜번호
    private long sn;                    //일련번호
    private long erlmSeq;               //등록순번  
    private String bzno;                //사업자등록번호
    private String eprzNm;              //기업체명
    private String holdStkQnt;          //보유주식수
    private String stkLstYn;            //주식상장여부
    private String mngRghEnsuYn;        //경영권리확보여부
    private String delYn;               //삭제여부
    private Date hndDetlDtm;            // 조작상세일시
    private String hndEmpno;            // 조작사원번호
    private String hndTmnlNo;           // 조작단말기번호
    private String hndTrId;             // 조작거래id
    private String guid;

}
