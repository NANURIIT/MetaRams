package com.nanuri.rams.business.assessment.tb09.tb09060;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

@Service
public interface TB09060Service {

    public int insert(IBIMS997BDTO param);
    
    //연체내역조회기본
    public List<IBIMS436BVO> getOvduDtls(IBIMS436BVO param);
    
    //연체내역조회일일
    public List<IBIMS437BDTO> getOvduDailyDtls(IBIMS437BDTO param);

    //연체내역확정여부저장
    public int saveDcsn(IBIMS436BVO param);
}
