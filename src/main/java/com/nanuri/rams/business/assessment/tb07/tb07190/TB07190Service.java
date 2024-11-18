package com.nanuri.rams.business.assessment.tb07.tb07190;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS420BVO;

@Service
public interface TB07190Service {

	public List<IBIMS420BVO> getTB07190SData(IBIMS420BVO param);

}
