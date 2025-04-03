package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS232BVO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

@Mapper
public interface IBIMS900BMapper {

    public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param);

    public List<IBIMS900BVO> selectSpcDecdList(IBIMS900BVO param);

    public IBIMS232BVO spcDecdDetail(IBIMS232BVO param);

    public List<IBIMS900BVO> selectBalanceInfoList(IBIMS900BVO param);

    public int spcWrkRqstSave(IBIMS900BVO param);

    public int getNxtFincExcuRqsSn();

}