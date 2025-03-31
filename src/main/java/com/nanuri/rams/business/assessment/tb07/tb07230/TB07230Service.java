package com.nanuri.rams.business.assessment.tb07.tb07230;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS902BVO;

@Service
public interface TB07230Service {

	public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param);

}
