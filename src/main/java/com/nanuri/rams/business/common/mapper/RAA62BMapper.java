package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA62BDTO;
import com.nanuri.rams.business.common.vo.RAA62BVO;

@Mapper
/*
 * 부실자산법적절차정보
 * */
public interface RAA62BMapper {
	// 조회
	public List<RAA62BVO> getLglDetail(RAA62BVO lglInfo);
	
	// 등록
	public int registLglInfo(RAA62BDTO lglInfo);
	
	// 수정
	public int updateLglInfo(RAA62BDTO lglInfo);
	
	// 삭제
	public int deleteLglInfo(RAA62BVO lglInfo);
	
	// 일련번호 조회
	public RAA62BDTO getLglSq(RAA62BDTO lglInfo);
	
}
