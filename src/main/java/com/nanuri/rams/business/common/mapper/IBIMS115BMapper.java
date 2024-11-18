package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import com.nanuri.rams.business.common.vo.TB05020SVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface IBIMS115BMapper {

    int insert115B(List<IBIMS115BDTO> paramData);


    List<IBIMS115BVO> getMMBRInfo(IBIMS115BDTO paramData);


    int delete115B(IBIMS111BDTO paramData);

    // 위원별 안건조회
    List<TB05020SVO> getDealInfoByEno(Map<String,String> paramData);

    int updateAprvOppsDcd(IBIMS115BDTO paramData);

    // 협의체 현황 및 결과조회 위원정보 조회
    List<IBIMS115BVO> getMMBRInfoTB05030S(Map<String, Object> paramData);

    // 협의체 현황 및 결과조회 의결내용 확정
    int confirmMMBRInfo(List<Map<String, Object>> paramData);
    // 협의체 현황 및 결과조회 의결내용 취소
    int cancelMMBRInfo(List<Map<String, Object>> paramData);
}
