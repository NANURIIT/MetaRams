package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS902BVO;

@Mapper
public interface IBIMS902BMapper {

    public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param);

}