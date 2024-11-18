package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS212BDTO;
import com.nanuri.rams.business.common.vo.TB06013PVO;

@Mapper
public interface IBIMS212BMapper {

	int insertIBIMS212B(TB06013PVO searchParam);

	IBIMS212BDTO selectIBIMS212B(TB06013PVO searchParam);

	int updateIBIMS212B(TB06013PVO searchParam);

	int deleteIBIMS212B(TB06013PVO searchParam);

	List<TB06013PVO> getIBIMS212BDTOInfo(TB06013PVO param);

	int connectMrtgInfo(TB06013PVO searchParam);

}
