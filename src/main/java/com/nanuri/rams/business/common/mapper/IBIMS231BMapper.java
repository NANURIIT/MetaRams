package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;

@Mapper
public interface IBIMS231BMapper {

    /**
     * 결재요청내역 조회
     * @param paramData
     * @return
     */
	public List<IBIMS003BVO> apvlListChk (IBIMS231BDTO paramData);

}