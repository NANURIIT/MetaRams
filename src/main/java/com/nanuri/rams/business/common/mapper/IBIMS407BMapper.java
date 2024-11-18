package com.nanuri.rams.business.common.mapper;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS407BDTO;
import com.nanuri.rams.business.common.vo.IBIMS407BVO;

import java.util.List;

@Mapper
/*
 *  출자금 거래등록
 */
public interface IBIMS407BMapper {
    
    public List<IBIMS407BVO> getFincList(IBIMS407BDTO param);

    public int insertFinc (IBIMS407BDTO param);

    public int updateFinc (IBIMS407BDTO param);

    public int deleteFinc (IBIMS407BDTO param);

}
