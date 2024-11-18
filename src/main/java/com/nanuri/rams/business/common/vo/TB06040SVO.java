package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS403BDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TB06040SVO extends IBIMS401BDTO {
	private String trOthrDscmNo;
	private String trOthrDscmNm;
	private String rqsKndCd;
	private String apvlAmt;
	private String prdtClsfCd;
	private String prdtClsfCdNm;
	private String actsCd;
	private String apvlDt;
	private String trCrryCd;
	private String trCrryCdNm;
	private String stdrIntrtKndCd;
	private String intrtCngeFrqcMnum;
	private String indvLmtDcd;
	private String paiRdmpDcd;
	private String intrBnaoDcd;
	private String chrrEmpNm;
	private String dealNo;
	private String nmcpMtrDcd;
	private String lstCCaseDcd;
	private String prgSttsCd;	// 진행상태코드
	private String rgstDt; // 등록일자


	private List<IBIMS403BDTO> rdmpPlanList;	// 원금상환 계획정보 리스트
	private List<IBIMS403BDTO> intrtPlanList; 	// 이자상환 계획정보 리스트
	private List<IBIMS403BDTO> excSchList;     // 실행 리스트
}
