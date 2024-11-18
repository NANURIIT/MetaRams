package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB06013PVO;

@Mapper
public interface IBIMS215BMapper {

	int insertIBIMS215B(TB06013PVO searchParam);

	void deleteIBIMS215B(TB06013PVO searchParam);

}
