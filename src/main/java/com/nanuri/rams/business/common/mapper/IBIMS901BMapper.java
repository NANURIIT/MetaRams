package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS901BDTO;

@Mapper
public interface IBIMS901BMapper {

    /**
     * SPC유동화증권발행내역
     * @param param 기업체번호
     * @return
     */
    public List<IBIMS901BDTO> pblHisList (String param);

}