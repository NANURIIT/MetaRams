package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인결재기본 Table.IBIMS224B VO
*/
public class IBIMS231BVO extends IBIMS231BDTO {
	
	private String dealNm;		 // 딜명
    private String chrrNm; // 책임자명
    private String apvlRqstPNm; // 승인요청자명
}
