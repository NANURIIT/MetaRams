package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS431BDTO;
import com.nanuri.rams.business.common.dto.IBIMS432BDTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS431BVO extends IBIMS431BDTO {

    private String wrtnYm;
    private String acctDt1;
    private String acctDt2;
    private List<IBIMS431BVO> selectIBIMS431B;
    private IBIMS431BVO ibims431bvo;
    private String empNm; //등록사원명
    private String reltStfNm; //승인자명

    private List<IBIMS432BDTO> cnstDetl;
    
}
