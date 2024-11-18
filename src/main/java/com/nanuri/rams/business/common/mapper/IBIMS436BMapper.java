package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS436BDTO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;

@Mapper
public interface IBIMS436BMapper {

    //연체내역조회기본
    public List<IBIMS436BVO> getOvduDtls(IBIMS436BVO param);

    //연체확정여부저장
    public int saveDcsn(IBIMS436BVO param);
}
