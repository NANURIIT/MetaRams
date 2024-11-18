package com.nanuri.rams.business.common.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.MO44020SVO;

@Mapper
public interface MO44020Mapper {

    // 승인조건 사전관리 조회
    List<MO44020SVO> getPacmList(HashMap<String, Object> params);

}
