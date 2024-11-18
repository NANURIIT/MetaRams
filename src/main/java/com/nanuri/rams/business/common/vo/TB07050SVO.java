package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TB07050SVO extends IBIMS403BDTO {
    // private String prdtCd;                   // 종목코드
    private String rowType;                     // 그리드 상태값

    private List<TB07050SVO> rdmpPlanList;	    // 원금상환 계획정보 리스트
	private List<TB07050SVO> intrtPlanList; 	// 이자상환 계획정보 리스트
    private List<TB07050SVO> excSchList;        // 실행스케줄
	
}
