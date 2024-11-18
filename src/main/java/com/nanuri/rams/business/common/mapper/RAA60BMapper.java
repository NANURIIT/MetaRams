package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA60BDTO;
import com.nanuri.rams.business.common.vo.RAA60BVO;

@Mapper
/*
 * 부실자산관리이력정보
 * */
public interface RAA60BMapper {
	// 관리이력 조회
	public List<RAA60BVO> getEamDetail(RAA60BVO eamInfo);
	
	// 관리이력 등록
	public int registEamInfo(RAA60BDTO eamInfo);
	
	// 관리이력 수정
	public int updateEamInfo(RAA60BDTO eamInfo);
	
	// 관리이력 삭제
	public int deleteEamInfo(RAA60BVO eamInfo);
	
	// 관리이력 일련번호 조회
	public RAA60BDTO getEamSq(RAA60BDTO eamInfo);
}
