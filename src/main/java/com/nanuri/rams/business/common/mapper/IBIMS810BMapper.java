package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;

@Mapper
public interface IBIMS810BMapper {
    
    public List<IBIMS810BDTO> selectIBIMS810B(IBIMS810BDTO data);
    public int deleteIBIMS810B(String data);
    public int insertIBIMS810B(IBIMS810BVO data);

    // 미사용
    public int updateIBIMS810B(IBIMS810BDTO data);


}
