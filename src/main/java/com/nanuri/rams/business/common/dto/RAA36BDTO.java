package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * 의무이행계획정보 RAA36B
 */
@Getter
@Setter
public class RAA36BDTO {
    private String oblgPfrmCcd;              // 의무이행구분코드
    private String ibDealNo;		         // IBDEAL번호
    private String riskInspctCcd;	         // 리스크심사구분코드
    private String lstCCaseCcd;		         // 부수안건구분코드
    private int    itemSq;                   // 항목일련번호
    private String rprPrgrsStCd;             // 보고진행상태코드
    private String mainPrgrsSttnCntnt;       // 주요진행현황내용
    private String bsnsSttnAndPrspctSmry;    // 사업현황및전망요약
    private String prcsPlanCntnt1;           // 프로세스계획내용1
    private String prcsPlanCntnt2;           // 프로세스계획내용2
    private String rprRsnCntnt;              // 보고사유내용

    private Date   aprvDyTm1;                // 결재일시1
    private String aprvPEno1;                // 결재자사번1
    private Date   aprvDyTm2;                // 결재일시2
    private String aprvPEno2;                // 결재자사번2
    private Date   aprvDyTm3;                // 결재일시3
    private String aprvPEno3;                // 결재자사번3
    private Date   aprvDyTm4;                // 결재일시4
    private String aprvPEno4;                // 결재자사번4
    private Date   aprvDyTm5;                // 결재일시5
    private String aprvPEno5;                // 결재자사번5

    private Date   hndlDyTm;                 // 처리일시
    private String hndlDprtCd;               // 처리부점코드
    private String hndlPEno;                 // 처리자사번

}