package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS348BVO;

@Mapper
public interface IBIMS348BMapper {

	List<IBIMS348BVO> selectListIBIMS348B(IBIMS348BVO param);
	// 딜승인수수료스케쥴기본
	List<IBIMS348BVO> selectFeeScxInfoList(String param);
	
	IBIMS348BVO selectOneFeeScxInfo(IBIMS348BVO param);

	IBIMS348BVO selectTrsnFeeSnInfo(IBIMS348BVO param);
	
	int updateFeeScxInfo(IBIMS348BVO param);
	
	int updateFeeScxInfo2(IBIMS348BVO param);

	// 수수료스케줄관리 저장
	public int insertFeeSch(IBIMS348BVO input);
	
	public int insertIBIMS348Blist(List<IBIMS348BVO> input);
	
	// 수수료스케줄관리 수정
	public int updateFeeSch(IBIMS348BVO input);

	// 수수료스케줄관리 삭제
	public int deleteFeeSch(IBIMS348BVO input);
	
	public int deleteIBIMS348B(IBIMS348BVO input);
	
	// 수수료일련번호 채번
	public int getFeeSn(String input);
}
