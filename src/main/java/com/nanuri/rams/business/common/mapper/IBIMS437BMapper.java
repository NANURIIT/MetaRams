package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

@Mapper
public interface IBIMS437BMapper {

    // 연체내역 조회 (일별)
    List<IBIMS437BDTO> getOvduDailyDtls(IBIMS437BDTO param);

    // 연체내역 저장
    int insertOvduDailyDtls(IBIMS437BDTO param);
}

