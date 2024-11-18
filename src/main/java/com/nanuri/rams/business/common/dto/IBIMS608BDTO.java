package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 부실자산법적절차정보 Table.IBIMS608B DTO
*/
public class IBIMS608BDTO {
    private String         dealNo;                                 // IBDEAL번호
    private String         jdgmDcd;                                // 리스크심사구분코드
    private String         mtrDcd;                                 // 부수안건구분코드
    private int            sq;                                     // 일련번호
    private String         lglPrcrCcd;                             // 법적절차구분코드
    private String         lglPrcrCcdNm;                             // 법적절차구분코드
    private String         lglPrcrKndCcd;                          // 법적절차종류구분코드
    private String         lglPrcrKndCcdNm;                          // 법적절차종류구분코드
    private String         lglPrcrCntnt;                           // 법적절차내용
    private String         crtrmInfo;                              // 법원정보
    private String         acdntNo;                                // 사건번호
    private String         rgstDt;                                 // 등록일자
    private String         rgstTm;                                 // 등록시간
    private String         fstRgstPEno;                            // 최초등록자사번
    private String         fstRgstPEnoNm;                            // 최초등록자사번
    private Date           hndlDyTm;                               // 처리일시
    private String         hndlDprtCd;                             // 처리부점코드
    private String         hndlPEno;                               // 처리자사번
}