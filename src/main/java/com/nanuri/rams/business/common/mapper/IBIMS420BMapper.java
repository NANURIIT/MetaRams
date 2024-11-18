package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS420BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;

@Mapper
public interface IBIMS420BMapper {

	public long getMaxTrSn(String param);

	public IBIMS420BDTO selectOneIBIMS420BInfo(IBIMS420BDTO param);

	public int insertIBIMS420B(IBIMS420BDTO param);

	public void deleteIBIMS420B(IBIMS420BDTO param);
	
	List<IBIMS420BVO> selectFeeRcivLst(String param);
	
	// 딜수수료내역 조회
	public List<IBIMS420BVO> selectFeeRcivDtls(IBIMS420BDTO input);

	public List<IBIMS420BVO> getTB07190SData(IBIMS420BVO param);

}
