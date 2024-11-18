package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS800BDTO;
import com.nanuri.rams.business.common.vo.IBIMS800BVO;
import com.nanuri.rams.business.common.vo.TB08090SVO;


@Mapper
public interface IBIMS800BMapper {

    //데이터 존재여부 확인 (기준일자 기준)
    public int checkStdrDtInfo(String stdrDt);

    //건전성 조회(IBIMS800B 테이블에 기준일자 데이터 없을 시)
    public List<IBIMS800BVO> getAsstSnnGrdListNoStdrDt();

    //건전성 조회(기준일자 데이터 있을 시)
    public List<IBIMS800BVO> getAsstSnnGrdListStdrDt(String stdrDt);

    //기준일자 데이터 삭제
    public int dltAsstSnnList(TB08090SVO param);

    //건전성 및 충당금 insert
    public int insertAsstSnnList(List<IBIMS800BDTO> paramList);

}
