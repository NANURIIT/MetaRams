package com.nanuri.rams.business.assessment.tb06.tb06030;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS250BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS250BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06030ServiceImpl implements TB06030Service {

	private final IBIMS103BMapper ibims103bMapper;
	private final IBIMS201BMapper ibims201bMapper;
	private final IBIMS250BMapper ibims250bMapper;

	@Autowired
	private AuthenticationFacade facade;

	// 대출계약 승인정보관리 조회
	@Override
	public TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam) {
		return ibims103bMapper.selectTB06010SVO(searchParam);
	}

	
	// 종목정보 등록
	@Override
	@Transactional
	public int regPrdtCd(IBIMS201BVO param) {

		int result = 0;

		if (StringUtil.isAllWhitespace(param.getPrdtCd())) {						// 없으면 등록
			List<IBIMS201BDTO> lstS201bDTO = ibims201bMapper.selectIBIMS201B(param);

			if (lstS201bDTO.size() > 0) {
				return 0;
			} else {
				param.setPrdtCd(ibims201bMapper.getPrdtCdSq(param.getPageDcd()));
				result = ibims201bMapper.regPrdtCd(param);

				if (result != 0) {
					IBIMS103BDTO s103b = new IBIMS103BDTO();
					s103b.setDealNo(param.getDealNo());
					s103b.setMtrDcd(param.getNmcpMtrDcd());
					s103b.setJdgmDcd(param.getLstCCaseDcd());
					s103b.setHndEmpno(facade.getDetails().getEno());

					s103b = ibims103bMapper.selectOne103B(s103b);
					s103b.setLastYn("0");
					ibims103bMapper.updateLastYn(s103b);

					s103b.setLastYn("1");
					s103b.setMtrPrgSttsDcd("401");
					result = ibims103bMapper.insert103B(s103b);
				}
			}
		} else {																	// 있으면 수정
			
			ibims201bMapper.deletePrdtCd(param);

			result = ibims201bMapper.regPrdtCd(param);
		}

		return result;
	}
	
	//출자정보 등록
	@Override
	@Transactional
	public int registFinc(IBIMS250BDTO param) {

		int result = 0;

		if (StringUtil.isAllWhitespace(param.getPrdtCd())) {						// 없으면 등록
			List<IBIMS250BDTO> lstS250bDTO = ibims250bMapper.selectIBIMS250B(param);

			if (lstS250bDTO.size() > 0) {
				return 0;
			} else {
				result = ibims250bMapper.registFinc(param);
			}
		} else {																	// 있으면 수정
			
			ibims250bMapper.deleteFinc(param);
			result = ibims250bMapper.registFinc(param);
		}

		return result;
	}

	// 종목정보 삭제
	@Override
	public int deletePrdtCd(IBIMS201BVO param) {
		return ibims201bMapper.deletePrdtCd(param);
	}

}
