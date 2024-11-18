package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS606BDTO;
import com.nanuri.rams.business.common.vo.IBIMS606BVO;

@Mapper
public interface IBIMS606BMapper {

	List<IBIMS606BVO> getEamDetail(IBIMS606BDTO eamInfo);

	// 관리이력 일련번호 조회
	public IBIMS606BDTO getEamSq(IBIMS606BDTO eamInfo);

	// 관리이력 등록
	public int registEamInfo(IBIMS606BDTO eamInfo);

	// 관리이력 수정
	public int updateEamInfo(IBIMS606BDTO eamInfo);

	// 관리이력 삭제
	public int deleteEamInfo(IBIMS606BDTO eamInfo);
}
