package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS109BDTO;
import com.nanuri.rams.business.common.vo.IBIMS109BVO;

@Mapper
public interface IBIMS109BMapper {

	List<IBIMS109BVO> getEnsrInfo(IBIMS109BDTO ensrInfo);

	int deleteEnsrInfo(IBIMS109BDTO ensrInfo);

	int registEnsrInfo(IBIMS109BDTO ensrInfo);

	int updateEnsrInfo(IBIMS109BDTO ensrInfo);

}
