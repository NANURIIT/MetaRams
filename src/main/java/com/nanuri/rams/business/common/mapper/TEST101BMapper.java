package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface TEST101BMapper {
    // 조회
    public TEST101BVO getDealInfo(TEST101BDTO test101bdto);

    /*
     * Insert
     * int 형식으로 
     */
    public int saveDealInfo(TEST101BDTO test101bdto);
}
