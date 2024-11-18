package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사거래상대방내역 table(IBIMS106BDTO) DTO */
public class IBIMS106BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     crpShpDcd;                     // 법인형태구분코드
    private String     crno;                          // 법인등록번호
    private String     crpNm;                         // 법인명
    private String     rnmCnfmNo;                     // 실명확인번호
    private String     mxmSthdNm;                     // 최대주주명
    private String     trsShpDcd;                     // 신탁형태구분코드
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}