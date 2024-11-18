package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS436BDTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS436BVO extends IBIMS436BDTO {

    private String          dealNm;                 //딜명       
    private String          dprtCd;                 //부서코드
    private String          dprtNm;                 //부서명
    private String          ovduRlseYn;             //연체해제여부 
    private String          startDt;
    private String          endDt;
    private String          ovduSttsNm;
    
    private List<IBIMS436BVO> OvduDtls;
}
