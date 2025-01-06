package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB06080SVO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;

@Mapper
public interface IBIMS232BMapper {
	
	// 결재내역 조회
	public List<TB06080SVO.ApvlList> inqTB06080S(TB06080SVO input);
	public List<TB06080SVO.GbckList> inqIBMS232B(TB06080SVO.ApvlList input);

	/**
 	 * 결재담당자 입력
	 * @param paramData
	 * @return
	 */
	public int apvlRqst (IBIMS232BDTO paramData);

	/**
	 * 승인상태관리
	 */
	public int updateDecd (IBIMS232BDTO paramData);

	/**
	 * 결재순번 가져오기
	 */
	public int getDecdSq (IBIMS232BDTO paramData);

}