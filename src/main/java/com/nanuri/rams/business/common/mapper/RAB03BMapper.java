package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnDeptNoInfo;

//CALL Report 등록
@Mapper
public interface RAB03BMapper {

	// 지정조회 부서 등록
	public int insertRepDsgnDeptNoInfo(List<repDsgnDeptNoInfo> paramData);

}
