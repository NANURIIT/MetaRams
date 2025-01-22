package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS431BDTO;
import com.nanuri.rams.business.common.vo.IBIMS431BVO;

@Mapper
public interface IBIMS431BMapper {

    // 지급품의목록
    public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param);

    public int insertIBIMS431B (IBIMS431BVO param);

    public int updateIBIMS431B (IBIMS431BDTO param);

    public int apvlRqst (IBIMS431BVO param);

    public int deleteIBIMS431B (IBIMS431BVO param);

    public String getCnstNo (IBIMS431BVO param);

    public String setCnstNo (String param);
}
