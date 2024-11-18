package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RAC05BDTO {
    /* 셀다운 정보 */
	private String dealMngNo;             // DEAL관리번호
	private int sq;                   	  // 일련번호
	private String sellDownDt;            // 셀다운일자
	private double sellDownAmt;           // 셀다운금액
	private double sellDownRa;            // 셀다운잔액
	private String rgstDt;            	  // 등록일자
	private String dltF;				  // 삭제여부

}
