package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사내부등급내역 table(IBIMS107BDTO) DTO */
public class IBIMS107BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private int        sn;                            // 일련번호
    private String     insGrdTrgtYn;                  // 내부등급대상여부
    private String     spcltFncTrgtYn;                // 특수금융대상여부(SL)
    private String     spcltFncMngNo;                 // 특수금융관리번호(SL)
    private String     outsCrdtGrdDcd;                // 외부신용등급구분코드(SL내부등급)
    private String     brwrCrno;                      // 차주법인등록번호
    private String     insCrdtGrdDcd;                 // 내부신용등급구분코드
    private String     entpHnglNm;                    // 한글법인명
    private String     rnmCnfmNo;                     // 실명확인번호
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}