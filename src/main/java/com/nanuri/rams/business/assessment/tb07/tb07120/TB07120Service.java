package com.nanuri.rams.business.assessment.tb07.tb07120;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS452BVO;
import com.nanuri.rams.business.common.vo.TB07120SVO;

@Service
public interface TB07120Service {

	public List<TB07120SVO> get07120sList(IBIMS410BVO param);

	public int updateFndsCnstDecd(TB07120SVO param);
}
