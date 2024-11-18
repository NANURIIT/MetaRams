package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA60BDTO;
import com.nanuri.rams.business.common.vo.PM22010SVO;
import com.nanuri.rams.business.common.vo.RAA60BVO;

@Mapper
/*
 * 사후관리 - 부실자산 사후관리
 * */
public interface PM22010Mapper {

	// 조회
	public List<PM22010SVO> getEamList(PM22010SVO eamList);
	
}
