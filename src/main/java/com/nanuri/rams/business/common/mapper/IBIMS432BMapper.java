package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS432BVO;

import java.util.List;

@Mapper
public interface IBIMS432BMapper {

    public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param);

    public int insertIBIMS432B(IBIMS432BVO param);

    public int updateIBIMS432B(IBIMS432BVO param);
    
    public int deleteIBIMS432B(IBIMS432BVO param);


}
