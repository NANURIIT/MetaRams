package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
/* 
투자사후편입자산내역 Table.IBIMS512B VO2
*/
public class IBIMS512BVO2 {
    private String dealNo;
    private List<IBIMS512BVO> s512vo;

}
