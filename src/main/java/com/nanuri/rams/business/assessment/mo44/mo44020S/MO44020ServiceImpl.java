package com.nanuri.rams.business.assessment.mo44.mo44020S;

import java.util.HashMap;
import java.util.List;

import com.nanuri.rams.com.security.AuthenticationFacade;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA36BMapper;
import com.nanuri.rams.business.common.vo.MO44020SVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MO44020ServiceImpl implements MO44020Service {

	private final RAA36BMapper raa36bMapper;

	private  final AuthenticationFacade facade;

	// 승인정보 조회
	@Override
	public List<MO44020SVO> getPacmList(HashMap<String, Object> params) {

		List<MO44020SVO> PacmList = raa36bMapper.getPacmList(params);

		return PacmList;
	}

	// 이행계획 저장
	@Override
	public int save(HashMap<String, Object> params){

		if( raa36bMapper.selectOneRaa36b(params) > 0 ){
			return raa36bMapper.updateRaa36b(params);
		}else{
			return raa36bMapper.insertRaa36b(params);
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
			case "20" : result = raa36bMapper.updateRcgRqs(paramData);
				break;
			// 반송
			case "11" : result = raa36bMapper.updateRcgRtvl(paramData);
				break;
			// 승인	
			case "30" : result = raa36bMapper.updateRcg(paramData);
				break;
			// 심사역 확인	
			case "40" : result = raa36bMapper.updateExmntFnsh(paramData);
				break;
			// 부서장 확인
			case "50" : result = raa36bMapper.updateDprtMngrFnsh(paramData);
				break;
			default :
				break;
		}

		return result;
	}
	
}
