package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS220BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인이해관계자기본
*/
public class IBIMS220BVO extends IBIMS220BDTO{
    private String         itrRelrChrNm;                                    // 이해관계자성격코드명
    private String         itrRelrShpNm;                                    // 이해관계자형태코드명
    private String         trOthrNm;                                    	// 거래상대방명
  
    
    private List<IBIMS220BVO> itrList;
}