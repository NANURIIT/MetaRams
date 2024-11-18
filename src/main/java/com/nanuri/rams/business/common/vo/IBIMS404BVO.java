package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS404BVO extends IBIMS404BDTO {
    private int aplyCnt;		    // 조회건수
	private double aplyIntrt; 	    // 적용금리
	private String rdmpType;        // 상환구분

	private String stdrIntrtKndCdNm;
	private String aplyDnumDcdNm;
	private String intrtCngeFrqcCdNm;
	private String intrtList;
}
