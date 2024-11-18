package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS108BDTO;
import com.nanuri.rams.business.common.vo.IBIMS108BVO;

@Mapper
public interface IBIMS108BMapper {

	List<IBIMS108BVO> getMrtgInfo(IBIMS108BDTO mrtgInfo);

	int updateMrtgInfo(IBIMS108BDTO mrtgInfo);

	int registMrtgInfo(IBIMS108BDTO mrtgInfo);

	int deleteMrtgInfo(IBIMS108BDTO mrtgInfo);

}
