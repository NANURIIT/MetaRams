package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사담보내역 table(IBIMS108BDTO) DTO */
public class IBIMS108BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     mrtgKndDcd;                    // 담보종류구분코드
    private String     mrtgRsnCnts;                   // 담보사유내용
    private BigDecimal mrtgEvlAmt;                    // 담보평가금액
    private String     rgtRnkDcd;                     // 권리순위구분코드
    private String     mrtgDtlsDcd;                   // 담보상세구분코드
    private String     mrtgAcqstStmDcd;               // 담보취득방식구분코드
    private String     mrtgAcqstDtlsDcd;              // 담보취득상세구분코드
    //private String     invstCrncyCd;                  // 투자통화코드
    private String     invstCrryCd;                   // 투자통화코드
    private BigDecimal crryAmt;                      // 통화금액
    private BigDecimal aplyExrt;                     // 적용환율
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}