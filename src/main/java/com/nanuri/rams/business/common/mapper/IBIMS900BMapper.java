package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

@Mapper
public interface IBIMS900BMapper {

    public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param);

    public List<IBIMS900BVO> selectSpcDecdList(IBIMS900BVO param);

    public List<IBIMS232BVO> spcDecdDetail(IBIMS232BVO param);

    public List<IBIMS900BVO> selectBalanceInfoList(IBIMS900BVO param);

    //자금집행업무지시요청 목록 저장
    public int spcWrkRqstSave(IBIMS900BVO param);

    //자금집행신청일련번호 채번
    public int getNxtFincExcuRqsSn();

    //자금집행업무지시요청 목록 수정
    public int spcWrkRqstUpdate(IBIMS900BVO param);

    // 자금집행업무지시요청 삭제 (단건)
    public int dltWrkRqst (IBIMS900BDTO param);

}