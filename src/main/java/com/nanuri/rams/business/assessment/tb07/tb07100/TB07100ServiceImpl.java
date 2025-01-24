package com.nanuri.rams.business.assessment.tb07.tb07100;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS432BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS431BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS432BMapper;
import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07100ServiceImpl implements TB07100Service {

	private final AuthenticationFacade facade;

	private final IBIMS231BMapper ibims231bMapper;
	private final IBIMS232BMapper ibims232bMapper;
	private final IBIMS431BMapper ibims431bMapper;
	private final IBIMS432BMapper ibims432bMapper;

	// 지급품의기본 조회
	@Override
	public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param){
		return ibims431bMapper.selectIBIMS431B(param);
	};
	
	// 지급품의상세 조회
	@Override
	public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param){
		return ibims432bMapper.selectIBIMS432B(param);
	};
	
	// 지급품의기본 등록
	@Override
	public int insertIBIMS431B(IBIMS431BVO param){
		int result = 0;

		String cnstNo = ibims431bMapper.setCnstNo(param.getWrtnDt());
		param.setCnstNo(cnstNo);
		param.setHndEmpno(facade.getDetails().getEno());
		result += 1;

		return result;
	};
	
	// 지급품의기본 변경
	@Override
	public int updateIBIMS431B(IBIMS431BVO param){
		param.setHndEmpno(facade.getDetails().getEno());
		return ibims431bMapper.updateIBIMS431B(param);
	};

	// 지급품의기본 삭제
	@Override
	public int deleteIBIMS431B(IBIMS431BVO param){

		IBIMS432BVO vo432 = new IBIMS432BVO();
		vo432.setWrtnDt(param.getWrtnDt());
		vo432.setRslnBdcd(param.getRslnBdcd());
		vo432.setCnstNo(param.getCnstNo());
		ibims432bMapper.deleteIBIMS432B(vo432);
		return ibims431bMapper.deleteIBIMS431B(param);

	};

	// 지급품의상세 저장
	@Override
	public int saveIBIMS432B(List<IBIMS432BVO> param) {

		int result = 0;

		ibims432bMapper.deleteIBIMS432B(param.get(0));

		for (int i = 0; i < param.size(); i++) {
			param.get(i).setHndEmpno(facade.getDetails().getEno());
			result += 1;
		}

		return result;
	}


	// 승인요청
	@Override
	public int apvlRqst (IBIMS431BVO param) {

		int result = 0;
		// ㅣㅆ발씨ㅣㅃ라리씨발

		return result;
	}

	// 승인취소

	// 결재

	// 반려
}