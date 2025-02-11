package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS518BDTO;

@Getter
@Setter
/* 
투자기업정보내역 Table.IBIMS518B VO2
*/
public class IBIMS518BVO2 extends IBIMS518BDTO{
    private String dealNo;
    private List<IBIMS518BVO> s518vo;

    private String mode; 

}
