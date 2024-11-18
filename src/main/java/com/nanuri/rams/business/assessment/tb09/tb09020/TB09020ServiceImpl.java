package com.nanuri.rams.business.assessment.tb09.tb09020;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS605BMapper;
import com.nanuri.rams.business.common.vo.IBIMS605BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB09020ServiceImpl implements TB09020Service {

	private final IBIMS605BMapper ibims605bMapper;

	private  final AuthenticationFacade facade;

	// 승인정보 조회
	@Override
	public List<IBIMS605BVO> getPacmList(HashMap<String, Object> params) {

		List<IBIMS605BVO> PacmList = ibims605bMapper.getPacmList(params);

		return PacmList;
	}

	// 이행계획 저장
	@Override
	public int save(HashMap<String, Object> params){

		if( ibims605bMapper.selectOneRaa36b(params) > 0 ){
			return ibims605bMapper.updateRaa36b(params);
		}else{
			return ibims605bMapper.insertRaa36b(params);
		}
	}

	// 진행상태 변경
	@Override
	public int updateRprStatus(HashMap<String, String> paramData){

		int result = 0;

		// Map에 사용자 정보 put
		paramData.put("hndlPEno", facade.getDetails().getEno());
		paramData.put("hndlDprtCd", facade.getDetails().getDprtCd());

		switch ( paramData.get("rprPrgrsStCd") ){
			// 승인요청
			case "20" : result = ibims605bMapper.updateRcgRqs(paramData);
				break;
			// 반송
			case "11" : result = ibims605bMapper.updateRcgRtvl(paramData);
				break;
			// 승인	
			case "30" : result = ibims605bMapper.updateRcg(paramData);
				break;
			// 심사역 확인	
			case "40" : result = ibims605bMapper.updateExmntFnsh(paramData);
				break;
			// 부서장 확인
			case "50" : result = ibims605bMapper.updateDprtMngrFnsh(paramData);
				break;
			default :
				break;
		}

		return result;
	}
	
}
