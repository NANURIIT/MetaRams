package com.nanuri.rams.business.common.dto;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인담보연결내역 - 대출채권/채무보증 정보(TB06010S) - 담보/보증내역 Table.IBIMS212B DTO
*/
public class IBIMS213BDTO {
	private String mrtgMngmNo;
	private String stdrSn;
	private String prfdRankKndCd;
	private String prfdRankBcncNm;
	private String prfdRank;
	private String prfdRankCrryCd;
	private BigDecimal prfdRankAmt;
	private BigDecimal krwTrslPrfdRankAmt;
	private Date hndDetlDtm;
	private String hndEmpno;
	private String hndTmnlNo;
	private String hndTrId;
	private String guid;
	
}