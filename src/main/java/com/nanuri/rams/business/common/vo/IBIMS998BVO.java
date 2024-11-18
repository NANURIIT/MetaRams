package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS998BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 배치JOB 스케줄러 Table.IBIMS997B VO
*/
public class IBIMS998BVO extends IBIMS998BDTO {
    String screnTpCd;
    
    String jobOpngYn; // 업무개시여부
    List<IBIMS998BDTO> grd_TB10720S;
}