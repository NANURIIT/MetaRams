package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS508BDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
/* 
투자자산관련사업내역 Table.IBIMS508B VO2
*/
public class IBIMS508BVO2 {
    private String dealNo;
    private List<IBIMS508BVO> s508vo;

}
