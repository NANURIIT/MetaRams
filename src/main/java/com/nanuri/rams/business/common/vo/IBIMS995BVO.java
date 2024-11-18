package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS995BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 배치JOB MASTER Table.IBIMS995B VO
*/
public class IBIMS995BVO extends IBIMS995BDTO {
    String rowType;
    String screnTpCd;
    String jobTypeName; 
    String curDate;

    List<IBIMS995BVO> batSch;

    List<IBIMS995BVO> excBat;
}