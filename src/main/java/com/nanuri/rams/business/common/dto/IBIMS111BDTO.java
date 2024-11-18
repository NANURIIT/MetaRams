package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
/*
 위원회회의내역 Table.IBIMS111B DTO
*/
public class IBIMS111BDTO {

    private String         cnsbDcd;                                // 협의체구분코드
    private String         rsltnYr;                                // 결의년도
    private BigDecimal     sn;                                     // 일련번호
    private String         cnsbOpnDt;                              // 협의체개최일자
    private String         cnsbOpnTm;                              // 협의체개최시각
    private String         cnsbPlcNm;                              // 협의체장소명
    private String         jdgmRsltDcd;                            // 심사결과구분코드
    private String         jdgmRsltRgstDt;                         // 심사결과등록일자
    private String         jdgmRsltCtns;                           // 심사결과내용
    private String         rsltRgstEmpno;                          // 결과등록사원번호
    private String         cnclYn;                                 // 취소여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID

    /* 협의체 안건정보 */
    private List<IBIMS112BDTO> dealList;                           // IBIMS112BDTO
    /* 협의체 위원정보 */
    private List<IBIMS115BDTO> enoList;                            // IBIMS115BDTO

}