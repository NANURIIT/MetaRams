package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB07010SVO extends IBIMS401BDTO {
    private String        frsMngmBdcd;                            // 최초관리부점코드
    private String        mngmBdcd;                               // 관리부점코드
    private int           iCnt;								      // 건수
    private BigDecimal 	  dealExcBlce;                            // 대출잔액
    private BigDecimal    loanAmt;                                // 대출금액
    
	private IBIMS402BDTO  ibims402BDTO;                           // 여신실행정보
    private IBIMS348BVO   ibims348BVO;                            // 딜승인수수료스케줄기본
}
