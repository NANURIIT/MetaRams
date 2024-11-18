package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 * 연결안건 Table.RAA66B DTO
 * */
public class RAA66BDTO {
    private String ibDealNo;			// IBDEAL번호
    private String riskInspctCcd;		// 리스크심사구분코드
    private String lstCCaseCcd;			// 부수안건구분코드
    private int    sq;			        // 일련번호

    private String cnctIbDealNo;		// 연계IBDEAL번호
    private String cnctRiskInspctCcd;	// 연계리스크심사구분코드
    private String cnctLstCCaseCcd;		// 연계부수안건구분코드
    private String cnctIbDealNm;        // 연계IBDEAL명

    private String etcCntnt;			// 기타내용
    private String rgstDt;		        // 등록일자
    private String rgstTM;			    // 등록시간
    private String fstRgstPEno;         // 최초등록자사번
    private String hndlDyTm;            // 처리일시
    private String hndlDprtCd;          // 처리부점코드
    private String hndlPEno;            // 처리자사번

}
