package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS508BDTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
/* 
투자자산관련사업내역 Table.IBIMS508B VO
*/
public class IBIMS508BVO extends IBIMS508BDTO{
    private String dealNm;
    private String thcoRlDcd;
    private BigDecimal allInvAmt;
    private BigDecimal thcoPtciAmt;
    private String thcoPtciAmtDcsnYn; // 당사참여금액확정여부
}
