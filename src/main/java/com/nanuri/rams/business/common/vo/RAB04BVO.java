package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import com.nanuri.rams.business.common.dto.RAB04BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 리포트파일첨부정보 Table.RAB04B VO
 * */
public class RAB04BVO extends RAB04BDTO{
	// 리포트파일첨부일련번호목록
	private List<Integer> arrRepFileAttSq = new ArrayList<>();	
}
