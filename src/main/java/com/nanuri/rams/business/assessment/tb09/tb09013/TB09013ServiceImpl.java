package com.nanuri.rams.business.assessment.tb09.tb09013;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS752BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS752BMapper;
import com.nanuri.rams.business.common.vo.IBIMS752BVO;

import lombok.RequiredArgsConstructor;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Service
@Transactional
@RequiredArgsConstructor
public class TB09013ServiceImpl implements TB09013Service {

	private final IBIMS752BMapper ibims752bMapper;

	@Override
	public List<IBIMS752BVO> getLmtFcssList(IBIMS752BVO params) {
		return ibims752bMapper.getLmtFcssList(params);
	}

	@Override
	public List<IBIMS752BVO> getMsgTransList(IBIMS752BVO params) {
		return ibims752bMapper.getMsgTransList(params);
	}

	@Override
	public List<IBIMS752BVO> getErrDpchTabList(IBIMS752BVO params) {
		return ibims752bMapper.getErrDpchTabList(params);
	}

	@Override
	public int saveLmtFcssList(IBIMS752BVO params) {

		int result = 0;
		List<IBIMS752BDTO> paramList = params.getIbims752bVOList();
		ibims752bMapper.deleteLmtFcssList(params);

		result = ibims752bMapper.insertLmtFcssList(paramList);

		return result;
	}
	
	@Override
	public int saveMsgTransList(IBIMS752BVO params) {

		int result = 0;
		List<IBIMS752BDTO> paramList = params.getIbims752bVOList();
		ibims752bMapper.deleteMsgTransList(params);

		result = ibims752bMapper.insertMsgTransList(paramList);

		return result;
	}
	
	@Override
	public int saveErrDpchList(IBIMS752BVO params) {

		int result = 0;
		List<IBIMS752BDTO> paramList = params.getIbims752bVOList();
		ibims752bMapper.deleteErrDpchList(params);

		result = ibims752bMapper.insertErrDpchList(paramList);

		return result;
	}
}
