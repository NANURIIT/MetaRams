package com.nanuri.rams.business.common.mapper;

import java.math.BigDecimal;
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

    // public Integer getNxtRctmSeq(String rctmDt);

    public Integer getNxtRctmSeq(String rgstDtm);

    //입금내역등록
    public int rctmDtlsRgst(List<IBIMS430BDTO> paramList);

    //입금내역매핑
    public int rctmDtlsMapping(List<IBIMS430BDTO> paramList);

    //입금내역매핑 조회
    public List<IBIMS430BVO> dptrDtlsInq(IBIMS430BVO param);

    public List<IBIMS430BVO> getDptrDtlsList(IBIMS430BDTO param);

    // 입금내역매핑 입력
    public int insertIBIMS430B (IBIMS430BDTO param);

    // 입금내역매핑 수정
    public int updateIBIMS430B (IBIMS430BDTO param);

    // 입금내역매핑 삭제
    public int deleteIBIMS430B (IBIMS430BDTO param);

     /**
     * 입금내역매핑
     * fasdfasdgasdgasgawregargaw
     */
     public List<IBIMS430BVO> getYesDealList (IBIMS430BVO param);
     
    /**
     * 이미 입력된 상환예정 내역인지 확인
     */
    public int chkRctmDtlsMapping (IBIMS430BDTO param);

    /**
     * 딜입금금액 체크
     */
    public BigDecimal inqDealRctmAmt (IBIMS430BDTO param);
    
}

