package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 배치JOB 스케줄러 Table.IBIMS997B VO
*/
public class IBIMS997BVO extends IBIMS997BDTO {
    String screnTpCd;
    String jobTypeName;
    String jobStatusNm;

    List<IBIMS997BVO> batSchM; 
}