package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS820BDTO;
import com.nanuri.rams.business.common.vo.TB08060SVO;

@Mapper
public interface IBIMS820BMapper {

    //월말결산 선수이자 조회
    public List<TB08060SVO> getPrepaidIntrList(TB08060SVO param); 
    
    //월말결산 선수수료 조회
    public List<TB08060SVO> getPrepaidFeeList(TB08060SVO param); 

    //월말결산 미수이자 조회
    public List<TB08060SVO> getAccruedIntrList(TB08060SVO param); 

    //월말결산 평가손상 조회
    public List<TB08060SVO> getImprmtList(TB08060SVO param); 

    public int updateSettlement(List<IBIMS820BDTO> paramList);
    
    // 9020 업데이트
    public int deleteTB9020B(String data);
    public int insertTB9020B(String data);

    // 9030 업데이트
    public int deleteTB9030B(String data);
    public int insertTB9030B(String data);

    // 9040 업데이트
    public int deleteTB9040B(String data);
    public int insertTB9040B(String data);

    // 9050 업데이트
    public int deleteTB9050B(String data);
    public int insertTB9050B(String data);

}
