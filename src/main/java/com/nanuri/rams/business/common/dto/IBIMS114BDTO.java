package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 업체기본정보 table(IBIMS114BDTO) DTO */
public class IBIMS114BDTO {
    private String     entpCd;                        // 업체코드
    private String     entpHnglNm;                    // 업체한글명
    private String     entpEngNm;                     // 업체영문명
    private String     stkIsNm;                       // 주식종목명
    private String     stkIsCd;                       // 주식종목코드
    private String     lrgstShrhldrNm;                // 최대주주명
    private String     rprsNm;                        // 대표자명
    private String     corpCcd;                       // 법인구분코드
    private String     corpRgstNo;                    // 법인등록번호
    private String     bsnsRgstNo;                    // 사업자등록번호
    private String     adrs;                          // 주소
    private String     web;                           // 홈페이지주소
    private String     telNo;                         // 전화번호
    private String     faxNo;                         // 팩스번호
    private String     indTypCd;                      // 업종코드
    private String     estDt;                         // 설립일자
    private String     clsAcnMm;                      // 결산월
    private String     rgstDt;                        // 등록일자
    private Date       hndlDyTm;                      // 처리일시
    private String     hndlDprtCd;                    // 처리부점코드
    private String     hndlPEno;                      // 처리자사번
    private String     dltF;                          // 삭제여부
    private String     crdtInqDt;                     // 신용조회일자
    private String     dmsCrdtGrdDcd;                 // 국내신용등급코드
}