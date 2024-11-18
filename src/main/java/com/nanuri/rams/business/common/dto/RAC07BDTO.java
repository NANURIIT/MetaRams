package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/**
 * 
 * 오늘의할일 Table
 */
public class RAC07BDTO {
	
    private String     eno;                           // 담당자
    private String     reqDt;                         // 요청일자
    private int        sq;                            // 일련번호
    private String     reqCcd;                        // 작업구분코드
    private String     regDt;                         // 등록일자
    private String     regTm;                         // 등록시간
    private String     regEno;                        // 등록사번
    private String     reqDtls;                       // 작업설명
    private String     menuId;                        // 메뉴ID
    private String     hndlDt;                        // 처리일자
    private String     hndlTm;                        // 처리시간
    private String     hndlEno;                       // 처리사번
    private String     spvYn;                         // 대결여부
    private String     entpNm;                        // 업체명
    private String     rmrk;                          // 비고(메뉴별조회KEY)
    private String     dltF;                          // 삭제여부
    private String     dltDt;                         // 삭제일자
    private String     fstHndlPEno;                   // 최초등록자사번
    private Date       fstHndlDyTm;                   // 최초등록일시
    private String     lstHndlPEno;                   // 최종변경자사번
    private Date       lstHndlDyTm;                   // 최종변경일시
	
	

}
