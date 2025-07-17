package com.nanuri.rams.business.assessment.tb09.tb09010;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS604BMapper;
import com.nanuri.rams.business.common.vo.IBIMS604BVO;
import com.nanuri.rams.business.common.dto.IBIMS604BDTO;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.ExmntInfo;
import com.nanuri.rams.com.exception.ValidationException;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB09010ServiceImpl implements TB09010Service {

	private final IBIMS604BMapper ibims604bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS604BVO.DealInfo> checkDealSearch(IBIMS604BVO.SearchVO searchVO) {

		// 조회
		return ibims604bMapper.checkDealSearch(searchVO);
	}

	@Override
	public int saveDealExmnt(ExmntInfo exmntInfo, Map<String, Object> userAuth) {

		String athCd = null; // 권한코드
		exmntInfo.setHndEmpno(facade.getDetails().getEno());
		athCd = exmntInfo.getAthCd();

		IBIMS604BDTO lstData = ibims604bMapper.selectIBIMS604B(exmntInfo);

		log.debug("saveDealExmnt start");
		log.debug("getHndEmpno()" + exmntInfo.getHndEmpno());
		log.debug("getAthCd()" + exmntInfo.getAthCd());

		// TODO 권한코드 :AG28(심사부 부서장)/AG21(심사부 심사역) 인 경우만 가능함

		if (lstData == null) {

			// 심사부 심사역 담당이 선행 등록처리
			if ("AG28".equals(athCd)) {

				log.debug("등록 getHndEmpno()" + exmntInfo.getHndEmpno());
				log.debug("등록 getAthCd()" + exmntInfo.getAthCd());
				throw new ValidationException(ValidationException.Type.ERROR,
						"담당심사역 처리내역이 없습니다.<br>담당심사역 확인후 부서장 확인이 가능합니다."); // 처리 오류
			}
			// 등록
			return ibims604bMapper.insertIBIMS604B(exmntInfo);

		} else {

			log.debug("getFstCnfrEmpno()" + lstData.getFstCnfrEmpno());
			log.debug("수정 getAthCd()" + exmntInfo.getAthCd());

			// 수정
			return ibims604bMapper.saveDealExmnt(exmntInfo);
		}

	}
}
