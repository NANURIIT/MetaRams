package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 부실자산사후관리이력정보 Table.IBIMS606B DTO
*/
public class IBIMS606BDTO {
    private String         dealNo;                                          // IBDEAL번호
    private String         mtrDcd;                                          // 부수안건구분코드
    private String         jdgmDcd;                                         // 리스크심사구분코드
    private int            sq;                                              // 일련번호
    private String         evntAftrMngCcd;                                  // 사후관리구분코드
    private String         evntAftrMngCcdNm;                                  // 사후관리구분코드
    private String         evntAftrMngCntnt;                                // 사후관리내용
    private String         rgstDt;                                          // 등록일자
    private String         rgstTm;                                          // 등록시간
    private String         fstRgstPEno;                                     // 최초등록자사번
    private String         fstRgstPEnoNm;                                     // 최초등록자사번
    private Date           hndlDyTm;                                        // 처리일시
    private String         hndlDprtCd;                                      // 처리부점코드
    private String         hndlPEno;                                        // 처리자사번
}