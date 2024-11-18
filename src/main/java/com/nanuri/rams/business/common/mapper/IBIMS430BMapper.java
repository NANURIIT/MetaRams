package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.dto.IBIMS430BDTO;

@Mapper
public interface IBIMS430BMapper {

    //public List<IBIMS430BVO> getDprtDtls(IBIMS430BVO param);

    //입금내역조회
    public List<IBIMS430BVO> getRctmDtls(IBIMS430BVO param);

    public Integer getNxtRctmSeq(String rctmDt);

    public Integer getNxtRgstSeq(String rgstDtm);

    //입금내역등록
    public int rctmDtlsRgst(List<IBIMS430BDTO> paramList);

    //입금내역매핑
    public int rctmDtlsMapping(List<IBIMS430BDTO> paramList);

    //입금내역매핑 조회
    public List<IBIMS430BVO> dptrDtlsInq(IBIMS430BVO param);

    public List<IBIMS430BVO> getDptrDtlsList(IBIMS430BDTO param);
}
