package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS608BDTO;
import com.nanuri.rams.business.common.vo.IBIMS608BVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
/*
 * 부실자산법적절차정보
 * */
public interface IBIMS608BMapper {
    // 조회
    List<IBIMS608BVO> getLglDetail(IBIMS608BDTO lglInfo);

    // 등록
    int registLglInfo(IBIMS608BDTO lglInfo);

    // 수정
    int updateLglInfo(IBIMS608BDTO lglInfo);

    // 삭제
    int deleteLglInfo(IBIMS608BDTO lglInfo);

    // 일련번호 조회
    IBIMS608BDTO getLglSq(IBIMS608BDTO lglInfo);

}
