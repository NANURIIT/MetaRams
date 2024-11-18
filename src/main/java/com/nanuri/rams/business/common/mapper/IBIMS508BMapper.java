package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.vo.IBIMS508BVO2;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS508BVO;

@Mapper
public interface IBIMS508BMapper {
	
	// 관련사업 조회
	List<IBIMS508BVO> getBusiInfo(String param);
	
	// 관련사업 등록
	int saveBusiInfo(List<IBIMS508BVO> param);

	// 관련사업 삭제
	int delBusiInfo(String param);

}
