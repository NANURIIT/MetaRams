package com.nanuri.rams.business.assessment.tb07.tb07090;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.vo.TB07090SVO;


@Service
public interface TB07090Service {
    
    public TB07090SVO getDprtDtlsInfo(IBIMS430BVO param);

    //입금내역등록
    public int rctmDtlsRgst(List<IBIMS430BDTO> paramList);

    //입금내역매핑
    public int rctmDtlsMapping(List<IBIMS430BDTO> paramList);

}
