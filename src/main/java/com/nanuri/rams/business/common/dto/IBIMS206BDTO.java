package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS206BDTO {
    
    private String rgstDt;                          //  등록일자  varchar(8)
    private String nsFndCd;                         //  고유자산펀드코드  varchar(5)
    private String nsPrdtDcd;                       //  고유자산상품구분코드  varchar(2)
    private String prdtCd;                          //  상품코드  varchar(32)
    private int rgstSn;                             //  등록일련번호  int(10)
    private String busiMdlDcd;                      //  사업모형구분코드  varchar(1)
    private String paiRdmpCnclCndXstcYn;            //  원리금상환취소조건존재여부  varchar(1)
    private String intrRtCndIntgYn;                 //  이자율조건검토여부  varchar(1)
    private String intrRtCndIntgYn2;                //  이자율조건검토여부2  varchar(1)
    private String intrRtCndIntgYn3;                //  이자율조건검토여부3  varchar(1)
    private String intrRtCndIntgYn4;                //  이자율조건검토여부4  varchar(1)
    private String intrRtCndIntgYn5;                //  이자율조건검토여부5  varchar(1)
    private String fincCnvsPsblYn;                  //  출자전환가능여부  varchar(1)
    private String fincCnvsPsblYn2;                 //  출자전환가능여부2  varchar(1)
    private String expXtnsCndIvtgYn;                //  만기연장조건검토여부  varchar(1)
    private String expXtnsCndIvtgYn2;               //  만기연장조건검토여부2  varchar(1)
    private String elpdFdmpCndIvtgYn;               //  조기상환조건검토여부  varchar(1)
    private String sobnIvtgYn;                      //  후순위채권검토여부  varchar(1)
    private String sobnIvtgYn2;                     //  후순위채권검토여부2  varchar(1)
    private String sobnIvtgYn3;                     //  후순위채권검토여부3  varchar(1)
    private String spcInvIvtgYn;                    //  SPC투자검토여부  varchar(1)
    private String tnchStdIvtgYn;                   //  TRANCHE구조검토여부  varchar(1)
    private String tnchStdIvtgYn2;                  //  TRANCHE구조검토여부2  varchar(1)
    private String sppiSfcYn;                       //  SPPI충족여부  varchar(1)
    private String apvlYn;                          //  승인여부  varchar(1)
    private String apvlDt;                          //  승인일자  varchar(8)
    private String gbckDt;                          //  반려일자  varchar(8)
    private String cnclYn;                          //  취소여부  varchar(1)
    private Date hndDetlDtm;                        //  조작상세일시  datetime
    private String hndEmpno;                        //  조작사원번호  varchar(7)
    private String hndTmnlNo;                       //  조작단말기번호  varchar(8)
    private String hndTrId;                         //  조작거래ID  varchar(10)
    private String guid;                            //  GUID  varchar(29)

}
