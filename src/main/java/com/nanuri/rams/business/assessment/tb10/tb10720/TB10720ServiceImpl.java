package com.nanuri.rams.business.assessment.tb10.tb10720;

import java.util.Date;

import org.slf4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS998BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS998BMapper;
import com.nanuri.rams.business.common.vo.IBIMS998BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10720ServiceImpl implements TB10720Service {
	
	private Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());
	private final IBIMS998BMapper ibims998bmp;
	private final AuthenticationFacade facade;
	
    // 마감기본 영업일 기준 조회
	@Override
	public IBIMS998BVO selectTB10720S(IBIMS998BVO input) {
		logger.debug("++++++++ RUN MAPPER : selectTB10720S ++++++++");
//		System.out.println("++++++++ RUN MAPPER : selectTB10720S ++++++++");
		IBIMS998BVO vo = new IBIMS998BVO();
		vo.setGrd_TB10720S(ibims998bmp.selectTB10720S(input));
		return vo;
	}

	// 마감관리 개시/마감 실행
	@Override
	public int updateTB10720S(IBIMS998BVO input) {
		logger.debug("++++++++ RUN MAPPER : updateTB10720S ++++++++");
		logger.debug("input.jobOpngYn : " + input.getJobOpngYn());
		
		int excCnt = 0;
		IBIMS998BDTO dto = new IBIMS998BDTO();
		dto.setStdrDt(input.getStdrDt());
		
		if("Y".equalsIgnoreCase(input.getJobOpngYn())) {
			dto.setJobOpngDtime(new Date());
			dto.setOpngStfno(facade.getDetails().getEno());
			dto.setOpngOrgno(facade.getDetails().getDprtCd());
			dto.setHdwrOpngYn("Y");
			dto.setHndEmpno(facade.getDetails().getEno());
			excCnt = ibims998bmp.openTB10720S(dto);
		} else {
			// 마갈일 경우 개시 데이터가 필요해서 mapper 나눔
			dto.setJobClsgDtime(new Date());
			dto.setClsgStfno(facade.getDetails().getEno());
			dto.setClsgOrgno(facade.getDetails().getDprtCd());
			dto.setHdwrClsgYn("Y");
			dto.setHndEmpno(facade.getDetails().getEno());
			excCnt = ibims998bmp.closeTB10720S(dto);
		}
		return excCnt;
	}
	
}
