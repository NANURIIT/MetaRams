package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;

@Mapper
public interface IBIMS811BMapper {

    public List<IBIMS810BDTO> selectIBIMS811B(IBIMS810BDTO data);
    public int deleteIBIMS811B(String data);
    public int insertIBIMS811B(IBIMS810BVO data);
    
}
