package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.dto.IBIMS702BDTO;
import com.nanuri.rams.business.common.vo.IBIMS702BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 금융감독원보고자료관리
 */
public interface IBIMS702BMapper {

    // 조회
    public List<IBIMS702BDTO> selectIBIMS702B(IBIMS702BVO data);

    // 등록 insert
    public int insertIBIMS702B(List<IBIMS702BDTO> list);

    // 등록일련번호 구하기
    public int getRgstSn();

    // 기준월 삭제
    public int deleteCpcStdrYm (String param);

}
