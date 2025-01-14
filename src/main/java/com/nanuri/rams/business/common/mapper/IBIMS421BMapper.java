package com.nanuri.rams.business.common.mapper;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;

@Mapper
/*
 *  수수료기본
 */
public interface IBIMS421BMapper {
    
    public List<IBIMS421BDTO> IBIMS421BSelect(IBIMS421BDTO param);

    public int IBIMS421BInsert(IBIMS421BDTO param);

    public int IBIMS421BUpdate(IBIMS421BDTO param);
    
    public int mergeFeeKndCd(IBIMS421BDTO param);

    public int IBIMS421BDelete(IBIMS421BDTO param);
    
    public List<Map<String, Object>> getSelectBox();				// 셀렉트박스 코드, 밸류 취득
}