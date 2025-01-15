package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS611BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;

@Mapper
public interface IBIMS611BMapper {

	List<IBIMS611BDTO> selectIBIMS611B(IBIMS601BVO param);
	
	int saveIBIMS611B(List<IBIMS611BDTO> param);
	
	//int insertIBIMS611B(List<IBIMS611BVO> param);
  void insertIBIMS611B(IBIMS611BDTO param);

	int updateIBIMS611B(IBIMS601BVO param);

	void deleteIBIMS611B(IBIMS601BVO param);


}
