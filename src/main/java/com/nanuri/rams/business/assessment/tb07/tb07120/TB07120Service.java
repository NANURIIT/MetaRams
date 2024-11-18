package com.nanuri.rams.business.assessment.tb07.tb07120;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS452BVO;

@Service
public interface TB07120Service {

	public List<IBIMS410BVO> get07120sList(IBIMS410BVO param);

	public int insertFndsCnstDecd(IBIMS452BVO param);

	public int updateFndsCnstDecd(IBIMS452BVO param);
}
