package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS998BDTO;
import com.nanuri.rams.business.common.vo.IBIMS998BVO;

@Mapper
public interface IBIMS998BMapper {
    
    // 마감기본 영업일 기준 단건 조회
    public List<IBIMS998BDTO> selectTB10720S(IBIMS998BDTO input);
    
    // 마감관리 개시/마감 실행
    public int openTB10720S(IBIMS998BDTO input);
    public int closeTB10720S(IBIMS998BDTO input);
    
    
}
