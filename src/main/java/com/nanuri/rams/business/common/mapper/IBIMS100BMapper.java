package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO.selectVO;

@Mapper
public interface IBIMS100BMapper {
	
	/**
	 * 오늘의할일추가를 위한 (SQ)조회
	 * @param getSeq
	 * @return
	 */
	public int getSeqNo(IBIMS100BDTO getSeq);
	
	
	/**
	 * 오늘의할일 summery조회
	 * @param getSummary
	 * @return
	 */
	public List<IBIMS100BVO> getSummaryInfo(IBIMS100BVO getSummary);			
	
	/**
	 * 오늘의할일조회
	 * @param selInfo
	 * @return
	 */
	public List<IBIMS100BVO.selectVO> selectIBIMS100BInfo(selectVO selInfo);	
	
	/**
	 * 오늘의할일등록
	 * @param insertInfo
	 * @return
	 */
	public int insertIBIMS100BInfo(IBIMS100BDTO insertInfo);				
	
	/**
	 * 오늘의할일변경(결재)
	 * @param updateInfO
	 * @return
	 */
	public int updateIBIMS100BInfO(IBIMS100BDTO updateInfO);	
	
	/**
	 * 오늘의할일변경(결재요청취소)
	 * @param deleteInfo
	 * @return
	 */
	public int deleteIBIMS100BInfo(IBIMS100BDTO deleteInfo);							

}
