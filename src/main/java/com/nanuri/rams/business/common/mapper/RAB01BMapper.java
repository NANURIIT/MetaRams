package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAB01BDTO;
import com.nanuri.rams.business.common.vo.AB01011SVO;

//CALL Report 등록
@Mapper
public interface RAB01BMapper {

	public List<AB01011SVO> getRepNo(String repNo);

	// 신규등록
	public int registCallReportInfo(RAB01BDTO callReportInfo);

}
