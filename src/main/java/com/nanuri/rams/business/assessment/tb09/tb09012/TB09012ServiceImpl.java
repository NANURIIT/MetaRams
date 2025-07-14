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
	public List<IBIMS754BDTO> cpdgSearch(TB09012SVO prarm) {
		log.debug("법인채무보증등 집중내역 조회(IBIMS754B) 조회 Start");

		return ibims754bMapper.cpdgSearch(prarm);
	}

	// 전문송신내역 조회(IBIMS755B)
	@Override
	public List<IBIMS754BDTO> cpdgTransSearch(TB09012SVO prarm) {
		log.debug("전문송신내역(IBIMS755B) 조회 Start");

		return ibims754bMapper.cpdgTransSearch(prarm);
	}

	// 오류통보내역 조회(IBIMS756B)
	@Override
	public List<IBIMS754BDTO> cpdgErrSearch(TB09012SVO prarm) {
		log.debug("오류통보내역(IBIMS756B) 조회 Start");

		return ibims754bMapper.cpdgErrSearch(prarm);
	}

	// 법인채무보증등 집중내역 등록 (IBIMS754B)
	@Override
	public int saveCpdgList(IBIMS754BVO params) {

		log.debug("법인채무보증등 집중내역(IBIMS754B) 등록 Start");

		int result = 0;
		List<IBIMS754BDTO> paramList = params.getIbims754bVOList();

		// 법인채무보증등 집중내역 삭제(IBIMS754B 기준일자)
		ibims754bMapper.deleteCpdgFcs(params);

		// 법인채무보증등 집중내역 등록(IBIMS754B 기준일자)
		result = ibims754bMapper.insertCpdgFcs(paramList);

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
		ibims754bMapper.deleteCpdgFcsTrans(params);

		// 전문송신내역 등록(IBIMS755B )
		result = ibims754bMapper.insertCpdgFcsTrans(paramList);

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
		ibims754bMapper.deleteCpdgFcsErr(params);

		// 오류통보내역 등록(IBIMS756B )
		result = ibims754bMapper.insertCpdgFcsErr(paramList);

		log.debug("오류통보내역 (IBIMS756B) 등록 END");
		return result;
	}
}
