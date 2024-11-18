package com.nanuri.rams.business.common.mapper;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;

import java.util.List;

@Mapper
/*
 *  수수료기본
 */
public interface IBIMS421BMapper {
    
    public List<IBIMS421BDTO> IBIMS421BSelect(String param);

    public int IBIMS421BInsert(IBIMS421BDTO param);

    public int IBIMS421BUpdate(IBIMS421BDTO param);

    public int IBIMS421BDelete(IBIMS421BDTO param);

}