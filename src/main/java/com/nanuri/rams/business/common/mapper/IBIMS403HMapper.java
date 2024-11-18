package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.dto.IBIMS403HDTO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB07050SVO;

@Mapper
public interface IBIMS403HMapper {
	
	// 스케줄이력조회
	public List<IBIMS403BDTO> selectIBIMS403H(IBIMS403BVO paramData);
	
	// 스케줄이력 생성
	public int insertIBIMS403H(List<IBIMS403BDTO> ibims403BVOList);

	// 여신스케줄기본 저장
	public int insertCrdlSchBss(IBIMS403BDTO input);

	// 여신스케줄기본 업데이트
	public int updateCrdlSchBss(IBIMS403BDTO input);

	public int deleteIBIMS403H(IBIMS403BVO input);
}
