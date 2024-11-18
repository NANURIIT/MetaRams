package com.nanuri.rams.business.assessment.tb09.tb09090;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.dto.IBIMS702BDTO;
import com.nanuri.rams.business.common.dto.IBIMS703BDTO;
import com.nanuri.rams.business.common.dto.IBIMS704BDTO;
import com.nanuri.rams.business.common.vo.IBIMS701BVO;
import com.nanuri.rams.business.common.vo.IBIMS702BVO;
import com.nanuri.rams.business.common.vo.IBIMS703BVO;
import com.nanuri.rams.business.common.vo.IBIMS704BVO;

@Service
public interface TB09090Service {
    
    // CPC 보고서 조회
    public List<IBIMS704BDTO> selectIBIMS704B(IBIMS704BVO data);
    public int insertIBIMS704B(IBIMS704BDTO data);

    // CPC 보고서 양식
    public List<IBIMS701BDTO> selectIBIMS701B(IBIMS701BVO data);
    public List<IBIMS702BDTO> selectIBIMS702B(IBIMS702BVO data);
    public List<IBIMS703BDTO> selectIBIMS703B(IBIMS703BVO data);

    // CPC1 보고서 저장
    public int insertIBIMS701B(IBIMS701BVO data);
    public int insertIBIMS702B(IBIMS702BVO data);
    public int insertIBIMS703B(IBIMS703BVO data);




}
