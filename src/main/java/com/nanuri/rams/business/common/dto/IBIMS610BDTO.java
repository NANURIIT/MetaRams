package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 부실자산안건연결정보 Table.IBIMS610B DTO
*/
public class IBIMS610BDTO {
    private String         dealNo;                                 // DEAL번호
    private String         jdgmDcd;                                // 리스크심사구분코드
    private String         mtrDcd;                                 // 부수안건구분코드
    private int            sq;                                     // 일련번호
    private String         cnctDealNo;                             // 연계DEAL번호
    private String         cnctJdgmDcd;                            // 연계리스크심사구분코드
    private String         cnctMtrDcd;                             // 연계부수안건구분코드
    private String         etcCntnt;                               // 기타내용
    private String         rgstDt;                                 // 등록일자
    private String         rgstTm;                                 // 등록시간
    private String         fstRgstPEno;                            // 최초등록자사번
    private Date           hndlDyTm;                               // 처리일시
    private String         hndlDprtCd;                             // 처리부점코드
    private String         hndlPEno;                               // 처리자사번
}