package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS704BDTO;
import com.nanuri.rams.business.common.vo.IBIMS704BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 금융감독원보고자료관리
 * */
public interface IBIMS704BMapper {

    //조회
    public List<IBIMS704BDTO> selectIBIMS704B(IBIMS704BVO data);

    //확정 update
    public int updateIBIMS704B(IBIMS704BVO data);

    //등록시 발생
    public int insertIBIMS704B(IBIMS704BVO data);
    
}
