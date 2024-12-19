package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS116BDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜기본 - 공동영업관리자 정보 Table.IBIMS116B VO
*/
public class IBIMS116BVO extends IBIMS116BDTO {
    private String empNm;
    private String dprtNm;
    private String dprtCd;
}

