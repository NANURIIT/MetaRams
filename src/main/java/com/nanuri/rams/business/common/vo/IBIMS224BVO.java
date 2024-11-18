package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS224BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인LOC발행기본 Table.IBIMS224B VO
*/
public class IBIMS224BVO extends IBIMS224BDTO {
	
	private String decdDptNm;	 // 부서명
	private String dealNm;		 // 딜명
	private String empNm;		 // 담당자명
	private String issLtrNm;	 // 발급서류구분코드명
	private String strtDt;		 // 시작일자
	private String endDt;		 // 종료일자
	private String ivtgRsltCtns; // 검토내용
}
