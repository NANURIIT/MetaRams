package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface TEST101BMapper {
    // 조회
    public TEST101BVO getDealDetail(TEST101BDTO test101bdto);
}
