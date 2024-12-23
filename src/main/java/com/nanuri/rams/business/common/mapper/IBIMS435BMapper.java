package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS435BDTO;

@Mapper
public interface IBIMS435BMapper {
    
    public List<IBIMS435BDTO> inqIBIMS435B (String param);

    public int insertIBIMS435B (IBIMS435BDTO param);

    public int updateIBIMS435B (IBIMS435BDTO param);

    public int deleteIBIMS435B (IBIMS435BDTO param);

    public int getRgstSeq (String param);

}
