package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사보증내역 table(IBIMS109BDTO) DTO */
public class IBIMS109BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     crdtRifcGrteDcd;               // 신용보강보증구분코드
    private String     grteIsttCrno;                  // 보증기관법인등록번호
    private BigDecimal grteAmt;                       // 보증금액
    private String     grteIsttNm;                    // 보증기관명
    private String     grteCtns;                      // 보증내용
    private String     rnmCnfmNo;                     // 실명확인번호
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}