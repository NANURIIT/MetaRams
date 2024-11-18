package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사기초자산내역 table(IBIMS105BDTO) DTO */
public class IBIMS105BDTO {
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private String 	   prdtCd;						  // 종목코드 2024.07.22 추가 - 추후에 분리
    private int        sn;                            // 일련번호
    private String     bssAsstKndCd;                  // 기초자산종류코드
    private String     bscAstsCnts;                   // 기초자산내용
    private String     bssAsstIsuCrno;                // 기초자산발행법인등록번호
    private String     crpNm;                         // 법인명
    private String     invstCrryCd;                   // 투자통화코드
    private BigDecimal crryAmt;                       // 통화금액
    private BigDecimal aplcExchR;                     // 적용환율
    private BigDecimal crevAmt;                       // 시가평가금액
    private String     rnmCnfmNo;                     // 실명확인번호
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid
}