package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS451BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

@Mapper
public interface IBIMS451BMapper {

    public List<IBIMS451BDTO> selectIBIMS451B(IBIMS451BDTO param);

    public List<IBIMS410BVO> thdtTrDtlsGetData(IBIMS451BDTO param);

}
