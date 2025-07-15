package com.nanuri.rams.business.assessment.tb09.tb09011;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS751BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS751BMapper;
import com.nanuri.rams.business.common.vo.IBIMS751BVO;

import lombok.RequiredArgsConstructor;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Service
@Transactional
@RequiredArgsConstructor
public class TB09011ServiceImpl implements TB09011Service {

	private final IBIMS751BMapper ibims751bMapper;

	@Override
	public List<IBIMS751BVO> getCrdtGrntFcsList(IBIMS751BVO params) {
		return ibims751bMapper.getCrdtGrntFcsList(params);
	}

	@Override
	public List<IBIMS751BVO> getMsgTransList(IBIMS751BVO params) {
		return ibims751bMapper.getMsgTransList(params);
	}

	@Override
	public List<IBIMS751BVO> getErrDpchTabList(IBIMS751BVO params) {
		return ibims751bMapper.getErrDpchTabList(params);
	}

	@Override
	public int saveCrdtGrntFcsList(IBIMS751BVO params) {

		int result = 0;
		List<IBIMS751BDTO> paramList = params.getIbims751bVOList();
		ibims751bMapper.deleteCrdtGrntFcsList(params);

		result = ibims751bMapper.insertCrdtGrntFcsList(paramList);

		return result;
	}
	
	@Override
	public int saveMsgTransList(IBIMS751BVO params) {

		int result = 0;
		List<IBIMS751BDTO> paramList = params.getIbims751bVOList();
		ibims751bMapper.deleteMsgTransList(params);

		result = ibims751bMapper.insertMsgTransList(paramList);

		return result;
	}
	
	@Override
	public int saveErrDpchList(IBIMS751BVO params) {

		int result = 0;
		List<IBIMS751BDTO> paramList = params.getIbims751bVOList();
		ibims751bMapper.deleteErrDpchList(params);

		result = ibims751bMapper.insertErrDpchList(paramList);

		return result;
	}
}
