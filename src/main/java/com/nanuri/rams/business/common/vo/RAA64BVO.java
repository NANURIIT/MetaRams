package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import com.nanuri.rams.business.common.dto.RAA64BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 부실자산파일첨부정보 Table.RAA64B VO
 * */
public class RAA64BVO extends RAA64BDTO {
	// 첨부파일일련번호목록
	private List<Integer> arrAttFileSq = new ArrayList<>();		
}
