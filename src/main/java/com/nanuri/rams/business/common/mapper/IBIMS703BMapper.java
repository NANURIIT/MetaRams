package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.dto.IBIMS703BDTO;
import com.nanuri.rams.business.common.vo.IBIMS703BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 금융감독원보고자료관리
 * */
public interface IBIMS703BMapper {

    //조회
    public List<IBIMS703BDTO> selectIBIMS703B(IBIMS703BVO data);

    //등록 insert
    public int insertIBIMS703B(List<IBIMS703BDTO> list);

    // 등록일련번호 구하기
    public int getRgstSn();

    // 기준월 삭제
    public int deleteCpcStdrYm (String param);
    
}
