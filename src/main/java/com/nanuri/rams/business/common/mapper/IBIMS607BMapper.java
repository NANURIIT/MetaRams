package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS607BDTO;
import com.nanuri.rams.business.common.vo.IBIMS607BVO;

@Mapper
public interface IBIMS607BMapper {
	// 부실자산재산조사정보 Mapper
	// 조회
	public List<IBIMS607BVO> getEsttDetail(IBIMS607BDTO esttInfo);

	// 등록
	public int registEsttInfo(IBIMS607BDTO esttInfo);

	// 수정
	public int updateEsttInfo(IBIMS607BDTO esttInfo);

	// 삭제
	public int deleteEsttInfo(IBIMS607BDTO esttInfo);

	// 일련번호 조회
	public IBIMS607BDTO getEsttSq(IBIMS607BDTO dtoSq);
}
