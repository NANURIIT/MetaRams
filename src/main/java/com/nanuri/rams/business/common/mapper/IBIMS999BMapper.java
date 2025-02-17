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

    /**
     * 기준일자의 영업일 구하기
     * @param 
     * @return
     */
    public IBIMS999BDTO getBzDd(String param);
    
}
