package com.nanuri.rams.business.assessment.tb07.tb07210;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;

@Service
public interface TB07210Service {

	public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param);

	public IBIMS232BVO spcDecdDetail(IBIMS232BVO param);

}
