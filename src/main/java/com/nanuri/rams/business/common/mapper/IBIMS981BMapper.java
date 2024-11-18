package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

import com.nanuri.rams.business.common.vo.IBIMS981BVO;

@Mapper
public interface IBIMS981BMapper {
    
    public List<IBIMS981BVO> selectIBIMS981B(IBIMS981BVO param);

    public int batchInsertIBIMS981B();

    public int batchDeleteIBIMS981B();

}
