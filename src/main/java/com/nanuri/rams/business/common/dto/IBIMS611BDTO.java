package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class IBIMS611BDTO {
	
	private String dealNo;			//	딜번호
	private String stdrYm;			//	기준년월
	private String busiPrgStep;		//	사업진행단계
	private String estmPrgsRt;		//	예상진척률
	private String pfmcPrgsRt;		//	실적진척률
	private Date hndDetlDtm;		//	조작상세일시
	private String hndEmpno;		//	조작사원번호
	private String hndTmnlNo;		//	조작단말기번호
	private String hndTrId;			//	조작거래id
	private String guid;			//	guid

}