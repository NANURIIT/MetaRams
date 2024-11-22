package com.nanuri.rams.business.assessment.tb03.tb06019;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;
import com.nanuri.rams.business.common.dto.IBIMS114BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS010BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS114BMapper;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepListVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.SchCondVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepCdVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06019ServiceImpl implements TB06019Service {

	private final IBIMS010BMapper ibims010bmapper;
	private final IBIMS114BMapper ibims114bmapper;

	@Autowired
	private AuthenticationFacade facade;

	// 기업체 정보 조회
	@Override
	public ArdyBzepVO getArdyBzepInfo(SchCondVO schVo) {

		String strArdyBzepNo = schVo.getArdyBzepNo();
		if (strArdyBzepNo == null || strArdyBzepNo.length() != 10) {
			// 기업체번호는 필수 입력입니다.			
		}
		return ibims010bmapper.selectArdyBzepInfo(schVo);
	}

	// 기업체 정보 목록 조회
	@Override
	public List<ArdyBzepListVO> getArdyBzepInfoList(SchCondVO schVo) {
		return ibims010bmapper.selectArdyBzepInfoList(schVo);
	}

	// 신규활동 등록
	@Override
	public SchCondVO saveArdyBzepInfo(ArdyBzepVO saveVo) {

		// saveVo.ardyBzepVO.btnProcCd; 버튼구분 D 삭제
		String strBtnProcCd = saveVo.getBtnProcCd();
		int iCnt = 0;
		IBIMS102BDTO saveDto = new IBIMS102BDTO();
		saveVo.setHndEmpno(facade.getDetails().getEno());
		saveVo.setHndTmnlNo(facade.getDetails().getDprtCd());
		saveVo.setCsno("");
		saveVo.setHndTrId("");
		saveVo.setGuid("");

		saveDto.setEntpCd(saveVo.getArdyBzepNo());	// 업체코드
		saveDto.setEntpHnglNm(saveVo.getEntpNm()); // 업체한글명
		saveDto.setCrno(saveVo.getCrno());	// 법인등록번호
		saveDto.setBsnsRgstNo(saveVo.getRnbn());	// 사업자등록번호

		// 기업체번호 존재 유무에 따른 분기
		if ("D".equals(strBtnProcCd)) {
			// 기업체정보 사용유무 수정
			iCnt = ibims010bmapper.updateArdyBzepUseYn(saveVo);
		} else {

			int chk = ibims010bmapper.chk(saveVo.getArdyBzepNo());

			if (chk == 0) {
				// 기업체정보 신규생성 [insert]
				iCnt = ibims010bmapper.insertArdyBzepInfo(saveVo);
				// ibims114bmapper.registCorpInfo(saveDto);		// 기업체 정보 2개 등록중
				log.debug("신규생성 기업체번호[" + saveVo.getArdyBzepNo() + "]");
			} else {
				// 기업체정보 신규생성 [update]
				iCnt = ibims010bmapper.updateArdyBzepInfo(saveVo);
			}
		}

		if (iCnt == 0) {
			// 처리 실패
		}

		// 화면에서 재조회 하기 위한 조회조건 정보 리턴
		SchCondVO rtnSchCondVo = new SchCondVO();
		rtnSchCondVo.setArdyBzepNo(saveVo.getArdyBzepNo());
		rtnSchCondVo.setEntpNm(saveVo.getEntpNm());

		return rtnSchCondVo;
	}

	// 기업체 정보 사용여부 수정
	@Override
	public int deleteArdyBzepInfo(ArdyBzepVO saveVo) {

		saveVo.setHndEmpno(facade.getDetails().getEno());

		return ibims010bmapper.updateArdyBzepUseYn(saveVo);
	}

	// 기업체 사용여부 코드값
	@Override
	public List<ArdyBzepCdVO> getArdyBzepCd(SchCondVO schVo) {
		return ibims010bmapper.selectCd(schVo);
	}


}
