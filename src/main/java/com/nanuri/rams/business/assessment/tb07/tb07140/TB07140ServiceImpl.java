package com.nanuri.rams.business.assessment.tb07.tb07140;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS407BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS203BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS346BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS406BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS407BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS407BVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;
import com.nanuri.rams.com.acctPrcs.EtprCrdtGrntAcctProc;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07140ServiceImpl implements TB07140Service {
	
	/* 딜승인금리 */
	private final IBIMS407BMapper ibims407bMapper;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	/**
	 * 출자금 리스트 출력
	 */
	@Override
	public List<IBIMS407BVO> getFincList(IBIMS407BDTO paramData) {
		return ibims407bMapper.getFincList(paramData);
	};

	@Override
	public int insertFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.insertFinc(paramData);
	};

	@Override
	public int updateFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.updateFinc(paramData);
	};

	@Override
	public int deleteFinc(IBIMS407BDTO paramData) {
		return ibims407bMapper.deleteFinc(paramData);
	};

	
	
	
} // class end