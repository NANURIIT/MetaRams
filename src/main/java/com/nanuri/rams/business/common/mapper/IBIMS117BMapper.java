package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;

import java.util.Map;

@Mapper
public interface IBIMS117BMapper {

    void insertSndCndt(Map<String, Object> param);

    void deleteSndCndt(Map<String, Object> param);

}