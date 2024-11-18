package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AB01011SVO;

//CALL Report 등록
@Mapper
public interface RAB01AMapper {

	public List<AB01011SVO> getEntpList(String entpNm);

}
