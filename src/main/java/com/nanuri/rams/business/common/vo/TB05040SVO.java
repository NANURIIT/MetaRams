package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS109BDTO;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
/*
 * 협의체 부의 및 결과 화면 VO
 */
public class TB05040SVO {
	String     cnsbDcd;
	String     cnsbOpnDt;
	String     jdgmRsltRgstDt;
	String     cnsbSq;
	String     sn;
	String     ptfdCrncyCdNm;
	String     rsltnRsltCd;
	BigDecimal apvlAmt;
	String     sdnCndtF;
	String     etcCndtF;
	String     etcCndtCtns;
}