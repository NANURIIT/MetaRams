package com.nanuri.rams.business.common.mapper;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS204BDTO;
import com.nanuri.rams.business.common.vo.IBIMS204BVO;
import com.nanuri.rams.com.dto.CalculationDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IBIMS204BMapper {

    // 데이터 조회
    public List<IBIMS204BDTO> selectIBIMS204B(IBIMS204BDTO data);

    // 데이터 추가
    public int insertIBIMS204B(IBIMS204BVO data);

    // 데이터 업데이트
    public int updateIBIMS204B(IBIMS204BVO data);

    // 데이터 삭제
    public int deleteIBIMS204B(IBIMS204BVO data);

    public BigDecimal getMdwyRdmpFeeRto(CalculationDTO calcDTO);

    // 중도상환수수료 건수
    public int countMdwyRdmpFee(String input);
    
}
