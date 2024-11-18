package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnUsrNoInfo;

//CALL Report 등록
@Mapper
public interface RAB02BMapper {

	// 지정조회자 등록
	public int insertRepDsgnUsrNoInfo(List<repDsgnUsrNoInfo> paramData);

}
