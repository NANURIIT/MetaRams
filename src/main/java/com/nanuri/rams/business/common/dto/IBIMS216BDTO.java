package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인보증담보내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS216B DTO
*/
public class IBIMS216BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         grteCtrcDcd;                                     // 보증약정구분코드
    private String         grnrCpin;                                        // 보증인고객식별번호
    private String         grupItgrCrdtGrdDcd;                              // 그룹통합신용등급구분코드
    private String         crdtInqDt;                                       // 신용조회일자
    private String         dbtrCpin;                                        // 채무자고객식별번호
    private String         grteDbtrRltnDcd;                                 // 보증채무자관계구분코드
    private BigDecimal     grteAmt;                                         // 보증금액
    private BigDecimal     grtePrna;                                        // 보증원금
    private String         grteCrryCd;                                      // 보증통화코드
    private String         stlaOrznBlngDcd;                                 // 결산기구분코드
    private String         grteStlaDe;                                      // 보증결산일
    private String         grteStlaDeEtcDcd;                                // 보증결산일기타구분코드
    private String         mrtgGrteCtns;                                    // 담보보증내용
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}