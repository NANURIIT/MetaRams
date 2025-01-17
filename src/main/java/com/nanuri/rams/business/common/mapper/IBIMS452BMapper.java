package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS452BDTO;

@Mapper
public interface IBIMS452BMapper {

    // 최초 승인 신청시 정보 입력
    public int insertFndsCnstDecd(IBIMS452BDTO param);

    // 추후 승인 신청, 반려, 취소 업데이트
    public int updateFndsCnstDecd(IBIMS452BDTO param);

    // 등록순번 채번
    public int getErlmSeq();

}
