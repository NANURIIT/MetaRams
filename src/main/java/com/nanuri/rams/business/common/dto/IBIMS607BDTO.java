package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 부실자산재산조사정보 Table.IBIMS607B DTO
*/
public class IBIMS607BDTO {
    private String         dealNo;                                          // IBDEAL번호
    private String         jdgmDcd;                                         // 리스크심사구분코드
    private String         mtrDcd;                                          // 부수안건구분코드
    private int            sq;                                              // 일련번호
    private String         esttExmntnTrgtCcd;                               // 재산조사대상구분코드
    private String         esttExmntnTrgtCcdNm;                             // 재산조사대상구분코드
    private String         esttKndCcd;                                      // 재산종류구분코드
    private String         esttKndCcdNm;                                      // 재산종류구분코드
    private String         esttExmntnCntnt;                                 // 재산조사내용
    private String         realPrftF;                                       // 실제이익여부
    private String         rgstDt;                                          // 등록일자
    private String         rgstTm;                                          // 등록시간
    private String         fstRgstPEno;                                     // 최초등록자사번
    private String         fstRgstPEnoNm;                                   // 최초등록자사번
    private Date           hndlDyTm;                                        // 처리일시
    private String         hndlDprtCd;                                      // 처리부점코드
    private String         hndlPEno;                                        // 처리자사번
    private String         dscrEsttF;                                       // 발견재산여부
}