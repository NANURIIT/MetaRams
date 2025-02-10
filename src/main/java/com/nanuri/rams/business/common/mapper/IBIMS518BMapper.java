package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS518BVO;
import com.nanuri.rams.business.common.vo.IBIMS518BVO2;

@Mapper
public interface IBIMS518BMapper {
	
	// 투자기업 조회
	List<IBIMS518BVO> getInvstBzscalList(IBIMS501BVO param);

	// 투자기업 등록
	int saveInvstEprzInfo(IBIMS518BVO2 param);

	// 투자기업 삭제
	int delInvstEprzInfo(IBIMS518BVO2 param);
	
}
