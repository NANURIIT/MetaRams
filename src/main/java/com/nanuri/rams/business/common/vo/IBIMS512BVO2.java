package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS512BDTO;

@Getter
@Setter
/* 
투자사후편입자산내역 Table.IBIMS512B VO2
*/
public class IBIMS512BVO2 extends IBIMS512BDTO {
    private String dealNo;
    private List<IBIMS512BVO> s512vo;

    private String mode;

}
