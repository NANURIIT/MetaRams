package com.nanuri.rams.business.assessment.tb09.tb09014;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS753BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS753BMapper;
import com.nanuri.rams.business.common.vo.IBIMS753BVO;

import lombok.RequiredArgsConstructor;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Service
@Transactional
@RequiredArgsConstructor
public class TB09014ServiceImpl implements TB09014Service {

	private final IBIMS753BMapper ibims753bMapper;

	@Override
	public List<IBIMS753BVO> getMrtgFcsList(IBIMS753BVO params) {
		return ibims753bMapper.getMrtgFcsList(params);
	}

	@Override
	public List<IBIMS753BVO> getMsgTransList(IBIMS753BVO params) {
		return ibims753bMapper.getMsgTransList(params);
	}

	@Override
	public List<IBIMS753BVO> getErrDpchTabList(IBIMS753BVO params) {
		return ibims753bMapper.getErrDpchTabList(params);
	}

	@Override
	public int saveMrtgFcsList(IBIMS753BVO params) {

		int result = 0;
		List<IBIMS753BDTO> paramList = params.getIbims753bVOList();
		ibims753bMapper.deleteMrtgFcsList(params);

		result = ibims753bMapper.insertMrtgFcsList(paramList);

		return result;
	}
	
	@Override
	public int saveMsgTransList(IBIMS753BVO params) {

		int result = 0;
		List<IBIMS753BDTO> paramList = params.getIbims753bVOList();
		ibims753bMapper.deleteMsgTransList(params);

		result = ibims753bMapper.insertMsgTransList(paramList);

		return result;
	}
	
	@Override
	public int saveErrDpchList(IBIMS753BVO params) {

		int result = 0;
		List<IBIMS753BDTO> paramList = params.getIbims753bVOList();
		ibims753bMapper.deleteErrDpchList(params);

		result = ibims753bMapper.insertErrDpchList(paramList);

		return result;
	}
}
