package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA63BDTO;
import com.nanuri.rams.business.common.vo.RAA63BVO;

@Mapper
/*
 * 부실자산시효관리정보
 * */
public interface RAA63BMapper {
	// 조회
	public List<RAA63BVO> getEfctDetail(RAA63BVO efctInfo);
	
	// 등록
	public int registEfctInfo(RAA63BDTO efctInfo);
	
	// 수정
	public int updateEfctInfo(RAA63BDTO efctInfo);
	
	// 삭제
	public int deleteEfctInfo(RAA63BVO efctInfo);
	
	// 일련번호 조회
	public RAA63BDTO getEfctSq(RAA63BDTO efctInfo);
}
