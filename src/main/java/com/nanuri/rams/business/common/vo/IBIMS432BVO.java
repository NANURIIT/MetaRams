package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS432BDTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS432BVO extends IBIMS432BDTO {

    private String bcncNm;

    private List<IBIMS432BVO> tb07100sList;

}
