package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.vo.IBIMS116BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface IBIMS116BMapper {

    // 공동관리자 정보 조회
    List<IBIMS116BVO> getEnoPList(String dealNo);

    // 공동관리자 정보 저장
    int registMngP(List<IBIMS116BVO> paramData);

    // 공동관리자 정보 삭제
    int deleteMngP(String dealNo);

}
