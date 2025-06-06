package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS501BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/* 
투자자산사업기본 Table.IBIMS501B VO
*/
public class IBIMS501BVO extends IBIMS501BDTO {
	private String empNm;		// 담당자사원명
	private String crdtGrdCd;   // 신용등급코드	
	private String dprtCd;		//업무팀
	private String rmEmpNm;		//담당RM명
	private String thcoPtciAmtDcsnYn;


	private IBIMS101BVO ibims101bvo;
}
