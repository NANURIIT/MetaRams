package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사관련문서내역 table(IBIMS104BDTO) DTO */
public class IBIMS104BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     dcmDcd;                        // 문서구분코드
    private String     dcmNo;                         // 문서번호
    private String     lastDcmYn;                     // 최종문서여부
    private String     rm;                            // 비고(URLLINK)
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}