package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

import com.nanuri.rams.business.common.vo.IBIMS206BVO;

@Mapper
public interface IBIMS206BMapper {
    
    public List<IBIMS206BVO> getSPPIData(IBIMS206BVO param);

    public int insertSPPIData(IBIMS206BVO param);

    public int updateSPPIData(IBIMS206BVO param);
    
    public int deleteSPPIData(IBIMS206BVO param);
    

}
