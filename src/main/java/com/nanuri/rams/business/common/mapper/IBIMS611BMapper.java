package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS601BVO;
import com.nanuri.rams.business.common.vo.IBIMS611BVO;

@Mapper
public interface IBIMS611BMapper {

	List<IBIMS611BVO> selectIBIMS611B(IBIMS601BVO param);
	
	int saveIBIMS611B(List<IBIMS611BVO> param);
	
	int insertIBIMS611B(List<IBIMS611BVO> param);

	int updateIBIMS611B(List<IBIMS611BVO> param);

	void deleteIBIMS611B(IBIMS601BVO param);

}
