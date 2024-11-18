package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
    품의기본
*/
public class IBIMS431BDTO {
    
    private String wrtnDt;                      //  작성일자
    private String rslnBdcd;                    //  결의부점코드
    private String cnstNo;                      //  품의번호
    private String acctDt;                      //  회계일자
    private String baltDt;                      //  기표일자
    private String sttmNo;                      //  전표번호
    private String sttmBdcd;                    //  전표부점코드
    private String cnclBaltDt;                  //  취소기표일자
    private String cnclSttmNo;                  //  취소전표번호
    private String cnstSttmDcd;                 //  품의전표구분코드
    private String prufDt;                      //  증빙일자
    private String crryCd;                      //  통화코드
    private BigDecimal exrt;                    //  환율
    private String rgstEmpno;                   //  등록사원번호
    private String reltStfno;                   //  승인자
    private String acctBcncCd;                  //  회계거래처코드
    private String bcncNm;                      //  거래처명
    private String acctPymtMthCd;               //  회계지급방법코드
    private String xtnlIsttCd;                  //  외부기관코드
    private String bano;                        //  은행계좌번호
    private String bnkAchdNm;                   //  은행예금주명
    private String pymtPrarDt;                  //  지급예정일자
    private BigDecimal fndsIstrSn;              //  자금지시일련번호
    private String prufKndDcd;                  //  증빙종류구분코드
    private String pchsDdcDcd;                  //  매입공채구분코드
    private BigDecimal rslnAmt;                 //  결의금액
    private BigDecimal splmValuTxa;             //  부가가치세액
    private String cnclYn;                      //  취소여부
    private String trId;                        //  거래ID
    private String bnftYn;                      //  편익여부
    private String reltDcmNo;                   //  관련문서번호
    private String reltFdtnCtns;                //  관련근거내용
    private String elcPrufYn;                   //  전자증빙여부
    private String entmAccXstcYn;               //  접대계정존재여부
    private String cntrAccXstcYn;               //  기부계정존재여부
    private String jobDecdCd;                   //  업무결재코드
    private String jobDecdNo;                   //  업무결재번호
    private String cnclJobDecdNo;               //  취소업무결재번호
    private String excalYn;                     //  정산여부
    private String fndsLdgDcd;                  //  자금원장구분코드
    private String fndsLdgNo;                   //  자금원장번호
    private BigDecimal rgstSn;                  //  등록일련번호
    private String actsCd;                      //  계정과목코드
    private String edmsDcmId;                   //  EDMS문서ID
    private String cdno;                        //  카드번호
    private String apvlNo;                      //  카드승인번호
    private String bdgBusiCd;                   //  예산사업코드
    private BigDecimal frcrRslnAmt;             //  외화결의금액
    private Date hndDetlDtm;                    //  조작상세일시
    private String hndEmpno;                    //  조작사원번호
    private String hndTmnlNo;                   //  조작단말기번호
    private String hndTrId;                     //  조작거래ID
    private String guid;                        //  GUID

}
