package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS999BDTO;

@Mapper
public interface IBIMS999BMapper {
    
    //  단 한건만 반환함
    public String nowBzDd();

    public String bzDdVl(String param);

    public String selectDD1AF();

    public int insert(String param);

    public int delete();

    public String getFormattedBzDd();

    public IBIMS999BDTO getBzDd(String param);
    
}
