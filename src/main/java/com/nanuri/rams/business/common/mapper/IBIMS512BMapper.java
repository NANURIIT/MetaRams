package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS512BVO;
import com.nanuri.rams.business.common.vo.IBIMS512BVO2;

@Mapper
public interface IBIMS512BMapper {
	
	// 편입자산 정보
	List<IBIMS512BVO> getAdmsAsstInfo(IBIMS501BVO param);
	
	// 편입자산 등록
	int saveAdmsAsstInfo(IBIMS512BVO2 param);

	// 편입자산 삭제
	int delAdmsAsstInfo(IBIMS512BVO2 param);

}
