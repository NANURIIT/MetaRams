package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 오늘의할일 Table.IBIMS100B DTO
*/
public class IBIMS100BDTO {
    private String         empno;                                  // 사원번호
    private String         stdrDt;                                 // 기준일자
    private int            sn;                                     // 일련번호
    private String         workDcd;                                // 작업구분코드
    private String         workCtns;                               // 작업내용
    private String         rqstEmpno;                              // 등록사원번호
    private String         rqstDt;                                 // 요청일자
    private String         rqstTm;                                 // 등록시각
    private String         menuId;                                 // 메뉴ID
    private String         prcsDt;                                 // 처리일자
    private String         prcsTm;                                 // 처리시각
    private String         prcsEmpno;                              // 처리사원번호
    private String         spvYn;                                  // 대결여부
    private String         entpNm;                                 // 업체명
    private String         rmrk;                                   // 비고(메뉴별조회KEY)
    private String         delYn;                                  // 삭제여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}