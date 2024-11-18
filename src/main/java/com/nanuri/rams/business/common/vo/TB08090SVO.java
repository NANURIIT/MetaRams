package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS800BDTO;

import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class TB08090SVO {

    private String stdrDt;                      //기준일자
    List<IBIMS800BDTO> ibims800bDTOList;        //DTO list
}
