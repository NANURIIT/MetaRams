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
public class IBIMS220BVO2 {
    private String            prdtCd;                                    // 상품코드
    private List<IBIMS220BVO> itrList;
}