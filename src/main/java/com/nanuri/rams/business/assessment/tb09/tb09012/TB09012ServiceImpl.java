package com.nanuri.rams.business.assessment.tb09.tb09012;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS754BMapper;
import com.nanuri.rams.business.common.vo.IBIMS751BVO;
import com.nanuri.rams.business.common.vo.IBIMS754BVO;
import com.nanuri.rams.business.common.vo.TB09012SVO;
import com.nanuri.rams.business.common.dto.IBIMS751BDTO;
import com.nanuri.rams.business.common.dto.IBIMS754BDTO;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB09012ServiceImpl implements TB09012Service {

	private final IBIMS754BMapper ibims754bMapper;

	// 법인채무보증등 집중내역 조회(IBIMS754B)
	@Override
	public List<IBIMS754BDTO> selectIBIMS754B(TB09012SVO prarm) {
		log.debug("법인채무보증등 집중내역 조회(IBIMS754B) 조회 Start");

		return ibims754bMapper.selectIBIMS754B(prarm);
	}

	// 전문송신내역 조회(IBIMS755B)
	@Override
	public List<IBIMS754BDTO> selectIBIMS755B(TB09012SVO prarm) {
		log.debug("전문송신내역(IBIMS755B) 조회 Start");

		return ibims754bMapper.selectIBIMS755B(prarm);
	}

	// 오류통보내역 조회(IBIMS756B)
	@Override
	public List<IBIMS754BDTO> selectIBIMS756B(TB09012SVO prarm) {
		log.debug("오류통보내역(IBIMS756B) 조회 Start");

		return ibims754bMapper.selectIBIMS756B(prarm);
	}

	// 법인채무보증등 집중내역 등록 (IBIMS754B)
	@Override
	public int saveCpdgList(IBIMS754BVO params) {

		log.debug("법인채무보증등 집중내역(IBIMS754B) 등록 Start");

		int result = 0;
		List<IBIMS754BDTO> paramList = params.getIbims754bVOList();

		// 법인채무보증등 집중내역 삭제(IBIMS754B 기준일자)
		ibims754bMapper.deleteIBIMS754B(params);

		// 법인채무보증등 집중내역 등록(IBIMS754B 기준일자)
		result = ibims754bMapper.insertIBIMS754B(paramList);

		log.debug("법인채무보증등 집중내역(IBIMS754B) 등록 END");
		return result;
	}

	// 전문송신내역 등록 (IBIMS755B)
	@Override
	public int saveTransList(IBIMS754BVO params) {

		log.debug("전문송신내역 (IBIMS755B) 등록 Start");

		int result = 0;
		List<IBIMS754BDTO> paramList = params.getIbims754bVOList();

		// 전문송신내역 삭제(IBIMS755B )
		ibims754bMapper.deleteTransList(params);

		// 전문송신내역 등록(IBIMS755B )
		result = ibims754bMapper.insertTransList(paramList);

		log.debug("전문송신내역 (IBIMS755B) 등록 END");
		return result;
	}

	// 오류통보내역 등록 (IBIMS756B)
	@Override
	public int saveErrList(IBIMS754BVO params) {

		log.debug("오류통보내역 (IBIMS756B) 등록 START");

		int result = 0;
		List<IBIMS754BDTO> paramList = params.getIbims754bVOList();

		// 오류통보내역 삭제(IBIMS756B )
		log.debug("scrnDcd:" + params.getScrnDcd());
		ibims754bMapper.deleteErrList(params);

		// 오류통보내역 등록(IBIMS756B )
		result = ibims754bMapper.insertErrList(paramList);

		log.debug("오류통보내역 (IBIMS756B) 등록 END");
		return result;
	}
}
