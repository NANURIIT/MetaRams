package com.nanuri.rams.business.assessment.tb09.tb09090;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.nanuri.rams.com.security.AuthenticationFacade;

import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.dto.IBIMS702BDTO;
import com.nanuri.rams.business.common.dto.IBIMS703BDTO;
import com.nanuri.rams.business.common.dto.IBIMS704BDTO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.business.common.vo.IBIMS701BVO;
import com.nanuri.rams.business.common.vo.IBIMS702BVO;
import com.nanuri.rams.business.common.vo.IBIMS703BVO;
import com.nanuri.rams.business.common.vo.IBIMS704BVO;
import com.nanuri.rams.business.common.mapper.IBIMS002BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS701BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS702BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS703BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS704BMapper;



@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB09090ServiceImpl implements TB09090Service {

	private final IBIMS701BMapper ibims701bMapper;
	private final IBIMS702BMapper ibims702bMapper;
	private final IBIMS703BMapper ibims703bMapper;
	private final IBIMS704BMapper ibims704bMapper;
	
	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS704BDTO> selectIBIMS704B(IBIMS704BVO data) {
		List<IBIMS704BDTO> result = ibims704bMapper.selectIBIMS704B(data);
		return result;
	}

	@Override
	public List<IBIMS701BDTO> selectIBIMS701B(IBIMS701BVO data) {
		List<IBIMS701BDTO> result = ibims701bMapper.selectIBIMS701B(data);
		return result;
	}

	@Override
	public List<IBIMS702BDTO> selectIBIMS702B(IBIMS702BVO data) {
		List<IBIMS702BDTO> result = ibims702bMapper.selectIBIMS702B(data);
		return result;
	}

	@Override
	public List<IBIMS703BDTO> selectIBIMS703B(IBIMS703BVO data) {
		List<IBIMS703BDTO> result = ibims703bMapper.selectIBIMS703B(data);
		return result;
	}

	@Override
    public int insertIBIMS701B(IBIMS701BVO data) {
		List<IBIMS701BDTO> list = data.getCpcList();

		ibims701bMapper.deleteCpcStdrYm(facade.getDetails().getDprtCd());

		int rgstSn = ibims701bMapper.getRgstSn();
		for (int i = 0; i < list.size(); i++) {
			list.get(i).setRgstSn(rgstSn + i);
			list.get(i).setHndEmpno(facade.getDetails().getEno());
			list.get(i).setDprtCd(facade.getDetails().getDprtCd());
			list.get(i).setDptNm(facade.getDetails().getDprtNm());
		}
		int result = ibims701bMapper.insertIBIMS701B(list);
		return result;
	}

	@Override
    public int insertIBIMS702B(IBIMS702BVO data) {
		List<IBIMS702BDTO> list = data.getCpcList();

		ibims702bMapper.deleteCpcStdrYm(facade.getDetails().getDprtCd());

		int rgstSn = ibims702bMapper.getRgstSn();
		for (int i = 0; i < list.size(); i++) {
			list.get(i).setRgstSn(rgstSn + i);
			list.get(i).setHndEmpno(facade.getDetails().getEno());
			list.get(i).setDprtCd(facade.getDetails().getDprtCd());
			list.get(i).setDptNm(facade.getDetails().getDprtNm());
		}
		int result = ibims702bMapper.insertIBIMS702B(list);
		return result;
	}

	@Override
    public int insertIBIMS703B(IBIMS703BVO data) {
		List<IBIMS703BDTO> list = data.getCpcList();

		ibims703bMapper.deleteCpcStdrYm(facade.getDetails().getDprtCd());

		int rgstSn = ibims703bMapper.getRgstSn();
		for (int i = 0; i < list.size(); i++) {
			list.get(i).setRgstSn(rgstSn + i);
			list.get(i).setHndEmpno(facade.getDetails().getEno());
			list.get(i).setDprtCd(facade.getDetails().getDprtCd());
			list.get(i).setDptNm(facade.getDetails().getDprtNm());
		}
		int result = ibims703bMapper.insertIBIMS703B(list);
		return result;
	}

	@Override
	public int insertIBIMS704B(IBIMS704BDTO data) {
		int result = 0;
		
		return result;
	};
	
}
