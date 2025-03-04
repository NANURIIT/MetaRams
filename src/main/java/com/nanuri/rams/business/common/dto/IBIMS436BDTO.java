package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.poi.hpsf.GUID;

@Getter
@Setter
/*
 연체기본 Table.IBIMS436B DTO
*/
public class IBIMS436BDTO {

    private String afctMngmNo;                 //  사후관리번호
    private String dealNo;                     //  딜번호
    private String prdtCd;                     //  종목코드
    private long excSn;                         //  실행순번
    private String ovduSttsCd;                 //  연체상태코드
    private BigDecimal crdlBlceAmt;            //  여신잔액금액
    private String frsPrnaOvduOcrncDt;         //  최초원금연체발생일자
    private String frsIntrOvduOcrncDt;         //  최초이자연체발생일자
    private BigDecimal prcaOvduAcmlDnum;       //  원금연체누적일수
    private BigDecimal intOvduAcmlDnum;        //  이자연체누적일수
    private BigDecimal ovduPrnaAmt;            //  연체원금금액
    private BigDecimal ovduIntrAmt;            //  연체이자금액
    private String lastPrnaRdmpDt;             //  최종원금상환일자
    private String lastIntrRdmpDt;             //  최종이자상환일자
    private String ovduRlseDt;                 //  연체해제일자
    private String dcsnYn;                     //  확정여부
    private String delYn;                      //  삭제여부
    private Date hndDetlDtm;                   //  조작상세일시
    private String hndEmpno;                   //  조작사원번호
    private String hndTmnlNo;                  //  조작단말기번호
    private String hndTrId;                    //  조작거래ID
    private String guid;                       //  GUID

    private String ovduOcrncDt;

}