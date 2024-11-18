package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.RAC06BDTO;
import com.nanuri.rams.business.common.dto.TB03020DTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RAC06BMapper {

	// 공동영업관리자 조회
	public List<RAC06BDTO> getMngPInfo(String mngDealNo);

	// 공동영업관리자 저장
	public int saveMngPInfo(TB03020DTO dealInfo);

	// 공동영업관리자 삭제
	public int deleteMngPInfo(String selectedDeal);

}
