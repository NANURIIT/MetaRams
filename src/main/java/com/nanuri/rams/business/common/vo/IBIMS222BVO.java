package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS222BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인기초자산기본 - 대출채권/채무보증 정보(TB06010S) - 기초자산 Table.IBIMS222B VO
*/
public class IBIMS222BVO extends IBIMS222BDTO{
	private String         prdtCd;                                          // 상품코드
    private BigDecimal     bssAsstPrc;                                      // 기초자산가격
    private String    	   bssAsstTpCdNm;                                   // 기초자산유형명
    private String    	   stsStnIdstClsfCdNm;                              // 통계청표준산업분류코드명
}