package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;

@Mapper
public interface IBIMS603BMapper {

	List<IBIMS603BDTO> selectIBIMS603B(IBIMS601BVO param);

	int insertIBIMS603B(IBIMS603BDTO param);

	int updateIBIMS603B(IBIMS601BVO param);

	//void deleteDealInfo(IBIMS601BVO param);

	int deleteIBIMS603B(IBIMS601BVO param);

}
