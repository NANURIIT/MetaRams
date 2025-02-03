package com.nanuri.rams.business.assessment.tb07.tb07100;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
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

		return ibims431bMapper.insertIBIMS431B(param);
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

		IBIMS432BVO vo432 = new IBIMS432BVO();
		vo432.setWrtnDt(param.getWrtnDt());
		vo432.setRslnBdcd(param.getRslnBdcd());
		vo432.setCnstNo(param.getCnstNo());

		int chk = ibims432bMapper.chkCountIBIMS432B(vo432);

		if ( chk > 0 ) {
			result = -7574;
		}
		else {
			IBIMS231BDTO dto231 = new IBIMS231BDTO();

			int decdSn = ibims231bMapper.getDecdSn();

			String snFromTB07100 = param.getWrtnDt() + param.getRslnBdcd() + param.getCnstNo();

			dto231.setDecdSn(decdSn);
			dto231.setApvlRqstPEno(param.getRgstEmpno());
			dto231.setDecdStepDcd("04");	// 승인요청
			dto231.setDecdSttsDcd("1");		// 진행중
			dto231.setDealNo(snFromTB07100);
			dto231.setDecdJobDcd("TB07100S");
			dto231.setScrnNo("TB07100S");
			dto231.setLastDecdSq(1);
			dto231.setHndEmpno(facade.getDetails().getEno());

			ibims231bMapper.apvlRqst(dto231);

			IBIMS232BDTO dto232 = new IBIMS232BDTO();

			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd("1");
			dto232.setDcfcEno(param.getReltStfno());
			dto232.setHndEmpno(facade.getDetails().getEno());

			ibims232bMapper.apvlRqst(dto232);

			result = 1;
		}

		return result;
	}

	// 승인취소
	@Override
	public int apvlRqstCncl(IBIMS431BVO param) {
		int result = 0;

		return result;
	}

	// 승인
	@Override
	public int apvl(IBIMS431BVO param) {
		int result = 0;

		return result;
	}

	// 반려
	@Override
	public int rjct(IBIMS431BVO param) {
		int result = 0;

		return result;
	}
}