package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS204BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS204BVO extends IBIMS204BDTO {

    private List<IBIMS204BDTO> mdwyRdmpFeeRtoList;

}
