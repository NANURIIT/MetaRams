package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS451BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS451BVO extends IBIMS451BDTO {

    private String mngmBdcdNm;      //  부서명
    private String actsCdNm;        //  계정과목코드명
    
}
