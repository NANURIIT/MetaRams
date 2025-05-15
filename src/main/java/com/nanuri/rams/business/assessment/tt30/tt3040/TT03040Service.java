package com.nanuri.rams.business.assessment.tt30.tt3040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.tt.TT03040SDTO;
import com.nanuri.rams.business.common.tt.TT03040SVO;

@Service
public interface TT03040Service {
	public List<TT03040SVO> ibSpecSearch(TT03040SDTO data);
}
