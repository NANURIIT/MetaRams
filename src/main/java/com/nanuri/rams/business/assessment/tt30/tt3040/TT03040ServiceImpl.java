package com.nanuri.rams.business.assessment.tt30.tt3040;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.tt.TT03040SDTO;
import com.nanuri.rams.business.common.tt.TT03040SMapper;
import com.nanuri.rams.business.common.tt.TT03040SVO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TT03040ServiceImpl implements TT03040Service {
	private final TT03040SMapper tt03040sMapper;

	@Override
	public List<IBIMS101BVO> ibSpecSearch(TT03040SDTO data) {
		return tt03040sMapper.ibSpecSearch(data);
	}
}
