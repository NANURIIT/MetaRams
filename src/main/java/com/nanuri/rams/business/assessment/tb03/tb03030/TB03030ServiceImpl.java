package com.nanuri.rams.business.assessment.tb03.tb03030;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS102BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS010BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS114BMapper;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB03030ServiceImpl implements TB03030Service {
	
	private final IBIMS102BMapper ibims102bMapper;
	private final IBIMS114BMapper ibims114bmapper;
	private final IBIMS010BMapper ibims010bmapper;
	
	@Autowired    
	private AuthenticationFacade facade;
	
	// 신규활동 등록
	@Override
	public int registRmInfo(IBIMS102BDTO registInfo) {
				
		registInfo.setHndEmpno(facade.getDetails().getEno());									// 조작사원번호
		registInfo.setFstInptPEno(facade.getDetails().getEno());								// 처리사원번호		
		registInfo.setHndlDprtCd(facade.getDetails().getDprtCd());								// 처리부점코드
		registInfo.setMetDt(DateUtil.changeDateFormat(registInfo.getMetDt(), "yyyyMMdd"));		// 미팅일자	
		int rmSq = registInfo.getRmSq();
		String entpCd = registInfo.getEntpCd();

		if (rmSq > 0 && entpCd == ""){
			List<IBIMS102BDTO> rmHistory = ibims102bMapper.rmHistoryInfo(registInfo);
			if (rmHistory != null && rmHistory.size() > 0) {
				entpCd = rmHistory.get(0).getEntpCd();
				registInfo.setEntpCd(entpCd);
			}
		}
		// 업체등록
		ArdyBzepVO ardyBzepVo = new ArdyBzepVO();
		ardyBzepVo.setBzepName(registInfo.getEntpHnglNm());	// 업체명
		ardyBzepVo.setRnbn(registInfo.getBsnsRgstNo());	// 사업자등록번호
		ardyBzepVo.setCrno(registInfo.getCorpRgstNo()); // 법인등록번호
		if (entpCd == "") {
			ibims010bmapper.insertArdyBzepInfo(ardyBzepVo);
		} else {
			// 업체 update
			ibims010bmapper.updateArdyBzepInfo(ardyBzepVo);
		}
		
		if (rmSq == 0) {
			if (registInfo.getEntpCd().isEmpty()) {
				registInfo.setEntpCd(ardyBzepVo.getArdyBzepNo());
			}
			// RM 신규
			return ibims102bMapper.registRmInfo(registInfo);	
		} else {
			// RM update
			
			return ibims102bMapper.updateHistory(registInfo);
		}
		
		
		
		// 업체신규등록
		/*
		if (entpCd == "") {		
			ibims114bmapper.registCorpInfo(registInfo);
			return rac03bMapper.registRmInfo(registInfo);
		} 
		// 기존에 있던 업체 rm 활동추가시 IBIMS102B 테이블에만 적재
		else if (entpCd != "") {
			ibims114bmapper.updateCorpInfo(registInfo);
			return rac03bMapper.registRmInfo(registInfo);
		} 
		// 기존업체에 있는 RM활동 수정
		else {
			return rac03bMapper.updateHistory(registInfo);
		} */
	}
	
	// RM활동조회
	@Override
	public List<IBIMS102BDTO> getHistoryInfo(IBIMS102BDTO rmInfo) {
		return ibims102bMapper.getHistoryInfo(rmInfo);
	}
	
	// RM활동이력조회
	@Override
	public List<IBIMS102BDTO> rmHistoryInfo(IBIMS102BDTO rmHistoryInfo) {

		return ibims102bMapper.rmHistoryInfo(rmHistoryInfo);
	}
	
	// RM이름조회
	@Override
	public List<IBIMS102BDTO> getEntpInfoByNm(IBIMS102BDTO entpInfoNm) {
		return ibims114bmapper.getEntpInfoByNm(entpInfoNm);
	}
	
	// RM활동수정
	@Override
	public int updateHistory(IBIMS102BDTO registInfo) {
		return ibims102bMapper.updateHistory(registInfo);		
	}		
	
	// File Upload Key
	@Override
	public List<IBIMS102BDTO> getFileKey(IBIMS102BDTO rmHistoryInfo) {
		return ibims102bMapper.getFileKey(rmHistoryInfo);
	}

}
