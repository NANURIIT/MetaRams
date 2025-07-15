package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS601BDTO;
import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.dto.IBIMS611BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class IBIMS601BVO extends IBIMS601BDTO{    
    private String         dealNo;       
    private String         inspctYm;   	 // 점검기준년월
    private String         stdrYm;   	 // 점검기준년월
    private String         inspctDt;   	 // 점검기준일자
    private String         inspctRmrk;   // 점검결과
    private long           sn;           // 일련번호

    List<IBIMS602BDTO>		listInspctRmrk; // 당월사업관리의견
    List<IBIMS603BDTO>		listEtc; // 기타사후관리
    List<IBIMS611BDTO>		listMonthStep; // 월별공사 및 분양현황

}
