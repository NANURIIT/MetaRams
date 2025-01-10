package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS232BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인결재기본 Table.IBIMS224B VO
*/
public class IBIMS232BVO extends IBIMS232BDTO {
	
    private String dcfcEnm;          // 결재자명
    private String decdSttsNm;      // 결재상태구분코드

}
