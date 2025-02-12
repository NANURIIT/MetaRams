package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS982BDTO;

@Mapper
public interface IBIMS982BMapper {

    /**
     * 파라미터값 구하기
     * @param param 기일관리번호
     * @return
     */
    public List<IBIMS982BDTO> getParameter ( String param );
    
}
