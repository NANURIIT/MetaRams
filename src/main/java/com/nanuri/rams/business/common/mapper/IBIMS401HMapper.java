package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;

@Mapper
public interface IBIMS401HMapper {

	public int insertIBIMS401H(IBIMS401BDTO param);

	public int rgstIBIMS401H(IBIMS401BVO param);

}
