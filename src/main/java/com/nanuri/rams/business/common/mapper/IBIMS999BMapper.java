package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IBIMS999BMapper {
    
    //  단 한건만 반환함
    public String getBzDd();
    public String bzDdVl(String param);
    public String selectDD1AF();
    public int insert(String param);
    public int delete();

    public String getFormattedBzDd();
    
}
