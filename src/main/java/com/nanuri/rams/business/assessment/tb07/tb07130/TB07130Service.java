package com.nanuri.rams.business.assessment.tb07.tb07130;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS451BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS451BVO;

@Service
public interface TB07130Service {

	public List<IBIMS451BVO> selectIBIMS451B(IBIMS451BDTO param);

	public List<IBIMS410BVO> thdtTrDtlsGetData(IBIMS451BDTO param);

}
