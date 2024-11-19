package com.nanuri.rams.business.assessment.tb04.tb04050;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS224BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS501BMapper;
import com.nanuri.rams.business.common.vo.IBIMS224BVO;
import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.TB04050SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB04050ServiceImpl implements TB04050Service {
	
	private final AuthenticationFacade facade;
	
	private final IBIMS224BMapper ibims224BMapper;
	private final IBIMS501BMapper ibims501BMapper;
	
	// LOI/LOC 발급 조회
	@Override
	public TB04050SVO getLoi(TB04050SVO param) {
		// log.debug("serviceImpl => getLoi 실행!!");
		// log.debug("param{}", param);
		
		// TB04050SVO returnDTO = new TB04050SVO();

		// returnDTO = ibims224BMapper.getLoi(param);

		// log.debug("returnDTO{}", returnDTO);

		return ibims224BMapper.getLoi(param);


		
		//return returnDTO;
	}
	
	// LOI/LOC 발급 저장
	@Override
	public int registLoi(IBIMS224BVO param) {

		/*
		 * todo: 501 insert << getBusiBssInfo 결과가 null이면 getBusiBssInfo에서 바로 Error남 (임이사님 확인 필요) 2024 07 25
		 * 
		 */

		// log.debug("param.getDealNo(): "+ param.getDealNo());
		// log.debug("param.getIvtgRsltCtns(): "+ param.getIvtgRsltCtns());
		
		// IBIMS501BVO ibims501VO = new IBIMS501BVO();
		// ibims501VO.setDealNo(param.getDealNo());

		// IBIMS501BVO ibims501BVO = ibims501BMapper.getBusiBssInfo(ibims501VO);

		// log.debug("ibims501BVO{}", ibims501BVO);
		// ibims501BVO.setDealNo(param.getDealNo());
		// //ibims501BVO.setIvtgRsltCtns(param.getIvtgRsltCtns());
		// //ibims501VO.setIvtgRsltCtns(param.getIvtgRsltCtns());
		// ibims501BVO.setIvtgRsltCtns(param.getIvtgRsltCtns());
		
		// ibims501BMapper.getBusiBssInfo(ibims501BVO);

		String sq = ibims224BMapper.getMaxSQ(param);
		
		param.setHndEmpno(facade.getDetails().getEno());
		param.setSn(sq);
		param.setDealNm(param.getDealNm());				// Deal명
		param.setFndNm(param.getFndNm());				// 펀드명
		param.setIssLtrDcd(param.getIssLtrDcd());		// 발급서류구분코드
		param.setSmitOrgi(param.getSmitOrgi());			// 제출처
		param.setIssSttsCd(param.getIssSttsCd());		// 발급상태
		param.setIssCrryCd(param.getIssCrryCd());		// 발급구분코드
		param.setIssAmt(param.getIssAmt());				// 발급액
		param.setIssDt(param.getIssDt());				// 발급일자
		param.setValtDt(param.getValtDt());				// 유효일자
		param.setEmpno(param.getEmpno());				// 담당자사번
		param.setIvtgRsltCtns(param.getIvtgRsltCtns()); // 검토요청내용
		
		return ibims224BMapper.registLoi(param);
	}


}
