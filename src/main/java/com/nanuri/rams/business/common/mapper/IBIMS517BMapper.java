package com.nanuri.rams.business.common.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS517BDTO;
import com.nanuri.rams.business.common.vo.IBIMS501BVO;

@Mapper
public interface IBIMS517BMapper {

    public int saveUdwrtPaiBzscalInfo(IBIMS517BDTO param);

    public List<IBIMS517BDTO> getUdwrtPaiBzscalInfo(IBIMS501BVO param);
    
}
