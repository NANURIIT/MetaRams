package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.vo.IBIMS701BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 금융감독원보고자료관리
 * */
public interface IBIMS701BMapper {

    // 데이터 조회
    public List<IBIMS701BDTO> selectIBIMS701B(IBIMS701BVO data);

    //등록 insert
    public int insertIBIMS701B(List<IBIMS701BDTO> list);

    // 등록일련번호 구하기
    public int getRgstSn();

    // 기준월 삭제
    public int deleteCpcStdrYm (String param);
    
}
