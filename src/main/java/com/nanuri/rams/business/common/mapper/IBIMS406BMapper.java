package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS406BDTO;
import com.nanuri.rams.business.common.vo.IBIMS406BVO;

@Mapper
public interface IBIMS406BMapper {

	// 실행일련번호 채번
	public int getExcSn(IBIMS406BDTO param);

	// 기업여신실행정보 INSERT Auto Key
	public int insertIBIMS0406B(IBIMS406BDTO param);
	
	// 여신이자계산내역
	public List<IBIMS406BVO> selectIntrTrDtls(IBIMS406BDTO input);	
}
