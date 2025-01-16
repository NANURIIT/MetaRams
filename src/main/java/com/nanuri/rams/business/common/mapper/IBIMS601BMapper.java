package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS601BVO;

@Mapper
public interface IBIMS601BMapper {

	IBIMS601BVO selectIBIMS601B(IBIMS601BVO param);

	int insertIBIMS601B(IBIMS601BVO param);

	int updateIBIMS601B(IBIMS601BVO param);

	int deleteIBIMS601B(IBIMS601BVO param);

}
