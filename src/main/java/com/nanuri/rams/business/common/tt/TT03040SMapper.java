package com.nanuri.rams.business.common.tt;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS101BVO;

@Mapper
public interface TT03040SMapper {
	public List<IBIMS101BVO> ibSpecSearch(TT03040SDTO data);

	public List<TT03040SVO> dealNameSearch(TT03040SDTO dealNo);
}
