package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import lombok.Getter;

@Getter
/*
 * 위원회위원내역 table(IBIMS115BDTO) VO
 */
public class IBIMS115BVO extends IBIMS115BDTO {
    private String         atdcTrgtEmpnm;                          // 참석대상사원명
    private String         atdcAngtEmpnm;                          // 참석대리인사원명
    private String         aprvOppsDcdNm;                          // 찬반구분코드명
}