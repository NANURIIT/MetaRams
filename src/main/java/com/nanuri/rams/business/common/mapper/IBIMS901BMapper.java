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

    /**
     * 삭제해야할 유동화증권 발행(예정)내역
     * @param param
     * @return
     */
    public List<IBIMS901BDTO> deletedPblHisList (List<IBIMS901BDTO> param);

    /**
     * 유동화증권 발행내역 삭제
     * @param param
     * @return
     */
    public int deletePblHis (IBIMS901BDTO param);

}