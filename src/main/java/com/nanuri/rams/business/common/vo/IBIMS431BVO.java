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
    private String rgstEmpnm;               // 등록사원명
    private String reltStfnm;               // 승인자명
    private String decdStepDcd;             // 결재단계구분코드
    private String decdSttsDcd;             // 결재상태구분코드

    private List<IBIMS432BDTO> cnstDetl;
    
}
