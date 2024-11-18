package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAC07BDTO;
import com.nanuri.rams.business.common.vo.RAC07BVO;
import com.nanuri.rams.business.common.vo.RAC07BVO.selectVO;

@Mapper
public interface RAC07BMapper {
	
	/**
	 * 오늘의할일추가를 위한 (SQ)조회
	 * @param getSeq
	 * @return
	 */
	public int getSeqNo(RAC07BDTO getSeq);
	
	
	/**
	 * 오늘의할일 summery조회
	 * @param getSummary
	 * @return
	 */
	public List<RAC07BVO> getSummaryInfo(RAC07BVO getSummary);			
	
	/**
	 * 오늘의할일조회
	 * @param selInfo
	 * @return
	 */
	public List<RAC07BVO.selectVO> selectRAC07BInfo(selectVO selInfo);	
	
	/**
	 * 오늘의할일등록
	 * @param insertInfo
	 * @return
	 */
	public int insertRAC07BInfo(RAC07BDTO insertInfo);				
	
	/**
	 * 오늘의할일변경(결재)
	 * @param updateInfO
	 * @return
	 */
	public int updateRAC07BInfO(RAC07BDTO updateInfO);	
	
	/**
	 * 오늘의할일변경(결재요청취소)
	 * @param deleteInfo
	 * @return
	 */
	public int deleteRAC07BInfo(RAC07BDTO deleteInfo);							

}
