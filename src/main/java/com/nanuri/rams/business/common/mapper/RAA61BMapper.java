package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA61BDTO;
import com.nanuri.rams.business.common.vo.RAA61BVO;

@Mapper
public interface RAA61BMapper {
	// 부실자산재산조사정보 Mapper
	// 조회
	public List<RAA61BVO> getEsttDetail(RAA61BVO esttInfo);
	
	// 등록
	public int registEsttInfo(RAA61BDTO esttInfo);
	
	// 수정
	public int updateEsttInfo(RAA61BDTO esttInfo);
	
	// 삭제
	public int deleteEsttInfo(RAA61BVO esttInfo);
	
	// 일련번호 조회
	public RAA61BDTO getEsttSq(RAA61BDTO dtoSq);
	
}
